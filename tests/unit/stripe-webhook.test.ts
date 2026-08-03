import { describe, it, expect, vi, beforeEach } from "vitest";
import type { NextRequest } from "next/server";

const mockConstructEvent = vi.fn();

vi.mock("stripe", () => ({
  default: class MockStripe {
    webhooks = { constructEvent: mockConstructEvent };
  },
}));

vi.mock("@anthropic-ai/sdk", () => ({
  default: class MockAnthropic {
    messages = { create: vi.fn().mockResolvedValue({ content: [{ type: "text", text: "Mock pismo" }] }) };
  },
}));

vi.mock("resend", () => ({
  Resend: class MockResend {
    emails = { send: vi.fn().mockResolvedValue({ id: "email_123" }) };
  },
}));

vi.mock("@upstash/redis", () => ({
  Redis: class MockRedis {
    incr = vi.fn().mockResolvedValue(1);
  },
}));

vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
  setContext: vi.fn(),
}));

vi.mock("next/server", async () => {
  const actual = await vi.importActual<typeof import("next/server")>("next/server");
  return {
    ...actual,
    after: vi.fn((fn: () => void) => {}),
  };
});

vi.mock("pdf-lib", () => ({
  PDFDocument: { create: vi.fn() },
  rgb: vi.fn(() => ({ r: 0, g: 0, b: 0 })),
}));

vi.mock("@pdf-lib/fontkit", () => ({ default: {} }));

vi.mock("fs", () => ({
  default: { readFileSync: vi.fn().mockReturnValue(Buffer.from("fake-font")) },
}));

vi.mock("@/app/lib/przepisy", () => ({
  fetchPrzepisy: vi.fn().mockResolvedValue([]),
  formatPrzepisy: vi.fn().mockReturnValue(""),
}));

function makeRequest(body: string, signature = "valid_sig") {
  return new Request("https://writeback.pl/api/webhook/stripe", {
    method: "POST",
    headers: { "stripe-signature": signature },
    body,
  }) as unknown as NextRequest;
}

let POST: (req: NextRequest) => Promise<Response>;

beforeEach(async () => {
  mockConstructEvent.mockReset();
  vi.resetModules();
  const mod = await import("@/app/api/webhook/stripe/route");
  POST = mod.POST;
});

describe("Stripe webhook", () => {
  it("returns 400 on invalid signature", async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error("Invalid signature");
    });

    const res = await POST(makeRequest("{}"));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid signature" });
  });

  it("acknowledges non-checkout events", async () => {
    mockConstructEvent.mockReturnValue({
      type: "customer.created",
      created: Math.floor(Date.now() / 1000),
    });

    const res = await POST(makeRequest("{}"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
  });

  it("ignores events older than 30 minutes", async () => {
    mockConstructEvent.mockReturnValue({
      type: "checkout.session.completed",
      created: Math.floor(Date.now() / 1000) - 31 * 60,
      data: { object: { id: "sess_old", metadata: {}, customer_details: {} } },
    });

    const res = await POST(makeRequest("{}"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
  });

  it("processes checkout.session.completed and returns received", async () => {
    mockConstructEvent.mockReturnValue({
      type: "checkout.session.completed",
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: "sess_" + Date.now(),
          customer_details: { email: "test@example.com" },
          metadata: { doc_type: "sklep", imie_nazwisko: "Jan Kowalski" },
          amount_total: 2900,
        },
      },
    });

    const res = await POST(makeRequest("{}"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
  });
});

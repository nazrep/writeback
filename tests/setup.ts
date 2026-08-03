import { vi } from "vitest";

vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_fake");
vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_test_fake");
vi.stubEnv("ANTHROPIC_API_KEY", "sk-ant-fake");
vi.stubEnv("RESEND_API_KEY", "re_fake");
vi.stubEnv("UPSTASH_REDIS_KV_REST_API_URL", "https://fake.upstash.io");
vi.stubEnv("UPSTASH_REDIS_KV_REST_API_TOKEN", "fake_token");
vi.stubEnv("NEXT_PUBLIC_SENTRY_DSN", "");
vi.stubEnv("NEXT_PUBLIC_URL", "https://writeback.pl");

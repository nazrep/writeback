export default function ContentEn() {
  return (
    <>
      <p>
        Your flight was delayed by more than 3 hours, cancelled with less than 14 days' notice, or you were denied boarding despite a valid reservation? You may be entitled to compensation of €250–€600 — under an EU regulation that applies directly and cannot be excluded by the airline's terms and conditions.
      </p>

      <h2>Legal basis: Regulation (EC) No 261/2004</h2>
      <p>
        <strong>Regulation (EC) No 261/2004 of the European Parliament and of the Council of 11 February 2004</strong> establishes common rules on compensation and assistance to passengers in the event of denied boarding, cancellation, or long delay. The regulation applies directly throughout the EU — no airline can override it through its terms of carriage.
      </p>
      <p><strong>Scope (Art. 3):</strong></p>
      <ul>
        <li>Flights departing from an airport in an EU member state — regardless of the airline's nationality</li>
        <li>Flights arriving in the EU operated by an EU carrier</li>
        <li>The passenger must hold a confirmed reservation and have checked in on time</li>
      </ul>

      <h2>When compensation is due</h2>
      <ul>
        <li><strong>Delay of more than 3 hours at the destination</strong> — measured at actual landing, not departure (CJEU joined cases C-402/07 and C-432/07 <em>Sturgeon</em>: delayed flight passengers have the same rights as cancelled flight passengers)</li>
        <li><strong>Cancellation notified less than 14 days</strong> before the scheduled departure (Art. 5(1)(c))</li>
        <li><strong>Denied boarding</strong> (overbooking) without the passenger's consent (Art. 4)</li>
      </ul>

      <h2>Compensation amounts — Art. 7</h2>
      <ul>
        <li><strong>€250</strong> — flights up to 1,500 km</li>
        <li><strong>€400</strong> — intra-EU flights over 1,500 km and all other flights 1,500–3,500 km</li>
        <li><strong>€600</strong> — flights over 3,500 km outside the EU</li>
      </ul>
      <p>The amount may be reduced by 50% if the airline offered re-routing and the passenger arrived at the final destination with a delay not exceeding: 2 hours (up to 1,500 km), 3 hours (1,500–3,500 km), or 4 hours (over 3,500 km) — Art. 7(2).</p>

      <h2>The exception: extraordinary circumstances — and what they are NOT</h2>
      <p>
        <strong>Art. 5(3)</strong>: the airline is exempt from paying compensation if it can prove the cancellation or delay was caused by extraordinary circumstances which could not have been avoided even if all reasonable measures had been taken.
      </p>
      <p>Extraordinary circumstances include: air traffic management decisions, weather conditions preventing safe flight, strikes by air traffic controllers, governmental decisions affecting a specific aircraft.</p>
      <p>
        <strong>Key CJEU ruling C-549/07 (<em>Wallentin-Hermann v. Alitalia</em>)</strong>: <strong>a technical failure of the aircraft does NOT constitute an extraordinary circumstance</strong> unless it results from an event external to the normal activity of the carrier (e.g. a hidden manufacturing defect discovered by the manufacturer). Routine technical faults are part of the airline's normal operational risk.
      </p>

      <h2>Right to care during a delay — Art. 9</h2>
      <p>Regardless of the right to compensation, at certain delay thresholds you are entitled to free assistance from the airline:</p>
      <ul>
        <li>Meals and refreshments proportionate to the waiting time</li>
        <li>Two telephone calls, emails or faxes</li>
        <li>Hotel accommodation and transport when an overnight stay is required</li>
      </ul>
      <p>Keep all receipts — you can claim reimbursement even if the airline did not proactively offer assistance.</p>

      <h2>Limitation period</h2>
      <p>Regulation 261/2004 does not specify a limitation period — national law applies. In Poland, property claims expire after <strong>3 years</strong> (Art. 118 CC). Don't wait too long — airlines have full flight documentation but your records may fade over time.</p>

      <h2>How to file a claim</h2>
      <p>Your written claim to the airline should include: flight number and date, booking/ticket reference, description of the event (hours of delay, reason given if any), compensation amount claimed in euros citing Art. 7 of Regulation 261/2004, and a response deadline (14–30 days).</p>
      <p>If the airline refuses or does not reply: in Poland the supervisory authority is the <strong>Civil Aviation Authority (Urząd Lotnictwa Cywilnego — ulc.gov.pl)</strong>. Filing a complaint there is free.</p>

      <div style={{ margin: "2rem 0", padding: "1.5rem", background: "#eef2ff", borderRadius: "12px", border: "1px solid #c7d2fe" }}>
        <p style={{ margin: 0, fontWeight: 600, color: "#3730a3", marginBottom: "0.5rem" }}>Flight delayed or cancelled? Generate a claim under EU Regulation 261/2004.</p>
        <p style={{ margin: 0, color: "#4338ca", fontSize: "0.9rem" }}>Describe your flight and delay → we generate a letter to the airline → PDF in 5 minutes. PLN 29.</p>
      </div>
    </>
  );
}

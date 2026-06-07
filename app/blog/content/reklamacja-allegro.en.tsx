import Link from "next/link";

export default function ContentEn() {
  return (
    <>
      <p>You bought a phone on Allegro, it stopped working after two months, and the seller replied "the item was working when shipped, complaint rejected." What now? You have rights that apply regardless of what the seller writes in their response.</p>

      <h2>Step one: was the seller a business or a private individual?</h2>
      <p>Allegro hosts both businesses and private individuals. This distinction is key because consumer protection rights apply only when buying from a business.</p>
      <p>How to check: go to the seller's Allegro profile. If a NIP (tax ID) or company name is shown, it is a business and you are protected by the Consumer Rights Act. If it is a private individual with no NIP, the purchase is governed by the Civil Code, which offers weaker protection.</p>
      <p>In practice, the vast majority of high-volume Allegro sellers are businesses. Allegro itself is just a platform and is not liable for sellers, unless it sells under the "Allegro" label directly.</p>

      <h2>Your rights when buying from a business on Allegro</h2>
      <p>When buying from a business, you have exactly the same rights as when buying from any other online store. The legal basis is <strong>Art. 43b of the Consumer Rights Act</strong>, in force since 1 January 2023.</p>
      <p>Key rules:</p>
      <ul>
        <li><strong>2 years</strong> to report non-conformity with the contract, counted from the date you received the parcel</li>
        <li>For the full 2 years there is a legal presumption that the defect existed at the time of delivery (Art. 43c §1). The seller must rebut this with an expert report — a verbal claim is not enough</li>
        <li>The seller has <strong>14 days</strong> to respond to a complaint (Art. 7a). No response = complaint accepted by force of law</li>
        <li>You may demand repair, replacement, price reduction or refund</li>
      </ul>
      <p>A detailed discussion of these provisions is in the article <Link href="/blog/reklamacja-sklep-internetowy?lang=en" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">how to file an effective complaint to an online store</Link>.</p>

      <h2>Common seller excuses on Allegro and how to counter them</h2>

      <h3>"The item was working when shipped — I checked it before sending"</h3>
      <p>It does not matter what the seller claims. Under Art. 43c §1, for 2 years from delivery there is a presumption that the defect existed at the time of delivery. The burden of rebutting that presumption is on the seller. A verbal assurance is not enough — the seller must present the results of an expert examination.</p>

      <h3>"The 30-day complaint window has expired"</h3>
      <p>Such a clause in the seller's terms is void. Terms cannot shorten statutory consumer rights. You have 2 years regardless of anything written in the seller's Allegro policy.</p>

      <h3>"It is mechanical damage — buyer's fault"</h3>
      <p>The seller may claim this, but must prove it. A bare assertion is insufficient. Demand written justification and the results of any expert assessment. If the seller refuses, challenge the decision in a follow-up letter citing Art. 43c.</p>

      <h3>"The item was used, sold without warranty"</h3>
      <p>Statutory liability under the Consumer Rights Act also covers used goods sold by a business. The parties may shorten the period to one year for used goods, but only if this was clearly stated before purchase and you accepted it. "No warranty" in an ad does not eliminate statutory rights.</p>

      <h2>Step by step: how to file a complaint against an Allegro seller</h2>

      <h3>Step 1: contact the seller through Allegro messages</h3>
      <p>First send a message through the Allegro messaging system briefly describing the problem. This leaves a record on the platform. Give the seller 2-3 days to respond.</p>

      <h3>Step 2: send a formal complaint letter</h3>
      <p>If the seller refuses or does not respond, send a formal letter. Find the seller's email or postal address in their profile or on the invoice. The letter should include:</p>
      <ul>
        <li>Your details and the Allegro transaction number</li>
        <li>Product description and date of purchase</li>
        <li>Description of the defect and when it appeared</li>
        <li>Reference to <strong>Art. 43b of the Consumer Rights Act</strong></li>
        <li>Specific demand: repair, replacement or refund</li>
        <li>Note that no response within 14 days = complaint accepted (Art. 7a)</li>
      </ul>
      <p>Don't want to write it yourself? <Link href="/zamow?lang=en" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">writeback.pl will generate such a letter</Link> in a few minutes.</p>

      <h3>Step 3: open a dispute on Allegro</h3>
      <p>If the seller still refuses, open a dispute through Allegro. The platform has a Buyer Protection Programme and can intervene, especially when the seller clearly violates consumer rights. Allegro can hold funds until the dispute is resolved.</p>

      <h2>Option: chargeback via card or BLIK</h2>
      <p>If you paid by credit or debit card, you can attempt a chargeback through your bank. This is a Visa/Mastercard mechanism, and many banks process it when a seller has failed to fulfil their contractual obligations.</p>
      <p>Call your bank's helpline and report that the seller did not deliver goods conforming to the contract or refused a complaint despite having legal grounds. Have the transaction number and seller correspondence ready.</p>
      <p>For BLIK the situation is harder — BLIK is a direct payment with no built-in chargeback mechanism. You can however file a transaction complaint with your bank under Art. 46 of the Payment Services Act if you believe the transaction was unauthorised.</p>
      <p>For more on bank complaints, read <Link href="/blog/bank-odmawia-zwrotu?lang=en" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">bank refuses refund: your rights</Link>.</p>

      <h2>Purchase from a private individual: what are your options</h2>
      <p>When buying from a private individual, the Consumer Rights Act does not apply. You do however have rights under the Civil Code (Art. 556 et seq.) governing warranty between private persons. The period is 2 years from delivery (Art. 568 §1 CC), and the seller is liable for defects they concealed or knew about.</p>
      <p>In practice this is harder to enforce than with a business. If the seller misrepresented the condition of the goods and the item turned out to be defective, you have grounds for a claim, but the matter may require court proceedings.</p>

      <h2>Summary: Allegro complaint step by step</h2>
      <ul>
        <li>Check the seller's profile: NIP or company name = Consumer Rights Act applies. Private individual = weaker Civil Code protection</li>
        <li><strong>Art. 43b of the Consumer Rights Act</strong> works exactly the same as with any online store</li>
        <li>Seller has <strong>14 days</strong> to respond. No response = complaint accepted by law</li>
        <li>Allegro Protect is platform support, not a substitute for your legal rights. A formal letter is a stronger basis</li>
        <li>Paid by card? You can try a chargeback if the seller failed to fulfil the contract and is not responding</li>
        <li>Bought from a private individual? You have one year to complain and it is harder to enforce without going to court</li>
      </ul>
    </>
  );
}

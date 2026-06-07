import Link from "next/link";

export default function ContentEn() {
  return (
    <>
      <p>Money disappeared from your account. You called the bank and the consultant said "the transaction was authorised, there is nothing we can do." That is not true. The law imposes a specific obligation on the bank to refund — it has no discretion.</p>

      <h2>Legal basis: Art. 46 of the Payment Services Act</h2>
      <p><strong>Art. 46 of the Payment Services Act (ustawa o usługach płatniczych)</strong> is precise: when you report an unauthorised transaction, the bank must refund the amount promptly, no later than by the end of the next business day after the day of notification. This is not a goodwill gesture or an internal bank procedure. It is a statutory obligation.</p>
      <p>At the same time, Art. 45 §1 places the burden of proof on the bank. The bank must prove that the transaction was authorised by you. You do not have to prove anything.</p>

      <h2>When is a transaction unauthorised</h2>
      <p>A transaction is unauthorised when you did not instruct it. The most common cases:</p>
      <ul>
        <li>Card theft and transactions made without your knowledge</li>
        <li>Phishing: someone obtained your card number, CVV code or password and made a transaction</li>
        <li>A store charged a higher amount than you agreed to</li>
        <li>The same payment charged twice (duplicate transaction)</li>
        <li>A subscription you never ordered and never authorised</li>
      </ul>

      <h2>Why "login was correct" is not enough</h2>
      <p>Banks very often refuse, claiming that authentication was successful: the SMS code arrived on the correct number, the PIN was right, the login came from a known device. Art. 45 §2 of the Payment Services Act explicitly states that the mere fact of a recorded use of the payment instrument is not sufficient to prove that the transaction was authorised by the user.</p>
      <p>In other words: the fact that someone knew your PIN, password, or received the SMS does not automatically prove that you made the transaction. The bank must demonstrate intentional fraud or gross negligence on your part.</p>

      <h2>Special case: BLIK and phone scams</h2>
      <p>BLIK is the most popular payment method in Poland and the most common target for fraudsters. The "BLIK scam" involves someone impersonating a friend or family member (via a hijacked social media account) and asking for an urgent BLIK transfer.</p>
      <p>In such a case you technically entered the code yourself, so the bank may argue the transaction was authorised. The legal situation is difficult but not hopeless:</p>
      <ul>
        <li>If you were a victim of fraud, report it to the police and state this clearly in your bank complaint</li>
        <li>Cite Art. 45 and demand an explanation of how the bank verifies that a transaction was made consciously</li>
        <li>The Financial Ombudsman looks favourably on BLIK fraud cases, especially for large amounts where the victim acted under manipulation</li>
      </ul>

      <h2>When can the bank refuse a refund</h2>
      <p>The bank may refuse a refund only when it proves that:</p>
      <ul>
        <li>You acted intentionally: you yourself instructed the transaction and are now claiming you did not authorise it</li>
        <li>You were <strong>grossly negligent</strong>: for example, you wrote your PIN together with the card, disclosed login credentials to a third party, or entered card data on an obviously fake website</li>
        <li>You did not report the loss of your card promptly after discovering it was missing</li>
      </ul>
      <p>Important: ordinary negligence does not forfeit your right to a refund. Clicking on a phishing link that appeared legitimate (e.g. impersonating a bank website) is generally not gross negligence. The bank must prove a very high level of carelessness on your part.</p>

      <h2>How to write an effective letter to the bank</h2>
      <p>A telephone report is worth following up with a written complaint. A phone call is often logged as a "verbal complaint" with lower priority. A letter citing statutory provisions is harder to ignore.</p>
      <p>Include in the letter:</p>
      <ul>
        <li>Your bank account and personal details</li>
        <li>Transaction description: date, amount, recipient, reference number if available</li>
        <li>Declaration that you did not authorise the transaction</li>
        <li>Reference to <strong>Art. 46 §1</strong> (obligation to refund by end of next business day) and <strong>Art. 45 §2</strong> (burden of proof on the bank) of the Payment Services Act</li>
        <li>Demand for refund within the statutory deadline</li>
        <li>Note that if refused, you will file a complaint with the Financial Ombudsman</li>
      </ul>
      <p>You can write the letter yourself or <Link href="/zamow?lang=en" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">generate it through writeback.pl</Link> with the correct statutory provisions. Choose the "Bank complaint" option.</p>

      <h2>What if the bank still refuses</h2>
      <p>If the bank maintains its refusal after your written complaint, you have several options:</p>
      <ul>
        <li><strong>Financial Ombudsman (Rzecznik Finansowy)</strong>: the most effective route. Banks take complaints directed to the RF very seriously, as the regulator closely monitors their complaint statistics. The process is free and fast. More at rf.gov.pl</li>
        <li><strong>KNF (Polish Financial Supervision Authority)</strong>: accepts complaints about banks violating regulations. Works more slowly than the RF, but a signal to the regulator has long-term significance</li>
        <li><strong>Arbitration Court at KNF</strong>: free mediation/arbitration proceedings, requires the bank's consent to participate</li>
        <li><strong>Civil court</strong>: for amounts above a few thousand zloty it is worth considering. For disputes up to 20,000 PLN the simplified procedure is relatively inexpensive</li>
      </ul>
      <p>Having a store complaint rather than a bank issue? Read <Link href="/blog/reklamacja-sklep-internetowy?lang=en" className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700">how to file an effective complaint to an online store</Link>.</p>

      <h2>Summary: how to recover money from your bank</h2>
      <ul>
        <li><strong>Art. 46 of the Payment Services Act</strong>: the bank must refund by end of next business day after the report</li>
        <li>The burden of proof is on the bank (Art. 45 §1). It must prove the transaction was authorised</li>
        <li>"Correct login" and "SMS code arrived" do not release the bank from its obligation to refund</li>
        <li>For transactions made before reporting card loss, you are liable for up to €50 (Art. 46 §2 of the Payment Services Act), unless you acted intentionally or with gross negligence</li>
        <li>BLIK fraud: harder, but not hopeless. Report to the police and clearly note this in the complaint</li>
        <li>Most effective appeal route: <strong>Financial Ombudsman</strong> (rf.gov.pl). Banks take its interventions very seriously</li>
      </ul>
    </>
  );
}

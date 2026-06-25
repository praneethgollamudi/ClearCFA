// ─── CFA ETHICS CASES ───────────────────────────────────────────────────────
const ETHICS_CASES = [
  {
    id:"ec01", category:"Billing & Fees", standard:"V(B)",
    title:"Fee Methodology Change",
    vignette:`Maalouf works in a branch office for a large wealth management firm. The firm's fees are based on a percentage of the value of assets managed in each client account. The firm has a standard method for valuing assets and calculating fees for all clients, disclosed at the outset. Over time, the firm transitions to: (1) using market value at end of billing cycle instead of average daily balance; (2) including previously-excluded assets such as cash equivalents in the fee calculation; and (3) charging clients for a full billing period rather than prorating fees for accounts that start or terminate mid-period. Maalouf:`,
    options:{A:"cannot use end-of-cycle valuations, include cash equivalents, or charge full fees for partial cycle accounts.",B:"can change the valuation and fee calculation methodology as long as actual fees charged to clients are lower.",C:"must notify clients of the changes in the valuation and fee calculation methods.",D:"cannot change fundamental elements of the client relationship such as valuation and fee calculation methodology once disclosed."},
    answer:"C",
    explanation:`Standard V(B): Communication with Clients requires disclosure of the basic format and general principles of the investment process. Advisory fees are a critical part of that process. Any changes to fee methodology — even if fees end up lower — must be disclosed to clients. It is improper to change fee calculation methodology without disclosure. Maalouf and his firm can change the methodology but must notify clients first. Answer C is correct.`,
    source:"Based on a US SEC Office of Compliance Inspections and Examinations Risk Alert."
  },
  {
    id:"ec02", category:"Billing & Fees", standard:"I(A), I(C), V(A), V(C)",
    title:"Sub-Adviser Payments and Bribery",
    vignette:`Corrales manages a hedge fund seeking investment opportunities in developing markets. Using fund assets, the fund hires local companies as "sub-advisers" to obtain investment opportunities and navigate local regulation. The sub-advisers have very limited financial experience but have close relationships with high-ranking government officials. Payments often cover substantial "deal fees" that facilitate governmental support. Corrales does not require the local partners to document their activities. He reports these expenditures to investors as "operating expenses necessary to the success of the investment." Over several years the fund produces an 18% annual return. Did Corrales violate the Code and Standards?`,
    options:{A:"Yes.",B:"No, because it is acceptable to hire sub-advisers and consultants to assist in procuring investment opportunities.",C:"No, because the payments represent legitimate expenses to protect the interests of investors.",D:"No, as long as the sub-advisers provide more detail about payments and this is disclosed to investors."},
    answer:"A",
    explanation:`Corrales is not hiring true sub-advisers — he is essentially paying connected government officials to secure deals. The 'sub-advisers' have no financial experience and fees are undocumented. This violates multiple Standards: I(A) Knowledge of the Law (anti-bribery laws), I(C) Misrepresentation (labelling bribes as investment fees), V(A) Diligence and Reasonable Basis (no adequate basis for the 'investment' action), V(C) Record Retention (no appropriate records kept). Strong returns do not cure ethical violations.`,
    source:"Based on a US SEC enforcement action from 2017."
  },
  {
    id:"ec03", category:"Billing & Fees", standard:"III(A)",
    title:"Expense Billing on Client Trips",
    vignette:`Braun and his firm are hired by a regional government to serve as financial adviser for issuing general obligation bonds. For rating agency meetings in New York, Braun plans trips on Mondays or Fridays to get cheaper travel rates. His wife accompanies him and they spend weekends attending sporting events, theatre performances, and museums. Braun often changes flights and hotels to accommodate other client meetings, incurring change fees. His supervisor deducts expenses she believes are unrelated to the business purpose before submitting bills to the municipality. Which expenses can MOST LIKELY be billed to the client?`,
    options:{A:"Braun's accommodation and meal expenses for the weekend days, because the travel rates are cheaper over a weekend.",B:"Tickets to sporting and theatre events, as long as they do not exceed an amount for reasonable business entertainment.",C:"Flight and hotel change fees that result from the regular course of Braun's business activities.",D:"The travel and accommodation expenses for Braun's wife if he discloses this to his supervisor and receives written approval."},
    answer:"A",
    explanation:`Standard III(A): Loyalty, Prudence, and Care — members must not engage in deceptive, dishonest, or unfair practice when handling client accounts. Charging lavish personal expenses to clients violates this Standard. However, if the savings in travel fees from a weekend schedule exceed the extra accommodation and meal cost, the total cost to the client is actually lower — satisfying the duty of loyalty. Entertainment for the spouse, personal entertainment, and change fees from other client obligations are all personal/overhead costs that should not be charged to this client.`,
    source:"Based on a FINRA enforcement action."
  },
  {
    id:"ec04", category:"Billing & Fees", standard:"III(A)",
    title:"Inherited Billing Errors Post-Merger",
    vignette:`O'Reilly is CFO of Global Strategic Partners (GSP), which merges with Holland Advisers. GSP maintains Holland's legacy billing system for former Holland clients during the transition. When converting, O'Reilly reviews the billing information to ensure it is correctly copied into GSP's system. Unknown to O'Reilly, Holland's billing system has errors: fees default to the highest available rate when accounts transfer between branches; outside manager fees are charged on money market accounts that don't use outside managers; and advance-billed fees are not refunded when clients terminate accounts. Some errors stemmed from coding issues, others from failure to input negotiated lower rates. As CFO, O'Reilly:`,
    options:{A:"is not responsible for inadvertent billing system errors by Holland before the merger.",B:"fulfils his responsibilities by reviewing client billing information to ensure it is correctly copied into the system.",C:"fails to meet his ethical responsibilities to his firm's advisory clients.",D:"acts appropriately as long as he remedies Holland's billing errors once client accounts are converted to GSP's system."},
    answer:"C",
    explanation:`Standard III(A): Loyalty, Prudence, and Care. Although the billing errors were inadvertent and predated O'Reilly's involvement, they became GSP's responsibility once GSP used the inaccurate billing system, even temporarily. As CFO, O'Reilly is responsible for the accuracy of rates charged to clients. Fixing issues only upon conversion does not account for the initial period of overbilling by GSP using the Holland system. O'Reilly should have confirmed that fee information was accurate and consistent with clients' advisory agreements — not merely that it was correctly copied.`,
    source:"Based on a 2017 US SEC Enforcement Action."
  },
  {
    id:"ec05", category:"Billing & Fees", standard:"I(C), III(A), VI(A)",
    title:"Misleading Brokerage Arrangements",
    vignette:`Washington is a senior portfolio manager for Valley Forge Asset Management. The firm offers three brokerage options. Under 'Affiliated Brokerage', clients can direct brokerage to Valley Forge's own full-service brokerage. Washington states clients can negotiate commissions and the firm offers a 70% discount off its full rate. Around 1,200 clients choose this option, and 92% receive the 70% discount. However, Valley Forge does not provide any services to Affiliated Brokerage clients that are not also provided to clients under the other (cheaper) options. The minimum commission per trade under Affiliated Brokerage is more than double the maximum commission under other options, making nearly every trade more expensive even after the 70% 'discount'. Washington's actions are:`,
    options:{A:"acceptable because clients are free to choose which brokerage option to use.",B:"acceptable because Washington significantly discounts brokerage fees for clients choosing Affiliated Brokerage.",C:"acceptable because the conflicts regarding Affiliated Brokerage are fully disclosed in the advisory agreement.",D:"unacceptable."},
    answer:"D",
    explanation:`Standard I(C) Misrepresentation prohibits knowingly making misrepresentations about investment services. Standard III(A) requires acting in clients' best interests. Washington states the Affiliated Brokerage provides 'full-service' brokerage, but the firm provides no additional services compared to cheaper alternatives. The 70% discount off an inflated 'full rate' still results in costs 4.5x higher than other options. Clients lack the information to make an informed decision. Disclosure of a conflict of interest is not sufficient when the disclosure itself is misleading.`,
    source:"Based on a March 2019 US SEC Enforcement Action."
  },
  {
    id:"ec06", category:"Billing & Fees", standard:"III(A)",
    title:"Soft Dollar Misuse for Personal Rent",
    vignette:`Murdoch is founder and head portfolio manager of IOM Capital Management. IOM accumulates soft dollar credits through equity and options trading. IOM discloses that soft dollars may be used for 'overhead expenses, including office services, equipment, and supplies.' IOM rents a portion of Murdoch's personal residence to conduct business. IOM pays $6,000 in rent to a company Murdoch owns, which pays $5,855 to a bank for the monthly mortgage. IOM later requests the broker use soft dollars to make the rental payment. Once soft dollars are used for rent, Murdoch raises the rent first to $10,000 then to $15,000 per month. Murdoch's actions are:`,
    options:{A:"appropriate because rental payment on office space is an acceptable use of soft dollars.",B:"appropriate because IOM disclosed it would use soft dollars for overhead expenses.",C:"appropriate because Murdoch may charge market rates for use of his property.",D:"inappropriate."},
    answer:"D",
    explanation:`Standard III(A): Loyalty, Prudence, and Care. Soft dollars must benefit clients. Using client commissions to pay rent on a property that also serves Murdoch's personal use is improper. Even if overhead expenses were an allowable use, IOM's disclosure did not specifically state that soft dollars would be used to pay rent — making the disclosure incomplete. Furthermore, the 150% rent increase once soft dollars fund the payments is simply an attempt to enrich Murdoch at clients' expense. Clients would not know their commissions were funding personal mortgage payments on inflated rent.`,
    source:"Based on a May 2019 US SEC Enforcement Action."
  },
  {
    id:"ec07", category:"Billing & Fees", standard:"I(A)",
    title:"Fraudulent Fee Schedule and Dissociation",
    vignette:`Mandracken, a VP at Slate Brothers Bank (SBS) custody bank, oversees client services. SBS charges custody clients an established rate for SWIFT messages, but this rate is greater than the actual cost. Mandracken recognises this and emails his supervisor: 'the SWIFT fee is not a true pass-through to the client because we tack on a margin.' His supervisor directs him only to reduce the SWIFT rate for new clients and revisit rates for existing clients during contract renewals — leaving historical overcharges unaddressed. To comply with the Code and Standards, Mandracken should:`,
    options:{A:"comply with his duty of loyalty to his employer and implement the corrective procedures as directed by his supervisor.",B:"implement the corrective procedures as directed but report objections to the bank's board of directors.",C:"refuse to participate in any interactions with clients utilising the fee schedule until the bank revises the SWIFT rate for ALL clients to reflect actual out-of-pocket costs.",D:"report SBS's billing practices to the bank's regulator."},
    answer:"C",
    explanation:`Standard I(A): Knowledge of the Law requires members to dissociate from illegal or unethical conduct. The corrective measures directed by the supervisor are inadequate — they address new clients only and do not remedy historical overcharges. Mandracken cannot continue interacting with clients using a fraudulent fee schedule. The minimum required action is C: refuse to participate until all clients are charged correctly. Mandracken may also need to escalate to the board or regulators, but these additional steps do not replace the baseline obligation to dissociate. Mere compliance with inadequate supervisor instructions violates the Standards.`,
    source:"Based on a June 2019 US SEC Enforcement Action."
  },
  {
    id:"ec08", category:"Client Relationships", standard:"III(A), III(E)",
    title:"Confidentiality After Client Death",
    vignette:`Fontaine manages investments for an elderly client, Lafortune. Lafortune passes away and his estate becomes a new client of Fontaine's firm. During the estate administration process, Lafortune's adult children request information about their father's investment accounts, asset values, and transaction history prior to his death. The children are not named as account beneficiaries and have no written authority from the estate administrator. Fontaine should:`,
    options:{A:"provide the account information because the children are the heirs and have a natural right to this information.",B:"decline to provide account information because the client relationship and confidentiality obligations survive the client's death.",C:"provide the account information to the estate administrator only upon receiving a proper legal request.",D:"refer all queries to the firm's compliance department and take no further action."},
    answer:"C",
    explanation:`Standard III(E): Preservation of Confidentiality survives the end of a client relationship, including the client's death. Lafortune's children are not the account beneficiaries and have no authority. Fontaine must protect the estate and act in its interests. Information should only be disclosed to the estate administrator — the proper legal authority — upon a formal request. Providing account details to the children without authorisation would violate both III(E) and III(A) duties to the client (now represented by the estate).`,
    source:"Illustrative case based on CFA Institute Standards guidance."
  },
  {
    id:"ec09", category:"Investments & Trading", standard:"II(A)",
    title:"Mosaic Theory and Information Sources",
    vignette:`Holt is an equity analyst at a large investment management firm. While attending an industry conference, she speaks separately with a company's CFO (who provides only publicly available earnings guidance) and with a supply chain consultant (who shares, from his own research, that industry-wide component shortages are worsening). Neither piece of information alone is material nonpublic information. Combining both sources, Holt concludes that the company will likely miss earnings estimates. She issues a sell recommendation to her firm's portfolio managers. Holt has:`,
    options:{A:"violated Standard II(A) because she combined two sources of information to reach a conclusion not available to the public.",B:"not violated Standard II(A) because both pieces of information were individually non-material or public.",C:"violated Standard III(B) Fair Dealing by issuing the recommendation only to portfolio managers and not all clients simultaneously.",D:"violated Standard V(A) because she lacks a reasonable basis without additional research."},
    answer:"B",
    explanation:`This is the Mosaic Theory. Analysts may combine public information with non-material, non-public information from legitimate sources to reach conclusions that are not available to the general public — and act on those conclusions without violating Standard II(A). The CFO's guidance was public; the consultant's supply chain insights, while non-public, were not 'material' on their own. Holt is free to reach her own analytical conclusions. Her sell recommendation is based on legitimate research and analysis, not on possession of material nonpublic information.`,
    source:"Illustrative case based on CFA Institute Standards guidance on Mosaic Theory."
  },
  {
    id:"ec10", category:"Research", standard:"I(B), V(A)",
    title:"Analyst Independence Under Pressure",
    vignette:`Park is a sell-side equity analyst who covers a technology company that is also an investment banking client of his firm. His research model produces a 'Sell' rating. His firm's investment banking division asks him to change the rating to 'Hold' before publication, arguing that a negative report would damage the client relationship and jeopardise future underwriting business. Park's supervisor suggests that Park is 'being too conservative' in his assumptions. Park believes his assumptions are reasonable and well-supported. Park should:`,
    options:{A:"change the rating to 'Hold' as a compromise — it is less negative than 'Sell' and maintains the client relationship.",B:"maintain the 'Sell' rating and publish the research report with his honest assessment.",C:"withdraw the report entirely to avoid the conflict of interest.",D:"change the rating to 'Hold' but disclose in the report that investment banking has a relationship with the subject company."},
    answer:"B",
    explanation:`Standard I(B): Independence and Objectivity — members must not let commercial relationships compromise their analytical judgments. Standard V(A): Diligence and Reasonable Basis — recommendations must be supported by thorough analysis. Changing a rating due to investment banking pressure is a clear violation of I(B). A disclosure (option D) does not cure the violation if the rating itself is dishonest. Withdrawing the report (option C) avoids the violation but deprives clients of useful information. Park must maintain his 'Sell' rating if that is his honest, well-supported conclusion.`,
    source:"Illustrative case based on CFA Institute guidance on analyst independence."
  },
  {
    id:"ec11", category:"Personal Trading", standard:"VI(B)",
    title:"Front-Running Client Orders",
    vignette:`Martinez is a portfolio manager who identifies an attractive small-cap stock for inclusion in client portfolios. Before placing the client orders — which are large enough to move the stock price — Martinez purchases shares in her personal account. She then places the client orders. The stock price rises after the client orders are filled and Martinez sells her personal shares at a profit. Martinez has:`,
    options:{A:"not violated any Standard because she identified the opportunity through her own research.",B:"violated Standard VI(B): Priority of Transactions by trading for her personal account before client accounts.",C:"violated Standard II(B): Market Manipulation by artificially inflating the stock price.",D:"violated Standard III(A): Loyalty, Prudence, and Care by exposing clients to a higher purchase price."},
    answer:"B",
    explanation:`Standard VI(B): Priority of Transactions — client and employer trades must take priority over personal trades. Martinez front-ran client orders by buying personally before placing client orders. This is a direct violation of VI(B) regardless of how the investment idea was generated. Note: She may ALSO have violated III(A) since clients paid a higher price due to her personal trade moving the price, but VI(B) is the primary and most direct violation. Front-running is one of the most serious violations of the Standards.`,
    source:"Illustrative case based on CFA Institute Standards guidance."
  },
  {
    id:"ec12", category:"Employment Issues", standard:"IV(A)",
    title:"Departing Employee and Client Solicitation",
    vignette:`Chen is a portfolio manager who plans to leave her current employer to start her own investment advisory firm. Before resigning, she copies client contact information and account details from her employer's systems onto a personal device, intending to contact these clients after she leaves. She also begins soliciting two colleagues to join her new firm while still employed. Chen has:`,
    options:{A:"not violated any Standard because she plans to use the information only after she has resigned.",B:"violated Standard IV(A): Loyalty by misappropriating client information and soliciting colleagues while still employed.",C:"acted appropriately because clients have the right to follow their preferred adviser to a new firm.",D:"violated Standard III(E) only, because she is taking confidential client information."},
    answer:"B",
    explanation:`Standard IV(A): Loyalty — while employed, members must not misappropriate employer assets or take actions that harm the employer. Client lists and account information are proprietary employer property. Taking this information before resignation — even intending to use it only afterward — violates IV(A). Soliciting colleagues while still employed also harms the employer. Note that members may, without violating IV(A), inform clients of their impending departure (but not solicit them) and can work on their new firm in their own time without using employer resources or information.`,
    source:"Illustrative case based on CFA Institute Standards guidance."
  },
  {
    id:"ec13", category:"Supervisory Responsibility", standard:"IV(C)",
    title:"Failure to Supervise",
    vignette:`Reynolds is the head of equity trading at a large asset management firm. One of the traders he supervises, Diaz, is discovered to have been executing personal trades ahead of large client block orders — a practice that has been occurring for 18 months. Reynolds had received two prior written warnings from the compliance department that Diaz's personal trading patterns were unusual and warranted review. Reynolds took no action on either warning, stating he was 'too busy' and 'trusted Diaz'. Reynolds:`,
    options:{A:"is not responsible because the violations were committed by Diaz, not Reynolds.",B:"is responsible only if he had direct knowledge of Diaz's trading violations.",C:"violated Standard IV(C): Responsibilities of Supervisors by failing to take prompt action when warned of potential violations.",D:"violated Standard II(A): Material Nonpublic Information as a result of his knowledge of the client block orders."},
    answer:"C",
    explanation:`Standard IV(C): Responsibilities of Supervisors — members must make reasonable efforts to ensure that subordinates comply with laws, regulations, and the Code and Standards. Reynolds received two written warnings that Diaz's trading was suspicious and took no action. This is a direct violation of IV(C). A supervisor does not need to have directly known about the violation to be liable — they are responsible for responding to red flags. Ignorance chosen through inaction ('too busy', 'trust') is not a defence. Reynolds should have placed Diaz under heightened supervision, restricted his trading, or escalated to compliance immediately.`,
    source:"Illustrative case based on CFA Institute guidance on supervisory responsibility."
  },
  {
    id:"ec14", category:"Performance Reporting", standard:"III(D)",
    title:"Cherry-Picked Performance Records",
    vignette:`Silva manages several fixed-income portfolios for institutional clients. When pitching a new institutional prospect, she presents performance data for her three best-performing portfolios over the past three years, all of which significantly outperformed their benchmark. She does not present performance for her other six portfolios, which had mixed results including two that significantly underperformed the same benchmark. Silva:`,
    options:{A:"has not violated any Standard because she accurately presented the performance of the three portfolios shown.",B:"violated Standard III(D): Performance Presentation by presenting incomplete and misleading performance data.",C:"acted appropriately because all investment managers highlight their best work when marketing.",D:"should have presented all nine portfolios but is only in violation if the two underperforming portfolios had the same strategy as the three presented."},
    answer:"B",
    explanation:`Standard III(D): Performance Presentation — members must make reasonable efforts to ensure that performance information presented is fair, accurate, and complete. Selectively presenting only best-performing portfolios creates a misleading picture of the manager's overall capabilities. It is irrelevant that the data shown was accurate for those three portfolios. 'Cherry-picking' the best track record misrepresents overall performance. A proper presentation would include composite performance across all portfolios with a similar strategy, consistent with GIPS principles.`,
    source:"Illustrative case based on CFA Institute Standards guidance."
  },
  {
    id:"ec15", category:"CFA Institute", standard:"VII(A)",
    title:"Exam Integrity Violation",
    vignette:`During the CFA Level II exam, Petrov finishes the morning session early. While waiting for the session to end, he quietly photographs several questions on his exam booklet with a concealed device, intending to review them later to understand where he went wrong. He does not share the photographs with anyone. After the exam, the photographs remain on his personal device unused. Petrov has:`,
    options:{A:"not violated any Standard because he did not share the questions or gain an unfair advantage.",B:"not violated any Standard because his intent was self-improvement, not to compromise exam integrity.",C:"violated Standard VII(A): Conduct as Participants in CFA Institute Programs.",D:"violated Standard I(C): Misrepresentation by attempting to misrepresent his knowledge level."},
    answer:"C",
    explanation:`Standard VII(A): Conduct as Participants in CFA Institute Programs — members must not engage in any conduct that compromises the integrity, validity, or security of CFA Institute programs. Photographing exam questions violates exam confidentiality regardless of intent or subsequent use. Candidates sign a pledge not to reproduce exam content in any form. The act of photographing itself — even without sharing — compromises exam security and violates VII(A). Intent and outcome are irrelevant to this violation.`,
    source:"Illustrative case based on CFA Institute Standards guidance."
  },
  {
    id:"ec16", category:"Disclosures", standard:"VI(A)",
    title:"Undisclosed Referral Fee",
    vignette:`Okonkwo is a financial adviser who recommends clients to a local estate planning law firm. The law firm pays Okonkwo a flat fee of $500 for each client referral that results in a retained engagement. Okonkwo believes these referrals are genuinely in his clients' best interests and the law firm provides quality service. He does not disclose the referral fee arrangement to clients or his employer because he believes it does not affect the quality of his recommendation. Okonkwo has:`,
    options:{A:"not violated any Standard because the referrals are genuinely in his clients' best interests.",B:"not violated any Standard because the fee is paid by the law firm, not deducted from client assets.",C:"violated Standard VI(C): Referral Fees by failing to disclose the referral fee to clients and his employer.",D:"violated Standard III(A): Loyalty, Prudence, and Care by placing the law firm's interests above his clients' interests."},
    answer:"C",
    explanation:`Standard VI(C): Referral Fees — members must disclose to their employer, clients, and prospective clients any compensation received for recommending products or services. The quality of the recommendation is irrelevant to the disclosure obligation. Even if the referrals are genuinely good for clients, the existence of a financial arrangement creates a potential conflict of interest that clients are entitled to know about so they can assess the recommendation objectively. Failure to disclose is a violation regardless of intent.`,
    source:"Illustrative case based on CFA Institute Standards guidance."
  },
  {
    id:"ec17", category:"Outside Activities", standard:"IV(A), I(B)",
    title:"Outside Board Membership and Conflict",
    vignette:`Nakamura is a portfolio manager at a large asset manager. He also serves on the board of directors of a publicly traded technology company — an outside activity his employer is unaware of. While serving on the board, Nakamura learns material non-public information about the company's pending acquisition of a competitor. He does not trade on this information in client portfolios or his personal account. However, he also does not inform his employer about the board membership. Nakamura has:`,
    options:{A:"not violated any Standard because he did not trade on the inside information.",B:"violated Standard IV(A): Loyalty by failing to inform his employer of the outside activity.",C:"violated Standard II(A): Material Nonpublic Information by possessing inside information, regardless of whether he traded.",D:"violated Standards IV(A) and I(B) only."},
    answer:"B",
    explanation:`Standard IV(A): Loyalty requires members to inform their employer of activities that could conflict with their duties or the firm's interests. Serving on a public company board without disclosure creates significant potential conflicts — including receiving material nonpublic information (as occurred here). Nakamura violated IV(A) by not disclosing the board membership. Note: merely possessing MNPI without trading does not violate II(A) — the prohibition is on ACTING on such information. However, IV(A) is violated regardless. Proper procedure would have been to disclose the board membership and have a compliance process to manage the information barrier.`,
    source:"Illustrative case based on CFA Institute Standards guidance."
  },
  {
    id:"ec18", category:"Client Advice", standard:"III(C)",
    title:"Suitability and Changing Client Circumstances",
    vignette:`Reeves manages a balanced portfolio for a client who is 58 years old, planning to retire in 7 years, with moderate risk tolerance. Two years ago, they agreed on a 60% equity / 40% fixed income allocation. The client has not contacted Reeves in 18 months. During that time, the client's equity portfolio appreciated significantly, shifting the allocation to 75% equity / 25% fixed income. Reeves takes no rebalancing action because the client has not complained and equity markets continue to perform well. Reeves has:`,
    options:{A:"acted appropriately because the client has not objected to the drift.",B:"acted appropriately because the strong equity performance benefits the client.",C:"violated Standard III(C): Suitability by failing to manage the portfolio in line with the client's agreed objectives.",D:"violated Standard V(B): Communication with Clients by failing to inform the client of the allocation drift."},
    answer:"C",
    explanation:`Standard III(C): Suitability — members must manage portfolios in line with client objectives and constraints and must reassess and update information regularly. A 75%/25% equity/bond split is materially different from the agreed 60%/40% for a pre-retirement investor with moderate risk tolerance — it exposes the client to more equity risk than agreed. The client's silence and market performance are irrelevant; it is Reeves' responsibility to monitor and rebalance. Failure to act is a violation of III(C). Note: III(V)(B) may also be relevant since the client should be informed of significant portfolio changes.`,
    source:"Illustrative case based on CFA Institute Standards guidance."
  },
  {
    id:"ec19", category:"Research", standard:"I(C), V(B)",
    title:"Misleading Research Report",
    vignette:`Bergmann is a research analyst who publishes a report upgrading a stock from 'Hold' to 'Buy'. The report prominently features the base case valuation showing 35% upside. The report includes a downside scenario in a footnote on page 12 of 14 that shows a 40% loss under bear case assumptions. Bergmann considers the bear case highly unlikely but believes it is material. His firm's compliance department approved the report. Bergmann:`,
    options:{A:"has met his obligations because the bear case scenario is disclosed in the report.",B:"violated Standard I(C): Misrepresentation by burying material risk information in a footnote.",C:"has acted appropriately because both scenarios are included and compliance approved the report.",D:"violated Standard III(B): Fair Dealing by providing different information to different clients."},
    answer:"B",
    explanation:`Standard I(C): Misrepresentation and Standard V(B): Communication with Clients — members must not make misrepresentations and must distinguish between fact and opinion and communicate material risks effectively. Compliance approval does not create an ethical safe harbour. While the bear case is technically disclosed, burying a material 40% downside scenario in a footnote on page 12 while prominently featuring the 35% upside creates a misleading overall impression. Material information must be communicated in a way that clients can actually identify and evaluate it, not buried where it is effectively hidden.`,
    source:"Illustrative case based on CFA Institute Standards guidance."
  },
  {
    id:"ec20", category:"Employment Issues", standard:"IV(B)",
    title:"Additional Compensation Without Disclosure",
    vignette:`Watanabe is a portfolio manager whose investment performance has been excellent. A wealthy client offers to pay Watanabe a personal bonus of $50,000 at year-end if the portfolio outperforms its benchmark by more than 3% for the year. Watanabe intends to accept this arrangement. He has not disclosed it to his employer. Watanabe:`,
    options:{A:"may accept the arrangement because it aligns his incentives with the client's interests.",B:"may accept the arrangement as long as he discloses it to his employer after the year-end payment.",C:"must obtain written consent from all parties — including his employer — before entering into this arrangement.",D:"should decline the arrangement as any personal compensation from clients is prohibited by the Standards."},
    answer:"C",
    explanation:`Standard IV(B): Additional Compensation Arrangements — members must not accept any benefit that competes with or could create a conflict of interest with their employer's interests unless they obtain WRITTEN consent from ALL parties involved BEFORE entering the arrangement. The arrangement must be disclosed and approved in advance — not after payment. The fact that the incentive aligns with the client's interests does not exempt it from disclosure. Additional compensation from clients can create perverse incentives (e.g. excessive risk-taking to hit the performance threshold) that could harm other clients or the employer.`,
    source:"Illustrative case based on CFA Institute Standards guidance."
  },
];


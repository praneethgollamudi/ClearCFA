const LOS_L2 = {
  "Ethics": {weight: 10, modules: {
    "Code & Standards Application": [
      "evaluate professional conduct and identify violations of the CFA Institute Code of Ethics and Standards of Professional Conduct in complex multi-party scenarios",
      "distinguish between conduct that violates Standard II-A (Material Nonpublic Information) and legitimate mosaic theory research",
      "apply Standard III-C (Suitability) to institutional clients including updating IPS when client circumstances change",
      "evaluate conflicts of interest under Standard VI-A and determine whether disclosure alone is sufficient or whether recusal is required",
      "demonstrate correct application of Standard V-A (Diligence and Reasonable Basis) when relying on quantitative models and third-party research",
      "apply Standard I-B (Independence and Objectivity) in research analyst contexts involving investment banking relationships and issuer-paid research"
    ],
    "Research Objectivity Standards": [
      "describe the CFA Institute Research Objectivity Standards and their purpose in promoting unbiased investment research",
      "identify policies required under the Research Objectivity Standards including coverage initiation, rating systems, and compensation structures",
      "evaluate whether a firm's research practices comply with Research Objectivity Standards in scenarios involving conflicts between research and investment banking",
      "distinguish between required and recommended policies under the Research Objectivity Standards",
      "explain how the Research Objectivity Standards address analyst compensation, personal trading, and quiet periods around IPOs"
    ],
    "Asset Manager Code": [
      "describe the six components of the Asset Manager Code of Professional Conduct",
      "explain the loyalty, care, and acting in good faith duties owed to clients under the Asset Manager Code",
      "evaluate whether an asset management firm's practices comply with the Asset Manager Code in scenarios involving performance reporting, disclosure, and trading",
      "distinguish between the Asset Manager Code (firm-level) and the CFA Standards (individual-level) and explain how they interact",
      "identify required disclosures to clients under the Asset Manager Code including conflicts of interest, fee structures, and risk exposures",
      "explain the risk management, compliance, and support provisions of the Asset Manager Code"
    ]
  }},
  "Quantitative Methods": {weight: 5, modules: {
    "Multiple Regression & Issues": [
      "formulate and interpret a multiple regression model including coefficients, t-statistics, F-statistic, and R²",
      "explain the assumptions of multiple regression and describe the consequences of violating each assumption",
      "identify and correct for heteroskedasticity using White-corrected standard errors and describe how it affects hypothesis tests",
      "identify and correct for serial correlation using Newey-West standard errors and the Durbin-Watson statistic",
      "identify multicollinearity using variance inflation factors and condition numbers and describe its effects on regression estimates",
      "evaluate model specification errors including omitted variables, inappropriate functional form, and data mining bias"
    ],
    "Time-Series Analysis": [
      "describe the structure of autoregressive (AR) models and calculate one-step-ahead forecasts",
      "explain the mean-reversion level of an AR model and determine whether an AR model is covariance stationary",
      "test for unit roots using the Dickey-Fuller test and explain why non-stationarity causes spurious regressions",
      "describe cointegration and explain how error-correction models exploit cointegrated relationships",
      "explain seasonality in time series and describe how to detect and correct for it",
      "compare AR, MA, and ARMA models and select the appropriate model using the AIC and BIC criteria"
    ],
    "Machine Learning": [
      "explain the differences between supervised, unsupervised, and reinforcement learning methods and provide investment applications of each",
      "describe the bias-variance trade-off and explain overfitting, underfitting, and regularization techniques (LASSO, ridge)",
      "explain cross-validation and its role in preventing overfitting and selecting hyperparameters",
      "describe k-means clustering, principal component analysis, and their applications in portfolio construction and risk decomposition",
      "explain neural networks and deep learning and identify their limitations in financial applications including interpretability and data requirements"
    ]
  }},
  "Economics": {weight: 5, modules: {
    "Currency Exchange Rates": [
      "calculate and interpret currency cross-rates and identify arbitrage opportunities from triangular arbitrage",
      "explain covered interest rate parity and calculate the forward exchange rate given spot rate and interest rates in two countries",
      "explain uncovered interest rate parity and distinguish it from covered interest rate parity in terms of risk and empirical validity",
      "explain purchasing power parity (absolute and relative) and evaluate whether currencies are overvalued or undervalued relative to PPP",
      "describe the international Fisher effect and its relationship to uncovered interest rate parity",
      "explain the balance of payments approach and the asset market approach to exchange rate determination"
    ],
    "Economic Growth": [
      "explain the sources of economic growth including labor, capital, and total factor productivity",
      "describe the neoclassical (Solow) growth model including steady state, convergence, and the role of saving rates and technology",
      "explain endogenous growth theory and contrast it with neoclassical theory regarding the long-run role of capital accumulation and policy",
      "evaluate the sustainability of a country's growth rate given labor force growth and capital investment trends",
      "describe factors that affect long-run economic growth including human capital, infrastructure, and institutional quality"
    ],
    "Regulation & Market Structure": [
      "explain the rationale for and tools of government regulation in financial markets",
      "describe regulatory capture and explain how it can undermine the effectiveness of financial regulation",
      "compare the costs and benefits of different regulatory approaches including principles-based vs rules-based regulation",
      "explain how market structure (industry concentration, barriers to entry) affects pricing power and profitability",
      "analyze the effects of different types of regulation on market competition, innovation, and consumer welfare"
    ]
  }},
  "Financial Statement Analysis": {weight: 10, modules: {
    "Intercorporate Investments": [
      "describe the classification and measurement of intercorporate investments under IFRS and US GAAP including held-to-maturity, available-for-sale, trading, and fair value through OCI",
      "apply the equity method to account for investments in associates and calculate equity income, carrying value, and the investor's share of earnings",
      "explain when consolidation is required and describe the acquisition method including calculation of goodwill and non-controlling interest",
      "compare the financial statement effects of the equity method versus full consolidation on revenue, assets, leverage, and profitability ratios",
      "evaluate the impact of impairment of goodwill and equity-method investments on financial statements",
      "describe the accounting for joint ventures under IFRS (equity method) and US GAAP and explain differences in reporting"
    ],
    "Employee Compensation": [
      "explain defined contribution (DC) and defined benefit (DB) pension plans and the financial reporting implications for each",
      "calculate pension expense, plan assets, projected benefit obligation (PBO), and funded status under IFRS and US GAAP",
      "explain the components of periodic pension cost including service cost, interest cost, expected return on assets, and actuarial gains/losses",
      "describe how IFRS and US GAAP differ in recognizing actuarial gains and losses (OCI corridor vs immediate recognition)",
      "evaluate the impact of key actuarial assumptions (discount rate, expected return on assets, salary growth) on pension expense and funded status",
      "explain stock-based compensation including stock options and restricted stock and describe the financial reporting under IFRS and US GAAP"
    ],
    "Multinational Operations": [
      "distinguish between the functional currency, local currency, and presentation currency and explain how each affects translation",
      "apply the current rate method and the temporal method of foreign currency translation and identify when each is appropriate",
      "calculate the cumulative translation adjustment (CTA) and explain how it arises and where it appears in financial statements",
      "evaluate the impact of exchange rate movements on translated financial statements under current rate vs temporal methods",
      "explain transaction exposure versus translation exposure and describe how companies manage each",
      "describe the impact of hyperinflationary accounting on multinational financial statements under IFRS and US GAAP"
    ],
    "Financial Institutions Analysis": [
      "describe the unique features of financial institution balance sheets including leverage, liquidity, and asset quality considerations",
      "explain key regulatory ratios for banks including Tier 1 capital ratio, leverage ratio, and liquidity coverage ratio (LCR)",
      "analyze bank performance using net interest margin, efficiency ratio, return on assets, and return on equity",
      "evaluate credit risk for banks using non-performing loan ratios, loan loss provision coverage, and allowance for credit losses",
      "describe the business models of insurance companies and the metrics used to evaluate their performance including combined ratio and reserve adequacy"
    ],
    "Quality of Earnings": [
      "describe the spectrum of financial reporting quality from GAAP-compliant high-quality earnings to fraudulent misrepresentation",
      "identify accrual-based and real earnings management techniques and explain how each distorts reported earnings",
      "calculate accruals ratios and interpret the relationship between high accruals and low earnings quality",
      "identify red flags in financial reports including aggressive revenue recognition, unusual reserve changes, and unexplained ratio movements",
      "evaluate the sustainability and predictability of reported earnings by distinguishing recurring from non-recurring items",
      "explain how management can use discretionary accounting choices (depreciation method, expense capitalization, provision levels) to influence reported results"
    ]
  }},
  "Corporate Issuers": {weight: 5, modules: {
    "Capital Structure": [
      "explain the Modigliani-Miller propositions with and without taxes and their implications for optimal capital structure",
      "calculate the value of a levered firm using the tax shield benefit and explain the impact of financial distress costs",
      "describe the trade-off theory of capital structure and identify the optimal debt level where marginal tax benefit equals marginal distress cost",
      "explain the pecking order theory and signaling effects of capital structure decisions",
      "evaluate how agency costs of debt (asset substitution, underinvestment) and agency costs of equity affect capital structure",
      "calculate the weighted average cost of capital (WACC) and describe how it changes with leverage under MM assumptions"
    ],
    "Dividends & Share Repurchases": [
      "describe the dividend irrelevance theory and the conditions under which it holds",
      "explain the clientele effect and how different investor tax situations create preferences for dividends versus capital gains",
      "evaluate the information content (signaling) of dividend initiations, increases, decreases, and omissions",
      "compare the financial statement effects of cash dividends, stock dividends, stock splits, and share repurchases",
      "analyze share repurchases as an alternative to dividends and evaluate when each is preferable from a shareholder perspective",
      "calculate the impact of a share repurchase on EPS, book value per share, and stock price under different assumptions"
    ],
    "Corporate Governance & ESG": [
      "describe the principal-agent problem and explain how corporate governance mechanisms mitigate it",
      "evaluate board composition, structure, and independence as indicators of governance quality",
      "explain shareholder rights including voting mechanisms (proxy, cumulative voting, dual-class shares) and their impact on governance",
      "describe ESG factors and explain how they can affect risk, return, and the cost of capital for corporate issuers",
      "evaluate shareholder engagement and activist investor strategies as corporate governance mechanisms",
      "explain the role of executive compensation structure in aligning management incentives with shareholder interests"
    ]
  }},
  "Equity": {weight: 15, modules: {
    "Equity Valuation Approaches": [
      "describe the major categories of equity valuation models and identify the appropriate model for a given situation",
      "explain the going-concern value versus liquidation value and describe when each is relevant",
      "evaluate the strengths and limitations of income-based, asset-based, and market-based valuation approaches",
      "explain the concept of intrinsic value and describe how analysts use it relative to market price to generate buy/sell recommendations",
      "describe sum-of-the-parts valuation and conglomerate discount and apply them to multi-segment companies"
    ],
    "Return Concepts": [
      "explain the equity risk premium (ERP) and describe methods for estimating it including historical, survey, and implied approaches",
      "calculate the required return on equity using the CAPM and multifactor models",
      "describe the build-up method for estimating required return for non-publicly traded companies",
      "explain the concept of the weighted average cost of capital and calculate it given capital structure and component costs",
      "evaluate the strengths and limitations of different methods for estimating the equity risk premium and required return"
    ],
    "Industry & Company Analysis": [
      "explain the role of industry analysis in equity valuation and describe the top-down, bottom-up, and hybrid approaches",
      "apply Porter's Five Forces framework to assess industry competitive intensity and long-run profitability",
      "describe the industry life cycle and explain how the stage affects appropriate valuation multiples and growth assumptions",
      "evaluate a company's competitive position using barriers to entry, pricing power, switching costs, and economies of scale",
      "analyze revenue drivers, cost structure, and operating leverage to forecast company earnings",
      "evaluate the impact of competitive dynamics and disruptive innovation on industry attractiveness"
    ],
    "Discounted Dividend Valuation": [
      "calculate the intrinsic value of a stock using the Gordon Growth Model (GGM) and identify the assumptions required",
      "calculate stock value using the H-model for a company with an initially high growth rate declining to a stable rate",
      "apply the two-stage and three-stage dividend discount models and identify the appropriate model for different company types",
      "calculate the implied required return or implied growth rate from current stock price using the GGM",
      "explain the PRAT model and use it to calculate sustainable growth rate",
      "evaluate the strengths and limitations of DDM models including sensitivity to assumptions and applicability across company types"
    ],
    "Free Cash Flow Valuation": [
      "distinguish between FCFF and FCFE and calculate each from net income and from operating cash flow",
      "explain the relationship between FCFF, FCFE, and dividends and identify which to use in different valuation contexts",
      "calculate firm value using FCFF discounted at WACC and equity value using FCFE discounted at the required return on equity",
      "calculate FCFF and FCFE for companies with different capital structures and explain how changes in leverage affect FCFE",
      "evaluate single-stage, two-stage, and three-stage FCFF/FCFE models and select the appropriate model given company characteristics",
      "identify the limitations of free cash flow models including sensitivity to terminal value assumptions"
    ],
    "Price Multiples": [
      "calculate and interpret trailing and forward P/E ratios and justify the P/E multiple using the Gordon Growth Model",
      "explain the factors that influence justified P/E including growth, payout ratio, and required return",
      "calculate and interpret P/B, P/S, P/CF, and EV/EBITDA multiples and explain the advantages and disadvantages of each",
      "evaluate the use of enterprise value multiples versus equity multiples in comparing companies with different capital structures",
      "compare a stock's price multiple to peers and historical levels and identify potential mis-pricing",
      "describe the momentum and earnings surprise anomalies and their relationship to forward P/E ratios"
    ],
    "Residual Income": [
      "calculate residual income as net income minus an equity charge and explain its relationship to economic profit",
      "derive the residual income model from the dividend discount model and apply the RI model to value equity",
      "calculate Economic Value Added (EVA) and explain how it differs from accounting earnings as a performance measure",
      "describe Market Value Added (MVA) and its relationship to EVA and firm value",
      "evaluate the strengths and limitations of residual income models versus DDM and FCF models",
      "explain the persistence factor for residual income and apply the continuing RI model for terminal value"
    ],
    "Private Company Valuation": [
      "describe the key differences in valuing private versus publicly traded companies including lack of marketability, control, and information",
      "explain the discount for lack of marketability (DLOM) and discount for lack of control (DLOC) and methods for estimating each",
      "describe the control premium and explain when it is applicable in private company acquisitions",
      "apply income-based (DCF), market-based (guideline companies and transactions), and asset-based approaches to private company valuation",
      "evaluate company-specific risk adjustments to the discount rate for private companies using the build-up method",
      "describe the stages of venture capital and private equity financing and explain how valuation differs at each stage"
    ]
  }},
  "Fixed Income": {weight: 15, modules: {
    "Term Structure & Interest Rate Dynamics": [
      "describe the relationships among spot rates, forward rates, and par rates and derive one from another",
      "explain the theories of the yield curve including pure expectations, liquidity preference, preferred habitat, and market segmentation",
      "calculate and interpret forward rates from spot rates and explain their use in bond valuation",
      "describe key rate durations and explain how they differ from effective duration in measuring non-parallel yield curve shifts",
      "evaluate the impact of shifts, twists, and butterfly changes in the yield curve on bond portfolio value"
    ],
    "Arbitrage-Free Valuation": [
      "explain the arbitrage-free valuation framework and its relationship to law of one price",
      "construct and calibrate a binomial interest rate tree to value option-free and option-embedded bonds",
      "calculate the value of a bond using a binomial interest rate tree and verify it is arbitrage-free",
      "explain the concept of option-adjusted spread (OAS) and calculate it using a binomial tree",
      "describe Monte Carlo simulation as a valuation method for path-dependent securities including MBS"
    ],
    "Bonds with Embedded Options": [
      "explain how embedded call and put options affect the value of a bond and calculate the option value",
      "calculate effective duration and effective convexity for bonds with embedded options using binomial trees",
      "explain one-sided durations, key rate durations, and their use in analyzing bonds with embedded options",
      "describe callable, putable, convertible, and floating-rate bonds and explain how each option affects yield and risk",
      "evaluate the impact of interest rate volatility on the value of embedded options and option-adjusted spread",
      "compare and contrast OAS for callable, putable, and option-free bonds and explain what a negative OAS implies"
    ],
    "Credit Analysis Models": [
      "describe structural models of credit risk and explain how equity value and asset volatility determine probability of default",
      "describe reduced-form models of credit risk and contrast them with structural models in terms of inputs and applications",
      "calculate the expected loss on a bond given probability of default, loss given default, and recovery rate",
      "explain credit migration risk and describe the use of transition matrices in credit risk assessment",
      "explain credit value at risk (CVaR) and describe how credit risk is incorporated into bond portfolio management",
      "evaluate the relative merits of structural versus reduced-form models for different applications"
    ],
    "Credit Default Swaps": [
      "describe the mechanics of a credit default swap including the roles of protection buyer, protection seller, and reference entity",
      "explain CDS spreads and the CDS-bond basis and interpret deviations from theoretical CDS spread values",
      "calculate the value of a CDS position given changes in credit spreads and explain settlement (physical vs cash)",
      "describe index CDS, first-to-default baskets, and nth-to-default baskets and their applications in credit portfolio management",
      "explain how CDS can be used to express credit views, hedge credit risk, and exploit basis trades"
    ],
    "Mortgage-Backed Securities": [
      "describe prepayment risk and distinguish between contraction risk and extension risk in MBS",
      "explain the PSA prepayment benchmark and calculate projected prepayments given a PSA speed",
      "describe the structure and cash flows of CMO tranches including sequential-pay, PAC, support, and Z-tranches",
      "calculate weighted average life (WAL) of an MBS and explain how it differs from stated maturity and duration",
      "evaluate the impact of interest rate changes on MBS prepayments, price, and negative convexity",
      "describe commercial mortgage-backed securities (CMBS) and explain how they differ from residential MBS in structure and risk"
    ]
  }},
  "Derivatives": {weight: 10, modules: {
    "Forward Commitments Pricing & Valuation": [
      "explain the cost-of-carry model and calculate the no-arbitrage forward price for equities, currencies, and bonds",
      "calculate the value of a forward contract at initiation, during the contract period, and at expiration",
      "calculate the no-arbitrage forward rate for a forward rate agreement (FRA) and calculate the payoff at settlement",
      "explain how futures differ from forwards in terms of marking to market, credit risk, and liquidity and explain why futures prices and forward prices may differ",
      "calculate the value of currency forwards using covered interest rate parity and identify arbitrage opportunities",
      "explain the pricing of equity forwards with dividends and bond forwards with coupon payments"
    ],
    "Valuation of Contingent Claims": [
      "explain the assumptions and inputs of the Black-Scholes-Merton (BSM) model and calculate European option prices",
      "calculate and interpret the five option Greeks: delta, gamma, vega, theta, and rho and explain their use in risk management",
      "explain delta hedging and describe why a delta-hedged portfolio must be continuously rebalanced (gamma risk)",
      "apply put-call parity to identify and exploit arbitrage opportunities and to value puts from calls",
      "calculate the value of interest rate options (caps, floors, caplets, floorlets) using the Black model",
      "describe swaptions and explain their valuation using the Black model including the distinction between payer and receiver swaptions"
    ]
  }},
  "Alternative Investments": {weight: 10, modules: {
    "Private Equity Valuation": [
      "describe the stages of private equity investment and explain the J-curve effect on PE fund returns",
      "calculate IRR and multiple on invested capital (MOIC) for private equity investments and compare NAV-based and market-based approaches",
      "apply DCF, comparable company, and LBO analysis to estimate private equity portfolio company values",
      "explain the leveraged buyout model and identify the key value drivers including entry multiple, exit multiple, leverage, and operational improvement",
      "calculate distributions to limited partners and general partners under a waterfall structure with carried interest and hurdle rate",
      "describe exit strategies for PE investments including IPO, strategic sale, secondary sale, and recapitalization"
    ],
    "Commodities": [
      "explain the components of commodity futures returns including spot return, roll yield, and collateral yield",
      "describe the term structure of commodity futures (backwardation and contango) and explain the theory of normal backwardation",
      "calculate roll yield for commodity futures positions in both backwardated and contangoed markets",
      "explain the storage costs, convenience yield, and cost-of-carry model for commodity pricing",
      "evaluate the diversification benefits of commodity investments in a portfolio context including their relationship to inflation",
      "describe the major commodity sectors and the factors that drive supply and demand for each"
    ]
  }},
  "Portfolio Management": {weight: 10, modules: {
    "Multifactor Models": [
      "describe macroeconomic, fundamental, and statistical multifactor models and the differences in their construction and use",
      "calculate the expected return and factor exposures (betas) of a portfolio using a multifactor model",
      "explain the Fama-French three-factor model and identify the market, size (SMB), and value (HML) factors",
      "construct a factor-mimicking portfolio and explain its use in hedging and arbitrage pricing",
      "evaluate active factor risk versus active specific risk and use the information ratio to assess active management efficiency",
      "explain the arbitrage pricing theory (APT) and compare it to the CAPM in terms of assumptions and applications"
    ],
    "Active Portfolio Management": [
      "explain the Fundamental Law of Active Management and describe the roles of the information ratio, information coefficient, and breadth",
      "calculate the information ratio (IR) and explain its relationship to the Sharpe ratio of an active versus passive portfolio",
      "apply the Grinold-Kahn formula (IR = IC × √BR) and identify the limitations of the fundamental law",
      "describe the active return, active risk (tracking error), and optimal level of active risk for a portfolio given investor constraints",
      "explain how constraints such as long-only and benchmark-relative risk limits affect optimal portfolio construction",
      "evaluate the trade-off between breadth and depth of manager research in constructing a high-IR portfolio"
    ],
    "Economics & Investment Markets": [
      "describe the intertemporal rate of substitution and explain how it links economic conditions to required returns on risky assets",
      "explain how the business cycle affects the risk premiums required on different asset classes including equities, bonds, and credit",
      "describe the Taylor rule and explain how central bank policy responds to output gaps and inflation deviations",
      "evaluate how changes in expected inflation, real interest rates, and credit spreads affect equity and fixed income valuations",
      "explain how investor risk aversion and the consumption-wealth ratio affect equilibrium risk premiums",
      "describe the concept of a risk premium puzzle and evaluate the empirical evidence on equity and credit risk premiums"
    ]
  }}
};

const MISCONCEPTIONS_L2 = {
  "Ethics": [
    "assuming that disclosure of a conflict of interest fully eliminates the conflict and no further action (such as recusal) is required",
    "applying Standard I-A (Knowledge of the Law) by following the more permissive of local law vs CFA Standards rather than the more restrictive",
    "confusing the Asset Manager Code (firm-level voluntary compliance) with the CFA Standards (individual-level mandatory conduct)",
    "believing that mosaic theory permits trading on material nonpublic information so long as some public information is also used",
    "treating the Research Objectivity Standards as mandatory for all CFA charterholders rather than voluntary firm-level standards"
  ],
  "Quantitative Methods": [
    "concluding that heteroskedasticity biases regression coefficients when it actually only inflates or deflates standard errors, making t-tests unreliable without affecting point estimates",
    "using the Durbin-Watson statistic to test for multicollinearity rather than serial correlation, or interpreting DW near 2 as evidence of no autocorrelation in any form",
    "assuming a time series is stationary simply because it lacks a visible trend, when a unit root test (Dickey-Fuller) is required to confirm",
    "applying a standard OLS forecast to a cointegrated pair without an error-correction term, producing biased dynamic predictions",
    "confusing the information coefficient (IC) in machine learning classification accuracy with the Pearson correlation used in the Fundamental Law of Active Management"
  ],
  "Economics": [
    "confusing covered interest rate parity (no-arbitrage, locked-in forward rate) with uncovered interest rate parity (expectation-based, risky) and using covered IRP to predict future spot rates",
    "applying relative PPP to short-run exchange rate forecasting when PPP is only a reasonable predictor over very long horizons",
    "concluding that a current account deficit is always unsustainable, ignoring that it can be financed by productive capital inflows and remain sustainable indefinitely",
    "assuming that in the Solow model, higher saving rates permanently increase a country's long-run growth rate, when they only raise the steady-state level of output per capita",
    "treating endogenous growth theory as predicting convergence between rich and poor countries when it actually predicts persistent divergence without technology transfer"
  ],
  "Financial Statement Analysis": [
    "applying full consolidation to an equity-method investment, inflating revenue and assets and understating return on assets for a minority-interest investment",
    "using the pension funded status reported on the balance sheet as the total pension expense on the income statement, confusing a stock measure with a flow measure",
    "applying the current rate method to translate a subsidiary whose functional currency is the local currency when the subsidiary's operations are primarily conducted in the parent's currency (requiring the temporal method)",
    "concluding that high accruals indicate fraudulent reporting rather than aggressive but GAAP-compliant accounting choices that may still be legal",
    "treating all goodwill impairment charges as non-recurring adjustments to core earnings without first evaluating whether they reflect a permanent loss of competitive position"
  ],
  "Corporate Issuers": [
    "applying MM Proposition I (with taxes) to conclude that maximum leverage is always optimal, ignoring financial distress costs that eventually exceed the tax shield at high debt levels",
    "assuming that share repurchases always increase stock price, when under MM in a perfect market a buyback and a dividend are equivalent in terms of shareholder wealth",
    "interpreting a dividend cut as necessarily negative signaling when it may reflect a shift to a higher-NPV reinvestment opportunity (the 'new projects' explanation)",
    "confusing the cost of debt used in WACC (after-tax rate on new borrowing) with the coupon rate on existing debt or the book yield",
    "treating dual-class share structures as automatically bad governance without evaluating whether founder control enables long-horizon value creation"
  ],
  "Equity": [
    "using a single-stage Gordon Growth Model for a company whose near-term growth rate exceeds its required return, producing a negative or meaningless value",
    "confusing the trailing P/E (based on reported EPS) with the justified P/E (derived from GGM fundamentals) and misinterpreting which is appropriate for relative valuation",
    "applying EV/EBITDA without adjusting for differences in capital intensity, depreciation policy, and lease capitalization across comparables",
    "treating FCFE as simply net income minus CapEx, omitting changes in net working capital and the net borrowing term",
    "applying a DLOM to a controlling interest in a private company when the discount for lack of marketability applies only to minority interests"
  ],
  "Fixed Income": [
    "interpreting a negative OAS on a callable bond as indicating the bond is overpriced, when a negative OAS signals the model spread is negative — a true negative OAS implies the bond trades richer than the benchmark even after removing optionality",
    "computing effective duration for a callable bond the same way as modified duration, ignoring that effective duration requires option-adjusted price changes from the binomial tree",
    "assuming that all CMO tranches have lower prepayment risk than the underlying mortgage pool, when support tranches absorb prepayment variation and carry more risk than the pool",
    "confusing the CDS spread (periodic coupon paid for protection) with the credit spread on the reference bond, ignoring basis differences from accrued interest, cheapest-to-deliver, and market segmentation",
    "treating a PSA speed of 100% as 100% prepayment rather than as the standard prepayment benchmark (0.2% CPR in month 1, rising to 6% CPR by month 30)"
  ],
  "Derivatives": [
    "confusing the forward price (no-arbitrage delivery price set at initiation) with the forward value (mark-to-market gain/loss during the contract's life, which is zero at initiation)",
    "applying Black-Scholes delta as the hedge ratio without recognizing that delta changes as the underlying moves (gamma risk), requiring continuous rebalancing",
    "calculating FRA payoff without discounting back from the settlement date to the payment date, or discounting at the wrong rate",
    "treating a payer swaption as equivalent to a put on a bond when it is actually a call on interest rates (the right to pay fixed, benefit from rising rates)",
    "confusing vega (sensitivity to volatility) with gamma (sensitivity of delta to the underlying price) and misidentifying which Greek dominates for at-the-money near-expiry options"
  ],
  "Alternative Investments": [
    "calculating PE IRR using committed capital rather than invested capital, overstating the IRR by including periods when capital was not yet deployed",
    "treating contango in commodity futures as always generating a negative roll yield, without recognizing that roll yield depends on where along the term structure you roll, not just the overall slope",
    "confusing the J-curve for PE funds (negative early returns as fees exceed gains) with the J-curve in international trade (short-run current account worsening after depreciation)",
    "applying DLOM and DLOC additively to a private company minority interest without recognizing that the two discounts should be applied sequentially (control value × (1−DLOC) × (1−DLOM))",
    "using a hurdle rate net of fees to evaluate PE performance when the hurdle rate in most LPAs is applied gross of management fees but net of fund expenses"
  ],
  "Portfolio Management": [
    "treating the information ratio as purely a function of skill (IC) and ignoring that breadth (number of independent bets per year) equally determines the fundamental law result",
    "conflating the information coefficient (IC) with the hit rate (percent of correct calls), when IC measures rank correlation between forecast and outcome, not binary accuracy",
    "applying the Fama-French SMB and HML factors as risk factors that require compensation without distinguishing whether size and value premiums reflect systematic risk or mispricing",
    "treating active factor risk and active specific (idiosyncratic) risk as additive when total active variance equals the sum of squared active factor exposures times factor variances plus specific variance",
    "assuming that adding more independent strategies always increases the IR proportionally, ignoring that constraints (long-only, turnover limits) reduce effective breadth below the theoretical maximum"
  ]
};

const FORMULAS_L2 = {
  "Quantitative Methods": [
    {name:"Multiple regression fitted value", f:"Ŷᵢ = b₀ + b₁X₁ᵢ + b₂X₂ᵢ + … + bₖXₖᵢ"},
    {name:"F-statistic (overall regression)", f:"F = (RSS/k) / (SSE/(n−k−1))  where RSS=explained, SSE=residual"},
    {name:"t-stat for regression coefficient", f:"t = (b̂ⱼ − bⱼ) / s(b̂ⱼ),  df = n − k − 1"},
    {name:"Variance Inflation Factor", f:"VIFⱼ = 1 / (1 − R²ⱼ),  VIF > 5 = concern, > 10 = severe"},
    {name:"Durbin-Watson statistic", f:"DW = Σ(eₜ − eₜ₋₁)² / Σeₜ²  ≈  2(1 − r̂),  DW ≈ 2 = no autocorrelation"},
    {name:"AR(1) model", f:"Yₜ = b₀ + b₁Yₜ₋₁ + εₜ"},
    {name:"AR(1) mean-reversion level", f:"X̄ = b₀ / (1 − b₁)"},
    {name:"Covariance-stationary condition (AR)", f:"|b₁| < 1  (AR model is stationary iff all roots outside unit circle)"},
    {name:"Dickey-Fuller unit root test", f:"ΔYₜ = b₀ + γYₜ₋₁ + εₜ;  H₀: γ = 0 (unit root)  vs  H₁: γ < 0 (stationary)"},
    {name:"Information Ratio (IR)", f:"IR = IC × √BR  (IC = information coefficient, BR = breadth/year)"},
    {name:"Optimal active weight (Grinold)", f:"wᵢ* = (ICᵢ × σᵢ) / σ_active  (scale by forecast skill and volatility)"}
  ],
  "Economics": [
    {name:"Covered Interest Rate Parity", f:"F/S = (1 + r_d) / (1 + r_f)  ⟹  F = S × (1 + r_d)/(1 + r_f)"},
    {name:"Uncovered Interest Rate Parity", f:"E(%ΔS) = r_d − r_f  (expected domestic appreciation equals interest differential)"},
    {name:"Relative PPP", f:"%ΔS_{d/f} ≈ π_d − π_f  (% change in spot = inflation differential)"},
    {name:"International Fisher Effect", f:"r_d − r_f ≈ π_d − π_f  (real rates equalize internationally)"},
    {name:"Real exchange rate", f:"q = S_{d/f} × (P_f / P_d)  (how many domestic goods per unit foreign good)"},
    {name:"Forward premium/discount", f:"F/S − 1 ≈ r_d − r_f  (annualized)"},
    {name:"Solow steady-state output", f:"y* = (s/δ)^(α/(1−α)) × A^(1/(1−α))  where s=saving rate, δ=depreciation, α=capital share"}
  ],
  "Financial Statement Analysis": [
    {name:"Equity method carrying value", f:"Carrying Value = Cost + Investor Share × Net Income − Dividends Received"},
    {name:"Goodwill (acquisition method)", f:"Goodwill = Purchase Price − Fair Value of Net Identifiable Assets"},
    {name:"Non-controlling interest (NCI)", f:"NCI = NCI% × Fair Value of Subsidiary Net Assets"},
    {name:"Pension expense (components)", f:"Pension Expense = Service Cost + Interest Cost − Expected Return on Assets ± Amortization"},
    {name:"PBO funded status", f:"Funded Status = Fair Value of Plan Assets − PBO  (positive = overfunded)"},
    {name:"Accruals ratio (balance sheet)", f:"Accruals Ratio = (NOA_end − NOA_beg) / [(NOA_end + NOA_beg)/2]"},
    {name:"Accruals ratio (cash flow)", f:"Accruals Ratio = (NI − CFO − CFI) / [(NOA_end + NOA_beg)/2]"},
    {name:"Current rate translation (CTA)", f:"CTA = Assets translated at current rate − Liabilities at current rate − Equity at historical rate"}
  ],
  "Corporate Issuers": [
    {name:"MM Firm Value with taxes", f:"V_L = V_U + T_c × D  (levered = unlevered + PV of tax shield)"},
    {name:"MM Proposition II (with taxes)", f:"r_e = r_0 + (r_0 − r_d)(1 − T_c)(D/E)"},
    {name:"WACC (after-tax)", f:"WACC = w_d × r_d(1−T) + w_e × r_e + w_ps × r_ps"},
    {name:"EPS impact of buyback", f:"New EPS = (NI − Dividends on retired shares) / (Shares_0 − Shares repurchased)"},
    {name:"Sustainable growth rate", f:"g = ROE × (1 − Payout Ratio)  =  ROE × b"}
  ],
  "Equity": [
    {name:"Gordon Growth Model (GGM)", f:"V₀ = D₁ / (r − g)  =  D₀(1+g) / (r − g)"},
    {name:"H-Model", f:"V₀ = D₀ × [(1+g_L) + H(g_S − g_L)] / (r − g_L)  where H = half-life of high growth"},
    {name:"Justified leading P/E", f:"P₀/E₁ = (1 − b) / (r − g)  =  Payout Ratio / (r − g)"},
    {name:"Justified trailing P/E", f:"P₀/E₀ = (1 − b)(1 + g) / (r − g)"},
    {name:"FCFF from net income", f:"FCFF = NI + NCC + Int(1−T) − FCInv − WCInv"},
    {name:"FCFE from FCFF", f:"FCFE = FCFF − Int(1−T) + Net Borrowing"},
    {name:"FCFF from CFO", f:"FCFF = CFO + Int(1−T) − FCInv"},
    {name:"FCFE from CFO", f:"FCFE = CFO − FCInv + Net Borrowing"},
    {name:"Firm value (FCFF single-stage)", f:"V_firm = FCFF₁ / (WACC − g)"},
    {name:"Equity value (FCFE single-stage)", f:"V_equity = FCFE₁ / (r_e − g)"},
    {name:"Residual Income (RI)", f:"RIₜ = EPS_t − r_e × BV_{t-1}  =  (ROE − r_e) × BV_{t-1}"},
    {name:"RI intrinsic value", f:"V₀ = BV₀ + Σ [RIₜ / (1+r_e)ᵗ]  =  BV₀ + PV(future RI)"},
    {name:"Economic Value Added (EVA)", f:"EVA = NOPAT − WACC × Invested Capital  =  (ROIC − WACC) × IC"},
    {name:"Tobin's q (approx.)", f:"q = Market Value of Assets / Replacement Cost of Assets"},
    {name:"EV/EBITDA", f:"EV = Market Cap + Debt + Preferred − Cash;  Multiple = EV / EBITDA"},
    {name:"P/B ratio", f:"P/B = (ROE − g) / (r − g)  (justified P/B from GGM)"},
    {name:"PRAT model (g)", f:"g = P × R × A × T  =  NI/Sales × RE/NI × Sales/Assets × Assets/Equity"}
  ],
  "Fixed Income": [
    {name:"Spot rate from forward rates", f:"(1 + S_n)ⁿ = (1 + S_1)(1 + ₁f₁)(1 + ₁f₂)…(1 + ₁f_{n-1})"},
    {name:"Forward rate from spots", f:"(1 + ₁fₙ) = (1 + S_{n+1})^{n+1} / (1 + S_n)ⁿ"},
    {name:"Bond price using spot rates", f:"P = C/(1+S₁) + C/(1+S₂)² + … + (C+F)/(1+Sₙ)ⁿ"},
    {name:"Option-Adjusted Spread (OAS)", f:"P = Σ [CF_t / (1 + r_t + OAS)^t]  (OAS = spread added to tree rates to match market price)"},
    {name:"Effective duration (option bonds)", f:"EffDur = (P₋ − P₊) / (2 × P₀ × ΔCurve)"},
    {name:"Effective convexity", f:"EffCvx = (P₋ + P₊ − 2P₀) / (P₀ × ΔCurve²)"},
    {name:"OAS relationship", f:"Z-spread = OAS + Option Cost  (callable: Z > OAS;  putable: Z < OAS)"},
    {name:"CDS spread (approx.)", f:"CDS Spread ≈ (1 − Recovery Rate) × Hazard Rate  ≈  Credit Spread on bond"},
    {name:"CDS value change", f:"ΔCDS value ≈ (Spread Change) × Duration × Notional  (for protection buyer: spread widens = gain)"},
    {name:"PSA prepayment (CPR)", f:"CPR_t = 0.06 × (t/30) × PSA%  for t ≤ 30;  CPR = 0.06 × PSA% for t > 30"},
    {name:"SMM from CPR", f:"SMM = 1 − (1 − CPR)^{1/12}"},
    {name:"Expected loss (credit)", f:"EL = PD × LGD × EAD  where LGD = 1 − Recovery Rate"},
    {name:"Key rate duration (KRD)", f:"KRD_k = −(1/P) × (∂P/∂y_k)  where y_k is the key rate at maturity k"}
  ],
  "Derivatives": [
    {name:"Forward price (no-dividend stock)", f:"F₀(T) = S₀ × (1 + r_f)^T  =  S₀ × e^{r_f T} (continuous)"},
    {name:"Forward price (dividend-paying stock)", f:"F₀(T) = (S₀ − PV(D)) × (1 + r_f)^T"},
    {name:"Forward value (long) during life", f:"V_t = [F_t(T) − F₀(T)] / (1 + r_f)^{T−t}"},
    {name:"Currency forward (CIP)", f:"F_{d/f} = S_{d/f} × (1 + r_d)^T / (1 + r_f)^T"},
    {name:"FRA value at settlement", f:"FRA payoff = [L (FRA Rate − Libor) × (days/360)] / [1 + Libor × (days/360)]  (discounted to payment date)"},
    {name:"BSM call price", f:"c = S₀N(d₁) − Xe^{-rT}N(d₂)"},
    {name:"BSM put price", f:"p = Xe^{-rT}N(−d₂) − S₀N(−d₁)"},
    {name:"d₁ (BSM)", f:"d₁ = [ln(S₀/X) + (r + σ²/2)T] / (σ√T)"},
    {name:"d₂ (BSM)", f:"d₂ = d₁ − σ√T"},
    {name:"Delta (call)", f:"Δ_call = N(d₁)  ∈ (0,1);  Δ_put = N(d₁) − 1  ∈ (−1,0)"},
    {name:"Gamma", f:"Γ = N'(d₁) / (S₀σ√T)  (same for calls and puts;  largest ATM near expiry)"},
    {name:"Vega", f:"ν = S₀√T × N'(d₁)  (always positive; options gain value with higher volatility)"},
    {name:"Theta (call)", f:"Θ = −[S₀N'(d₁)σ/(2√T)] − rXe^{-rT}N(d₂)  (usually negative — time decay)"},
    {name:"Rho (call)", f:"ρ = TXe^{-rT}N(d₂)  (positive for calls: higher rates → higher call value)"},
    {name:"Put-call parity", f:"c + PV(X) = p + S₀  ⟹  c − p = S₀ − PV(X)"},
    {name:"Black model (caplet)", f:"caplet value = P(0,T₂) × [F_R × N(d₁) − Cap Rate × N(d₂)] × notional × (days/360)"}
  ],
  "Alternative Investments": [
    {name:"PE IRR (net to LPs)", f:"Solve: Σ [CF_t / (1+IRR)^t] = 0  using actual cash call and distribution dates"},
    {name:"MOIC (gross multiple)", f:"MOIC = Total Distributions / Total Invested Capital"},
    {name:"Commodity futures total return", f:"Total Return = Spot Return + Roll Yield + Collateral Yield"},
    {name:"Roll yield (backwardation)", f:"Roll Yield = (F_near − F_far) / F_near  (positive in backwardation, negative in contango)"},
    {name:"Commodity futures price (cost of carry)", f:"F₀ = S₀ × e^{(r + u − c)T}  where u=storage cost, c=convenience yield"},
    {name:"GP carried interest", f:"Carry = Carry% × (Distributions − Invested Capital − Preferred Return)  subject to clawback"},
    {name:"Private company discount (sequential)", f:"Minority value = Control Value × (1 − DLOC) × (1 − DLOM)"}
  ],
  "Portfolio Management": [
    {name:"Multifactor return (APT)", f:"E(Rᵢ) = RF + β_{i1}×λ₁ + β_{i2}×λ₂ + … + β_{ik}×λₖ  (λ = factor risk premium)"},
    {name:"Active return", f:"R_A = R_P − R_B  (portfolio return minus benchmark return)"},
    {name:"Information Ratio", f:"IR = R_A / σ_A  =  Active Return / Tracking Error"},
    {name:"Fundamental Law", f:"IR = IC × √BR  (information coefficient × square root of breadth)"},
    {name:"Optimal active risk", f:"σ*_A = (IR / SR_B) × σ_B  (SR_B = Sharpe ratio of benchmark)"},
    {name:"Sharpe ratio of active portfolio", f:"SR_P² = SR_B² + IR²"},
    {name:"Tracking error (active risk)", f:"σ_A = √[Σᵢ Σⱼ wᵢΔwⱼ Cov(Rᵢ,Rⱼ)]  where Δw = active weights"},
    {name:"Factor model expected return", f:"E(Rᵢ) = α + b₁F₁ + b₂F₂ + … + ε  (b=factor loading, F=factor value)"}
  ]
};

const POWER_NOTES_L2 = {
  "Ethics": [
    {
      module: "Code & Standards Application",
      rules: [
        "When a scenario involves both a firm policy and a CFA Standard, apply whichever is MORE restrictive — CFA Standards set the floor, stricter firm/local rules apply on top.",
        "Disclosure of a conflict is necessary but never sufficient on its own — ask whether the member also managed, mitigated, or recused themselves from the conflict.",
        "Standard V-A (Reasonable Basis) requires the member to have independently evaluated the research or model — blindly relying on a third-party model without understanding its assumptions violates the Standard."
      ],
      traps: [
        "Choosing 'disclose the conflict and proceed' as the correct answer when the conflict is severe enough to require recusal or refusal of the assignment.",
        "Applying mosaic theory to justify acting on nonpublic information when the information obtained from the company contact is in fact material (test: would it move the price?)."
      ],
      mnemonic: "DISC — Disclose, Investigate, Step back if needed, Comply with strictest standard"
    },
    {
      module: "Research Objectivity Standards",
      rules: [
        "Research Objectivity Standards are VOLUNTARY firm-level policies — they do not override or duplicate the mandatory CFA Standards that apply to individuals.",
        "Quiet periods are required around IPOs and secondary offerings — analysts cannot publish new research or change ratings during these windows.",
        "Analyst compensation must not be linked directly to specific investment banking transactions — it may be tied to overall firm profitability."
      ],
      traps: [
        "Treating a violation of Research Objectivity Standards as automatically a violation of Standard I-B (Independence and Objectivity) — they are separate frameworks and a firm can violate one without violating the other.",
        "Assuming that any analyst contact with investment banking constitutes a violation, when the Standards only prohibit compensation linkage and pressure to alter research conclusions."
      ],
      mnemonic: "ROS = Research is Objective and Separate from banking"
    },
    {
      module: "Asset Manager Code",
      rules: [
        "The Asset Manager Code applies to the FIRM as an entity — it is distinct from the CFA Standards that govern individual member conduct.",
        "Firms claiming AMC compliance must provide clients with full disclosure of fees, conflicts of interest, valuation methods, and risk management policies — selective disclosure is not sufficient.",
        "Under the AMC, performance must be presented fairly and accurately — cherry-picking composites or excluding poor-performing accounts is a violation."
      ],
      traps: [
        "Confusing AMC compliance (voluntary, firm-level) with GIPS compliance — a firm can comply with one and not the other; they address different aspects of client reporting.",
        "Assuming the AMC only covers portfolio management when it also requires compliance and risk management infrastructure, business continuity planning, and client communication standards."
      ],
      mnemonic: "AMC = Assets, Managers, Clients — the firm serves clients, not the other way around"
    }
  ],
  "Quantitative Methods": [
    {
      module: "Multiple Regression & Issues",
      rules: [
        "Heteroskedasticity only inflates/deflates standard errors — use White-corrected SEs to fix the t-tests; the coefficient estimates remain unbiased.",
        "Serial correlation (autocorrelation) biases standard errors AND can bias slope estimates in dynamic models — use Newey-West SEs and check DW statistic (target ≈ 2).",
        "Multicollinearity inflates standard errors and makes individual coefficients unreliable, but does NOT bias them — the model's overall R² and F-stat remain valid."
      ],
      traps: [
        "Concluding that heteroskedasticity has biased the regression coefficients — it has not; only the standard errors are affected.",
        "Using DW ≈ 2 to conclude there is no problem of any kind, when DW only tests for first-order serial correlation and cannot detect higher-order autocorrelation or multicollinearity."
      ],
      mnemonic: "HeSMA: Heterosk = Standard errors; Serial = both; Multicollinearity = Amplifies SEs"
    },
    {
      module: "Time-Series Analysis",
      rules: [
        "If |b₁| ≥ 1 in an AR(1) model, the series is non-stationary — do not use AR models on it without first differencing.",
        "Two non-stationary series may still be cointegrated (share a long-run equilibrium) — in that case, use an error-correction model, not individual AR models.",
        "Always test for seasonality before finalizing an AR model — add seasonal lags (e.g., AR(4) for quarterly data) or seasonal dummy variables if seasonal patterns remain in residuals."
      ],
      traps: [
        "Running a regression on two trending series and concluding they are related because R² is high, when both series contain unit roots and the regression is spurious.",
        "Applying a Dickey-Fuller test and forgetting that the null hypothesis is a unit root (non-stationary) — rejecting H₀ means the series IS stationary, not that it has a unit root."
      ],
      mnemonic: "SURE: Stationarity — Unit root test — Residuals check — Error-correction if cointegrated"
    },
    {
      module: "Machine Learning",
      rules: [
        "Supervised learning requires labeled training data — if no labels exist, use unsupervised methods (clustering, PCA); reinforcement learning is for sequential decision-making with rewards.",
        "Regularization (LASSO, ridge) penalizes model complexity to reduce overfitting — LASSO can shrink coefficients to exactly zero (feature selection); ridge shrinks them toward zero.",
        "Cross-validation is the standard check for overfitting — use k-fold CV to estimate out-of-sample performance before deploying a model."
      ],
      traps: [
        "Choosing a model because it maximizes in-sample accuracy, when high in-sample fit with poor cross-validation performance signals overfitting.",
        "Applying classification metrics (accuracy, F1 score) to a regression ML problem, or vice versa — match the evaluation metric to the output type."
      ],
      mnemonic: "SUR-OV: Supervised/Unsupervised/Reinforcement — Overfit check with Validation"
    }
  ],
  "Economics": [
    {
      module: "Currency Exchange Rates",
      rules: [
        "Covered IRP gives the no-arbitrage FORWARD rate — it is locked in and risk-free; uncovered IRP gives an EXPECTED future spot rate — it is a prediction and carries currency risk.",
        "Relative PPP predicts long-run exchange rate changes, not short-run levels — currencies can deviate from PPP for years due to capital flows and sticky prices.",
        "When using the formula F = S × (1+r_d)/(1+r_f), always quote both rates consistently (d/f convention) and check whether the answer implies appreciation or depreciation of the base currency."
      ],
      traps: [
        "Using covered IRP to forecast the expected future spot rate when it only gives the no-arbitrage forward rate — they are equal only if uncovered IRP holds (an empirical assumption, not a guaranteed equality).",
        "Forgetting to annualize the interest rates when the forward horizon is less than one year — multiply the rate by (days/360) rather than compound."
      ],
      mnemonic: "CUP: Covered = forward (no risk); Uncovered = Prediction (risky); PPP = long-run only"
    },
    {
      module: "Economic Growth",
      rules: [
        "In the Solow model, a higher saving rate raises the steady-state LEVEL of output per worker, not the long-run GROWTH rate — long-run growth equals exogenous technological progress only.",
        "Endogenous growth theory predicts that capital (broadly defined, including human capital and knowledge) does not exhibit diminishing returns — policies that raise investment can permanently raise growth.",
        "Convergence is a Solow prediction (poor countries grow faster than rich ones, conditional on similar fundamentals) — endogenous growth theory predicts non-convergence without technology spillovers."
      ],
      traps: [
        "Stating that in the Solow model a country's saving rate determines its long-run per capita growth rate — it only determines the steady-state level; TFP growth drives the long-run rate.",
        "Applying Solow convergence as unconditional (all countries converge) when the model predicts only conditional convergence — countries converge to their own steady state, not to each other."
      ],
      mnemonic: "SOLD: Solow = Only Level Determined by saving; endogenous = long-run growth"
    },
    {
      module: "Regulation & Market Structure",
      rules: [
        "Regulatory capture occurs when the regulated industry gains influence over its regulator — it predicts under-enforcement, delayed rule-making, and rules written to benefit incumbents.",
        "Principles-based regulation sets broad objectives and leaves implementation to firms — rules-based regulation specifies exact requirements; principles-based allows more flexibility but is harder to enforce uniformly.",
        "Market concentration (HHI) measures structural market power, but high concentration does not guarantee pricing power if barriers to entry are low and the market is contestable."
      ],
      traps: [
        "Assuming that more regulation is always better for market efficiency — excessive regulation can create barriers to entry, reduce competition, and generate compliance costs that outweigh consumer benefits.",
        "Treating high HHI as proof of monopoly pricing when high concentration with low barriers to entry and competitive pricing is consistent with a contestable market."
      ],
      mnemonic: "CARP: Capture, Arms-length (principles vs rules), Regulation costs, Porter forces"
    }
  ],
  "Financial Statement Analysis": [
    {
      module: "Intercorporate Investments",
      rules: [
        "Equity method: book value tracks investment (cost + share of income − dividends); report ONE line (equity income) on the income statement — do not consolidate revenue or debt.",
        "Under consolidation, 100% of subsidiary assets/liabilities appear on the balance sheet even if the parent owns less than 100% — minority interest (NCI) offsets the overstated equity.",
        "Goodwill is only tested for impairment (not amortized) under both IFRS and US GAAP — impairment is a one-way write-down; no write-up is permitted."
      ],
      traps: [
        "Including the subsidiary's revenue and debt in ratio analysis when only the equity method applies — equity method investments appear as a single asset line, not consolidated assets.",
        "Confusing the equity pick-up (investor's share of associate's net income, less any excess amortization) with dividends received from the associate — dividends reduce the carrying value, not income."
      ],
      mnemonic: "ECG: Equity method = one-line pickup; Consolidation = 100% assets; Goodwill = impairment only"
    },
    {
      module: "Employee Compensation",
      rules: [
        "DB pension funded status = Plan Assets − PBO; positive means overfunded (asset on balance sheet), negative means underfunded (liability) — both IFRS and US GAAP require recognition of net funded status.",
        "IFRS requires immediate recognition of actuarial gains/losses in OCI (no corridor) — US GAAP allows the corridor method (defer recognition if within 10% of the larger of PBO or plan assets).",
        "A higher discount rate assumption lowers the PBO and current service cost, reducing reported pension expense and liability — watch for opportunistic assumption changes."
      ],
      traps: [
        "Using expected return on plan assets as the actual asset return in projecting future pension expense — expected return is an actuarial assumption; actual returns flow through OCI (IFRS) or are deferred (US GAAP).",
        "Confusing pension expense on the income statement (service cost + net interest cost under IFRS) with cash contributions to the pension fund — they can differ significantly."
      ],
      mnemonic: "PIES: PBO minus Assets = funded status; IFRS = Immediate OCI; Expected return ≠ actual; Sensitivity to discount rate"
    },
    {
      module: "Multinational Operations",
      rules: [
        "If the subsidiary's functional currency = its local currency, use the current rate method (all assets at current rate, equity at historical, OCI absorbs the translation gain/loss as CTA).",
        "If the subsidiary's functional currency = the parent's presentation currency (subsidiary is integrated), use the temporal method (monetary items at current rate, nonmonetary at historical, translation gain/loss goes to income statement).",
        "Under the current rate method, financial ratios calculated in the local currency are preserved in the translated statements — under the temporal method, ratios change after translation."
      ],
      traps: [
        "Applying the current rate method when the subsidiary operates in a highly inflationary (hyperinflationary) economy — hyperinflationary subsidiaries must restate using inflation-adjusted figures first under IFRS.",
        "Assuming translation always produces a gain when the domestic currency appreciates — whether it's a gain or loss depends on the net asset vs net liability position exposed and the direction of rate movement."
      ],
      mnemonic: "CHIT: Current rate = Highly autonomous subsidiaries (integrated = Temporal); Hyperinflation = restate first"
    },
    {
      module: "Financial Institutions Analysis",
      rules: [
        "Net interest margin (NIM) = Net Interest Income / Average Earning Assets — the primary profitability driver for banks, driven by the spread between lending and deposit rates.",
        "Tier 1 capital ratio = Tier 1 Capital / Risk-Weighted Assets — core equity; higher ratio = more loss-absorbing capacity; minimum Basel III = 6% Tier 1, 4.5% CET1.",
        "Non-performing loan (NPL) ratio = NPLs / Total Loans — elevated NPL ratio is the leading indicator of credit quality deterioration; compare to allowance coverage ratio (Loan Loss Reserves / NPLs)."
      ],
      traps: [
        "Treating a high ROE at a bank as unambiguously positive without checking the leverage ratio — banks can inflate ROE by increasing leverage to dangerous levels.",
        "Analyzing bank revenue using the same top-line metrics as industrial companies — net interest income and non-interest income replace revenue as the relevant operating metrics for banks."
      ],
      mnemonic: "NICER: NIM, Insurance (combined ratio), Capital adequacy, Efficiency ratio, Reserve coverage"
    },
    {
      module: "Quality of Earnings",
      rules: [
        "High accruals relative to cash earnings signal lower-quality earnings — cash flow from operations persistently below net income indicates aggressive accrual accounting.",
        "Beneish M-score uses eight financial ratios to flag potential earnings manipulation — a score above −1.78 indicates a higher probability of manipulation.",
        "Real earnings management (cutting R&D, accelerating sales) is harder to detect than accrual management and has real economic costs — it is more damaging long-term."
      ],
      traps: [
        "Assuming that GAAP-compliant earnings are always high quality — management has wide discretion in timing, classification, and estimation that can produce low-quality earnings without violating GAAP.",
        "Treating a large non-recurring gain as neutral to earnings quality assessment — frequent 'non-recurring' items that recur every few years are a red flag for income smoothing."
      ],
      mnemonic: "ACCRUAL: Accruals high = Cash flow low = Red flag; Use both ratio and cash flow analysis"
    }
  ],
  "Corporate Issuers": [
    {
      module: "Capital Structure",
      rules: [
        "Under MM with taxes, V_L = V_U + T_c × D — firm value increases monotonically with debt due to the tax shield (no costs assumed); the trade-off theory adds financial distress costs to find an interior optimum.",
        "The pecking order predicts firms prefer internal financing first, then debt, then equity — equity issuance is last resort because it signals management believes stock is overvalued.",
        "WACC declines with leverage at first (cheap after-tax debt replaces equity) but rises again when financial distress costs and the rising required return on levered equity dominate."
      ],
      traps: [
        "Using MM without taxes to conclude capital structure is irrelevant in all real-world cases — MM irrelevance requires no taxes, no distress costs, and perfect markets; adding taxes makes debt valuable.",
        "Confusing the target capital structure (long-run strategic objective) with the actual capital structure at a point in time — WACC should use target weights, not current market weights, for investment analysis."
      ],
      mnemonic: "TV+D: Trade-off = Value maximized where tax shield = distress cost; Pecking order = internal → Debt → equity"
    },
    {
      module: "Dividends & Share Repurchases",
      rules: [
        "Under MM dividend irrelevance, shareholders are indifferent between dividends and capital gains in a perfect market — in practice, taxes, signaling, and clientele effects make dividend policy matter.",
        "A share repurchase at fair value is equivalent to a cash dividend under MM — EPS rises (fewer shares), but P/E compresses by the same amount, leaving stock price unchanged.",
        "The clientele effect implies firms should not change dividend policy arbitrarily — changing the payout ratio will cause clientele disruption and trading costs even if long-run value is unchanged."
      ],
      traps: [
        "Assuming that an EPS increase following a buyback always creates value — if the shares were repurchased above intrinsic value, the buyback destroys value for continuing shareholders even as EPS rises.",
        "Treating a special dividend as equivalent to a regular dividend for signaling purposes — a special one-time dividend commits management to nothing; a regular dividend initiating or increasing implies a durable commitment."
      ],
      mnemonic: "DISC: Dividends signal commitment; Irrelevance holds only with perfect markets; Share buyback ≠ free EPS boost; Clientele — don't change policy abruptly"
    },
    {
      module: "Corporate Governance & ESG",
      rules: [
        "Board independence requires a majority of independent directors — look for CEO duality (CEO = Chairman), related-party transactions, and directors serving on too many boards as governance red flags.",
        "Cumulative voting gives minority shareholders more power to elect board representation — straight (statutory) voting allows a majority shareholder to elect all directors.",
        "ESG risks are relevant to valuation: E and S risks affect regulatory costs, reputational costs, and operating licenses; G risks directly affect principal-agent conflicts and cost of capital."
      ],
      traps: [
        "Treating a staggered board (directors elected in classes over multiple years) as always bad governance — while it entrenches management, it can also protect against short-term activist pressure that destroys long-term value.",
        "Equating higher ESG scores with higher returns without recognizing that ESG integration is about risk-adjusted returns — ESG may reduce tail risks without necessarily boosting average returns."
      ],
      mnemonic: "BISE: Board independence; Independent chair; Shareholder rights (voting); ESG = risk lens"
    }
  ],
  "Equity": [
    {
      module: "Equity Valuation Approaches",
      rules: [
        "Match the valuation model to the company: DDM for stable dividend payers, FCFE for non-dividend payers with predictable capex, EV/EBITDA for capital-intensive or leveraged companies, RI when accounting data is reliable.",
        "Going-concern value (DCF) is appropriate when the firm will continue operations; liquidation value is appropriate when the firm is in distress — always state which premise you are using.",
        "Sum-of-the-parts (SOTP) valuation is best for conglomerates where different segments have different risk profiles — apply the appropriate multiple or WACC to each segment separately."
      ],
      traps: [
        "Applying a DDM to a company that pays no dividends by assuming it pays out 100% of earnings — FCFE or RI models are more appropriate when dividend capacity ≠ actual dividends.",
        "Using book value of equity as a proxy for intrinsic value — book value reflects historical cost; for most companies, intrinsic value diverges significantly from book value."
      ],
      mnemonic: "MoPV: Model selection → (D)ividends / (F)CF / (M)ultiples / (R)esidual → match to firm type"
    },
    {
      module: "Return Concepts",
      rules: [
        "The equity risk premium (ERP) used in a DCF must be consistent with the beta estimate — use the same historical period, frequency, and market proxy for both.",
        "The implied ERP (derived from current market prices and long-run earnings growth estimates) is forward-looking and preferable to historical estimates when the past may not represent future conditions.",
        "The build-up method for private companies starts with the risk-free rate and adds the ERP, size premium, and company-specific risk premium — do not apply CAPM beta to a non-traded firm."
      ],
      traps: [
        "Using the arithmetic mean historical return premium as the ERP in a DCF (appropriate for single-period expected return estimates) instead of the geometric mean (appropriate for multi-period compounding contexts).",
        "Treating the CAPM required return and the investor's expected return (E(r)) as the same thing — the stock is fairly valued only if they are equal; if E(r) > required, the stock is undervalued."
      ],
      mnemonic: "HIRE: Historical vs Implied ERP; Risk-free consistency; Expected ≠ required unless fairly priced"
    },
    {
      module: "Industry & Company Analysis",
      rules: [
        "Porter's Five Forces determine industry-level profitability — all five must be assessed together; a single powerful force (e.g., buyer power) can suppress profitability even if the other four are favorable.",
        "The industry life cycle stage dictates the appropriate valuation method: growth stage → revenue multiples or DCF with high terminal growth; mature → normalized earnings multiples; declining → asset-based.",
        "Pricing power is the single most important driver of long-term profitability — evaluate it through gross margin stability across cycles, not just current margins."
      ],
      traps: [
        "Treating high industry growth as sufficient for attractive equity returns — fast-growing industries often attract competition that compresses margins, destroying value for incumbents.",
        "Confusing industry market share analysis with Porter's framework — market share measures competitive position, while Porter's Forces measure structural industry attractiveness regardless of who has share."
      ],
      mnemonic: "5F-CLAPS: Customer, Labor (substitutes), Assets (rivalry), Producers (new entrants), Suppliers — all 5 together"
    },
    {
      module: "Discounted Dividend Valuation",
      rules: [
        "GGM requires g < r — if g ≥ r, the model produces a negative or infinite value; use a multi-stage model or H-model for companies with currently high growth.",
        "H-model formula: V₀ = D₀[(1+g_L) + H(g_S − g_L)] / (r − g_L) where H is the HALF-LIFE of the high-growth period (years / 2), not total years.",
        "PRAT model: g = profit margin (P) × retention (R) × asset turnover (A) × leverage (T) — this is the sustainable growth rate from ROE × (1 − payout)."
      ],
      traps: [
        "Using H as the total length of the high-growth period in the H-model formula — H is half that length; using the wrong H produces an over- or undervalued answer.",
        "Applying the GGM terminal value with the near-term high growth rate rather than the long-run sustainable growth rate — always ensure the terminal growth rate is sustainable (≤ nominal GDP growth)."
      ],
      mnemonic: "GGM: g < r always; H-model: H = half-life; Multi-stage for high-growth firms"
    },
    {
      module: "Free Cash Flow Valuation",
      rules: [
        "FCFF is pre-debt, pre-tax (add back after-tax interest) — discount at WACC to get firm value, then subtract net debt for equity value.",
        "FCFE is post-debt (add net new borrowing, subtract debt repayment) — discount at cost of equity to get equity value directly; do not discount at WACC.",
        "Net working capital investment = increase in current operating assets minus increase in current operating liabilities — exclude short-term debt and cash from the calculation."
      ],
      traps: [
        "Discounting FCFF at the cost of equity (too high a rate), understating firm value — FCFF belongs to both debt and equity holders, so use WACC.",
        "Omitting the net borrowing term when computing FCFE from FCFF — FCFE = FCFF − Interest(1−T) + Net Borrowing; forgetting net borrowing understates or overstates FCFE."
      ],
      mnemonic: "FF: FCFF → Firm → WACC; FCFE → Equity → r_e; add interest back for FCFF, add net borrowing for FCFE"
    },
    {
      module: "Price Multiples",
      rules: [
        "Justified P/E = (1 − b) / (r − g) — this is the LEADING P/E (based on next year's earnings); the trailing justified P/E = (1 − b)(1 + g) / (r − g).",
        "EV/EBITDA is better than P/E for comparing companies with different capital structures or depreciation policies because it is capital structure-neutral and pre-depreciation.",
        "When comparing P/B across firms, normalize for ROE — a high P/B is justified only if ROE exceeds the cost of equity; the justified P/B = (ROE − g) / (r − g)."
      ],
      traps: [
        "Using trailing EPS in a justified P/E formula — the GGM-derived justified P/E uses FORWARD earnings (D₁/E₁ = payout ratio); using trailing EPS mixes the formulas.",
        "Applying raw P/E comparisons across firms with different growth rates — a high-P/E stock may be CHEAPER than a low-P/E stock if it has proportionally higher growth (PEG ratio corrects for this)."
      ],
      mnemonic: "PEG: P/E is only comparable after adjusting for Growth and capital structure differences"
    },
    {
      module: "Residual Income",
      rules: [
        "RI = Net Income − (r_e × BV_{t-1}) — any earnings above the equity charge create positive RI; this is the economic profit concept applied to equity.",
        "V₀ = BV₀ + PV(all future RI) — if ROE > r_e forever, V₀ > BV₀ (P/B > 1); if ROE = r_e, V₀ = BV₀; if ROE < r_e permanently, V₀ < BV₀.",
        "EVA = NOPAT − WACC × Invested Capital = (ROIC − WACC) × IC — positive EVA means the firm is creating value above its cost of capital."
      ],
      traps: [
        "Using ending book value (BV_t) instead of beginning book value (BV_{t-1}) in the equity charge calculation — the charge is on capital at the START of the period.",
        "Applying the RI model when the clean surplus relation is violated — if comprehensive income items bypass the income statement (OCI items that don't flow through NI), RI model results will be distorted."
      ],
      mnemonic: "RI = ROE above hurdle × BV; V = BV + PV(RI); EVA = ROIC − WACC × IC"
    },
    {
      module: "Private Company Valuation",
      rules: [
        "Apply discounts sequentially: start with control value, apply DLOC to get minority interest value, then apply DLOM to get minority non-marketable value — do NOT add them as simple percentages.",
        "The build-up method for private company discount rate = risk-free rate + ERP + size premium + company-specific risk premium — beta is not applicable to non-traded firms.",
        "Venture capital valuation uses a pre-money / post-money framework: Post-money = Pre-money + Investment; VC ownership % = Investment / Post-money value."
      ],
      traps: [
        "Adding DLOC and DLOM percentages (e.g., 20% + 30% = 50% total discount) instead of applying them sequentially (value × 0.80 × 0.70 = 44% discount, not 50%).",
        "Using the public market WACC directly for a private company without adding a size premium and company-specific risk premium — private companies are riskier than their public peers due to concentration and illiquidity."
      ],
      mnemonic: "DISC-P: Discounts are Sequential (not additive); Private firms need Build-up rate, not CAPM beta"
    }
  ],
  "Fixed Income": [
    {
      module: "Term Structure & Interest Rate Dynamics",
      rules: [
        "Spot rates are zero-coupon rates for a single cash flow at time T; forward rates are rates for a future period implied by the spot curve — derive forwards from spots using (1+S_{n+1})^{n+1} / (1+S_n)^n.",
        "An upward-sloping yield curve is consistent with (a) expectations of rising rates, (b) liquidity premiums for longer maturities, or (c) preferred habitat demand concentrated in short maturities — all three theories can explain the same curve shape.",
        "Key rate durations measure sensitivity to changes at specific maturities — they sum to effective duration and are essential for analyzing non-parallel yield curve shifts."
      ],
      traps: [
        "Concluding that an inverted yield curve must reflect expectations of falling short rates, ignoring that preferred habitat investors may be driving demand for long bonds regardless of rate expectations.",
        "Using yield-to-maturity as the discount rate for each cash flow in a bond with a structured cash flow pattern — each cash flow should be discounted at its own spot rate, not a single YTM."
      ],
      mnemonic: "SFP: Spot → Forward → Par; each derived from the previous; yield curve theories = Expectations + Liquidity + Habitat"
    },
    {
      module: "Arbitrage-Free Valuation",
      rules: [
        "A binomial interest rate tree is calibrated to match the current term structure exactly — each node's rate is chosen so that the tree prices on-the-run bonds at their market prices.",
        "OAS is the spread added to every node in the interest rate tree to match the market price of an option-embedded bond — for callable bonds, OAS < Z-spread (option has value); for putables, OAS > Z-spread.",
        "Monte Carlo simulation is needed for path-dependent securities (MBS, CMOs) because their cash flows depend on the entire interest rate path, not just the current rate."
      ],
      traps: [
        "Interpreting a high OAS as unambiguously cheap — OAS may be wide because the model's interest rate volatility assumption is too low, making the option appear less costly than it really is.",
        "Using the Z-spread instead of OAS to compare option-embedded bonds — Z-spread includes option cost, making callable bonds appear to offer more spread than they actually do after adjusting for the call option given away."
      ],
      mnemonic: "OAS = Z − Option Cost (for callables); tree is calibrated to market; Monte Carlo for path-dependent"
    },
    {
      module: "Bonds with Embedded Options",
      rules: [
        "Callable bond: V_callable = V_option-free − V_call_option (issuer OWNS the call, so it costs the bondholder — callable bond is worth LESS than the straight bond).",
        "Effective duration for callable bonds is shorter than for straight bonds when rates fall (call risk shortens duration); putable bonds have shorter effective duration when rates rise (put protects the investor).",
        "Higher interest rate volatility increases the value of ALL embedded options — callable bond prices FALL (call option worth more to issuer) and putable bond prices RISE (put option worth more to investor)."
      ],
      traps: [
        "Calculating OAS for a callable bond and concluding a NEGATIVE OAS means the bond is cheap — negative OAS means the bond is priced expensive relative to the benchmark after removing the option; the option is underpriced in the model.",
        "Treating modified duration as applicable to callable bonds — modified duration assumes yields and cash flows are independent, which is violated when embedded options alter cash flows as rates change."
      ],
      mnemonic: "CAVE: Callable = value Adjusted lower (issuer owns call); Volatility lifts all options; Effective duration ≠ modified for embedded bonds"
    },
    {
      module: "Credit Analysis Models",
      rules: [
        "Structural models treat equity as a call option on firm assets — default occurs when asset value falls below the debt face value at maturity; inputs are asset value, asset volatility, and leverage.",
        "Reduced-form models use observable market variables (credit spreads, historical default rates) to estimate hazard rates — they do not model the firm's balance sheet but are more tractable for pricing.",
        "Expected loss = PD × LGD × EAD — reducing any one of the three components (PD via better underwriting, LGD via collateral, EAD via credit limits) reduces expected credit loss."
      ],
      traps: [
        "Applying structural model logic to frequently traded bonds where asset value is unobservable — reduced-form models are preferred for publicly traded credits where spread data is available.",
        "Confusing the credit spread (compensation for expected loss + credit risk premium) with the pure default premium (compensation for expected loss only) — the spread includes both components."
      ],
      mnemonic: "SR-EL: Structural = equity as option on assets; Reduced-form = hazard rate from spreads; EL = PD × LGD × EAD"
    },
    {
      module: "Credit Default Swaps",
      rules: [
        "CDS protection buyer pays the CDS spread (periodic coupon) and receives par minus recovery if a credit event occurs — the buyer profits when credit quality deteriorates (spreads widen).",
        "CDS spread ≈ (1 − Recovery Rate) × Hazard Rate; when the CDS spread widens, the mark-to-market value of protection INCREASES for the buyer and DECREASES for the seller.",
        "Index CDS (CDX in the US, iTraxx in Europe) allow traders to express broad credit market views — buying protection on the index hedges a portfolio of corporate bonds without selling individual positions."
      ],
      traps: [
        "Confusing the protection buyer (pays spread, benefits from default/spread widening) with the protection seller (receives spread, benefits from stable/improving credit) — exam questions frequently reverse roles.",
        "Assuming CDS spread equals bond credit spread exactly — the CDS-bond basis (CDS spread minus bond spread) can be positive or negative due to cheapest-to-deliver options, counterparty risk, and funding costs."
      ],
      mnemonic: "BUY = pays, Benefits from default; SELL = receives spread, Suffers on default; Basis ≠ zero"
    },
    {
      module: "Mortgage-Backed Securities",
      rules: [
        "PSA 100% = CPR of 0.2% × (month number) for the first 30 months, then 6% CPR constant — PSA 200% doubles these rates; PSA 50% halves them.",
        "PAC tranches have a planned amortization schedule protected by support tranches — support tranches absorb prepayment variability (both faster and slower prepayments) and carry more extension AND contraction risk.",
        "Negative convexity in callable bonds and MBS means price appreciation is capped when rates fall (prepayments or calls accelerate), while price declines are full when rates rise."
      ],
      traps: [
        "Treating the sequential-pay CMO structure as giving all tranches lower prepayment risk than the underlying pool — only the longest-maturity (last-pay) tranche has more extension protection; shorter tranches may have MORE contraction risk.",
        "Confusing WAL (weighted average life) with duration for MBS — WAL measures the average time to principal repayment, not price sensitivity to rate changes; MBS duration is shorter than WAL because of cash flow weighting."
      ],
      mnemonic: "PAC SAFE: PAC = planned schedule protected by Support tranches; Adverse prepayments absorbed by support; Faster = contraction; Extension = support gets hit both ways"
    }
  ],
  "Derivatives": [
    {
      module: "Forward Commitments Pricing & Valuation",
      rules: [
        "Forward PRICE is set at initiation so the initial VALUE is zero — during the contract, the value changes as the spot price or interest rates change; these are distinct concepts.",
        "For a dividend-paying stock forward: F₀ = (S₀ − PV(D)) × (1+r)^T — dividends REDUCE the forward price because the forward buyer does not receive them during the holding period.",
        "FRA payoff is settled at the beginning of the loan period (in arrears from the perspective of the loan start), so the settlement amount must be discounted at the reference rate for the loan period."
      ],
      traps: [
        "Forgetting to discount the FRA payoff from the end to the start of the loan period — FRAs settle at the beginning of the reference period, not at the end.",
        "Using the futures price when the question requires a forward price (or vice versa) — futures prices equal forward prices only when interest rates are non-stochastic; in practice, marking to market creates a difference."
      ],
      mnemonic: "FV=0: Forward Value = 0 at initiation; Forward Price ≠ Forward Value; Dividends lower the forward price"
    },
    {
      module: "Valuation of Contingent Claims",
      rules: [
        "BSM requires: continuous trading, no dividends (or known dividends), no transaction costs, constant volatility, and log-normally distributed prices — vega being non-zero means volatility matters greatly.",
        "Delta hedging neutralizes small price moves but not large moves (gamma risk) — a delta-neutral portfolio requires continuous rebalancing as the underlying price and time change.",
        "A payer swaption gives the right to ENTER a swap paying fixed, receiving floating — it increases in value when rates rise (like a put on a bond); a receiver swaption increases in value when rates fall."
      ],
      traps: [
        "Applying BSM to American options on dividend-paying stocks — BSM is for European options; American calls on dividend-paying stocks may be optimally exercised early before the ex-dividend date.",
        "Confusing theta (time decay, generally negative for options) with time value — as expiration approaches, time value → 0 for all options, but theta is largest (most negative) for at-the-money options near expiry."
      ],
      mnemonic: "DGV-TRP: Delta = hedge ratio; Gamma = rebalancing need; Vega = volatility sensitivity; Theta = time decay; Rho = rate sensitivity; Payer swaption = benefits from rising rates"
    }
  ],
  "Alternative Investments": [
    {
      module: "Private Equity Valuation",
      rules: [
        "Use actual invested capital (money deployed) for IRR calculations — committed capital (total promised to the fund) is used only for management fee calculations, not for return measurement.",
        "LBO value drivers are: entry multiple, exit multiple, debt paydown, and operational improvement (EBITDA growth) — the highest IRR comes from buying cheap, selling dear, and using maximum leverage.",
        "The J-curve reflects that PE funds show negative early returns (fees, investments written at cost or below) before realizations — vintage year diversification reduces J-curve exposure."
      ],
      traps: [
        "Computing IRR using committed capital in the denominator instead of invested (called) capital — this dramatically understates IRR during the early deployment phase when capital is only partially drawn.",
        "Treating MOIC and IRR as equivalent performance measures — a 3× MOIC over 10 years has a much lower IRR than a 3× MOIC over 3 years; IRR is time-sensitive, MOIC is not."
      ],
      mnemonic: "LBO-JIRR: LBO = leverage + buy cheap sell dear; J-curve = negative early; IRR uses INVESTED (not committed) capital"
    },
    {
      module: "Commodities",
      rules: [
        "Total commodity futures return = spot return + roll yield + collateral yield — the roll yield is the dominant long-run return driver, not spot price changes.",
        "Backwardation (futures price < expected spot) produces positive roll yield — as the futures contract converges to spot, a long position gains; contango produces negative roll yield.",
        "Convenience yield captures the benefit of holding physical inventory (production flexibility, avoiding stockouts) — it is high when spot inventories are tight and is the reason energy markets can be in persistent backwardation."
      ],
      traps: [
        "Assuming that commodity prices rising (positive spot return) implies a positive total futures return — in a heavily contangoed market, roll losses can exceed spot gains, producing a negative total return.",
        "Confusing the theory of normal backwardation (Keynes — hedgers pay a risk premium to speculators, so futures < expected future spot) with backwardation (futures < current spot, which is an observable market condition)."
      ],
      mnemonic: "SRC: Spot + Roll + Collateral = total return; Roll is positive in Backwardation, negative in Contango; Convenience yield → backwardation"
    }
  ],
  "Portfolio Management": [
    {
      module: "Multifactor Models",
      rules: [
        "Macroeconomic factor models use surprises in observable factors (GDP, inflation, spreads) as the risk factors; fundamental factor models use firm attributes (P/B, size) — returns are regressed on attributes.",
        "APT pricing: E(Rᵢ) = RF + Σ(βᵢₖ × λₖ) — if a portfolio has zero factor exposures and a positive expected return, it is a pure arbitrage (no-arbitrage condition eliminates it).",
        "In the Fama-French model: market (MKT) captures systematic equity risk; SMB captures small-cap premium; HML captures value premium — each factor's loading (beta) can be positive or negative."
      ],
      traps: [
        "Treating a positive factor loading on HML (value factor) as always increasing expected return — if the HML factor realized return is negative in a period, a positive loading produces a negative contribution.",
        "Confusing APT (any number of factors, derived from no-arbitrage) with CAPM (single factor, derived from mean-variance optimization) — APT does not require all investors to hold the market portfolio."
      ],
      mnemonic: "MAF: Macro surprises → returns; Attributes → Fundamental factors; APT = no-arbitrage pricing with multiple betas"
    },
    {
      module: "Active Portfolio Management",
      rules: [
        "IR = IC × √BR — to double the IR, either quadruple the breadth (number of independent bets) or double the IC (skill per bet); increasing breadth via correlated bets does NOT increase IR.",
        "Optimal active risk (tracking error) = (IR / SR_B) × σ_B — higher-skill managers (high IR) should take more active risk; the optimal blend of active + passive maximizes the overall Sharpe ratio.",
        "Constraints reduce effective breadth below theoretical breadth — long-only mandates eliminate short positions and reduce the number of ways to express negative views, lowering realized IR vs theoretical."
      ],
      traps: [
        "Applying the fundamental law to a manager who makes 100 correlated bets, counting breadth as 100 — the law requires INDEPENDENT bets; if bets are correlated, effective breadth is much less than 100.",
        "Equating a high IC (strong forecasting skill) with a high IR without considering breadth — a manager with IC = 0.10 and BR = 25 has IR = 0.50, the same as a manager with IC = 0.05 and BR = 100."
      ],
      mnemonic: "ICBR: Information is Created by IC and Breadth (independent bets); Constraints cut Breadth"
    },
    {
      module: "Economics & Investment Markets",
      rules: [
        "The intertemporal rate of substitution (IRS) links investor preferences to risk premiums — when consumption growth is expected to be high, the IRS is low (investors save less) and risk premiums fall.",
        "Equity risk premiums are counter-cyclical — they rise in recessions (when investors demand more compensation for bearing risk) and fall in expansions; credit spreads follow the same pattern.",
        "The Taylor rule guides central bank policy: policy rate = neutral rate + 0.5(inflation gap) + 0.5(output gap) — knowing this helps forecast rate changes from economic data surprises."
      ],
      traps: [
        "Assuming that rising real interest rates always lower equity valuations — rising real rates that reflect higher expected real growth can be POSITIVE for equities if earnings growth expectations rise proportionally.",
        "Treating all asset class risk premiums as constant through time — risk premiums are time-varying and business-cycle-dependent; applying a long-run average spread during a recession underestimates required return."
      ],
      mnemonic: "CITE: Consumption links to IRS and risk premiums; InTertemporal substitution falls when growth expected; ERP is counter-cyclical"
    }
  ]
};

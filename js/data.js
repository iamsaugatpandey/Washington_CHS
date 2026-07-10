"use strict";

/* ============================== DATA ============================== */

var ALL_IDS = ["laPoint","agaRubio","jhach","mnPeds","rcemHumphries","meyer","saemGrace4","ucsf","bostonAsap","won","hsu"];

var GUIDELINES = {
  laPoint: { name:"LaPoint 2018", short:"LaPoint", pop:"adult", institution:"Kaiser Permanente San Diego Medical Center / California Poison Control System", city:"San Diego", state:"California", country:"USA",
    blurb:"Foundational emergency-medicine review. Established topical capsaicin as first-line therapy via the TRPV1 mechanism and catalogued the epidemiologic statistics (duration of use, hot-shower relief, cessation-resolution rates) that nearly every later guideline cites.",
    sourceUrl:"https://escholarship.org/uc/item/59z5q826" },
  agaRubio: { name:"Rubio-Tapia 2024", short:"AGA", pop:"adult", institution:"American Gastroenterological Association Clinical Practice Update; Mayo Clinic authors", city:"Rochester", state:"Minnesota", country:"USA", scope:"National (AGA)",
    blurb:"National GI-society update built on Rome IV and the 4-phase CVS model. Endorses amitriptyline as the long-term pharmacologic mainstay, and is the only guideline in this set to discuss FAAH inhibitors and lower-THC/higher-CBD harm reduction.",
    sourceUrl:"https://www.gastrojournal.org/article/S0016-5085(24)00127-6/fulltext?referrer=https%3A%2F%2Fpubmed.ncbi.nlm.nih.gov%2F" },
  jhach: { name:"JHACH Clinical Pathway", short:"JHACH", pop:"pediatric", institution:"Johns Hopkins All Children's Hospital", city:"St. Petersburg", state:"Florida", country:"USA",
    blurb:"Pediatric ED pathway that explicitly prefers pragmatic Lonsdale criteria over Rome IV for children, embeds CRAFFT/HEADSS substance-use screening, and refuses to discharge patients on oral haloperidol.",
    sourceUrl:"https://www.hopkinsmedicine.org/-/media/files/allchildrens/clinical-pathways/chs_pathway-2025-08-18.pdf" },
  mnPeds: { name:"Children's Minnesota Pathway", short:"MN", pop:"pediatric", institution:"Children's Minnesota", city:"Minneapolis–St. Paul", state:"Minnesota", country:"USA",
    blurb:"The most granular pediatric pathway in the set — unique for dextrose-based IV fluids, explicit QTc thresholds, first-line aprepitant, routine naloxone co-provision, and nicotine-cessation resourcing at discharge.",
    sourceUrl:"https://www.childrensmn.org/references/CDS/cannabinoid-hyperemesis-syndrome-clinical-pathway.pdf" },
  rcemHumphries: { name:"Humphries 2024", short:"RCEM", pop:"adult", institution:"Royal College of Emergency Medicine", city:"", state:"", country:"United Kingdom",
    blurb:"UK emergency-medicine guideline adapted from the Sorensen systematic review (74.8% of cases with >1 year cannabis use). The only guideline built for an NHS setting, and recommends a formal written patient-information leaflet.",
    sourceUrl:"https://emj.bmj.com/content/41/5/328.long" },
  meyer: { name:"Meyer 2025", short:"Meyer", pop:"pediatric", institution:"Boston Children's Hospital / Harvard Medical School", city:"Boston", state:"Massachusetts", country:"USA",
    blurb:"Treats behavioral-health screening as universal — anxiety, depression, and substance use disorder are assumed to underlie chronic THC use in every patient. Flags adipose THC storage lasting up to 28 days.",
    sourceUrl:"https://www.ovid.com/jnls/co-pediatrics/abstract/10.1097/mop.0000000000001464~current-recommendations-in-the-diagnosis-and-management-of?redirectionsource=fulltextview" },
  saemGrace4: { name:"SAEM GRACE-4", short:"GRACE-4", pop:"adult", institution:"Society for Academic Emergency Medicine", city:"Multi-institutional", state:"", country:"USA", scope:"National (SAEM)",
    blurb:"Multi-institutional national consensus statement centered on the HaVOC trial. Treats hot-bathing and cessation-response as supportive rather than mandatory diagnostic features.",
    sourceUrl:"https://onlinelibrary.wiley.com/doi/10.1111/acem.14911" },
  ucsf: { name:"UCSF Clinical Pathway", short:"UCSF", pop:"pediatric", institution:"UCSF Benioff Children's Hospital / University of California, San Francisco", city:"San Francisco", state:"California", country:"USA",
    blurb:"Pediatric pathway with the most specific haloperidol titration protocol (2.5 mg first dose, repeat hourly) and explicit capsaicin application-safety rules. Excludes pregnancy, congenital long QTc, and patients under 40 kg.",
    sourceUrl:"https://pemdrive.ucsf.edu/file/fever-29-60-days-1pdf" },
  bostonAsap: { name:"Boston Children's ASAP (2023)", short:"Boston", pop:"pediatric", institution:"Boston Children's Hospital ASAP Program", city:"Boston", state:"Massachusetts", country:"USA",
    blurb:"Pediatric pathway most focused on cannabis-withdrawal pharmacotherapy — a full discharge regimen spanning N-acetylcysteine, melatonin, buspirone, propranolol, and clonidine.",
    sourceUrl:"https://dme.childrenshospital.org/wp-content/uploads/2023/02/Managing-Cannabis-Hyperemesis-Syndrome-How-To.pdf" },
  won: { name:"Won 2025", short:"Won", pop:"adult", institution:"University of Chicago / UC San Diego", city:"Chicago / San Diego", state:"Illinois / California", country:"USA",
    blurb:"Narrative ED review spanning adult and pediatric literature with no fixed age cutoff. Most transparent about weak evidence for individual second-line agents (documents exact response fractions such as 1 of 53).",
    sourceUrl:"https://academic.oup.com/ajhp/article-abstract/82/24/1340/8155679?redirectedFrom=fulltext&login=false" },
  hsu: { name:"Hsu 2025", short:"Hsu", pop:"adult", institution:"University of North Texas Health Science Center", city:"Fort Worth", state:"Texas", country:"USA",
    blurb:"Systematic review of 63 cases concluding antipsychotics outperform ondansetron, promethazine, and metoclopramide. Frames TCAs as prophylactic, inter-episodic therapy rather than acute rescue.",
    sourceUrl:"https://www.sciencedirect.com/science/article/abs/pii/S0163834325002038?via%3Dihub" }
};

var CONTACTS = {
  laPoint: [{n:"Jeff LaPoint", e:"lapoint.jeff@gmail.com"}],
  agaRubio: [{n:"Michael Camilleri", e:"camilleri.michael@mayo.edu"}],
  jhach: [{n:"Paola Dees, MD", e:"mwilsey1@jhmi.edu"}],
  mnPeds: [{n:"Nadia Maccabee-Ryaboy", e:"Nadia.Maccabee-Ryaboy@childrensmn.org"}],
  rcemHumphries: [{n:"Chris Humphries", e:"chris.humphries@ed.ac.uk"}],
  meyer: [{n:"Michele Burns", e:"Michele.Burns@childrens.harvard.edu"},{n:"Joshua Meyer", e:"joshua.meyer2@childrens.harvard.edu"}],
  saemGrace4: [{n:"Brian Borgundvaag", e:"bjug.borgundvaag@sinaihealthsystem.ca"}],
  ucsf: [{n:"James Naprawa", e:"james.naprawa@ucsf.edu"},{n:"Bella Doshi", e:"Bella.Doshi@ucsf.edu"},{n:"Sabina Ali", e:"Sabina.ali@ucsf.edu"}],
  bostonAsap: [{n:"ASAP Program", e:"ASAP@childrens.harvard.edu"}],
  won: [{n:"Kimberly Won", e:"kiwon@health.ucsd.edu"},{n:"Laura Celmins", e:"laura.celmins@uchicagomedicine.org"}],
  hsu: [{n:"Dustin DeMoss", e:"dustin.demoss@unthsc.edu"}]
};

/* Tile-grid position for every US state + DC (column x, row y), so the overview
   map reads as a recognizable, evenly-spaced United States without pulling in a
   mapping library. Layout: https://github.com/kristw/gridmap-layout-usa (NPR arrangement). */
var STATE_GRID = {
  AK: { x:0, y:0, name:"Alaska" },
  ME: { x:11, y:0, name:"Maine" },
  VT: { x:10, y:1, name:"Vermont" },
  NH: { x:11, y:1, name:"New Hampshire" },
  WA: { x:1, y:2, name:"Washington" },
  ID: { x:2, y:2, name:"Idaho" },
  MT: { x:3, y:2, name:"Montana" },
  ND: { x:4, y:2, name:"North Dakota" },
  MN: { x:5, y:2, name:"Minnesota" },
  IL: { x:6, y:2, name:"Illinois" },
  WI: { x:7, y:2, name:"Wisconsin" },
  MI: { x:8, y:2, name:"Michigan" },
  NY: { x:9, y:2, name:"New York" },
  RI: { x:10, y:2, name:"Rhode Island" },
  MA: { x:11, y:2, name:"Massachusetts" },
  OR: { x:1, y:3, name:"Oregon" },
  NV: { x:2, y:3, name:"Nevada" },
  WY: { x:3, y:3, name:"Wyoming" },
  SD: { x:4, y:3, name:"South Dakota" },
  IA: { x:5, y:3, name:"Iowa" },
  IN: { x:6, y:3, name:"Indiana" },
  OH: { x:7, y:3, name:"Ohio" },
  PA: { x:8, y:3, name:"Pennsylvania" },
  NJ: { x:9, y:3, name:"New Jersey" },
  CT: { x:10, y:3, name:"Connecticut" },
  CA: { x:1, y:4, name:"California" },
  UT: { x:2, y:4, name:"Utah" },
  CO: { x:3, y:4, name:"Colorado" },
  NE: { x:4, y:4, name:"Nebraska" },
  MO: { x:5, y:4, name:"Missouri" },
  KY: { x:6, y:4, name:"Kentucky" },
  WV: { x:7, y:4, name:"West Virginia" },
  VA: { x:8, y:4, name:"Virginia" },
  MD: { x:9, y:4, name:"Maryland" },
  DE: { x:10, y:4, name:"Delaware" },
  AZ: { x:2, y:5, name:"Arizona" },
  NM: { x:3, y:5, name:"New Mexico" },
  KS: { x:4, y:5, name:"Kansas" },
  AR: { x:5, y:5, name:"Arkansas" },
  TN: { x:6, y:5, name:"Tennessee" },
  NC: { x:7, y:5, name:"North Carolina" },
  SC: { x:8, y:5, name:"South Carolina" },
  DC: { x:9, y:5, name:"District of Columbia" },
  OK: { x:4, y:6, name:"Oklahoma" },
  LA: { x:5, y:6, name:"Louisiana" },
  MS: { x:6, y:6, name:"Mississippi" },
  AL: { x:7, y:6, name:"Alabama" },
  GA: { x:8, y:6, name:"Georgia" },
  HI: { x:0, y:7, name:"Hawaii" },
  TX: { x:4, y:7, name:"Texas" },
  FL: { x:9, y:7, name:"Florida" }
};

/* Where each guideline is institutionally located, per the source location table.
   Won 2025 carries dual authorship (University of Chicago + UC San Diego), so it
   appears at both IL and CA. Guidelines with no single-state affiliation (SAEM
   GRACE-4) or a non-US location (Humphries/RCEM) are listed separately below. */
var MAP_LOCATIONS = [
  { id:"laPoint", stateAbbr:"CA", city:"San Diego" },
  { id:"ucsf", stateAbbr:"CA", city:"San Francisco" },
  { id:"won", stateAbbr:"CA", city:"San Diego (UC San Diego)" },
  { id:"won", stateAbbr:"IL", city:"Chicago (University of Chicago)" },
  { id:"mnPeds", stateAbbr:"MN", city:"Minneapolis–St. Paul" },
  { id:"agaRubio", stateAbbr:"MN", city:"Rochester (Mayo Clinic)" },
  { id:"jhach", stateAbbr:"FL", city:"St. Petersburg" },
  { id:"meyer", stateAbbr:"MA", city:"Boston" },
  { id:"bostonAsap", stateAbbr:"MA", city:"Boston" },
  { id:"hsu", stateAbbr:"TX", city:"Fort Worth" }
];

var OFFMAP_LOCATIONS = [
  { id:"rcemHumphries", region:"United Kingdom", kind:"international" },
  { id:"saemGrace4", region:"National / multi-institutional (USA)", kind:"national" }
];

var CRITERIA = [
  { name:"Rome IV criteria", guidelines:["agaRubio","jhach","mnPeds","rcemHumphries","won","saemGrace4","ucsf","bostonAsap"],
    notes:"<b>UCSF</b>: explicitly states &ldquo;all must be present.&rdquo; <b>JHACH</b>: includes Rome IV but prefers pragmatic pediatric criteria and critiques it. <b>Children's MN</b>: &ldquo;were developed for diagnosing adults.&rdquo;" },
  { name:"Regular / chronic cannabis use", guidelines: ALL_IDS.slice(),
    notes:"<b>LaPoint</b>: &gt;1 year (100%), at least weekly use (97.4%). <b>Rubio-Tapia</b>: &gt;1 year before symptom onset. <b>JHACH</b>: ≥3 months (pragmatic criteria); <b>Won</b>: several years, near-daily. <b>Children's MN</b>: weekly use for months–years. <b>Humphries</b>: &gt;1 year (74.8% had this use, citing Sorensen). <b>Boston</b>: considered in patients using cannabis &gt;1 year, most patients use weekly or often, usually daily." },
  { name:"Cyclic / episodic nausea &amp; vomiting", guidelines: ALL_IDS.slice(), notes:"" },
  { name:"Abdominal pain", guidelines: ALL_IDS.slice(),
    notes:"<b>LaPoint</b>: reported in 85.1% of CHS cases; helps distinguish CHS from hyperemesis gravidarum. Episodes typically last 24–48 hours, but may persist 7–10 days." },
  { name:"Urine drug screen", guidelines:["laPoint","jhach","mnPeds","meyer","won","ucsf"],
    notes:"<b>JHACH and Children's MN</b>: standard workup. <b>Meyer</b>: threshold-dependent; delta-8/delta-10 analogs may not trigger positive." },
  { name:"Relief with hot showers / baths", guidelines: ALL_IDS.slice(),
    notes:"<b>LaPoint</b>: 92.3% reported symptom relief, thought to be mediated by TRPV1 activation (&gt;41°C). <b>Rubio-Tapia</b> notes it is NOT pathognomonic (also seen in CVS). <b>JHACH/MN</b>: uses it as a supporting criterion, not major. <b>Won</b>: hydrothermal therapy &gt;43°C (109.4 F). <b>SAEM GRACE-4</b>: not mandatory for diagnosis." },
  { name:"Symptom resolution with cannabis cessation", guidelines: ALL_IDS.slice(),
    notes:"<b>LaPoint</b>: 96.8% resolution after cessation. <b>Rubio-Tapia</b>: ≥6 months abstinence or ≥3 vomiting cycles. <b>Won and JHACH</b> note this is a Rome IV requirement but practically difficult to verify in the ED. <b>Boston</b>: usually improves within days to 2 weeks." },
  { name:"Pragmatic / alternative criteria (non-Rome IV)", guidelines:["jhach"],
    notes:"<b>JHACH</b> uses Lonsdale 2021 pediatric pragmatic criteria: ≥3 months use, onset of CVS-like symptoms after cannabis use, exclusion of other causes. Explicitly preferred over Rome IV for pediatric population." },
  { name:"4-phase CVS framework referenced", guidelines:["agaRubio","won","mnPeds","hsu"],
    notes:"All reference the 4-phase model." }
];

var PHASES = [
  { idx:"01", name:"Prodromal", text:"Early nausea and abdominal discomfort before vomiting starts. Abortive therapy started here may prevent a full episode — but patients often increase cannabis use, believing it relieves symptoms, which can worsen the episode." },
  { idx:"02", name:"Emetic", text:"What most ED visits represent: severe repetitive vomiting, intense nausea, abdominal pain, dehydration, electrolyte abnormalities, and frequent hot-shower behavior. IV fluids, electrolyte repletion, haloperidol, droperidol, and capsaicin are used here; hospitalization may follow for refractory symptoms." },
  { idx:"03", name:"Recovery", text:"Usually follows cessation and symptom control. Vomiting resolves, appetite returns, oral intake advances, hydration normalizes. Watch for premature discharge driven by withdrawal cravings (specifically flagged by JHACH). Discharge planning and behavioral-health referral belong here." },
  { idx:"04", name:"Inter-episodic", text:"Asymptomatic between episodes — the best window for long-term management. Reinforce cessation counseling, offer substance-use treatment, and consider prophylactic therapy (e.g. amitriptyline). Relapse is common if cannabis use resumes." }
];

/* Treatment settings: ed, hospital, outpatient, discharge */
var TX = {
  ed: [
    { group:"First line — IV fluids", items:[
      { name:"IV fluids", dose:"As indicated. JHACH: NS bolus 20 mL/kg (max 1000 mL) then maintenance D5NS + 20 mEq KCl/L @ 1–1.5× maintenance.", guidelines:["laPoint","agaRubio","jhach","mnPeds","rcemHumphries","meyer","won","saemGrace4","ucsf"],
        note:"JHACH: pediatric dosing, replete K⁺ if &lt;3 mEq/L. Children's MN: dextrose-containing fluids to counter fasting-induced lipolysis releasing adipose THC; D10 if vomiting &gt;3 days." }
    ]},
    { group:"Antiemetics", items:[
      { name:"Ondansetron", dose:"4–8 mg IV/IM/ODT Q4–8h (adult); 0.15–0.4 mg/kg/dose max 8 mg (pediatric)", guidelines:["laPoint","agaRubio","jhach","mnPeds","rcemHumphries","meyer","won","saemGrace4","bostonAsap","hsu"],
        note:"UCSF: rescue only, after haloperidol &amp; capsaicin fail AND QTc not prolonged. JHACH: ~1/3 respond; failure is a hallmark of CHS — if it fails in triage, no further doses given. LaPoint/Won/GRACE-4: &ldquo;usual care&rdquo; despite marginal monotherapy efficacy." },
      { name:"Promethazine", dose:"12.5 mg IV", guidelines:["laPoint","agaRubio","hsu"], note:"Phenothiazines show minimal monotherapy benefit." },
      { name:"Metoclopramide", dose:"10 mg IV single dose, or 10 mg PO Q6H", guidelines:["laPoint","won","ucsf","hsu"], note:"UCSF: rescue only if NO prolonged QTc, after haloperidol &amp; capsaicin have both failed. LaPoint/Won: limited monotherapy evidence." }
    ]},
    { group:"Antipsychotics &amp; adjuncts", items:[
      { name:"Haloperidol", dose:"Adult 0.5–5 mg IV/IM; pediatric 0.05 mg/kg max 2 mg. UCSF: 2.5 mg IV first dose, repeat 2.5 mg Q1H max 5 mg.", guidelines:["laPoint","agaRubio","jhach","won","meyer","rcemHumphries","saemGrace4","ucsf","bostonAsap","hsu"],
        note:"HaVOC trial cited by JHACH, Won, Meyer, SAEM GRACE-4. LaPoint: 5 mg IV/IM. UCSF: most specific pediatric dosing protocol — 2.5 mg first dose, repeat Q1H max 5 mg; alternate with diphenhydramine 25–50 mg IV Q6H; QTc &lt;460 required; if first dose effective → discharge. Boston: 1 mg IV effective for refractory symptoms, converts to 0.5 mg PO TID PRN, max 3 doses/24 hr, do not continue &gt;7 days, use after ondansetron failure as 2nd line. Hsu: antipsychotics demonstrated greater benefit than ondansetron, promethazine, or metoclopramide in a systematic review of 63 cases." },
      { name:"Droperidol", dose:"Adult 0.625–2.5 mg IV/IM (up to 5 mg); pediatric 0.05 mg/kg max 2.5 mg. Children's MN: 1.25 mg Q6H max 2.5 mg.", guidelines:["jhach","mnPeds","won","meyer","saemGrace4","hsu"],
        note:"Children's MN explicitly prefers droperidol over haloperidol — lower QTc/EPS risk." },
      { name:"Olanzapine", dose:"5–10 mg IV/IM/ODT", guidelines:["laPoint","won","mnPeds","rcemHumphries"],
        note:"LaPoint: 5 mg IV. Won: case series of 4 refractory patients; relief within 15–30 minutes. Children's MN: listed as first-line ODT (orally disintegrating drug); IM option for urgent situations; IV not FDA-approved in pediatrics." },
      { name:"Topical capsaicin", dose:"0.025–0.15% cream; 1 mm layer / 1-inch strip to abdomen, chest, or back of arms; up to 3–4×/day", guidelines: ALL_IDS.slice(),
        note:"LaPoint recommends as first-line based on TRPV1 mechanism and low side-effect profile. UCSF: may be used as first-line or alongside haloperidol; if QTc prolonged, capsaicin is the primary treatment. JHACH: adjunct only, 0.025% conc. Won and SAEM GRACE-4: evidence is limited or low-certainty. Rubio-Tapia: 0.1% to upper abdomen." },
      { name:"Hot showers / hydrothermal therapy", dose:"&gt;43°C / 109.4°F (Won); ≤100°F / 38°C (JHACH)", guidelines:["laPoint","agaRubio","jhach","mnPeds","rcemHumphries","meyer","won","saemGrace4","ucsf","hsu"],
        note:"All caution about thermal injury." }
    ]},
    { group:"Second line / supportive", items:[
      { name:"Lorazepam", dose:"1 mg IV (adult); 0.025–0.05 mg/kg max 2 mg (pediatric)", guidelines:["laPoint","jhach","mnPeds","won","meyer","ucsf","bostonAsap","hsu"],
        note:"JHACH: third-line after ondansetron and haloperidol/droperidol fail. Won: may be used for EPS prevention with dopamine antagonists or if anxiety present." },
      { name:"Diazepam", dose:"5–10 mg IV", guidelines:["laPoint"], note:"" },
      { name:"Diphenhydramine", dose:"25–50 mg IV; 1 mg/kg max 50 mg (pediatric)", guidelines:["laPoint","jhach","mnPeds","won","ucsf"],
        note:"JHACH and Won: primarily recommended for EPS prevention/treatment with haloperidol/droperidol rather than as primary antiemetic. Won: only 1/53 patients reported treatment success as antiemetic." },
      { name:"Hydroxyzine", dose:"25–50 mg Q6H PO max 100 mg", guidelines:["mnPeds","bostonAsap"], note:"For concurrent anxiety/withdrawal management, mild QTc effect." },
      { name:"Famotidine", dose:"0.5 mg/kg IV or PO BID max 20 mg", guidelines:["mnPeds"], note:"" },
      { name:"Sumatriptan", dose:"20 mg intranasal once; repeat once after 1 hour if partial response", guidelines:["mnPeds"], note:"Second-line specifically for QTc-prolonged patients." },
      { name:"Aprepitant (NK1 antagonist)", dose:"125 mg day 1, then 80 mg days 2–3, then 2×/week", guidelines:["mnPeds","meyer","hsu"],
        note:"Children's MN: first-line, no QTc effect. Meyer: refractory cases only; limited evidence. Hsu: mentioned in literature review as emerging therapy/refractory cases." },
      { name:"Dextrose-containing IV fluids", dose:"D5-containing fluids; D10 if vomiting &gt;3 days or ketonemia", guidelines:["mnPeds"], note:"Rationale: fasting-induced lipolysis may release THC stored in adipose tissue." }
    ]}
  ],
  hospital: [
    { group:"Supportive care", items:[
      { name:"IV fluids (continued)", dose:"Maintenance; D5NS + 20 mEq KCl/L", guidelines:["jhach","mnPeds","agaRubio","hsu","bostonAsap"],
        note:"JHACH: continue until hemodynamically stable and tolerating oral hydration. Boston: oral hydration if tolerated, IV hydration when needed." },
      { name:"Electrolyte repletion", dose:"K⁺ repletion if &lt;3 mEq/L", guidelines:["jhach","mnPeds","hsu","bostonAsap"],
        note:"JHACH, Won. QTc risk from electrolyte abnormalities plus QT-prolonging medications, explicitly noted by JHACH." },
      { name:"Famotidine", dose:"0.5 mg/kg IV BID max 20 mg", guidelines:["mnPeds"], note:"" }
    ]},
    { group:"Antiemetics &amp; antipsychotics", items:[
      { name:"Ondansetron (IV, continued)", dose:"Q6–8h PRN", guidelines:["jhach","mnPeds","hsu","bostonAsap"],
        note:"JHACH: continue IV; transition to oral when tolerating PO. Children's MN: only if trial dose was beneficial. Hsu: limited efficacy compared with antipsychotics/capsaicin." },
      { name:"Haloperidol (continued)", dose:"Q6–8h until tolerating oral medications", guidelines:["jhach","bostonAsap","hsu"],
        note:"Do NOT discharge with oral haloperidol. ECG/cardiac monitoring if abnormal. Stop and give IV diphenhydramine if EPS develops (akathisia, rigidity, bradykinesia, dysphagia, tremor)." }
    ]},
    { group:"Adjunct therapies", items:[
      { name:"Topical capsaicin (continued)", dose:"0.025–0.075% TID", guidelines:["jhach","mnPeds"], note:"JHACH: continue if tolerated. Children's MN: throughout inpatient stay." },
      { name:"Hydrothermotherapy", dose:"Warm shower ≤100°F / 38°C", guidelines:["jhach","mnPeds","hsu"], note:"Temperature limit specified for safety." },
      { name:"Lorazepam", dose:"0.025–0.05 mg/kg max 2 mg (JHACH); 1 mg Q6H PRN max 2 mg (Children's MN)", guidelines:["jhach","mnPeds","bostonAsap","hsu"],
        note:"JHACH: third-line after ondansetron and haloperidol/droperidol both fail. Children's MN: part of standard combination regimen." }
    ]}
  ],
  outpatient: [
    { group:"First line", items:[
      { name:"Cannabis cessation", dose:"—", guidelines: ALL_IDS.slice(),
        note:"Universal. Only definitive cure. Rubio-Tapia cautions against abrupt &ldquo;cold turkey&rdquo; cessation — may trigger withdrawal symptoms and high recidivism. LaPoint: full resolution in 7–10 days of abstinence. Symptoms may return with re-exposure. Meyer: symptoms may persist up to 2 weeks post-cessation due to adipose THC storage up to 28 days." },
      { name:"Amitriptyline (TCA)", dose:"Start 25 mg PO, titrate weekly, maintain 75–100 mg at bedtime", guidelines:["agaRubio","mnPeds"],
        note:"Rubio-Tapia: mainstay of long-term pharmacological therapy alongside cessation counseling; ~70% efficacious. Children's MN: second-line with significant QTc caution; explicit warning about overdose mortality/morbidity risk in depressed/suicidal patients, 0.5 mg/kg/day max 200 mg/day. Hsu: TCAs as prophylactic/inter-episodic therapy." },
      { name:"Topical capsaicin", dose:"0.025–0.1% cream, 3–4×/day as needed", guidelines:["laPoint","won","mnPeds","meyer","bostonAsap"],
        note:"LaPoint: patients discharged home with capsaicin; apply 3–4x/day as needed to abdomen or back of arms." }
    ]},
    { group:"Second line / escalation", items:[
      { name:"Haloperidol", dose:"5 mg PO daily", guidelines:["won","bostonAsap"], note:"Single case report. Boston allows short-term outpatient oral haloperidol (0.5 mg PO TID PRN, ≤7 days)." },
      { name:"Olanzapine", dose:"5–10 mg PO daily PRN (ODT available)", guidelines:["won","mnPeds"], note:"Children's MN: discharge with few doses if beneficial in hospital. Hsu: discussed in treatment literature reviewed." }
    ]},
    { group:"Other / harm reduction", items:[
      { name:"N-acetylcysteine", dose:"1200 mg PO BID", guidelines:["mnPeds","bostonAsap"], note:"If recommended by Toxicology. Boston: 1200 mg BID (start 600 mg BID and titrate) — check medications at discharge." },
      { name:"FAAH inhibitors", dose:"No specific agent named", guidelines:["agaRubio"], note:"Preliminary evidence from 2 small RCTs." },
      { name:"Nicotine replacement therapy", dose:"Weight-based patches/lozenges", guidelines:["mnPeds"], note:"If concurrent nicotine addiction." },
      { name:"Hot showers (symptomatic relief)", dose:"Patient-directed, caution of burns", guidelines:["laPoint","jhach","won","mnPeds","meyer"], note:"All note thermal injury risk. LaPoint: reports of patients spending up to 4 hours." },
      { name:"Switch to lower-THC / higher-CBD product", dose:"Harm reduction", guidelines:["agaRubio"], note:"Flagged as &ldquo;frequently suggested&rdquo; but lacking scientific validation — not recommended." },
      { name:"Naloxone provision", dose:"Intranasal, PRN", guidelines:["mnPeds"], note:"Strongly consider intranasal naloxone even without known OUD because cannabis and other street drugs may be contaminated with opioids." }
    ]}
  ],
  discharge: [
    { group:"Medications at discharge", items:[
      { name:"Ondansetron", dose:"0.15 mg/kg PO Q6H max 8 mg", guidelines:["mnPeds","bostonAsap"], note:"Both pediatric institutional guidelines only. Only if beneficial in hospital — consistent with recognition of limited CHS efficacy." },
      { name:"Hydroxyzine", dose:"25–50 mg Q6H PO max 100 mg", guidelines:["mnPeds","bostonAsap"], note:"For concurrent anxiety or insomnia." },
      { name:"Famotidine", dose:"0.5 mg/kg PO BID max 20 mg, ×2 weeks", guidelines:["mnPeds"], note:"Supportive GI management." },
      { name:"Naloxone (intranasal)", dose:"PRN for opioid overdose concern", guidelines:["mnPeds"], note:"Strongly consider even without OUD — street drugs may be laced. Unique among all 9 guidelines." },
      { name:"Aprepitant", dose:"125 mg day 1, then 80 mg days 2–3, then 2×/week until resolved", guidelines:["mnPeds"], note:"Full discharge prescription continued at home, for refractory patients, no QT effect." },
      { name:"N-acetylcysteine", dose:"Taper: Day1 600mg QD → Day2 600mg BID → Day3 1200mg AM+600mg PM → Day4 1200mg BID, continue 8 weeks", guidelines:["bostonAsap"], note:"Used to reduce cannabis cravings after acute symptoms resolve." },
      { name:"Melatonin", dose:"—", guidelines:["bostonAsap"], note:"Used for cannabis-withdrawal insomnia." },
      { name:"Buspirone", dose:"—", guidelines:["bostonAsap"], note:"Anxiety associated with withdrawal." },
      { name:"Propranolol", dose:"—", guidelines:["bostonAsap"], note:"Anxiety / autonomic withdrawal symptoms." },
      { name:"Clonidine", dose:"—", guidelines:["bostonAsap"], note:"Withdrawal symptom management." },
      { name:"Haloperidol", dose:"0.5 mg PO TID PRN", guidelines:["bostonAsap"], note:"Max 3 doses/day; do not continue &gt;7 days." }
    ]}
  ]
};

var TX_LABELS = { ed:"Emergency Department", hospital:"Hospitalization", outpatient:"Outpatient Management", discharge:"Discharge Medications" };
var TX_ORDER = ["ed","hospital","outpatient","discharge"];

var FOLLOWUP = [
  { name:"Cardiology follow-up timeframe", guidelines:["mnPeds"], note:"QTc follow-up only: EKG within 2 weeks outpatient if QTc above normal but &lt;500; cardiology referral if persists. No other guideline specifies a concrete follow-up timeframe." },
  { name:"Cannabis use disorder referral", guidelines:["laPoint","jhach","mnPeds","rcemHumphries","meyer","ucsf"], note:"Won: pharmacist counseling role mentioned but no formal referral pathway. Rubio-Tapia: cessation counseling described but no specific referral pathway. UCSF: YOSUP referral prominently included in discharge step." },
  { name:"Patient / caregiver education materials", guidelines:["laPoint","jhach","mnPeds","rcemHumphries","bostonAsap"], note:"LaPoint: verbal education on cessation and symptom return with re-exposure. Humphries: supplemental patient information leaflet (online supplemental file 1) — recommends all patients with suspected CHS receive written information (https://emj.bmj.com/content/41/5/328). UCSF: cessation resource (YOSUP), no formal patient education document. JHACH: Appendix C, CHS AVS smart phrase." },
  { name:"Substance-use programs / counselling", guidelines:["mnPeds","ucsf","jhach"], note:"Children's MN: Hazelden Plymouth (https://www.hazeldenbettyford.org/locations/plymouth), Teen Challenge (https://www.mntc.org/), https://findtreatment.gov/locator. UCSF: YOSUP youthsubstanceuse.ucsf.edu, prominently listed in discharge step. JHACH: CRAFFT tool and HEADSS exam (page 9)." },
  { name:"Nicotine cessation resources", guidelines:["mnPeds"], note:"Children's MN gives nicotine cessation resources: https://www.health.state.mn.us/communities/tobacco/quitting/index.html, Truthinitiative.org, Teen.smokefree.gov, Mylifemyquit.com, text 36072." },
  { name:"Documentation guidance", guidelines:["laPoint","jhach"], note:"JHACH: detailed coding guidance under 2021 CARES Act; confidentiality guidance for adolescent proxy access." },
  { name:"Behavioral health / psychology referral", guidelines:["agaRubio","jhach","mnPeds","meyer","ucsf","bostonAsap"], note:"Rubio-Tapia: for poor response or extensive psychiatric comorbidity. JHACH: psychology consult all admitted — motivational interviewing. Children's MN: Adolescent Medicine or Psychology at discharge. Meyer: all patients — anxiety, depression, SUD underlie chronic THC use. UCSF: SW/Psychiatry referral resources listed in discharge section; Adolescent Medicine and YOSUP." },
  { name:"Mental health screening at discharge", guidelines:["jhach","mnPeds","ucsf"], note:"PHQ-9 depression screening for all admitted patients when sober. Children's MN screens via HEADSSS but does not specify PHQ-9. (Note 1) UCSF: mental health assessed via H&amp;P but no specific tool named." },
  { name:"Referral for underlying / comorbid conditions", guidelines:["agaRubio","jhach","mnPeds","meyer","bostonAsap","ucsf"], note:"Rubio-Tapia: outpatient workup for mimics (rumination, gastroparesis, CVS, migraine, functional nausea/vomiting syndrome). JHACH: detailed differential; GI consult for multidisciplinary planning. Children's MN: Integrative Medicine Clinic — unique. Differential diagnoses across GI, CNS, GU, metabolic, psychiatric." }
];

var SPECIALS = [
  { title:"QTc safety thresholds", guidelines:["mnPeds"], text:"Children's MN gives very specific QTc thresholds and follow-up: males &gt;460, females &gt;480; repeat EKG within 2 weeks if QTc abnormal but &lt;500; cardiology if persistent or &gt;500." },
  { title:"Pregnancy exclusion", guidelines:["mnPeds","ucsf"], text:"Children's MN and UCSF exclude pregnant patients from pathway use. UCSF also excludes congenital long QTc and patients &lt;40 kg." },
  { title:"Capsaicin application safety", guidelines:["ucsf"], text:"UCSF: avoid face/eyes/GU/broken skin, no occlusive dressings, use gloves, stop if irritation, remove with milk." }
];

var OPIOID_REASONS = [
  { reason:"Can worsen nausea and vomiting", explanation:"Opioids slow gastric emptying and gastrointestinal motility, potentially worsening the underlying symptoms of CHS." },
  { reason:"May increase abdominal pain over time", explanation:"Chronic or repeated opioid exposure can lead to opioid-induced hyperalgesia and worsening abdominal pain." },
  { reason:"Do not treat the underlying mechanism", explanation:"CHS is driven by cannabinoid-related dysregulation, not a pain process that responds well to opioids." },
  { reason:"Associated with poorer outcomes", explanation:"Patients may receive repeated opioid treatment during recurrent ED visits without improvement in the disease course." },
  { reason:"Risk of dependence and misuse", explanation:"Many CHS patients have underlying substance use disorders, making opioid exposure particularly concerning." },
  { reason:"Better alternatives exist", explanation:"Haloperidol, droperidol, capsaicin, benzodiazepines, hydration, and cannabis cessation have better evidence for CHS symptom control." }
];

var AVP = [
  { heading:"Diagnosis",
    peds:"JHACH uses Lonsdale pragmatic criteria rather than relying only on Rome IV, which requires symptom resolution after cessation — impractical in pediatrics. Stronger emphasis on structured psychosocial screening (HEADSS/HEADSSS, CRAFFT, UDS when helpful, pregnancy testing) and on ruling out pediatric/adolescent mimics: pregnancy, eating disorders, CNS causes, metabolic/endocrine causes, acute abdomen, cannabis withdrawal, and psychiatric causes. Hot bathing treated as supportive only.",
    adult:"Uses Rome IV, chronic cannabis use, cyclic vomiting, abdominal pain, hot bathing, and cessation response. More focused on cannabis history — duration, frequency, product type, cyclic pattern. Hot bathing is not assumed pathognomonic (also occurs in CVS). Rules out serious abdominal/GI causes, CVS, and pregnancy when relevant." },
  { heading:"Emergency Department",
    peds:"Children's MN uniquely recommends D5-containing fluids (D10 if prolonged vomiting/ketosis). Ondansetron may be tried first; olanzapine ODT used as first-line in some pathways; lorazepam for refractory symptoms. Aprepitant considered in refractory cases. ECG required before QT-prolonging agents, with explicit thresholds (QTc &gt;460 ms male / &gt;480 ms female). IV olanzapine avoided (not FDA-approved in pediatrics); unsafe hot-water exposure avoided.",
    adult:"IV fluids standard. Ondansetron may be used initially, but haloperidol/droperidol are often preferred once CHS is strongly suspected. Olanzapine considered when QTc concerns limit haloperidol/droperidol use. Aprepitant occasionally discussed but not routinely included. QTc risk is assessed before haloperidol/droperidol, but with fewer detailed thresholds than pediatric pathways." },
  { heading:"Hospital Management",
    peds:"Consult social work/psychology; screen PHQ-9 when sober (JHACH). Actively monitor for withdrawal, cravings, anxiety, irritability, and insomnia — JHACH specifically notes patients may request premature discharge due to withdrawal/craving rather than clinical recovery. More cautious discharge planning including behavioral-health needs, family support, and substance-use referrals. JHACH explicitly advises against discharge with oral haloperidol.",
    adult:"Behavioral health referral is usually deferred to discharge or outpatient follow-up rather than embedded in the inpatient pathway. Withdrawal is acknowledged but not a major focus. Discharge is based primarily on clinical improvement — tolerating PO, hydration, symptom control, exclusion of alternative diagnoses. Limited guidance on post-discharge haloperidol continuation." },
  { heading:"Outpatient",
    peds:"Recovery-oriented approach with strong emphasis on Psychology, Psychiatry, Social Work, Adolescent Medicine, and substance-use treatment programs (e.g. YOSUP). Explicit management of cravings, anxiety, insomnia, irritability, and withdrawal. Boston Children's uniquely discusses pharmacologic support for withdrawal. Mental health disorders viewed as common co-occurring conditions requiring active management. Generally promotes complete abstinence.",
    adult:"Focus on cannabis cessation as the definitive treatment and prevention of recurrence. Behavioral health referral recommended but less integrated into the pathway. Withdrawal acknowledged but less frequently managed. Rubio-Tapia uniquely discusses gradual reduction and lower-THC products when immediate abstinence is not achievable." },
  { heading:"Medications at Discharge",
    peds:"Boston: ondansetron 4 mg TID ×1 week; haloperidol 0.5 mg PO TID PRN (max 3 doses/day, ≤7 days); NAC taper. JHACH refuses oral haloperidol at discharge due to QTc/electrolyte/EPS/monitoring concerns. Pediatric pathways more often use medications to support recovery from withdrawal, cravings, anxiety, and insomnia; Children's MN uniquely incorporates nicotine-cessation resources and NRT.",
    adult:"Most adult/general guidelines do not provide detailed discharge medication protocols. Haloperidol is discussed primarily for acute ED management, with little guidance on routine outpatient continuation. Withdrawal-management medications are rarely emphasized — focus stays on cannabis cessation itself." },
  { heading:"Follow-up Care",
    peds:"Refer to Psychology, Social Work, Toxicology, Adolescent Medicine, GI, or Integrative Medicine as indicated. JHACH recommends rehab referral for recurrent ED visits/admissions. Often includes assessment of anxiety, depression, trauma, and SUD. Confidentiality, family involvement, relapse prevention, and recovery planning are explicit considerations.",
    adult:"Written information/support resources, addiction treatment, and primary care/GI follow-up when needed. Addiction-treatment referral is encouraged but pathways are generally less structured. Behavioral health referral recommended when psychiatric comorbidity or dependence is present, but is not a major focus overall. Humphries specifically recommends written patient information." },
  { heading:"Special Considerations",
    peds:"Pregnancy excluded in several pediatric pathways; QTc thresholds matter; nicotine co-use and naloxone provision addressed by Children's MN; confidentiality is important.",
    adult:"Opioid avoidance, QTc safety, hot-shower burn risk, UDS limitations (delta-8/delta-10/synthetic products may evade detection), and patient resistance to diagnosis are the recurring themes." }
];

/* Compare-tab categories. Each maps 1:1 onto a real section of the source
   guideline table (Diagnoses / ED / Hospitalization / Outpatient / Discharge /
   Follow-up) — these are not an invented framework. The Compare tab pulls each
   guideline's entries directly from CRITERIA / TX / FOLLOWUP below, so the text
   shown is exactly what already appears in the Diagnosis, Treatment, and
   Follow-up tabs (verbatim from the source table), never re-summarized. */
var COMPARE_CATEGORIES = [
  { key:"diagnosis", label:"Diagnosis", source:"CRITERIA",
    help:"Which of the 9 diagnostic criteria this guideline requires or references, from the Diagnoses table (source PDF, p.2\u20134)." },
  { key:"ed", label:"Emergency Department", source:"TX", settingKey:"ed",
    help:"First-line and second-line ED interventions this guideline recommends, from the ED management table (source PDF, p.5\u20138)." },
  { key:"hospital", label:"Hospitalization", source:"TX", settingKey:"hospital",
    help:"Inpatient management this guideline recommends, from the hospitalization table (source PDF, p.9\u201310)." },
  { key:"outpatient", label:"Outpatient management", source:"TX", settingKey:"outpatient",
    help:"Long-term outpatient management this guideline recommends, from the outpatient table (source PDF, p.11\u201313)." },
  { key:"discharge", label:"Discharge medications", source:"TX", settingKey:"discharge",
    help:"Take-home medications this guideline specifies at discharge, from the discharge medications table (source PDF, p.14\u201315)." },
  { key:"followup", label:"Follow-up care", source:"FOLLOWUP",
    help:"Referral pathways, education, and follow-up this guideline recommends, from the follow-up care table (source PDF, p.16\u201319)." }
];

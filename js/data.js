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
  {
    "name": "Rome IV",
    "guidelines": [
      "agaRubio",
      "jhach",
      "mnPeds",
      "rcemHumphries",
      "won",
      "saemGrace4",
      "ucsf"
    ],
    "status": {
      "laPoint": "Not mentioned",
      "agaRubio": "Yes",
      "jhach": "Yes, but explicitly critiques its pediatric applicability",
      "mnPeds": "Yes, with pediatric limitation",
      "rcemHumphries": "Yes / referenced",
      "meyer": "Not mentioned as the diagnostic framework",
      "won": "Yes — explicitly requires it",
      "saemGrace4": "Referenced",
      "ucsf": "Yes — explicitly operationalized",
      "bostonAsap": "Need to distinguish from Meyer",
      "hsu": "Not established from the source as a diagnostic criterion"
    },
    "notes": {
      "laPoint": "Does not use Rome IV as its diagnostic framework. LaPoint instead proposes clinical diagnostic characteristics based on the literature/case data available at the time. Do not label this guideline as following Rome IV.",
      "agaRubio": "Uses Rome IV as the established diagnostic framework for CHS, but provides more specific clinical criteria to improve diagnostic certainty, including chronic cannabis exposure and sustained abstinence to demonstrate symptom resolution.",
      "jhach": "Presents Rome IV but does not rely on it as the preferred pediatric diagnostic standard. The pathway notes that Rome IV was developed using adult data and requires symptom resolution after sustained cannabis cessation, which is difficult to establish during an acute pediatric presentation; JHACH therefore uses the Lonsdale pragmatic pediatric criteria (≥3 months regular cannabis use, onset/worsening of cyclic vomiting after cannabis use, and exclusion of other causes). Pediatric Lonsdale Criteria: https://pubmed.ncbi.nlm.nih.gov/33127240/",
      "mnPeds": "Lists Rome IV but explicitly notes that the criteria were developed for diagnosing adults. The pathway therefore uses the overall clinical presentation and supporting CHS features in adolescents rather than treating Rome IV alone as sufficient for pediatric diagnosis.",
      "rcemHumphries": "References Rome IV diagnostic criteria in discussing recognition of CHS, alongside characteristic clinical features such as long-term cannabis use, cyclic nausea/vomiting, abdominal pain, hot bathing behavior, and symptom resolution with abstinence.",
      "meyer": "Does not mention or apply Rome IV and states that there are currently no definitive diagnostic criteria for CHS. CHS is treated as a clinical diagnosis based on the constellation of severe abdominal pain, emesis, compulsive bathing, and chronic cannabis use, and should remain a diagnosis of exclusion at first presentation.",
      "won": "All criteria in the Rome IV criteria for CHS must be met. Won also identifies an important limitation: Rome IV requires symptom relief with sustained cannabis cessation/abstinence, making confirmation difficult during the initial ED encounter.",
      "saemGrace4": "Uses Rome IV in its discussion/definition of CHS, but GRACE-4 itself is primarily an ED management guideline; its principal CHS recommendations concern treatment rather than proposing alternative diagnostic criteria.",
      "ucsf": "Directly uses Rome IV in its clinical algorithm and states that “all must be present.” It requires stereotypical episodic vomiting resembling CVS, prolonged excessive cannabis use, and relief with sustained cessation; criteria must be fulfilled for the last 3 months, with symptom onset at least 6 months before diagnosis. The algorithm directs patients with high suspicion for CHS to “See Rome IV criteria.”",
      "bostonAsap": "CHS diagnosis should be considered with &gt;1 year of cannabis use, typically weekly or more (most often daily), characteristic GI symptoms, exclusion of organic causes, and relief with hot water; the tip sheet considers hot-water relief pathognomonic for CHS.",
      "hsu": "Does not use Rome IV and explicitly states that CHS diagnostic criteria have not been formalized. The authors acknowledge Simonetto et al.’s proposed guideline for identifying CHS; however, for cases with potential confounders such as pregnancy or cancer, the review relied on author expertise for diagnosis."
    }
  },
  {
    "name": "Regular / Chronic Cannabis Use",
    "guidelines": [
      "laPoint",
      "agaRubio",
      "jhach",
      "mnPeds",
      "rcemHumphries",
      "meyer",
      "won",
      "saemGrace4",
      "ucsf",
      "bostonAsap",
      "hsu"
    ],
    "notes": {
      "laPoint": "Regular cannabis use is a cardinal diagnostic characteristic and cannabis use is required for the diagnosis. The guideline’s evidence summary reports cannabis use &gt;1 year in 74.8% of cases; chronic use accompanies cyclic nausea/vomiting and other characteristic CHS features.",
      "agaRubio": "Provides a specific exposure threshold: cannabis use for &gt;1 year before symptom onset and &gt;4 times/week on average. The cited systematic review of 271 CHS cases found a mean 6.6 years of cannabis use before symptoms and daily use in 68%.",
      "jhach": "Uses a lower pediatric threshold than adult criteria: regular cannabis use for ≥3 months is a major pragmatic diagnostic criterion. The history should characterize long-term cannabis exposure, including synthetic, edible, botanical, and prescription cannabis.",
      "mnPeds": "Most patients with CHS have used cannabis at least weekly for months to years, often with escalation of dosing. History should specifically document the product, duration, quantity, and frequency of cannabis use.",
      "rcemHumphries": "Recognizes regular/chronic cannabis exposure as an important feature of CHS. The evidence cited in the guideline reports history of regular cannabis use for &gt;1 year in 74.8% of patients; the guideline emphasizes obtaining a detailed cannabis-use history when CHS is suspected.",
      "meyer": "Chronic cannabis use is part of the clinical constellation used to suspect CHS. Almost all CHS patients are described as using cannabis at least weekly, with most reporting daily use; the paper does not specify a minimum duration threshold for diagnosis.",
      "won": "CHS is associated with chronic, heavy cannabis exposure—typically use for several years, ranging from nearly daily to multiple times/day. In a survey of 1,041 self-reported CHS patients, nearly half reported &gt;5 years of cannabis use before CHS, while only 40% used &gt;5 times/day, suggesting duration may be more strongly associated with CHS than extreme daily frequency.",
      "saemGrace4": "Defines CHS as frequent/severe vomiting and nausea with abdominal pain in patients who “regularly and frequently use cannabis.” It does not provide a specific minimum duration or frequency threshold in its CHS definition.",
      "ucsf": "Uses Rome IV exposure language: CHS presentation occurs after “prolonged use of cannabis.” Does not quantify prolonged use with a specific minimum number of months/years or uses/week in the Rome IV criterion.",
      "bostonAsap": "Provides a specific practical threshold: consider CHS in patients who have used cannabis for &gt;1 year. Most patients with CHS use cannabis weekly or more, most often daily; history should also assess cannabis product type, and the tip sheet notes that more potent preparations increase risk.",
      "hsu": "Does not establish a specific cannabis-use duration or frequency criterion for diagnosis. The review states that CHS diagnostic criteria have not been formalized and references Simonetto et al.’s proposed diagnostic guideline."
    }
  },
  {
    "name": "Urine Drug Screen",
    "guidelines": [
      "laPoint",
      "jhach",
      "mnPeds",
      "meyer",
      "won",
      "ucsf"
    ],
    "status": {
      "laPoint": "Yes",
      "agaRubio": "No / Not specifically recommended",
      "jhach": "Yes",
      "mnPeds": "Yes",
      "rcemHumphries": "No / Not specifically recommended",
      "meyer": "Yes",
      "won": "Yes",
      "saemGrace4": "No / Not specifically recommended",
      "ucsf": "Yes",
      "bostonAsap": "No / Not specifically recommended",
      "hsu": "No / Not specifically recommended"
    },
    "notes": {
      "laPoint": "Urine drug screening is included in the proposed ED evaluation/management algorithm for suspected CHS. It is used to help establish cannabis exposure in the appropriate clinical setting, rather than functioning as a stand-alone diagnostic test. The paper explicitly defines UDS = urine drug screen in its CHS algorithm.",
      "agaRubio": "Does not specify urine drug screening as a diagnostic criterion or required CHS test. Diagnosis centers on the clinical pattern, cannabis exposure (&gt;1 year and &gt;4 times/week), and symptom resolution with sustained abstinence.",
      "jhach": "UDS is a key initial laboratory test to consider. The JHACH assay tests for THC; patients using cannabidiol products such as CBD oil or Epidiolex are not expected to test positive for THC on this assay. A positive urinary THC screen supports but cannot confirm CHS.",
      "mnPeds": "Uses a urine Drugs of Abuse Screen as part of evaluation. The rapid screen (~1 hour) includes THC, but does not detect CBD/Epidiolex or synthetic cannabis. The guideline explicitly warns that UDS cannot replace a thorough cannabis history. THC may remain detectable weeks to months after cessation, so a positive result does not necessarily indicate new use.",
      "rcemHumphries": "Does not establish urine THC testing/UDS as a required diagnostic test for CHS. The diagnosis remains primarily clinical.",
      "meyer": "Explicitly recommends a urine drug screen that includes THC in the initial evaluation of suspected CHS. A negative THC result may exclude CHS, but interpretation is limited by the laboratory detection threshold. For example, with a 25 ng/mL cutoff, 24 ng/mL is reported negative. Synthetic THC and analogues such as delta-8 and delta-10 may also fail to produce a positive urine toxicology result.",
      "won": "Discusses urine drug/toxicology testing as part of the diagnostic evaluation of suspected CHS, particularly when cannabis exposure is uncertain. However, CHS remains a clinical diagnosis based on Rome IV, rather than being confirmed by a positive UDS.",
      "saemGrace4": "Does not make UDS a diagnostic requirement or specific recommendation for establishing CHS. Its CHS guidance focuses predominantly on ED treatment rather than prescribing a diagnostic laboratory workup.",
      "ucsf": "Includes urine toxicology/THC testing in the evaluation of suspected CHS. A positive cannabis screen can support the cannabis-exposure history, but does not independently establish CHS; the overall clinical criteria and exclusion of alternative causes remain necessary.",
      "bostonAsap": "Does not clearly establish UDS as a required component of CHS diagnosis in the source reviewed.",
      "hsu": "Does not provide a specific recommendation making urine drug screening part of the CHS diagnostic criteria."
    }
  },
  {
    "name": "Compulsive Bathing / Hot Showers",
    "guidelines": [
      "laPoint",
      "agaRubio",
      "jhach",
      "mnPeds",
      "rcemHumphries",
      "meyer",
      "won",
      "saemGrace4",
      "ucsf",
      "bostonAsap",
      "hsu"
    ],
    "notes": {
      "laPoint": "Strongly characteristic of CHS: compulsive hot showers/baths provided symptom relief in 92.3% of cases cited by the guideline. Heat &gt;41°C activates TRPV1, which may explain the effect. Hot showers are also recommended for symptomatic relief, with a warning about burns.",
      "agaRubio": "Recognizes hot bathing as a common supportive feature, but not a required or pathognomonic diagnostic criterion. Hot bathing can also occur in cyclic vomiting syndrome (CVS), so its presence alone should not be used to distinguish CHS from CVS.",
      "jhach": "Supportive, not required: both Rome IV supportive history and the preferred pediatric pragmatic criteria list symptomatic relief with prolonged hot showers/baths as a supporting feature rather than a major criterion. JHACH specifically notes that both CHS and CVS can improve with hot showers, limiting its specificity.",
      "mnPeds": "Uses relief with hot showers/baths as a characteristic clinical feature and as a way to distinguish CHS from cannabis withdrawal: it is supportive of CHS rather than sufficient by itself for diagnosis.",
      "rcemHumphries": "Recognizes compulsive hot showers/baths as a characteristic feature supporting CHS diagnosis, but does not make the behavior independently diagnostic; the overall clinical history and chronic cannabis exposure remain necessary.",
      "meyer": "Compulsive bathing is part of the clinical constellation used to suspect CHS. Patients often obtain transient relief from prolonged hot-water exposure and may bathe compulsively because symptoms return after heat is removed; CHS should be suspected with severe abdominal pain, emesis, compulsive bathing, and chronic cannabis use.",
      "won": "Recognizes hot bathing as a characteristic CHS behavior and discusses very hot water exposure as symptomatic relief. Hot-water exposure is supportive of the diagnosis but does not replace the broader diagnostic criteria; the review discusses temperatures around &gt;43°C in relation to hydrothermotherapy.",
      "saemGrace4": "Recognizes hot bathing/showering as a characteristic feature of CHS but does not require it for diagnosis. Absence of compulsive hot bathing therefore does not exclude CHS.",
      "ucsf": "Includes relief with hot showers/baths as a supportive feature of CHS, alongside chronic cannabis exposure, cyclic vomiting, abdominal pain, and response to cessation; it is not sufficient as a stand-alone diagnostic criterion.",
      "bostonAsap": "Gives hot-water relief particularly strong diagnostic weight: relief with hot water is “pathognomonic for CHS.”",
      "hsu": "Hot bathing is discussed as a characteristic behavior/symptom-relieving strategy associated with CHS. The review primarily focuses on treatment rather than defining formal diagnostic criteria."
    }
  },
  {
    "name": "Symptom Resolution with Cannabis Cessation",
    "guidelines": [
      "laPoint",
      "agaRubio",
      "jhach",
      "mnPeds",
      "rcemHumphries",
      "meyer",
      "won",
      "saemGrace4",
      "ucsf",
      "bostonAsap",
      "hsu"
    ],
    "notes": {
      "laPoint": "Symptom resolution after cannabis cessation is a cardinal diagnostic characteristic. The guideline cites resolution after cessation in 96.8% of cases and notes that symptoms may recur with cannabis re-exposure.",
      "agaRubio": "Makes symptom resolution after abstinence part of the proposed clinical diagnostic criteria. Resolution should occur after ≥6 months of cannabis abstinence or for a period equal to at least 3 typical vomiting cycles in that patient.",
      "jhach": "Highlights this criterion as difficult to apply prospectively in acute pediatric care. The pathway notes incomplete evidence on the relationship between cessation and symptom resolution and no clear definition of clinically significant cessation; therefore, the preferred pediatric pragmatic criteria do not require demonstrated resolution after cessation to make the diagnosis.",
      "mnPeds": "Lists relief of vomiting with sustained cannabis cessation as part of Rome IV, while noting that Rome IV was developed for adults. The pathway also counsels that cannabis cessation is the only definitive cure, but does not require documented symptom resolution before treating an adolescent as having suspected CHS.",
      "rcemHumphries": "Recognizes improvement or resolution after cannabis cessation as a characteristic feature supporting CHS, and emphasizes abstinence as the only definitive preventive treatment.",
      "meyer": "Symptoms may resolve within several days after cannabis cessation but can persist for up to 2 weeks. The prolonged recovery is attributed in part to THC’s lipophilicity and storage in adipose tissue for up to 28 days. Complete cessation of THC in all forms is described as the only true treatment.",
      "won": "Requires relief of vomiting episodes with sustained cannabis cessation because all Rome IV criteria must be met for CHS diagnosis. Won specifically identifies this as a limitation of Rome IV because sustained cessation and subsequent symptom relief are difficult to establish during an acute ED encounter.",
      "saemGrace4": "Recognizes cannabis cessation as necessary for symptom resolution but does not make documentation of post-cessation resolution the focus of its ED recommendations. GRACE-4 is centered on acute ED treatment; cessation is required for long-term resolution rather than serving as an immediately verifiable ED criterion.",
      "ucsf": "Uses the Rome IV criterion requiring relief of vomiting episodes with sustained cessation of cannabis use. Because the UCSF pathway states that all Rome IV criteria must be present, documented improvement with sustained cessation is incorporated into its diagnostic framework.",
      "bostonAsap": "States directly that abstinence from cannabis is the treatment for CHS and that symptoms resolve with sustained cessation. Symptoms generally resolve within days to 2 weeks and may recur when cannabis use resumes.",
      "hsu": "Cannabis cessation is discussed as central to CHS treatment, but the paper does not establish a specific duration of abstinence or formal symptom-resolution threshold as a diagnostic criterion. Because Hsu notes that CHS diagnostic criteria are not formalized, no specific cessation-confirmation interval should be assigned to this source."
    }
  },
  {
    "name": "Stages / Frameworks",
    "guidelines": [
      "agaRubio",
      "jhach",
      "mnPeds",
      "won",
      "hsu"
    ],
    "status": {
      "agaRubio": "4-phase CVS framework",
      "won": "4-phase CVS framework",
      "jhach": "3-phase CHS framework",
      "mnPeds": "3-phase CHS framework",
      "hsu": "3-stage CHS framework"
    },
    "notes": {
      "agaRubio": "4-phase CVS framework: describes interepisodic → prodromal → emetic → recovery phases. The interepisodic phase occurs between attacks; the prodromal phase precedes vomiting; the emetic phase represents the acute vomiting episode; and the recovery phase begins as vomiting resolves.",
      "won": "4-phase CVS framework: describes inter-episodic → prodromal → emetic → recovery phases. Inter-episodic = minimal/no symptoms; prodromal = nausea and abdominal pain for ~30–90 min, sweating and chills; emetic = vomiting, abdominal pain and extreme thirst; recovery = vomiting subsides.",
      "jhach": "3-phase CHS framework: describes CHS as having 3 clear phases of symptoms and uses this well-defined clinical pattern as a feature distinguishing CHS from cannabis withdrawal syndrome, which has no defined pattern.",
      "mnPeds": "3-phase CHS framework: explicitly identifies prodromal → hyperemetic → recovery phases. The prodromal phase can last months to years with early-morning nausea, fear of vomiting and abdominal discomfort; the hyperemetic phase involves incapacitating paroxysmal vomiting, often with abdominal pain, and averages 3–4 days.",
      "hsu": "3-stage CHS framework: describes CHS as progressing through prodromal → hyperemetic → recovery stages. The review particularly focuses treatment on controlling symptoms during the hyperemetic stage to facilitate recovery and reduce repeat ED visits and unnecessary diagnostic testing."
    }
  }
];

var PHASES = [
  { idx:"01", name:"Prodromal", text:"Early nausea and abdominal discomfort before vomiting starts. Abortive therapy started here may prevent a full episode — but patients often increase cannabis use, believing it relieves symptoms, which can worsen the episode." },
  { idx:"02", name:"Emetic", text:"What most ED visits represent: severe repetitive vomiting, intense nausea, abdominal pain, dehydration, electrolyte abnormalities, and frequent hot-shower behavior. IV fluids, electrolyte repletion, haloperidol, droperidol, and capsaicin are used here; hospitalization may follow for refractory symptoms." },
  { idx:"03", name:"Recovery", text:"Usually follows cessation and symptom control. Vomiting resolves, appetite returns, oral intake advances, hydration normalizes. Watch for premature discharge driven by withdrawal cravings (specifically flagged by JHACH). Discharge planning and behavioral-health referral belong here." },
  { idx:"04", name:"Inter-episodic", text:"Asymptomatic between episodes — the best window for long-term management. Reinforce cessation counseling, offer substance-use treatment, and consider prophylactic therapy (e.g. amitriptyline). Relapse is common if cannabis use resumes." }
];

/* Treatment settings: ed, hospital, outpatient, discharge */

var TX = {
  "ed": [
    {
      "group": "First-line management (overview)",
      "items": [
        {
          "name": "First-line / initial ED approach",
          "dose": "",
          "guidelines": [
            "laPoint",
            "agaRubio",
            "jhach",
            "mnPeds",
            "rcemHumphries",
            "meyer",
            "won",
            "saemGrace4",
            "ucsf",
            "bostonAsap",
            "hsu"
          ],
          "notes": {
            "laPoint": "Supportive care with IV fluid/electrolyte replacement and conventional antiemetics; topical capsaicin is favored as an early/first-line CHS-specific treatment. Capsaicin can be applied to the abdomen and repeated 3–4 times/day PRN; haloperidol 5 mg IV/IM is another treatment option.",
            "agaRubio": "Acute management includes IV fluid/electrolyte replacement and antiemetic therapy; topical capsaicin 0.1% to the upper abdomen and haloperidol are CHS-directed treatment options. Conventional antiemetics such as ondansetron may be used but often have limited efficacy.",
            "jhach": "Treat dehydration with NS bolus 20 mL/kg (max 1,000 mL), followed by maintenance fluids; replete potassium when K⁺ &lt;3 mEq/L. Ondansetron is first-line at 0.3–0.4 mg/kg/dose (max 8 mg); if ineffective, escalate to haloperidol 0.05 mg/kg/dose (max 2 mg) or droperidol 0.05 mg/kg/dose (max 2.5 mg). Capsaicin 0.025% may be used as an initial adjunct.",
            "mnPeds": "Start IV fluids and obtain ECG. First-line medication selection depends on QTc: with prolonged QTc, consider olanzapine ODT, aprepitant PO, capsaicin 0.075%, or lorazepam IV/PO; without prolonged QTc, options additionally include droperidol IV, diphenhydramine IV, and ondansetron IV/ODT. For ongoing hydration, NS bolus if needed → D5NS + 20 mEq KCl/L at 1–1.5× maintenance; dextrose-containing fluids are used to reduce lipolysis of THC stored in adipose tissue, with D10 considered when vomiting &gt;3 days.",
            "rcemHumphries": "Initial ED care includes supportive treatment for dehydration/electrolyte disturbance and conventional antiemetics. If symptoms are refractory to standard antiemetics, consider haloperidol or topical capsaicin rather than repeatedly relying on conventional antiemetics.",
            "meyer": "Acute treatment includes IV fluid/electrolyte replacement and antiemetic therapy; discusses haloperidol/droperidol and topical capsaicin as important CHS-directed therapies, with aprepitant considered in refractory cases.",
            "won": "Initial goals are rehydration, correction of electrolyte abnormalities, and symptom relief. Ondansetron 4–8 mg IV/IM/ODT, repeat Q4–8h PRN, is usual care; haloperidol/droperidol and capsaicin may be added. Haloperidol 0.5–5 mg IV/IM and droperidol 0.625–2.5 mg IV/IM are described; benzodiazepines and opioids should not be first-line.",
            "saemGrace4": "Uses “usual care” as the baseline treatment and conditionally recommends adding haloperidol/droperidol or topical capsaicin for CHS symptoms. Benzodiazepines and opioids should not be used as first-line therapy. Evidence supporting haloperidol/droperidol and capsaicin is very low certainty.",
            "ucsf": "Start IV fluids and obtain ECG. Capsaicin 0.075% may be used first-line. If QTc &lt;460 ms, give haloperidol 2.5 mg and alternate with diphenhydramine 25–50 mg IV Q6H; if ineffective, repeat haloperidol 2.5 mg Q1H to max 5 mg and/or capsaicin. If QTc is prolonged, use capsaicin/alternative therapies rather than IV haloperidol.",
            "bostonAsap": "Keep separate from Meyer. The Boston pathway's own initial/first-line treatment should be coded from its pathway rather than importing Meyer’s recommendations.",
            "hsu": "Keep as a separate source. The current retrieved material does not give enough source text to safely assign a specific first-line ED drug/dose without making an assumption."
          }
        }
      ]
    },
    {
      "group": "Antiemetics (overview)",
      "items": [
        {
          "name": "Antiemetics — general approach",
          "dose": "",
          "guidelines": [
            "laPoint",
            "agaRubio",
            "jhach",
            "mnPeds",
            "rcemHumphries",
            "meyer",
            "won",
            "saemGrace4",
            "ucsf",
            "bostonAsap",
            "hsu"
          ],
          "notes": {
            "laPoint": "Conventional antiemetics may be used, but reported effectiveness is mixed. The guideline lists ondansetron 4–8 mg IV, metoclopramide 10 mg IV, diphenhydramine 25–50 mg IV, and benzodiazepines among symptomatic options, while emphasizing capsaicin and other CHS-directed therapies.",
            "agaRubio": "Traditional antiemetics such as ondansetron may be used for acute nausea/vomiting but often have limited efficacy in CHS. The guideline discusses CHS-directed therapy such as haloperidol and capsaicin when conventional antiemetics are inadequate.",
            "jhach": "Ondansetron remains explicit first-line therapy despite limited efficacy: only about one-third of patients respond to enteral ondansetron. Dose is 0.3–0.4 mg/kg/dose, max 8 mg. If the triage dose fails, do not give additional ondansetron doses; escalate to haloperidol/droperidol instead.",
            "mnPeds": "Notes that typical antiemetics such as ondansetron are often ineffective, but ondansetron remains among the pathway’s first-line options when QTc is not prolonged. ED options include ondansetron IV/ODT; inpatient dosing is 0.15 mg/kg IV or ODT Q6H, max 8 mg/dose, and continued use is most appropriate when a trial dose has been beneficial.",
            "rcemHumphries": "States that standard antiemetics frequently fail in CHS; refractory symptoms after conventional antiemetics should prompt CHS-specific treatment such as haloperidol or topical capsaicin rather than repeated conventional antiemetic therapy.",
            "meyer": "Describes conventional antiemetics such as ondansetron as commonly attempted but often ineffective in CHS; dopamine antagonists and capsaicin are emphasized when standard antiemetics fail, with aprepitant discussed for refractory symptoms.",
            "won": "Serotonin 5-HT3 antagonists are considered “usual care” but have marginal efficacy as monotherapy. Ondansetron is given 4–8 mg IV/IM once, repeat Q4–8H PRN, or 4–8 mg ODT Q4–8H PRN; dopamine antagonists or capsaicin may be added when symptoms persist.",
            "saemGrace4": "Treats conventional antiemetics such as ondansetron as part of “usual care,” but specifically notes that routinely prescribed antiemetics such as ondansetron, metoclopramide, and prochlorperazine are typically ineffective in CHS. Haloperidol/droperidol or capsaicin are conditionally recommended in addition to usual care.",
            "ucsf": "Does not use ondansetron as initial CHS-directed therapy. After haloperidol and capsaicin fail, ondansetron or metoclopramide may be used as alternative/rescue therapy only when QTc is not prolonged; the pathway therefore places conventional antiemetics later than haloperidol/capsaicin.",
            "bostonAsap": "Recommends a trial of ondansetron 4 mg TID for nausea; if symptoms are refractory to ondansetron, escalate to haloperidol 1 mg IV. Lorazepam is described as a nausea treatment but is reserved for hospitalized patients.",
            "hsu": "Reviews several antiemetics but highlights that most successful reports involved combination therapy rather than antiemetic monotherapy. Ondansetron was reported effective in 13 cases, usually in combination, with a typical dose of 4 mg IV; promethazine 12.5 mg and metoclopramide 20 mg IV were also reported, again mostly as part of combinations. The review notes that several standard antiemetics were not superior to placebo and that treatment failures are common."
          }
        }
      ]
    },
    {
      "group": "Antipsychotics",
      "items": [
        {
          "name": "Haloperidol",
          "dose": "",
          "guidelines": [
            "laPoint",
            "agaRubio",
            "jhach",
            "mnPeds",
            "rcemHumphries",
            "meyer",
            "won",
            "saemGrace4",
            "ucsf",
            "bostonAsap",
            "hsu"
          ],
          "notes": {
            "laPoint": "Lists haloperidol 5 mg IV/IM as a CHS treatment option, particularly when conventional antiemetics are insufficient; olanzapine is also discussed as an alternative antipsychotic.",
            "agaRubio": "Supports haloperidol for acute CHS symptom control, particularly when conventional antiemetics are ineffective; the guideline discusses dopamine-antagonist therapy alongside capsaicin and supportive care.",
            "jhach": "Haloperidol is second-line after ondansetron failure: 0.05 mg/kg/dose enteral, IM, or IV, max 2 mg/dose. The pathway notes evidence that haloperidol is superior to ondansetron for reducing nausea/abdominal pain and ED length of stay, but emphasizes QT-risk with IV administration.",
            "mnPeds": "Haloperidol is notably not included among its preferred first-line ED medications; the pathway instead favors agents such as droperidol, olanzapine, aprepitant, capsaicin, lorazepam, and ondansetron depending on QTc. This is an important contrast with JHACH/UCSF.",
            "rcemHumphries": "Recommends haloperidol for refractory CHS symptoms when standard antiemetics have failed, alongside topical capsaicin; conventional antiemetics alone are often ineffective.",
            "meyer": "Discusses haloperidol as an effective acute CHS treatment and cites the HaVOC trial supporting superiority over ondansetron. It is part of the acute pharmacologic approach along with droperidol, capsaicin, and other rescue therapies.",
            "won": "Haloperidol is used in addition to usual care rather than as first-line monotherapy. Adult dose: 0.5–5 mg IV/IM once, with repeat dosing for persistent symptoms; monitor for EPS and QTc prolongation. The review cites HaVOC, where 0.05 or 0.1 mg/kg IV outperformed ondansetron 8 mg IV for nausea and abdominal pain.",
            "saemGrace4": "Conditionally recommends haloperidol or droperidol in addition to usual care for adult CHS, with very low certainty of evidence. It does not establish haloperidol as mandatory first-line therapy.",
            "ucsf": "Uses a very specific haloperidol pathway: if QTc &lt;460 ms, give haloperidol 2.5 mg, alternating with diphenhydramine 25–50 mg IV Q6H; if ineffective, repeat 2.5 mg Q1H to max 5 mg and/or add capsaicin. If QTc ≥460 ms, avoid IV haloperidol and use capsaicin/alternative therapies.",
            "bostonAsap": "Uses haloperidol only after ondansetron is refractory: recommends haloperidol 1 mg IV, with the document noting conversion to 0.5 mg PO TID PRN, max 3 doses/day and ≤7 days for subsequent oral use.",
            "hsu": "Reviews haloperidol as one of the better-supported agents in published CHS cases: 11 successful cases across eight articles, with doses 1–5 mg IV and symptom relief generally within about 1 hour. It was sometimes combined with olanzapine, diazepam/ondansetron, or diphenhydramine."
          }
        },
        {
          "name": "Droperidol",
          "dose": "",
          "guidelines": [
            "jhach",
            "mnPeds",
            "meyer",
            "won",
            "saemGrace4"
          ],
          "notes": {
            "jhach": "Droperidol is second-line after ondansetron failure, alongside haloperidol. Pediatric dose: 0.05 mg/kg/dose IV/IM, max 2.5 mg. The pathway notes literature suggesting droperidol may reduce additional antiemetic use and length of stay compared with haloperidol.",
            "mnPeds": "Droperidol is a first-line option when QTc is not prolonged. In the treatment pathway, dosing is 1.25 mg IV Q6H PRN, with increase to a maximum 2.5 mg/dose if needed; QT-prolonging medications should be minimized when QTc is prolonged.",
            "meyer": "Discusses droperidol as an acute dopamine-antagonist option for CHS, generally alongside haloperidol and other CHS-directed therapies. The source supports its use as part of acute symptom control rather than a unique first-line hierarchy.",
            "won": "Describes droperidol as a mainstay of ED CHS treatment. Dose: 0.625–2.5 mg IV/IM once, up to 5 mg per dose, with repeat dosing for persistent symptoms; onset is about 3–10 minutes. A retrospective study found 0.625 mg was the most common dose, while another study used 2.5 mg IV + diphenhydramine 25 mg IV with significant reductions in nausea/vomiting and abdominal pain.",
            "saemGrace4": "Conditionally recommends droperidol or haloperidol in addition to usual care for adult CHS symptom management, with very low certainty of evidence. It is not framed as mandatory first-line monotherapy."
          }
        },
        {
          "name": "Olanzapine",
          "dose": "",
          "guidelines": [
            "mnPeds",
            "laPoint",
            "hsu",
            "won"
          ],
          "notes": {
            "mnPeds": "Olanzapine ODT is a first-line ED medication regardless of whether QTc is prolonged. The inpatient pathway specifies olanzapine 5–10 mg PO BID PRN.",
            "laPoint": "Olanzapine is discussed as an antipsychotic treatment option for CHS; limited case reports describe complete symptom relief with olanzapine or haloperidol. Capsaicin, however, is the guideline's recommended first-line treatment, so olanzapine is not designated first-line.",
            "hsu": "Olanzapine is Step 2 of the proposed algorithm, after topical capsaicin: use olanzapine 5 mg IM or 10 mg PO, alternatively haloperidol 5 mg IV/IM/PO. If symptoms persist after 8 hours, repeat Step 2 or advance to Step 3. The review found two successful olanzapine cases, with typical doses 5–10 mg and relief ranging from 10 min–4 h.",
            "won": "Discusses olanzapine for patients refractory to usual CHS therapies. A four-patient case series used a single olanzapine ODT dose, usually 5–10 mg (one patient received 20 mg because of their existing regimen); symptom relief occurred within 15–30 min in three patients. Won emphasizes that further studies are needed to define olanzapine's role in acute ED CHS treatment."
          }
        }
      ]
    },
    {
      "group": "Topical & physical therapies",
      "items": [
        {
          "name": "Topical Capsaicin",
          "dose": "",
          "guidelines": [
            "laPoint",
            "agaRubio",
            "jhach",
            "mnPeds",
            "rcemHumphries",
            "meyer",
            "won",
            "saemGrace4",
            "ucsf",
            "bostonAsap",
            "hsu"
          ],
          "notes": {
            "laPoint": "Recommends topical capsaicin as first-line treatment for CHS. Apply to the abdomen or backs of the arms; it may be reapplied 3–4 times daily PRN. The guideline favors capsaicin because it is inexpensive, has a low adverse-effect risk, and may reproduce the relief patients obtain from hot showers.",
            "agaRubio": "Includes topical capsaicin among acute CHS treatment options, with 0.1% capsaicin applied to the upper abdomen discussed as a treatment for acute symptoms.",
            "jhach": "Capsaicin 0.025% is an initial adjunctive therapy and may be used together with other medications. Apply a small amount topically and monitor for adverse skin reactions such as irritation or blistering.",
            "mnPeds": "Capsaicin 0.075% is a first-line medication option regardless of QTc status. It is particularly useful when QT-prolonging medications need to be avoided; the pathway includes topical capsaicin among its initial medication choices.",
            "rcemHumphries": "For refractory nausea/vomiting not responding to standard antiemetics, consider topical capsaicin alongside haloperidol. It is therefore positioned as treatment for refractory symptoms rather than routine initial antiemetic therapy.",
            "meyer": "Discusses topical capsaicin as an acute symptomatic treatment for CHS, acting through TRPV1 and reproducing the symptom-relieving mechanism associated with hot-water exposure; it is included among pharmacologic approaches when standard antiemetics are ineffective.",
            "won": "Capsaicin is an adjunct to dopamine antagonists and supportive/usual care. Concentrations 0.025%, 0.075%, 0.1%, and 0.15% have been reported; apply a 1-inch strip or ~1-mm layer, usually to the upper abdomen, although chest/back of arms are also reported. May repeat up to 3–4 times/day PRN. Won explicitly notes that there is no consensus on dosing/administration.",
            "saemGrace4": "Conditionally recommends topical capsaicin in addition to usual care for adult CHS, based on very low certainty of evidence. It is an adjunct, rather than a replacement for usual supportive/antiemetic care.",
            "ucsf": "Capsaicin 0.075% may be used first-line, with haloperidol, or when QTc prolongation makes IV haloperidol unsuitable. Prioritize areas where hot water relieves symptoms. The pathway also provides extensive application-safety instructions.",
            "bostonAsap": "Includes topical capsaicin as a symptomatic CHS treatment option, used as part of the acute management strategy rather than as the definitive treatment; cannabis cessation remains necessary for long-term resolution.",
            "hsu": "Capsaicin is Step 1 in the proposed treatment algorithm and therefore the preferred initial CHS-specific treatment. The review identified 16 successful cases; concentrations ranged from 0.075%–0.25%, applied to the abdomen, with reported relief at approximately 30 minutes. In 11/16 cases, capsaicin was actually administered after other agents had failed."
          }
        },
        {
          "name": "Hot Showers / Hydrothermal Therapy",
          "dose": "",
          "guidelines": [
            "rcemHumphries",
            "jhach",
            "ucsf",
            "won",
            "laPoint",
            "meyer",
            "hsu"
          ],
          "notes": {
            "rcemHumphries": "Explicitly recommends access to a hot shower or bath for symptom relief if pharmacologic treatment fails and the patient requires admission. The guideline also reports compulsive hot showers/baths with symptom relief in 92.3% of CHS cases.",
            "jhach": "Recognizes seeking a hot shower for relief as characteristic of CHS and notes hot showers as a way to mitigate symptoms; however, the ED-management section does not explicitly prescribe or recommend hydrothermal therapy as an acute treatment.",
            "ucsf": "Uses the patient's response to hot water to guide capsaicin treatment rather than prescribing hot showers themselves: apply capsaicin preferentially to areas where the patient reports hot water relieves symptoms; patients are told capsaicin may rapidly mimic the effect of hot showers.",
            "won": "Describes hot-water bathing as providing temporary symptomatic relief and as the basis for TRPV1-directed capsaicin therapy, but does not establish hot showers/baths as a standardized ED treatment protocol.",
            "laPoint": "Discusses hot showers/baths as providing temporary relief of CHS symptoms and links this response mechanistically to capsaicin/TRPV1 activation; capsaicin is favored as the practical ED treatment rather than prescribing hydrothermal therapy itself.",
            "meyer": "Discusses hot bathing as a characteristic temporary symptom-relieving behavior in CHS and in relation to the proposed TRPV1 mechanism; it is not presented as a standardized ED treatment regimen.",
            "hsu": "Hot showers/baths are discussed as a characteristic source of temporary symptom relief and as part of the rationale for topical capsaicin, but the proposed pharmacologic treatment algorithm does not include hydrothermal therapy as a treatment step."
          }
        }
      ]
    },
    {
      "group": "Second-line (overview)",
      "items": [
        {
          "name": "Second-line / rescue approach",
          "dose": "",
          "guidelines": [
            "jhach",
            "mnPeds",
            "meyer",
            "bostonAsap",
            "rcemHumphries",
            "ucsf",
            "hsu",
            "laPoint",
            "won",
            "saemGrace4",
            "agaRubio"
          ],
          "notes": {
            "jhach": "Haloperidol is explicitly second-line when nausea/vomiting is not controlled with ondansetron; topical capsaicin and hydrothermotherapy continue as adjuncts. If symptoms remain refractory, lorazepam is explicitly third-line. QT-prolongation risk should be assessed before haloperidol, and diphenhydramine is given if extrapyramidal symptoms develop.",
            "mnPeds": "Second-line therapy depends on QTc. With prolonged QTc, sumatriptan is explicitly second-line after failure of olanzapine, aprepitant, capsaicin, and lorazepam. Without prolonged QTc, the pathway also directs clinicians to second-line medications if its broader first-line regimen fails.",
            "meyer": "If standard antiemetics and dopamine antagonists fail, lorazepam may be used as a non-QTc-prolonging option, but sparingly because of dependence risk; aprepitant may be considered in refractory cases, although evidence is limited. The review summarizes benzodiazepines and aprepitant as options when other therapies are ineffective or QTc is prolonged.",
            "bostonAsap": "Haloperidol is specifically used when symptoms are refractory to ondansetron: 1 mg IV, with conversion to 0.5 mg PO TID PRN described. Lorazepam is cited for nausea but is reserved for hospitalized patients, rather than routine ED use.",
            "rcemHumphries": "For nausea/vomiting refractory to routine antiemetic treatment, consider haloperidol or topical capsaicin. The guideline therefore positions these as escalation therapy after standard departmental nausea/vomiting management has failed.",
            "ucsf": "If initial haloperidol is ineffective, repeat haloperidol 2.5 mg Q1H to a maximum of 5 mg and/or add capsaicin; later alternative/rescue antiemetics include ondansetron or metoclopramide when QTc permits.",
            "hsu": "Uses a stepwise escalation algorithm rather than labeling drugs simply “second-line.” After Step 1 capsaicin, Step 2 uses haloperidol 5 mg IV/IM/PO or olanzapine 5 mg IM/10 mg PO; subsequent steps escalate to other agents based on the published case evidence. The authors emphasize capsaicin and haloperidol as leading treatments and note potential utility of NK-1 antagonists such as aprepitant.",
            "laPoint": "Benzodiazepines such as lorazepam/diazepam and conventional antiemetics are discussed as additional symptomatic options when initial CHS-directed treatment is insufficient; capsaicin itself is favored as first-line, so these represent adjunctive/escalation rather than preferred initial treatment.",
            "won": "Uses additional/rescue pharmacotherapy when usual care is inadequate, including dopamine antagonists and capsaicin; benzodiazepines may have a role particularly with anxiety or management/prevention of extrapyramidal effects from dopamine antagonists.",
            "saemGrace4": "Does not establish a formal first-line → second-line medication hierarchy. It conditionally recommends haloperidol/droperidol or topical capsaicin in addition to usual care; therefore these should not be labeled “second-line” unless the dashboard category includes escalation/add-on therapy.",
            "agaRubio": "Does not provide a clearly labeled second-line ED medication sequence comparable with JHACH or Children’s Minnesota. Better coded as “no explicit second-line hierarchy” rather than assigning drugs to a second-line category."
          }
        }
      ]
    },
    {
      "group": "Second-line agents",
      "items": [
        {
          "name": "Diphenhydramine",
          "dose": "",
          "guidelines": [
            "laPoint",
            "jhach",
            "mnPeds",
            "won",
            "ucsf"
          ],
          "notes": {
            "laPoint": "Diphenhydramine 25–50 mg IV is listed among supportive/conventional therapies; overall effectiveness of conventional antiemetics is described as mixed.",
            "jhach": "May be added with haloperidol/droperidol in the ED; primarily used to prevent/treat extrapyramidal symptoms. If akathisia, rigidity, bradykinesia, dysphagia, or tremor develops with haloperidol, stop haloperidol and give IV diphenhydramine.",
            "mnPeds": "Diphenhydramine IV is a first-line option when QTc is not prolonged. In the inpatient regimen: 1 mg/kg IV Q6H PRN, max 50 mg/dose; also ordered PRN with droperidol for rare EPS.",
            "won": "Evidence for diphenhydramine as a CHS antiemetic is weak: antihistamine/anticholinergic regimens produced treatment success in only 1/53 patients overall. A prospective study using droperidol 2.5 mg IV + diphenhydramine 25 mg IV improved nausea/vomiting and abdominal pain; diphenhydramine may also be useful for dopamine-antagonist–induced EPS.",
            "ucsf": "Alternates diphenhydramine 25–50 mg IV Q6H with haloperidol; if haloperidol/capsaicin fail, diphenhydramine 25–50 mg PO/IV Q6H is listed among alternative therapies."
          }
        },
        {
          "name": "Metoclopramide",
          "dose": "",
          "guidelines": [
            "laPoint",
            "won",
            "ucsf"
          ],
          "notes": {
            "laPoint": "Metoclopramide 10 mg IV is listed among conventional antiemetics that may be used, although reports of effectiveness are mixed.",
            "won": "Lists metoclopramide among conventional antiemetics used for CHS, while emphasizing that conventional antiemetic monotherapy generally has limited effectiveness.",
            "ucsf": "Rescue/alternative therapy only after haloperidol and capsaicin are ineffective, and only if QTc is not prolonged: 10 mg IV once OR 10 mg PO Q6H PRN."
          }
        },
        {
          "name": "Hydroxyzine",
          "dose": "",
          "guidelines": [
            "mnPeds",
            "won"
          ],
          "notes": {
            "mnPeds": "Hydroxyzine 25–50 mg PO Q6H PRN, max 100 mg/dose, may be useful for concurrent anxiety; the pathway describes a mild QTc-prolonging effect.",
            "won": "Mentions hydroxyzine among antihistamine/anticholinergic therapies studied for CHS, but notes very limited efficacy for this class: only 1/53 patients across reviewed cases had treatment success."
          }
        },
        {
          "name": "Famotidine",
          "dose": "",
          "guidelines": [
            "mnPeds"
          ],
          "notes": {
            "mnPeds": "Famotidine 0.5 mg/kg IV or PO BID, max 20 mg/dose is included as part of the supportive medication regimen."
          }
        },
        {
          "name": "Sumatriptan",
          "dose": "",
          "guidelines": [
            "mnPeds"
          ],
          "notes": {
            "mnPeds": "Explicit second-line medication: 20 mg intranasal once PRN; may repeat once after 1 hour if there is a partial response. It has no listed QTc-prolonging effect, making it particularly relevant when QTc limits other medication choices."
          }
        },
        {
          "name": "Aprepitant",
          "dose": "",
          "guidelines": [
            "mnPeds",
            "meyer",
            "hsu"
          ],
          "notes": {
            "mnPeds": "First-line ED option regardless of QTc status. Regimen: 125 mg day 1 → 80 mg days 2–3 → 80 mg twice weekly until emesis resolves.",
            "meyer": "Aprepitant is reserved for refractory cases after standard antiemetics/dopamine antagonists are unsuccessful; it may be useful through NK1/substance-P blockade, but evidence is described as limited. Meyer also notes benzodiazepines and aprepitant may be useful when other therapies fail or when QTc is prolonged.",
            "hsu": "Discusses NK1 antagonists such as aprepitant as a promising additional strategy and notes growing support for broader consideration of aprepitant, although capsaicin and haloperidol remain the stronger first-line treatments in its proposed approach."
          }
        },
        {
          "name": "Dextrose-Containing Fluids",
          "dose": "",
          "guidelines": [
            "mnPeds"
          ],
          "notes": {
            "mnPeds": "This is the key guideline with a specific dextrose-fluid strategy. For ongoing treatment: NS bolus if needed → D5NS + 20 mEq KCl/L at 1–1.5× maintenance. The pathway specifically uses dextrose-containing fluids to reduce lipolysis/release of adipose-stored THC and considers D10 when vomiting has persisted &gt;3 days. The explicit D5NS regimen is in the pathway."
          }
        }
      ]
    }
  ],
  "hospital": [
    {
      "group": "Supportive Care",
      "items": [
        {
          "name": "Supportive care — overview",
          "dose": "",
          "guidelines": [
            "jhach",
            "mnPeds",
            "agaRubio",
            "won",
            "saemGrace4",
            "laPoint",
            "meyer",
            "ucsf",
            "bostonAsap"
          ],
          "notes": {
            "jhach": "Continue/start maintenance IV fluids after admission and rehydrate until hemodynamically stable and tolerating adequate oral hydration; maintenance fluids should correct metabolic/electrolyte derangements, with IV potassium repletion if K⁺ &lt;3 mEq/L. Consider antacids if gastritis is suspected and provide supportive pain management.",
            "mnPeds": "For inpatient hydration, give NS bolus if needed, then D5NS + 20 mEq KCl/L at 1–1.5× maintenance; supportive regimen also includes famotidine 0.5 mg/kg IV BID, max 20 mg/dose, with attention to electrolyte/QTc abnormalities during ongoing treatment.",
            "agaRubio": "Continue supportive rehydration during the acute/hyperemetic phase with IV fluids and correction of fluid/electrolyte losses from persistent vomiting; supportive care is maintained while acute symptoms resolve. The compiled inpatient comparison identifies Rubio-Tapia specifically with continued maintenance IV fluids.",
            "won": "Supportive management centers on rehydration and correction of electrolyte abnormalities, with symptom relief added to this baseline care; electrolyte/metabolic disturbances are specifically recognized as important complications of repeated vomiting.",
            "saemGrace4": "Defines usual supportive care as fluid and electrolyte management together with standard antiemetic care; CHS-specific therapies such as haloperidol/droperidol or capsaicin are recommended in addition to this baseline supportive management.",
            "laPoint": "Provide IV fluids and electrolyte replacement as indicated for dehydration and vomiting-related losses as part of supportive therapy.",
            "meyer": "Recommends IV fluid repletion as part of acute CHS management and continues IVF for recurrent episodes; supportive management accompanies antiemetics/dopamine antagonists and other symptom-directed therapies.",
            "ucsf": "Start IV fluids as part of initial supportive management and consider gastric acid suppression; subsequent treatment is guided by QTc and symptom response.",
            "bostonAsap": "Treat dehydration with oral hydration when tolerated or IV hydration as needed as part of symptomatic/supportive care."
          }
        }
      ]
    },
    {
      "group": "Antiemetics",
      "items": [
        {
          "name": "Antiemetics — inpatient",
          "dose": "",
          "guidelines": [
            "jhach",
            "mnPeds"
          ],
          "notes": {
            "jhach": "Continue IV ondansetron every 6–8 hours PRN only if the patient responds appropriately; ondansetron is first-line at 0.3–0.4 mg/kg/dose, max 8 mg. If nausea/vomiting remains uncontrolled, give haloperidol 0.05 mg/kg/dose enteral/IM/IV, max 2 mg, as second-line; haloperidol may then be continued every 6–8 hours until oral medications are tolerated. Droperidol 0.05 mg/kg/dose IM/IV, max 2.5 mg, is also listed as second-line. If haloperidol/droperidol and adjunct therapies fail, lorazepam 0.025–0.05 mg/kg IV, max 2 mg, is third-line.",
            "mnPeds": "Inpatient nausea/vomiting management may require multiple medications in combination. First-line options include aprepitant 125 mg PO day 1, then 80 mg PO days 2–3, then 80 mg twice weekly until emesis resolves; olanzapine 5–10 mg ODT/PO BID PRN; droperidol 1.25 mg IV Q6H PRN, increasing to max 2.5 mg/dose; ondansetron 0.15 mg/kg IV/ODT Q6H, max 8 mg/dose, but ONLY if a trial dose was efficacious because it is often ineffective in CHS; diphenhydramine 1 mg/kg IV Q6H PRN, max 50 mg/dose, or hydroxyzine 25–50 mg PO Q6H PRN, max 100 mg/dose; and lorazepam 1 mg IV/PO Q6H PRN, increasing to max 2 mg/dose."
          }
        }
      ]
    },
    {
      "group": "Antipsychotics",
      "items": [
        {
          "name": "Antipsychotics — inpatient",
          "dose": "",
          "guidelines": [
            "jhach",
            "mnPeds"
          ],
          "notes": {
            "jhach": "For hospitalized patients, haloperidol may be continued every 6–8 hours until the patient can tolerate oral medications. If IV haloperidol is required in a patient with an abnormal ECG, transfer to the PICU for continuous cardiac monitoring. Stop haloperidol and give IV diphenhydramine if EPS develops (akathisia, rigidity, bradykinesia, dysphagia, or tremor). Oral haloperidol should NOT be prescribed at discharge.",
            "mnPeds": "The inpatient pathway includes droperidol 1.25 mg IV Q6H PRN, increasing to a maximum of 2.5 mg/dose, and olanzapine 5–10 mg ODT/PO BID PRN as part of the inpatient medication regimen. With repeated droperidol dosing, ECG monitoring is recommended; if scheduled, consider ECG every 48 hours, with monitoring for EPS and PRN diphenhydramine."
          }
        }
      ]
    },
    {
      "group": "Adjunct Therapies",
      "items": [
        {
          "name": "Adjunct therapies — inpatient",
          "dose": "",
          "guidelines": [
            "jhach",
            "mnPeds"
          ],
          "notes": {
            "jhach": "Continue topical capsaicin 0.025% if tolerated and offer hydrothermotherapy as needed after admission; warm shower temperature should not exceed 100°F (38°C). If abdominal pain or nausea/vomiting remains refractory after ondansetron and haloperidol/droperidol with adjunct therapies, lorazepam is third-line at 0.025–0.05 mg/kg IV, max 2 mg/dose. Opioids are not advised because they may worsen abdominal pain by slowing gut motility.",
            "mnPeds": "In the inpatient regimen, topical capsaicin 0.075% TID to the back of the arms or abdomen and lorazepam 1 mg IV or PO Q6H PRN, increasing to a maximum of 2 mg/dose if needed, are used as adjunctive therapies within the multimodal treatment approach."
          }
        }
      ]
    }
  ],
  "outpatient": [
    {
      "group": "First Line",
      "items": [
        {
          "name": "First-line outpatient management",
          "dose": "",
          "guidelines": [
            "laPoint",
            "agaRubio",
            "jhach",
            "mnPeds",
            "rcemHumphries",
            "meyer",
            "won",
            "saemGrace4",
            "ucsf",
            "bostonAsap",
            "hsu"
          ],
          "notes": {
            "laPoint": "Immediate cessation of cannabis is the only intervention shown to completely resolve CHS. Counsel that full symptom resolution may take 7–10 days of abstinence and symptoms can recur with cannabis re-exposure. Patients should be clearly told that continued cannabis use is directly related to their symptoms.",
            "agaRubio": "Long-term management centers on counseling to achieve cannabis cessation. However, the guideline cautions that abruptly stopping cannabis “cold turkey” may produce significant withdrawal symptoms and high recidivism, so withdrawal needs to be anticipated and managed. Amitriptyline is also described as a mainstay of long-term therapy, beginning 25 mg at bedtime and titrating weekly to 75–100 mg at bedtime.",
            "jhach": "Cannabis cessation is the only definitive cure. Outpatient planning should include substance-use counseling/resources and appropriate referral; patients with repeated EC visits or admissions for confirmed CHS should be referred to a rehabilitation program focused on substance use disorder. The pathway also emphasizes addressing underlying anxiety, depression, or chronic pain rather than allowing cannabis to be viewed as treatment for these conditions.",
            "mnPeds": "Cannabis cessation is explicitly identified as the only definitive cure. Before discharge to outpatient care, involve Social Work/Toxicology for substance-abuse counseling/resources, refer to Adolescent Medicine or Psychology, and consider GI or Integrative Medicine follow-up.",
            "rcemHumphries": "Advise complete cannabis abstinence as the definitive long-term treatment and provide support for achieving abstinence rather than relying on symptomatic medications alone. The guideline emphasizes giving patients information/support and addressing suspected dependence or comorbidity rather than simply telling them to stop cannabis.",
            "meyer": "Complete cessation of all THC-containing products remains the only known definitive treatment. Long-term/outpatient management must also address conditions contributing to continued THC use—particularly substance use disorder, anxiety, and depression—which the review describes as critical to treatment success.",
            "won": "Cessation and continued abstinence from cannabinoids are described as the “quintessential cure” for CHS. The review specifically notes that patients may be skeptical of the cannabis–CHS relationship and that abrupt cessation can cause withdrawal symptoms that contribute to return to cannabis use, so counseling and management of withdrawal are important.",
            "saemGrace4": "Cannabis abstinence should accompany acute-treatment recommendations because complete symptom resolution requires cessation. When concurrent cannabis use disorder is suspected, the guideline recommends considering psychosocial intervention and/or addiction-medicine referral, rather than treating recurrent episodes alone.",
            "ucsf": "Cannabis cessation is the definitive long-term treatment, with outpatient planning focused on continued abstinence and appropriate behavioral/substance-use follow-up rather than maintenance CHS medications.",
            "bostonAsap": "Outpatient management goes beyond simply stopping cannabis and specifically treats consequences of cessation. Withdrawal may begin within 1 week and last several weeks; insomnia may be treated with melatonin or hydroxyzine, headaches with acetaminophen or ibuprofen, and anxiety with hydroxyzine, buspirone, propranolol, or clonidine; avoid benzodiazepines and gabapentin because of addiction potential. Once acute GI symptoms resolve, cannabis cravings may be treated with N-acetylcysteine (NAC), titrated from 600 mg to 1,200 mg BID and continued for 8 weeks or as clinically indicated, together with supportive counseling.",
            "hsu": "No clearly defined outpatient first-line management protocol was identified in the reviewed Hsu source. Its proposed treatment algorithm primarily addresses acute pharmacologic CHS management, so it should not be assigned a first-line outpatient regimen without explicit source support."
          }
        }
      ]
    },
    {
      "group": "Topical Capsaicin",
      "items": [
        {
          "name": "Topical Capsaicin",
          "dose": "",
          "guidelines": [
            "laPoint",
            "mnPeds"
          ],
          "notes": {
            "laPoint": "Patients may be discharged home with topical capsaicin and advised to apply it 3–4 times daily as needed. Counsel patients to avoid the face, eyes, genitourinary region and other sensitive skin, not apply to broken skin, and not use occlusive dressings over the application.",
            "mnPeds": "Capsaicin 0.075% topical cream may be used TID PRN, applied with gloves to the back of the arms or abdomen. Wash hands thoroughly after application, avoid the face and eyes, and discontinue for skin irritation/burning; the pathway includes capsaicin among medications that can continue in the discharge/outpatient regimen when appropriate."
          }
        }
      ]
    },
    {
      "group": "Second Line / Escalation",
      "items": [
        {
          "name": "Amitriptyline",
          "dose": "",
          "guidelines": [
            "agaRubio",
            "mnPeds"
          ],
          "notes": {
            "agaRubio": "Amitriptyline is a mainstay of long-term pharmacologic management alongside cannabis-cessation counseling: start 25 mg at bedtime, titrate weekly, and maintain at the minimum effective dose of 75–100 mg at bedtime with monitoring for efficacy/adverse effects; observational experience reports about 70% efficacy.",
            "mnPeds": "Amitriptyline 0.5 mg/kg/day (max 200 mg/day) is a second-line pharmacologic option for persistent nausea/vomiting. Amitriptyline has significant QTc-prolongation risk and should be used cautiously in patients with depression or suicidality because overdose carries high morbidity/mortality."
          }
        },
        {
          "name": "Prochlorperazine / Sumatriptan",
          "dose": "",
          "guidelines": [
            "mnPeds"
          ],
          "notes": {
            "mnPeds": "Second-line pharmacologic options for persistent nausea/vomiting include prochlorperazine 5 mg PO/IV Q6H PRN, and sumatriptan 20 mg intranasal once PRN with one repeat after 1 hour for partial response."
          }
        },
        {
          "name": "Olanzapine (outpatient)",
          "dose": "",
          "guidelines": [
            "won"
          ],
          "notes": {
            "won": "Discusses outpatient antipsychotic therapy only as limited evidence/case-based escalation. Olanzapine has potential outpatient utility; a 4-patient case series used 5–10 mg ODT in most patients, with patients subsequently prescribed the same dose daily PRN after the ED visit. Follow-up ranged 6 weeks–3 months; the review stresses that further studies are needed and that long-term antidopaminergic therapy is not benign."
          }
        },
        {
          "name": "N-Acetylcysteine (NAC)",
          "dose": "",
          "guidelines": [
            "bostonAsap"
          ],
          "notes": {
            "bostonAsap": "After acute GI symptoms resolve, consider NAC for cannabis cravings: titrate from 600 mg daily on day 1 → 600 mg BID day 2 → 1,200 mg AM + 600 mg PM day 3 → 1,200 mg BID day 4, then continue 1,200 mg BID for 8 weeks or as clinically indicated. Supportive counseling and treatment of withdrawal-related insomnia/anxiety/headache are also recommended."
          }
        }
      ]
    },
    {
      "group": "Other",
      "items": [
        {
          "name": "N-Acetylcysteine (NAC) for cravings",
          "dose": "",
          "guidelines": [
            "bostonAsap",
            "mnPeds"
          ],
          "notes": {
            "bostonAsap": "After acute GI symptoms resolve, N-acetylcysteine (NAC) may be used for cannabis cravings: start 600 mg daily → titrate over 4 days to 1,200 mg BID, then continue for 8 weeks or as clinically indicated. Start only after nausea/vomiting resolves because NAC may cause abdominal discomfort.",
            "mnPeds": "NAC 1,200 mg PO BID may be considered for SUD treatment when recommended by Toxicology."
          }
        },
        {
          "name": "Nicotine Replacement Therapy / Naloxone",
          "dose": "",
          "guidelines": [
            "mnPeds"
          ],
          "notes": {
            "mnPeds": "For concurrent nicotine addiction, consider nicotine replacement therapy: patch dosing is based on cigarette/e-cigarette use (7–21 mg, followed by taper as appropriate), with 2 mg nicotine lozenges Q2H PRN, max 8 mg/day. Also strongly consider providing intranasal naloxone at discharge, even without known opioid use disorder, because street drugs may be contaminated with opioids."
          }
        },
        {
          "name": "FAAH Inhibitors / Harm-Reduction Strategies",
          "dose": "",
          "guidelines": [
            "agaRubio"
          ],
          "notes": {
            "agaRubio": "Preliminary evidence from 2 small placebo-controlled randomized studies suggests FAAH inhibitors and CBD may reduce cannabis use, although larger studies are needed. Strategies such as switching to lower-THC/higher-CBD products, using edibles, or avoiding THC concentrates lack scientific validation and should not replace cannabis cessation."
          }
        },
        {
          "name": "Hot Showers (Symptomatic Relief)",
          "dose": "",
          "guidelines": [
            "laPoint",
            "jhach",
            "rcemHumphries"
          ],
          "notes": {
            "laPoint": "Hot showers/baths may provide temporary symptomatic relief, consistent with heat-mediated TRPV1 activation; compulsive hot bathing is commonly reported in CHS. Symptoms generally resolve with cannabis cessation and may recur with re-exposure.",
            "jhach": "Hydrothermotherapy may be offered as needed for symptomatic relief during ongoing symptoms; cannabis cessation remains the definitive treatment.",
            "rcemHumphries": "If refractory symptoms require admission, patients should be given access to a hot shower or bath for symptom relief."
          }
        }
      ]
    }
  ],
  "discharge": [
    {
      "group": "Medications at Discharge",
      "items": [
        {
          "name": "Discharge medication plan",
          "dose": "",
          "guidelines": [
            "bostonAsap",
            "mnPeds",
            "jhach",
            "laPoint",
            "won"
          ],
          "notes": {
            "bostonAsap": "Ondansetron 4 mg TID for 1 week may be trialed for nausea. If refractory to ondansetron, haloperidol 0.5 mg PO TID PRN, maximum 3 doses in 24 hours and no longer than 7 days, may be used after effective 1 mg IV treatment. Capsaicin cream may also be used topically for abdominal pain. For cannabis cravings after acute GI symptoms resolve, NAC is titrated from 600 mg daily to 1,200 mg BID and continued for 8 weeks or as clinically indicated.",
            "mnPeds": "Discharge medications may include capsaicin 0.075% TID PRN to the back of arms/abdomen; aprepitant 125 mg day 1 → 80 mg days 2–3 → twice weekly until symptoms cease; famotidine 0.5 mg/kg PO BID, max 20 mg/dose, for 2 weeks; olanzapine 5–10 mg PO BID PRN, with a few doses at discharge if beneficial; hydroxyzine 25–50 mg PO Q6H PRN, max 100 mg/dose, for concurrent anxiety; ondansetron 0.15 mg/kg PO Q6H, max 8 mg, only if beneficial; NAC 1,200 mg PO BID if recommended by Toxicology for outpatient SUD treatment; and intranasal naloxone once PRN for suspected opioid overdose, strongly considered even without OUD because street drugs may contain opioids. Hydroxyzine and ondansetron should be avoided/minimized with prolonged QTc. If concurrent nicotine addiction is present, discharge nicotine replacement therapy may also be prescribed: &gt;10 cigarettes/day or ≥1 pod/day: 21 mg patch ×4–6 weeks → 14 mg/day ×2 weeks → 7 mg/day ×2 weeks; &lt;10 cigarettes/day or 0.5–1 pod/day: 14 mg/day ×6 weeks → 7 mg/day ×2 weeks; few hits/day: 7 mg patch ×2 weeks; nicotine lozenge 2 mg Q2H PRN, max 8 mg/day.",
            "jhach": "At discharge, symptoms should be controlled with oral ondansetron and/or topical capsaicin; ondansetron may be repeated Q6–8H if the patient responds appropriately. Do NOT discharge patients with oral haloperidol. The pathway requires at least 12 hours of PO tolerance or 2 meals before discharge and emphasizes cannabis cessation as the definitive treatment.",
            "laPoint": "Patients may be discharged home with topical capsaicin, applying it 3–4 times/day PRN. Avoid application near the face, eyes, genitourinary region or other sensitive areas; do not apply to broken skin or under occlusive dressings. The guideline does not provide a routine discharge prescription for haloperidol, ondansetron, or other antiemetics.",
            "won": "Describes limited evidence for olanzapine as an outpatient medication after ED discharge: in a 4-patient case series, patients were prescribed olanzapine daily PRN at the same dose effective in the ED—generally 5–10 mg ODT (one patient received 20 mg because of an existing psychiatric regimen). Follow-up was 6 weeks–3 months; the review stresses that further evidence is needed before establishing olanzapine as routine outpatient CHS therapy."
          }
        }
      ]
    }
  ]
};

var TX_LABELS = { ed:"Emergency Department", hospital:"Hospitalization", outpatient:"Outpatient Management", discharge:"Discharge Medications" };
var TX_ORDER = ["ed","hospital","outpatient","discharge"];


var FOLLOWUP = [
  {
    "name": "Specific Follow-Up Timeframe Given",
    "guidelines": [
      "mnPeds"
    ],
    "notes": {
      "mnPeds": "Provides a specific follow-up timeframe for patients with QTc prolongation: if QTc is above the guideline’s normal threshold (&gt;460 ms in males or &gt;480 ms in females) but remains &lt;500 ms and the patient otherwise meets discharge criteria, the ECG should be repeated as an outpatient within 2 weeks. If QTc remains prolonged at that follow-up, the patient should be referred to outpatient Cardiology."
    }
  },
  {
    "name": "Cannabis Use Disorder Referral",
    "guidelines": [
      "laPoint",
      "jhach",
      "mnPeds",
      "rcemHumphries",
      "meyer",
      "ucsf"
    ],
    "notes": {
      "laPoint": "Explicitly recommends education, reassurance, and referral to cannabis cessation programs as part of CHS management; cannabis cessation is identified as the only standard treatment in the literature.",
      "jhach": "Provides extensive substance-use follow-up. At discharge, consider referral to Adolescent Medicine Clinic and Psychology for substance-use counseling and provide state-specific resources. Adolescents with multiple EC visits and/or hospital admissions for confirmed CHS should be referred to a rehabilitation program focused on substance use disorder.",
      "mnPeds": "Requires substance-use support as part of discharge planning: Social Work and/or Toxicology should be involved for substance-abuse counseling, treatment, and resources, with referral to Adolescent Medicine or Psychology; GI or Integrative Medicine may also be considered.",
      "rcemHumphries": "Recommends active support for patients seeking cannabis abstinence. Patients with suspected CHS should receive written information that identifies sources of support and advice for cannabis users wishing to achieve abstinence; this is a Recommendation Level C. The guideline also emphasizes non-stigmatizing, confidential discussion of cannabis use.",
      "meyer": "Explicitly recommends referral for long-term treatment: long-term care should include complete cessation of THC in any form and referral to mental-health and/or substance-use programs. The review states that outpatient treatment of underlying substance use disorder, anxiety, and depression is critical to treatment success.",
      "ucsf": "Explicitly directs clinicians to provide resources for assistance with cannabis cessation and gives a specific substance-use referral pathway. The pathway identifies the Adolescent Medicine Youth Outpatient Substance Use Program (YOSUP) under Social Work/Psychiatry referral resources and also recommends considering Social Work consultation."
    }
  },
  {
    "name": "Educational Material",
    "guidelines": [
      "jhach",
      "ucsf",
      "rcemHumphries",
      "mnPeds"
    ],
    "notes": {
      "jhach": "Refer to Appendix C: Cannabinoid Hyperemesis Education for Patients and Caregivers. Provides named adolescent SUD resources: Johns Hopkins Adolescent Medicine Clinic: 727-767-TEEN (8336); Mobile Crisis Response Team: 727-362-4424; Rockland Treatment Center: rocklandtreatment.com; Turning Point of Tampa: tpoftampa.com; River Oaks: americanaddictioncenters.org/treatment-centers/river-oaks; PAR Academy/Operation PAR: operationpar.org/services/adolescent-services; BayCare Substance Use Services: baycare.org/services/behavioral-health/substance-use-services; North Tampa Behavioral Health: northtampabehavioralhealth.com.",
      "ucsf": "UCSF Youth Outpatient Substance Use Program (YOSUP): youthsubstanceuse.ucsf.edu.",
      "rcemHumphries": "Provides a supplemental patient information leaflet (Online Supplemental File 1) and recommends that all patients with suspected CHS receive written information explaining the condition and identifying sources of support and advice to help achieve cannabis abstinence. emj.bmj.com/content/41/5/328",
      "mnPeds": "Referrals for patients with substance abuse disorder may include Psychology and/or Adolescent Medicine clinic. For intensive outpatient addiction treatment, consider Hazelden at the Plymouth location. For faith-based treatment for boys, consider Teen Challenge (mntc.org). For assistance finding a local treatment facility for mental or substance use disorders: findtreatment.gov/locator. If concurrent nicotine addiction, quitting resources include Minnesota Department of Health free Quit Support, truthinitiative.org, teen.smokefree.gov, Mylifemyquit.com, or texting 36072 to take the first step towards quitting."
    }
  },
  {
    "name": "Substance Use Programs / Counselling",
    "guidelines": [
      "laPoint",
      "jhach",
      "mnPeds",
      "rcemHumphries",
      "meyer",
      "saemGrace4",
      "ucsf"
    ],
    "notes": {
      "laPoint": "Recommends education, reassurance, and referral to cannabis cessation programs as part of CHS management, recognizing cessation as the definitive treatment and structured cessation support as part of ongoing care.",
      "jhach": "Recommends Social Work consultation for substance-abuse treatment resources and Psychology consultation for motivational interviewing. At discharge, patients receive cannabis-cessation counseling; patients with repeated CHS encounters may require more intensive substance-use treatment/rehabilitation support. Refer to Appendix B for the HEADSS exam tool.",
      "mnPeds": "Incorporates substance-use counselling into discharge planning: Social Work and/or Toxicology should be consulted for substance-abuse counseling/resources, with referral to Adolescent Medicine or Psychology. During inpatient care, Social Work/Toxicology are also recommended for substance-abuse treatment/resources, with Psychology considered.",
      "rcemHumphries": "Recommends signposting or referral to local drug-use services because cannabis cessation can be difficult to achieve; access to these services may improve the likelihood of successful abstinence. The guideline therefore goes beyond simply instructing patients to stop cannabis.",
      "meyer": "Recommends long-term referral to mental-health and/or substance-use programs. Outpatient treatment of underlying substance-use disorder, as well as associated anxiety and depression when present, is described as important for successful long-term CHS management.",
      "saemGrace4": "Recommends screening for concurrent CUD with a validated tool such as CUDIT-R; when CUD is suspected, consider referral to psychosocial interventions and/or addiction-medicine specialists, if available. The guideline additionally states that referral for further treatment is recommended for patients with suspected CUD.",
      "ucsf": "Provides structured substance-use follow-up through Social Work/Psychiatry and recommends resources to assist with cannabis cessation, including referral to the Adolescent Medicine Youth Outpatient Substance Use Program (YOSUP)."
    }
  },
  {
    "name": "Nicotine Cessation Resources",
    "guidelines": [
      "mnPeds"
    ],
    "notes": {
      "mnPeds": "For patients with concurrent nicotine addiction, provides specific nicotine-cessation resources: Minnesota Department of Health Free Quit Support, Truth Initiative, Teen Smokefree, My Life My Quit, and the option to text 36072 to begin quitting. The pathway also provides detailed nicotine-replacement therapy (NRT) dosing based on cigarette/e-cigarette use: 21 mg patch with taper for &gt;10 cigarettes/day or ≥1 e-cigarette pod/day; 14 mg with taper for &lt;10 cigarettes/day or 0.5–1 pod/day; 7 mg patch for a few hits/day; and nicotine lozenge 2 mg Q2H PRN (max 8 mg/day)."
    }
  },
  {
    "name": "Documentation Guidance",
    "guidelines": [
      "laPoint",
      "jhach"
    ],
    "notes": {
      "laPoint": "Explicitly recommends clear documentation in the medical record to help other clinicians confirm the CHS diagnosis during subsequent encounters, because patients with CHS frequently re-present to the ED.",
      "jhach": "Provides detailed documentation and confidentiality guidance for adolescents. Providers should explain the limits of confidentiality before the HEADSS assessment; adolescents may request that information in the visit note remain confidential, but blocked notes may still be released to a legal guardian upon request, and substance use may be identifiable through diagnoses in the chart or AVS. JHACH also gives specific cannabis coding/documentation recommendations, including documenting abuse vs dependence and pattern of use, intoxication, remission, presence/absence of withdrawal, and specific cannabis-induced disorders."
    }
  },
  {
    "name": "Behavioral Health / Psychology Referral",
    "guidelines": [
      "jhach",
      "mnPeds",
      "agaRubio",
      "meyer",
      "saemGrace4",
      "bostonAsap"
    ],
    "notes": {
      "jhach": "Recommends Pediatric Psychology and Social Work involvement for admitted patients; Psychology provides motivational interviewing and support for mental-health needs, while Social Work assists with substance-use treatment resources. The pathway also notes that adolescents may use cannabis to self-treat untreated anxiety and/or depression and should be counseled that cannabis may worsen these conditions, with alternative treatments discussed with their primary pediatrician.",
      "mnPeds": "Recommends considering Psychology consultation during inpatient management and referral to Adolescent Medicine or Psychology at discharge. Behavioral-health needs are relevant because the pathway incorporates mental-health and substance-use assessment/support into ongoing care; Psychology is therefore part of both acute multidisciplinary care and post-discharge follow-up.",
      "agaRubio": "States that co-management with a psychologist or psychiatrist may be helpful when patients have an inadequate response to standard therapy or substantial psychiatric comorbidity. The guideline specifically notes that anxiety and depression are very common associated conditions in CHS.",
      "meyer": "Recommends long-term referral to mental-health and/or substance-use programs and emphasizes that outpatient treatment of underlying anxiety, depression, and substance-use disorder is critical to treatment success. These conditions may contribute to chronic THC use and should be addressed as part of long-term CHS management rather than treating the vomiting episodes alone.",
      "saemGrace4": "For patients with suspected concurrent cannabis use disorder, recommends considering referral to psychosocial interventions and/or addiction-medicine specialists. The recommendation is directed primarily toward CUD rather than specifically toward treatment of anxiety or depression; no specific anxiety/depression referral recommendation was identified in the CHS section.",
      "bostonAsap": "Addresses behavioral-health management as an important component of CHS care, particularly for co-occurring anxiety, depression, and substance-use concerns; behavioral/mental-health support is incorporated into management rather than treating the gastrointestinal symptoms alone."
    }
  },
  {
    "name": "Mental Health Screening at Discharge",
    "guidelines": [
      "jhach",
      "mnPeds",
      "ucsf"
    ],
    "notes": {
      "jhach": "All admitted patients should be screened for depression using the PHQ-9 when sober and comfortable enough to provide an accurate response. Pediatric Psychology and Social Work are also recommended for mental-health and substance-use needs.",
      "mnPeds": "Mental health is assessed as part of the detailed HEADSSS history, but the pathway does not specify a dedicated depression-screening instrument such as the PHQ-9.",
      "ucsf": "Mental health is assessed as part of the history and physical (H&amp;P), but no specific standardized mental-health screening tool is named."
    }
  },
  {
    "name": "Referral for Underlying / Comorbid Conditions",
    "guidelines": [
      "agaRubio",
      "jhach",
      "mnPeds",
      "ucsf",
      "meyer",
      "bostonAsap"
    ],
    "notes": {
      "agaRubio": "Outpatient workup for mimics/overlapping disorders, including rumination syndrome, gastroparesis, CVS, migraine, and functional nausea/vomiting syndrome; psychiatric comorbidities such as anxiety/depression may also warrant psychologist/psychiatrist co-management.",
      "jhach": "Provides a detailed differential diagnosis and recommends GI consultation for multidisciplinary planning/follow-up; also incorporates Psychology/Social Work for associated mental-health and substance-use concerns.",
      "mnPeds": "Considers a broad differential across GI, CNS, GU, metabolic, and psychiatric causes; recommends specialty follow-up based on need, including GI and the uniquely specified Integrative Medicine Clinic, in addition to Adolescent Medicine/Psychology.",
      "ucsf": "Provides a broad differential including CNS, pregnancy/STI complications, metabolic, GI, hepatobiliary, renal, endocrine, eating, and psychiatric disorders; specialty consultation may include GI, Pain Management, Integrative Medicine, and Social Work.",
      "meyer": "Emphasizes identifying and treating underlying conditions that may contribute to chronic THC use—specifically anxiety, depression, and substance use disorder—with outpatient treatment of these comorbidities considered critical to treatment success.",
      "bostonAsap": "Rule out organic causes; differential specifically includes CVS, pregnancy, eating disorders, and abdominal migraine."
    }
  }
];

var SPECIALS = [
  {
    "name": "QTc Safety",
    "guidelines": [
      "mnPeds"
    ],
    "notes": {
      "mnPeds": "Defines prolonged QTc as &gt;460 ms in males and &gt;480 ms in females. Correct contributing electrolyte abnormalities; if QTc is prolonged but &lt;500 ms, repeat ECG within 2 weeks and refer to Cardiology if it remains prolonged; if QTc &gt;500 ms despite electrolyte correction and holding QT-prolonging medications, consult Cardiology."
    }
  },
  {
    "name": "Pregnancy Exclusion / Special Population",
    "guidelines": [
      "mnPeds",
      "ucsf"
    ],
    "notes": {
      "mnPeds": "Explicitly excludes pregnant patients and patients &lt;12 years from the CHS pathway; urine pregnancy testing is included among initial labs to consider.",
      "ucsf": "Explicitly excludes pregnant patients from the CHS pathway; also excludes patients &lt;40 kg and those with congenital long-QT syndrome, defining additional special populations outside the pathway."
    }
  },
  {
    "name": "Capsaicin Application Safety",
    "guidelines": [
      "laPoint",
      "ucsf",
      "jhach"
    ],
    "notes": {
      "laPoint": "Avoid application near the face, eyes, genitourinary region, and other sensitive skin; do not apply to broken skin or use occlusive dressings over capsaicin.",
      "ucsf": "Provides detailed application precautions: avoid face, eyes, genitourinary region, sensitive or broken skin; do not use occlusive dressings; use gloves and wash hands after application; discontinue if skin irritation occurs and remove with milk.",
      "jhach": "Recommends using only a small amount of capsaicin and observing for adverse skin reactions such as blistering or irritation."
    }
  }
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

/* Where each tab's getGuidelineEntries() pulls its per-guideline text from. */
var TOPIC_SOURCES = [
  { key:"diagnosis", label:"Diagnosis", source:"CRITERIA",
    help:"Which of the 6 detailed diagnostic topics this guideline addresses, from the Diagnoses tables (source doc)." },
  { key:"ed", label:"Emergency Department", source:"TX", settingKey:"ed",
    help:"First-line and second-line ED interventions this guideline recommends, from the ED management tables (source doc)." },
  { key:"hospital", label:"Hospitalization", source:"TX", settingKey:"hospital",
    help:"Inpatient management this guideline recommends, from the hospitalization tables (source doc)." },
  { key:"outpatient", label:"Outpatient management", source:"TX", settingKey:"outpatient",
    help:"Long-term outpatient management this guideline recommends, from the outpatient tables (source doc)." },
  { key:"discharge", label:"Discharge medications", source:"TX", settingKey:"discharge",
    help:"Take-home medications this guideline specifies at discharge, from the discharge medications table (source doc)." },
  { key:"followup", label:"Follow-up care", source:"FOLLOWUP",
    help:"Referral pathways, education, and follow-up this guideline recommends, from the follow-up care tables (source doc)." },
  { key:"specialNotes", label:"Special notes", source:"SPECIALS",
    help:"QTc safety, pregnancy/population exclusions, and capsaicin application safety this guideline specifies, from the special notes tables (source doc)." }
];

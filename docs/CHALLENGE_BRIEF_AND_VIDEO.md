# Challenge brief and video review

## What the challenge asks for

The official NASA Space Apps statement asks for an interactive, SI-powered dashboard that summarizes, ranks, and interprets NASA microgravity-combustion findings to produce fire-safety insight for human space exploration. This implies four product capabilities:

1. Help a user discover relevant investigations across the NASA PSI Combustion Science corpus.
2. Make the source, experimental conditions, and reported outcome easy to inspect.
3. Rank evidence or relevance with an explicit method and explain why a result appears where it does.
4. Translate findings into bounded fire-safety implications while keeping observations, calculations, interpretation, and open questions separate.

“SI-powered” does not make generated prose evidence. A model may help users query or summarize a cited study, but source values, derived calculations, selection criteria, and uncertainty must stay inspectable. The application must never invent a missing measurement or rank an investigation on a result it does not contain.

## Data source boundary

The official challenge explicitly names NASA's PSI Combustion Science repository as the source on which the app is to be based. The catalog is fetched from the [filtered official PSI API (Research Area = Combustion Science)](https://psi.nasa.gov/geode-py/ws/repo/search?source=psi&type=investigation&size=100&sort=Accession&order=asc&ffield=Research+Area&fvalue=combustion+science); a [human-readable NASA PSI combustion search](https://psi.nasa.gov/physci/repo/search?q=combustion) is also provided. PSI is the **only source of experimental measurement data** in this product. Its filtered search returns 24 investigation records. We inspected the official PSI file manifests: 16 expose a CSV in the `Experimental table` category, and this build packages all 16 original tables plus selected files attached to those same PSI investigations. Eight other inventory records have no table bundled here and remain metadata/source links. NASA publications, incident histories, videos, and standards are contextual references only; they are never presented as extra challenge measurements or merged into the PSI tables. A metadata record is not equivalent to a locally ingested experimental result. The 16 table row counts are reported as file inventory only; they are not pooled into one experiment.

The challenge resource list also includes a combustion overview and video, the ISS combustion researcher's guide, Apollo 1 and Apollo 13 investigation pages, the Mir fire history, and three NASA Spinoff fire-protection examples (firefighter air tanks, a shuttle fire detector, and firefighter attire). These help explain why fire safety matters and how research can transfer to practice. Only the PSI Combustion Science repository supplies the experimental rows analyzed here.

The dashboard must distinguish flight experiments from ground studies/models and smoke/aerosol diagnostics from flame outcomes. Cross-investigation comparisons are valid only when metric, units, material/fuel, geometry, atmosphere, flow, and outcome definitions can be reconciled from primary documentation. Otherwise show a research gap instead of a score pretending to be an outcome.

## Challenge-specific scientific scope

- **Mission use case:** NASA is planning sustained lunar exploration and pressurized habitats/rovers; oxygen fraction and total pressure may differ from Earth air. These are atmosphere design studies coupled to EVA preparation and decompression-sickness risk, not a claim that all future cabins will use one enriched atmosphere.
- **Relevant evidence families:** BASS/BASS-II concern solid-fuel/material burning and suppression; ACME includes gaseous-flame behavior; FLEX/FLEX-2 study liquid droplets and extinguishment; SAFFIRE investigates larger spacecraft-material fires; SAME/SAME-R study smoke/aerosol measurements; DAFT is dust/aerosol detector context. Their measurements are not interchangeable.
- **Useful comparison attributes:** investigation objective, fuel/material and sample/burner geometry, oxygen and diluent composition, total pressure, imposed flow, sensors, outcome definition, platform/gravity environment, repetitions, and source completeness. The app exposes these when the record reports them and flags missing fields.
- **Partial gravity:** the challenge says PSI currently has no partial-gravity combustion dataset. Electric-field flame experiments alter ion drift and can help study related transport mechanisms, but they do not physically reproduce lunar gravity. Normal-g and microgravity evidence can bound hypotheses, not directly measure an intermediate-gravity result.
- **Out of scope:** rocket engine/propellant combustion is generally excluded by the challenge because high-velocity momentum-driven flow is not the low-speed habitat-fire problem. Earth wildfire hotspots and space-weather feeds are also unrelated to the PSI combustion measurements.

## Oxygen, pressure, and EVA preparation

The challenge background discusses a tradeoff: a low-pressure EVA suit can require crew denitrogenation before depressurization, while lower-pressure exploration-atmosphere studies consider a higher oxygen fraction to reduce EVA prebreathe burden. A NASA reference suite often compares 14.7 psia / 21% O₂ (Earth/ISS), 10.2 psia / 26.5% O₂ (Shuttle campout), 8.2 psia / 34% O₂ (exploration-atmosphere concept), and a 4.3 psia / 100% O₂ EVA suit. These are distinct historical/reference/design cases, not a single final lunar standard.

For a dry gas mixture, `pO₂ = xO₂ Ptotal`; it is a transparent composition calculation, not a complete physiological model. Human inspired oxygen additionally reflects water vapour and breathing protocols. The dry-gas pO₂ values are approximately 3.09, 2.70, 2.79, and 4.30 psia for the four cases, respectively. Similar pO₂ does **not** imply equal flammability: oxygen fraction, total pressure, diluent, fuel/material, geometry, flow and ignition all affect combustion. The Mission Atmospheres page shows the calculations and labels all cases as references.

The PSI-20 BRE summary adds challenge-relevant experiment evidence: its day-level entries include 21%, 25%, 26.5%, 34% and 40% oxygen concentration labels, while the per-day pressure is not provided in this summary. Two entries are malformed in the source as `2100%` and `3400%`; the application preserves and flags them rather than silently guessing corrections. This is a reason to inspect source documents and improve the data-quality workflow, not a basis for a threshold or causal claim.

## Official 2026 challenge video

**Video:** [2026 Challenge | Flame in Freefall: SI-Powered Fire Safety Insights from Microgravity Combustion](https://www.youtube.com/watch?v=AVuEiKxOpc0), 8 min 39 sec. This is the challenge's own overview video, distinct from the NASA ScienceCasts item listed among the challenge resources. Its description points viewers to the full challenge explanations; the video is not a separate NASA measurement source. The written challenge statement remains the authoritative place for exact objectives, PSI repository instructions, resource links, and scientific details.

The video is not an additional experiment dataset. The application therefore links to it as an official challenge resource while keeping NASA PSI investigation files as the only experimental measurement source. YouTube's generated-caption endpoint returned HTTP 429 during review, so the audio was fetched from YouTube's English audio stream and transcribed locally with Whisper `tiny.en`. The notes below are paraphrases with approximate timestamps, not official captions or verbatim quotations; scientific claims were checked against the written challenge and NASA sources. The temporary audio and machine transcript are not bundled with the project.

### What the challenge video says

- **0:00–1:55 · Why the challenge matters:** NASA's physical-sciences program scientist frames fire alarms and flame behavior as crew-safety concerns, points participants to PSI as the challenge data source, explains that reduced buoyancy changes ignition, propagation, and extinguishment, and connects lunar habitat atmosphere choices with EVA prebreathe considerations. She invites teams to use existing data to improve protocols, suppression-system design, and material screening.
- **1:55–4:16 · Why the physics differs:** The demonstrations contrast a buoyant Earth candle flame with a rounded blue microgravity flame. The speaker also shows that an electric field can move flame ions and create an ion-driven flow that reshapes a flame even in microgravity, and that fan-driven flow affects a material-burning experiment. These examples support the project's caveat that microgravity suppresses buoyancy-driven convection but does not eliminate every source of gas motion.
- **4:17–7:14 · How to explore NASA PSI:** The PSI lead walks through its six physical-science areas and selects Combustion Science. The video describes 24 investigations and approximately 12 TB in the repository, then shows study objectives, approach, data/document folders, and publication DOIs. This matches the product's inventory-first navigation and links from each study to its PSI record.
- **7:15–8:39 · Explicit dashboard objectives:** The subject-matter expert asks for an SI-powered web dashboard that (1) identifies investigations relevant to habitable crew environments, (2) extracts evidence useful to predictive modeling of spaceflight flammability/fire scenarios, and (3) highlights research that can inform next-generation fire-safety controls and equipment. Earth applications are an optional extension; examples include ISS fine-water-mist technology, smoke detection, and firefighter equipment.

The speaker's rounded **~12 TB** figure describes the repository in the video. Our dated PSI file-index snapshot lists 36,490 files totalling **~9.16 TB only across the 16 study manifests that returned a listing**; eight other manifest lookups returned no listing. These figures have different coverage and are not interchangeable. The project reports the observed snapshot subtotal, does not claim the full archive was downloaded, and does not treat missing manifests as empty datasets.

The video mentions lunar/partial-gravity contexts, but the challenge brief explicitly notes that PSI currently has no direct partial-gravity combustion data. Its 1-g and microgravity evidence, and the E-FIELD ion-wind demonstration, cannot be relabeled as measurements at lunar gravity.

### Requirement-to-product traceability

| Video objective | Product response | Evidence boundary |
|---|---|---|
| Find studies relevant to crew habitats | Full 24-record PSI inventory with a visible, factor-by-factor mission-relevance score | The score is a metadata heuristic, not a flame-danger ranking; table availability does not change relevance. |
| Extract data useful to predictive modeling | Investigation conditions, fields, missingness and outcomes are shown study by study; FLEX has a separate condition-stratified descriptive workbench | Current evidence does not validate a cross-investigation predictive fire-risk model. |
| Inform future controls and equipment | Safety Insights maps prevention, detection and suppression questions to relevant PSI families and NASA references | These are research directions, not flight procedures or certified recommendations. |
| Provide SI assistance | Source-bounded Qwen 2.5 3B through a private Ollama endpoint over Tailscale, with deterministic local summaries when offline | Generated prose is labeled separately and never substitutes for source measurements. The Copilot currently covers PSI-69/FLEX evidence. |
| Optional Earth applications | Sources page identifies NASA technology-transfer examples | Context only; Earth fire feeds and unrelated challenge datasets are not ingested. |

## NASA ScienceCasts resource video

**Video:** [NASA ScienceCasts — The Power of Studying Combustion on the ISS](https://www.youtube.com/watch?v=W1oXykoz9zg) (NASA Science, 13 March 2018). It is an introductory explainer in the challenge’s background-resource family, not a source of tabular measurements.

### Scientific ideas conveyed

- In normal gravity, heating creates density differences and buoyancy; hot products rise and cooler oxidizer is drawn toward a flame. This flow can make a candle-like flame flicker and complicate isolation of combustion processes.
- The ISS gives researchers long-duration reduced-buoyancy conditions that can make selected flame behaviors more stable for measurement. This is not a universal claim that every microgravity flame is steady: burner configuration, instabilities, imposed flow, radiative loss, chemistry, and changing operating conditions still matter.
- NASA programs examine distinct systems: FLEX studies isolated liquid droplets and extinction; ACME studies gaseous flames; BASS/BASS-II and SoFIE concern solid materials and flammability. Their outputs cannot be pooled into one rate or a single fire ranking without respecting each experiment’s measurement definition.
- Space combustion research can inform fire detection and suppression. The video’s broad motivation also mentions efficient/clean terrestrial combustion, but this project prioritizes crew fire safety and does not treat terrestrial emissions as a challenge dataset.

### Product decisions derived from the video

The project includes a physics comparison that shows buoyant plume and cool inflow on Earth, then a rounded diffusion flame plus possible imposed ventilation in microgravity. It labels both illustrations as schematics. It gives FLEX its own droplet `d²`-law treatment and treats BASS/SAFFIRE/SAME as different evidence families. The safety page emphasizes oxygen fraction together with total pressure, fuel/material, ignition, geometry, and ventilation. It does not claim zero gravity, zero airflow, universal spherical flames, or a certified suppression recommendation.

### Questions the video does not answer

The explainer is not a substitute for data tables or technical publications: it does not provide row-level test conditions, uncertainty, oxygen/pressure flammability limits, comparative effect sizes, or a validated ranking of suppression methods. Those claims must come from the specific NASA PSI files and linked reports, not from the narration alone.

## Implemented mission-relevance score

The Evidence Library sorts investigation records by **mission relevance**, not fire hazard. The transparent metadata heuristic is:

`mission relevance = crew fire-safety topic match (1–3) + flight/reduced-gravity context (0 or 2)`, with a maximum of 5. The source-table availability indicator is separate and is used only to break ties; exact remaining ties are ordered by PSI ID.

- Topic relevance is 3 when returned PSI metadata names crew fire-safety topics (materials/flame spread, detection, smoke, suppression); 2 for general combustion/flame/fire; or 1 as the baseline for an investigation in the official Combustion Science inventory.
- Environment context is 2 when PSI project/platform metadata identifies microgravity, reduced gravity, ISS, Space Shuttle, free-flyer, aircraft, or drop tower. Otherwise it is 0; missing context is not treated as proof of a ground-only study.
- Source-table availability is shown separately: bundled, checksum-verified tables precede metadata-only records within an exact relevance-score tie. This is a usability tie-break, not scientific quality or importance.

The interface shows each factor beside the total. It must not be read as an experimental outcome, material ranking, flammability probability, or spacecraft hazard score. Topic matching is a keyword heuristic over PSI metadata rather than expert validation; relevant investigations whose PSI file listing was unavailable remain in the inventory with their PSI record link and status, rather than being hidden.

## References

- [Official challenge statement](https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/?tab=resources)
- [Official 2026 challenge introduction video](https://www.youtube.com/watch?v=AVuEiKxOpc0) — audio locally transcribed for the timestamped paraphrase above
- [Filtered NASA PSI Combustion Science API](https://psi.nasa.gov/geode-py/ws/repo/search?source=psi&type=investigation&size=100&sort=Accession&order=asc&ffield=Research+Area&fvalue=combustion+science)
- [NASA PSI human-readable combustion search](https://psi.nasa.gov/physci/repo/search?q=combustion)
- [NASA video](https://www.youtube.com/watch?v=W1oXykoz9zg)
- [NASA combustion and fire safety overview](https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/)
- [NASA OCHMO-TB-003 · Habitable Atmosphere](https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf)
- [NASA 2026 exploration-atmosphere presentation in NTRS](https://ntrs.nasa.gov/citations/20260001966)

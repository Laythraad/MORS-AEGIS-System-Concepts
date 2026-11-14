# Flame in Freefall · Official resource extraction and analysis

**Challenge:** NASA Space Apps 2026 — *Flame in Freefall: SI-Powered Fire Safety Insights from Microgravity Combustion Data*
**Official resources tab:** <https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall/?tab=resources>
**Review date:** 2026-11-14

## Extraction boundary

The resource list below was extracted from the HTML/RSC payload for the exact challenge URL above. The extraction was limited to this challenge page. The challenge page explicitly describes **NASA PSI Combustion Science as “the source of the data upon which the NASA Space App is to be based.”** Accordingly, PSI is the sole experimental-measurement dataset in MORS AEGIS. No dataset from another Space Apps challenge is imported.

The challenge also embeds its own 8 min 39 sec overview video. Its resource list separately links NASA ScienceCasts, a 3 min 36 sec combustion introduction. These are distinct videos and neither supplies row-level experimental measurements.

## Exact challenge-provided resources

| Resource listed by the challenge | What it contributes | Data treatment in MORS AEGIS |
|---|---|---|
| [PSI Data Repository: Combustion Science](https://psi.nasa.gov/physci/repo/search?q=combustion) | NASA states this is the source dataset for the Space App. Investigation records link to their raw/processed files and associated documents. | **Primary data.** The local filtered inventory and original `Experimental table` CSVs are the only experimental measurement inputs. Files remain separate by investigation; non-table files are selected only as provenance/context. |
| [NASA Combustion Science](https://www.nasa.gov/glenn/glenn-expertise-space-exploration/physical-sciences-program/combustion-science/) | Explains why reduced gravity helps isolate combustion physics and summarizes ACME, BASS, DAFT, FLEX, SAFFIRE, SAME and other program families. | Context for navigation and interpretation. Program descriptions are not appended as experimental rows. |
| [NASA ScienceCasts: The Power of Studying Combustion on the ISS](https://www.youtube.com/watch?v=W1oXykoz9zg) | Short introductory video on buoyancy, ISS experiments and terrestrial applications. | Scientific communication only. Does not provide test-level values, uncertainty or comparable effect sizes. |
| [A Researcher’s Guide to ISS Combustion Science](https://www.nasa.gov/missions/station/a-researchers-guide-to-combustion-science/) | Review of combustion investigations conducted or planned for the ISS, with background on experiment objectives and facilities. | Background and experiment-family cross-check. Do not treat planned work as completed data or import its narrative as measured outcomes. |
| [Apollo 1](https://sma.nasa.gov/sma-disciplines/accllp/apollo-1) | Investigation and lessons from a fatal ground-test fire in a pressurized, pure-oxygen capsule. | Incident-history evidence. It illustrates ignition, rapid fire growth, pressure and egress hazards; it is not a microgravity flame experiment. |
| [Apollo 13](https://sma.nasa.gov/sma-disciplines/accllp/apollo-13) | Investigation of oxygen-tank failure and system-level design/configuration lessons. | Incident-history evidence. It is not a cabin-fire propagation dataset and must not be presented as one. |
| [25 Years Ago: Fire Aboard Space Station Mir](https://www.nasa.gov/history/25-years-ago-fire-aboard-space-station-mir/) | Historical account of a solid-fuel oxygen-generator fire, crew response, smoke, egress obstruction and follow-up safety changes. | Operational incident context. It motivates response, detection, cleanup and alternate-egress questions; it is not a controlled burn test. |
| [Fireman’s Air Tanks](https://spinoff.nasa.gov/node/9582) | NASA Spinoff account of lightweight breathing-air tanks, mask visibility and a low-air warning transfer. | Technology-transfer example. It does not justify changing spacecraft cabin oxygen composition. |
| [Fire Detector](https://spinoff.nasa.gov/node/9407) | NASA Spinoff account of an early combustion-particle detector designed to distinguish particles from dust and warn before visible flame/smoke. | Technology-transfer example. It motivates detector-response and false-alarm qualification, but does not itself validate a microgravity detector. |
| [New Technology for the Fire Attire](https://spinoff.nasa.gov/node/9918) | NASA/FEMA Project FIRES account of applying lightweight, heat-protective space-material concepts to firefighter gear. | Technology-transfer example. A material transfer does not establish spacecraft-material suitability without separate qualification. |

## Scientific analysis and project decisions

### 1. What the challenge is asking us to build

The official challenge asks for an interactive, SI-powered dashboard that finds, summarizes, ranks and interprets NASA microgravity-combustion findings for crewed-spaceflight fire safety. The product therefore has to keep three evidence classes distinct:

1. **PSI experiment observations:** values and descriptions reported in a particular NASA investigation file.
2. **Computed results:** reproducible calculations from identified PSI rows with units, assumptions and sample counts visible.
3. **Interpretation/context:** physics explanations, incident histories, standards and technology-transfer examples; these are cited but never mislabeled as PSI measurements.

The “rank” feature ranks the **relevance of an investigation to crew fire safety**, using visible metadata factors. It is not a material hazard score, flammability probability, or operational safety decision.

### 2. Data cleaning and integrity

- The acquisition is restricted to NASA PSI records whose research area is Combustion Science.
- Original experimental-table bytes are kept unchanged and checked against recorded size and SHA-256.
- Parsed CSV views trim outer whitespace and represent empty fields as missing; non-empty source values stay strings until a specific scientific field has a documented unit and meaning.
- Every investigation remains separate. The 1,329 source rows in the current 16 tables are not one pooled sample.
- Missing or ambiguous values are shown as gaps. No values are silently repaired, imputed, assigned units, or treated as individual tests when the table actually contains a day summary or test envelope.
- The NASA PSI metadata/file listing is not equivalent to downloading the archive. The current bundle contains the original table CSVs and a small number of selected files from those same investigations, not the multi-terabyte PSI repository.

### 3. Physics that governs the Earth-versus-microgravity comparison

On Earth, heating creates density gradients in the surrounding gas. Gravity acts on those density differences, producing buoyancy-driven natural convection: hot products tend to rise, cooler gas is drawn toward the reaction zone, and the flame often appears elongated and flickering. In microgravity, the buoyant component is strongly reduced, so diffusion, radiation, chemical kinetics and imposed ventilation become more prominent. It is inaccurate to say that all gas motion stops: fans, pressure gradients, fuel injection and other forced flows still transport heat and species.

- Grashof number: `Gr = g β ΔT L³ / ν²`, a scale comparison of buoyancy to viscous effects. As effective `g` decreases, buoyancy forcing decreases for fixed other terms.
- Péclet number: `Pe = U L / D`, a scale comparison of bulk advection to molecular diffusion. A nonzero ventilation velocity `U` can keep advection important in microgravity.
- Oxygen partial pressure: `pO₂ = xO₂ Ptotal` for a dry mixture, where `xO₂` is oxygen mole fraction and `Ptotal` is total pressure. Similar `pO₂` does not make two atmospheres equally flammable; oxygen fraction, pressure, diluent, material, geometry, flow, ignition and heat loss also matter.
- FLEX droplet burning: `D²(t) = D₀² − Kt` under the experiment’s quasi-steady droplet assumptions. Its `K` is a liquid-droplet burning-rate constant, not a solid-material flame-spread speed.

NASA’s own Combustion Science page explains that reducing buoyancy lets researchers study processes that buoyancy-driven flows can mask, and separately describes BASS as solid-fuel burning/extinction research and FLEX as droplet combustion and suppressant research. This supports the product’s separation of experimental families rather than a single cross-study score.

### 4. Safety implications supported by the resource list

The incidents and transfer examples make actionable research questions visible without claiming a certified answer:

- **Oxygen-rich conditions:** Apollo 1 demonstrates why oxygen concentration and ignition control matter together. It does not establish a quantitative lunar-habitat threshold. Evaluate oxygen fraction with total pressure, material, geometry, ignition and ventilation; do not recommend an atmosphere from oxygen fraction alone.
- **Oxygen-system hazards:** Apollo 13 and Mir show that oxygen storage/generation components, wiring, contamination, and system interfaces need hazard analysis and fault isolation. Mir also makes crew access, extinguisher reach, smoke toxicity and atmosphere cleanup explicit.
- **Detection:** NASA’s detector-transfer example motivates tests for early indication, discrimination from dust, sensor placement in forced-flow paths, response time and nuisance alarms. A smoke detector’s performance cannot be assumed from 1-g testing alone.
- **Suppression and response:** BASS/BASS-II, FLEX and SAFFIRE are different experiment families. Candidate extinguishers or suppression methods should be compared only within compatible fuels, apparatus, atmosphere and reported outcome. Crews also need alternate escape paths and trained procedures.
- **Materials and equipment:** Project FIRES shows that space-derived materials can transfer to terrestrial protective equipment, but transfer is not automatic qualification for a spacecraft cabin or suit. Every proposed material/system still needs application-specific testing.

**What the current evidence does not support:** a universal “safest material” ranking, an oxygen-enrichment prescription, a lunar-gravity flame-spread value from microgravity records, a predicted probability of ignition, or a certified suppression recommendation. The challenge resource list contains no direct 1/6-g combustion dataset; do not infer one from a round flame image or from an electric-field/ion-wind demonstration.

## Changes made in the application

- Kept **NASA PSI Combustion Science** as the sole source of experimental measurements and surfaced NASA’s explicit source statement.
- Added a bilingual **Mission Safety Lessons** page that analyzes only the listed Apollo 1, Apollo 13, Mir and NASA Spinoff sources, with each incident/technology-transfer item labeled as context rather than experiment data.
- Consolidated the duplicate Provenance page into **Sources & Methods**, retaining evidence labels and the integrity boundary there.
- Kept investigation evidence, physics, atmosphere context, safety insights, study-level analysis, optional SI assistant, reproducible reports and language/theme settings because each directly supports the challenge’s dashboard workflow.
- Kept unrelated challenge datasets, Earth-fire feeds and solar/space-weather feeds out of the challenge analysis path.

## Video separation

- [Official Flame in Freefall challenge overview video](https://www.youtube.com/watch?v=AVuEiKxOpc0): project-specific objectives and NASA PSI walkthrough; it is not a data file.
- [NASA ScienceCasts resource video](https://www.youtube.com/watch?v=W1oXykoz9zg): short combustion-science introduction; it is not the official challenge overview and not a data file.

Interpretive video notes are paraphrases, not NASA transcripts. The challenge statement and PSI records remain the authority for objectives and measurements.

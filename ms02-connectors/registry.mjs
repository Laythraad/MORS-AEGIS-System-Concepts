// The active product corpus is limited to challenge-relevant NASA PSI combustion records.
// API-backed Earth fire and space-weather feeds are not part of this research corpus.
const psi = (id, name, doi, note, license = 'CC0-1.0') => ({
  id, name, domain: 'NASA PSI · Combustion Science', access: 'Bundled original experimental table',
  url: `https://psi.nasa.gov/physci/repo/data/investigations/${id}`,
  doi, license, mode: 'bundled-source-file', note
});

export const SOURCES = [
  psi('PSI-20', 'ACME Burning Rate Emulator (BRE)', null, '18 table rows summarize dates, burner sizes, fuel bottles, oxygen levels, and ignition counts; not individual flame measurements.', 'Not stated in PSI inventory metadata; consult the linked record.'),
  psi('PSI-21', 'ACME Coflow Laminar Diffusion (CLD) Flame', null, '32 table rows summarize test-day ignition and fuel/MFC conditions. Source identifiers such as CH5/CH6 are preserved without correction.', 'Not stated in PSI inventory metadata; consult the linked record.'),
  psi('PSI-22', 'ACME Electric-Field Flames', null, '32 source rows describe test rounds, polarity, fuel concentration and ignition counts; blank/comment rows remain visible.', 'Not stated in PSI inventory metadata; consult the linked record.'),
  psi('PSI-23', 'ACME Spherical Diffusion (s-Flame)', null, '18 day-level ignition summaries. Source strings are preserved; no row is claimed to be an individual flame measurement.', 'Not stated in PSI inventory metadata; consult the linked record.'),
  psi('PSI-25', 'Burning and Suppression of Solids-II (BASS-II)', '10.60555/4qc4-de67', 'NASA PSI experimental table; 129 source rows. Row count is not a pooled study with other investigations.'),
  psi('PSI-26', 'Burning and Suppression of Solids (BASS)', '10.60555/58h4-dy80', 'NASA PSI experimental table; 122 source rows. Available columns are sparse and study-specific.'),
  psi('PSI-39', 'Cool Flames Investigation (CFI)', null, '87 condition rows record fuel, pressure, oxygen/nitrogen/helium mixture, and fiber presence; no flame-spread outcome column. CFI means Cool Flames Investigation, not Combustion Integrated Rack (CIR).', 'Not stated in PSI inventory metadata; consult the linked record.'),
  psi('PSI-47', 'Dust and Aerosol Measurement Feasibility Test (DAFT)', null, 'Two session descriptions concern dust/aerosol sampling, not flame propagation.', 'Not stated in PSI inventory metadata; consult the linked record.'),
  psi('PSI-68', 'Flame Extinguishment Experiment-2 (FLEX-2)', null, 'Eight rows specify fuel-droplet test ranges for oxygen, pressure, temperature, and flow; ranges are not individual results.', 'Not stated in PSI inventory metadata; consult the linked record.'),
  psi('PSI-69', 'Flame Extinguishment Experiment (FLEX)', '10.60555/mbq8-0451', 'NASA PSI experimental table; 274 liquid-droplet records. Detailed statistical analysis is limited to this investigation.'),
  psi('PSI-98', 'Spacecraft Fire Safety Experiment-I (SAFFIRE-I)', '10.60555/0t15-1z43', 'Four table rows include two material samples and two pre-test flow-visualisation references.'),
  psi('PSI-99', 'Spacecraft Fire Experiment-II (SAFFIRE-II)', '10.60555/2chp-m469', 'Fifteen table rows include sample entries, image references, and footnotes; source label “?-g” is preserved.'),
  psi('PSI-100', 'Spacecraft Fire Experiment-III (SAFFIRE-III)', '10.60555/040q-4h36', 'Two sample-condition rows plus separate raw telemetry files; channel units require source-specific calibration.'),
  psi('PSI-101', 'Smoke Aerosol Measurement Experiment-Reflight (SAME-R)', '10.60555/2np7-jv14', 'NASA PSI experimental table; 109 source entries for smoke/aerosol measurement.'),
  psi('PSI-102', 'Smoke and Aerosol Measurement Experiment (SAME)', '10.60555/gd4k-8h62', 'Eight source rows; four have numeric Teflon weight-loss values, four are material cross-references.'),
  psi('PSI-107', 'Smoke Point In Co-flow Experiment (SPICE)', null, '469 source rows include ethylene test times, nozzle, fuel-rate, and air-rate fields. The log does not provide a universally comparable flame-spread metric.', 'Not stated in PSI inventory metadata; consult the linked record.'),
  {
    id: 'nasa-fire-safety', name: 'NASA · Studying Combustion and Fire Safety', domain: 'Scientific interpretation',
    access: 'Public technical reference', url: 'https://www.nasa.gov/missions/station/studying-combustion-and-fire-safety/',
    mode: 'background-reference', note: 'Explains buoyancy, ventilation, fire detection, extinguishment, and the scope of NASA combustion investigations; not an experiment dataset.'
  },
  {
    id: 'nasa-sciencecast-combustion-iss', name: 'NASA ScienceCasts · The Power of Studying Combustion on the ISS', domain: 'Challenge video and science communication',
    access: 'NASA public video', url: 'https://www.youtube.com/watch?v=W1oXykoz9zg',
    mode: 'background-video', note: 'Introductory explanation of buoyancy, microgravity combustion, FLEX, ACME and fire-safety motivation. It is not a source of tabular experimental measurements.'
  },
  {
    id: 'nasa-ntrs-api', name: 'NASA Technical Reports Server OpenAPI', domain: 'Technical literature discovery',
    access: 'Public search API documentation', url: 'https://ntrs.nasa.gov/api/openapi/',
    mode: 'literature-discovery-reference', note: 'The challenge background points to NASA technical reports as scientific context. This build cites selected reports but does not claim a complete NTRS literature harvest.'
  },
  {
    id: 'nasa-flex-tp-2015', name: 'NASA/TP-2015-216046 · FLEX Detailed Experimental Results', domain: 'FLEX definitions and units',
    access: 'Public NASA Technical Publication', url: 'https://ntrs.nasa.gov/citations/20150023456',
    mode: 'method-reference', note: 'Defines the FLEX burning-rate value as a fitted droplet-diameter-squared/time rate constant and the table unit as mm²/s.'
  },
  {
    id: 'nasa-ochmo-fire', name: 'NASA OCHMO-TB-008 · Fire Protection', domain: 'Crew safety and fire protection',
    access: 'Public technical brief', url: 'https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-008-fire-protection.pdf',
    mode: 'background-reference', note: 'NASA technical brief based on NASA-STD-3001. Used for context on prevention, detection, response, suppression, and oxygen hazards.'
  },
  {
    id: 'nasa-std-3001-v2', name: 'NASA-STD-3001 Volume 2 · Revision F', domain: 'Human-system design standard',
    access: 'Public standard', url: 'https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf',
    mode: 'background-reference', note: 'Atmosphere and crew-safety constraints provide context; this project does not make vehicle-compliance claims.'
  },
  {
    id: 'nasa-ochmo-habitable-atmosphere', name: 'NASA OCHMO-TB-003 · Habitable Atmosphere', domain: 'Crew health and atmosphere design',
    access: 'Public NASA technical brief', url: 'https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-003-habitable-atmosphere.pdf',
    mode: 'background-reference', note: 'Explains pressure/oxygen tradeoffs and EVA preparation. Context only; it is not an experimental fire dataset.'
  },
  {
    id: 'nasa-exploration-atmosphere-lpsc-2026', name: 'NASA · Lunar and Planetary Science Conference 2026: Exploration Atmosphere', domain: 'Exploration atmosphere design context',
    access: 'Public NASA NTRS presentation', url: 'https://ntrs.nasa.gov/citations/20260001966',
    mode: 'background-reference', note: 'Describes studied exploration-atmosphere scenarios and their EVA prebreathe / fire-safety tradeoffs. Values are design-study cases, not final universal habitat requirements.'
  }
];

export const SURVEILLANCE_TECHNOLOGIES = [
  {
    id: 'data-brokers',
    name: 'Commercial Data Brokers',
    icon: 'Database',
    color: 'red',
    tagline: 'Private companies selling your data to government agencies',
    description:
      'Companies like Palantir, Babel Street (LocateX), and Thomson Reuters CLEAR collect vast amounts of personal data from commercial sources and sell access to law enforcement and immigration agencies — often without warrants. ICE and DHS have spent hundreds of millions on these contracts to track and profile individuals.',
    whyItMatters: [
      'ICE and DHS purchase location data to bypass warrant requirements',
      'Data harvested from apps, ad networks, and public records',
      'No meaningful oversight or accuracy requirements',
      'Disproportionately impacts immigrant communities',
    ],
    keyPlayers: [
      'Palantir',
      'Babel Street (LocateX)',
      'Thomson Reuters CLEAR',
      'LexisNexis',
      'Fog Data Science',
    ],
    links: [
      {
        label: 'EFF: Mass Surveillance Technologies',
        url: 'https://www.eff.org/issues/mass-surveillance-technologies',
      },
      {
        label: 'Benn Jordan: Surveillance Investigations',
        url: 'https://www.youtube.com/@BennJordan',
      },
    ],
    waSpecific:
      'Washington agencies may be purchasing commercial data broker access with limited public disclosure. File records requests to find out.',
  },
  {
    id: 'cell-site-simulators',
    name: 'Cell-Site Simulators (Stingrays)',
    icon: 'Smartphone',
    color: 'orange',
    tagline: 'Fake cell towers that intercept your phone communications',
    description:
      'Cell-site simulators (brand name "Stingray") mimic cell towers to force nearby phones to connect, revealing location data and potentially intercepting communications of everyone in the area — not just suspects. Tacoma PD secretly operated StingRay devices from 2008-2014, funded by DHS grants and hidden under FBI non-disclosure agreements. The program was used 179+ times — almost entirely for drug cases, never for its stated counter-terrorism purpose. The scandal cost Tacoma taxpayers over $361,000 in public records penalties and prompted Washington\'s landmark cell-site simulator warrant law.',
    whyItMatters: [
      'Captures data from ALL phones in range, not just targets',
      'FBI NDAs required Tacoma PD to drop cases rather than reveal StingRay use in court',
      'Tacoma\'s device was deployed 179+ times without judges knowing what they were authorizing',
      'UW SeaGlass detected suspicious IMSI-catcher signals near USCIS and Sea-Tac Airport',
    ],
    keyPlayers: [
      'Harris/L3Harris (StingRay/KingFish/Hailstorm)',
      'Digital Receiver Technology (DRTBox)',
      'Verint Systems (SkyLock)',
      'Octasic/Nyxcell',
    ],
    links: [
      {
        label: 'Full Report: Tacoma StingRay Program',
        url: '/tacoma-stingray-report.html',
      },
      {
        label: 'EFF RayHunter Project',
        url: 'https://www.eff.org/deeplinks/2025/03/introducing-rayhunter',
      },
      {
        label: 'ACLU: Stingray Tracking Devices',
        url: 'https://www.aclu.org/issues/privacy-technology/surveillance-technologies/stingray-tracking-devices',
      },
      {
        label: 'EFF Atlas of Surveillance: Tacoma PD',
        url: 'https://atlasofsurveillance.org/search?agency=Tacoma+Police+Department',
      },
    ],
    waSpecific:
      'Tacoma PD is the only confirmed WA agency with documented StingRay possession (2008-present). Washington requires warrants under HB 1440 (RCW 9.73, signed May 11, 2015), with the nation\'s first data-deletion mandate for bystander data. Seattle PD has not acknowledged possession, but UW researchers detected anomalies consistent with IMSI-catcher activity in the Seattle-Tacoma corridor.',
  },
  {
    id: 'alpr-networks',
    name: 'ALPR Networks (License Plate Readers)',
    icon: 'Camera',
    color: 'blue',
    tagline: 'Automated cameras creating a nationwide vehicle tracking web',
    description:
      'While Flock Safety dominates headlines, multiple ALPR vendors operate interconnected networks that share data across jurisdictions. Motorola/Vigilant, Genetec, and ELSAG systems create a surveillance web tracking vehicle movements nationwide. Private companies also sell ALPR data to repo companies, insurance firms, and private investigators.',
    whyItMatters: [
      'Multiple vendors means multiple data-sharing networks',
      'National lookup features allow cross-jurisdiction tracking',
      'Private companies sell ALPR data to non-government buyers',
      'Retention policies vary wildly — some keep data for years',
    ],
    keyPlayers: [
      'Flock Safety',
      'Motorola Solutions/Vigilant',
      'Genetec',
      'ELSAG/Neology',
      'Rekor Systems',
    ],
    links: [
      {
        label: 'Flock-You: ALPR Research Tool',
        url: 'https://github.com/colonelpanichacks/flock-you',
      },
      {
        label: 'EFF: Automated License Plate Readers',
        url: 'https://www.eff.org/pages/automated-license-plate-readers-alpr',
      },
    ],
    waSpecific:
      'The November 2025 court ruling (Rodriguez v. Sedro Woolley) confirmed Flock data is public record. This likely applies to all ALPR vendors in Washington State.',
  },
  {
    id: 'facial-recognition',
    name: 'Facial Recognition',
    icon: 'Eye',
    color: 'purple',
    tagline: 'AI-powered identification from photos and video feeds',
    description:
      "Facial recognition technology allows law enforcement to identify individuals from surveillance camera footage, social media photos, or driver's license databases. Error rates are significantly higher for people of color, and the technology has led to multiple documented wrongful arrests nationwide.",
    whyItMatters: [
      'Documented racial bias with higher error rates for Black and Brown faces',
      'Can be used retroactively on stored surveillance footage',
      'Chilling effect on free speech and assembly',
      'Multiple wrongful arrests documented nationwide',
    ],
    keyPlayers: [
      'Clearview AI',
      'NEC',
      'Idemia',
      'Amazon Rekognition',
      'Cognitec',
    ],
    links: [
      {
        label: 'EFF: Face Recognition',
        url: 'https://www.eff.org/issues/face-recognition',
      },
    ],
    waSpecific:
      'Washington passed SB 6280 in 2020 requiring accountability for government use of facial recognition — one of the first state laws of its kind.',
  },
  {
    id: 'social-media-monitoring',
    name: 'Social Media Monitoring',
    icon: 'Share2',
    color: 'cyan',
    tagline: 'Systematic tracking of public social media activity',
    description:
      'Law enforcement agencies use specialized tools to monitor social media platforms, track individuals, map social networks, and identify people at protests or community events. These tools scrape public posts and sometimes use fake accounts to access private information.',
    whyItMatters: [
      'Targets activists, protesters, and community organizers',
      'Creates profiles and social network maps of individuals',
      'Often conducted without any criminal predicate',
      'Contracts with monitoring firms are rarely disclosed publicly',
    ],
    keyPlayers: [
      'Babel Street',
      'Dataminr',
      'Geofeedia',
      'Media Sonar',
      'ShadowDragon',
    ],
    links: [
      {
        label: 'EFF: Mass Surveillance Technologies',
        url: 'https://www.eff.org/issues/mass-surveillance-technologies',
      },
    ],
    waSpecific: null,
  },
  {
    id: 'geofence-warrants',
    name: 'Geofence Warrants & Location Data',
    icon: 'MapPin',
    color: 'yellow',
    tagline: 'Demanding location data for everyone near a crime scene',
    description:
      'Geofence warrants (also called "reverse location warrants") compel Google, Apple, or other companies to turn over data on every device present in a geographic area at a specific time. Alternatively, agencies purchase location data from commercial brokers — bypassing the warrant requirement entirely.',
    whyItMatters: [
      'Sweeps up data on hundreds or thousands of innocent people',
      'Google alone received 10,000+ geofence warrants per year before policy changes',
      'Purchasing location data from brokers bypasses warrant requirements',
      'Can place innocent people at crime scenes',
    ],
    keyPlayers: [
      'Google',
      'Apple',
      'Fog Data Science',
      'Venntel/Gravy Analytics',
    ],
    links: [
      {
        label: 'EFF: Mass Surveillance Technologies',
        url: 'https://www.eff.org/issues/mass-surveillance-technologies',
      },
    ],
    waSpecific: null,
  },
  {
    id: 'predictive-policing',
    name: 'Predictive Policing Tools',
    icon: 'Activity',
    color: 'pink',
    tagline: 'Algorithms that claim to predict crime before it happens',
    description:
      'Predictive policing software uses historical crime data and other inputs to generate "predictions" about where crime will occur or who will commit it. These tools encode and amplify existing biases in policing data, creating feedback loops that reinforce over-policing of specific communities.',
    whyItMatters: [
      'Historical data reflects biased policing, not actual crime patterns',
      'Creates feedback loops: over-policed areas get predicted for more policing',
      'Multiple cities have abandoned these tools after audits revealed bias',
      'Often marketed without rigorous independent validation',
    ],
    keyPlayers: [
      'PredPol/Geolitica',
      'Palantir Gotham',
      'HunchLab',
      'ShotSpotter/SoundThinking',
    ],
    links: [
      {
        label: 'EFF: Predictive Policing',
        url: 'https://www.eff.org/issues/mass-surveillance-technologies',
      },
    ],
    waSpecific: null,
  },
];

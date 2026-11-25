/* Public editorial examples and source links. No member records or credentials. */
const links = {
  onboard: ["OnBoard KC", "https://onboardkc.org/onboard-for-volunteers/"],
  nonprofit: ["Nonprofit Connect", "https://www.npconnect.org/volunteer-opportunities/"],
  housing: ["MARC Housing", "https://www.marc.org/economy-housing/housing"],
  transport: ["Transportation Resiliency KC", "https://www.marc.org/transportation/plans-and-studies/transportation-resiliency-kc"],
  climate: ["MARC Climate Action Plan", "https://www.marc.org/environment/environment-plans/climate-action-plan"],
  kcmo: ["KCMO City Clerk calendar", "https://clerk.kcmo.gov/Calendar.aspx"],
  ug: ["Unified Government public calendar", "https://www.wycokck.org/Engage-With-Us/Calendar-of-Events"],
  volunteer: ["United Way volunteer opportunities", "https://unitedwaygkc.org/volunteer/"],
  centurions: ["Centurions Leadership Program", "https://www.kcchamber.com/centurions/"],
  marcEvents: ["MARC events", "https://www.marc.org/calendar"]
};

const december1Participation = (committee, time) =>
  ["How to participate", `The ${committee} meets Tuesday, December 1, 2026, at ${time} Central in the 26th-floor Council Chamber at City Hall, 414 E. 12th Street. Give testimony in person or use the Zoom link on the official meeting page. The agenda sets a two-minute limit. Mention the file number when you speak.`];

const december1Finance = {
  participation: december1Participation("Finance, Governance and Public Safety Committee", "9:00 a.m."),
  link: ["Meeting details and Zoom link", "https://clerk.kcmo.gov/MeetingDetail.aspx?GUID=E005DAD2-B267-43D7-B4B8-CA5B36A80C71&ID=1464356&Options=info%7C&Search="]
};

const hubContent = {
  brief: [
    {
      id: "plaza-sidewalks-260445", kind: "Public decisions", title: "Who would manage sidewalks at the Country Club Plaza",
      description: "A proposal would shift sidewalk upkeep to the property owner and set terms for continued public pedestrian access. File 260445 is on the December 1 agenda.",
      source: "KCMO City Clerk · Reviewed Nov. 25, 2026", icon: "houses", tone: "connect",
      details: [
        ["What would change", "The committee substitute would end the city’s public right-of-way designation for designated Plaza sidewalks and put their upkeep under the property owner. It would require a recorded agreement preserving 24-hour public pedestrian access, with temporary closures allowed for activities such as emergencies, construction, maintenance, and special events. The agreement would bar checkpoints or other controls that would interfere with public access."],
        december1Participation("Neighborhood Planning and Development Committee", "1:30 p.m."),
        ["Where it stands", "The December 1 agenda lists this committee substitute under Held in Committee."]
      ],
      links: [
        ["Read the proposal · File 260445", "https://clerk.kcmo.gov/LegislationDetail.aspx?ID=8006002&GUID=896772E5-BFBB-4696-A9DE-CEA7AA43D861&Options=&Search="],
        ["Meeting details and Zoom link", "https://clerk.kcmo.gov/MeetingDetail.aspx?GUID=A4295C95-3C6D-48FA-BC99-E164730B7DFE&ID=1464561&Options=info%7C&Search="],
        ["City Planning presentation (PDF)", "https://clerk.kcmo.gov/View.ashx?M=F&ID=16126174&GUID=D9E884EB-DCA9-4D1A-B523-1ED0A84A0B0B"]
      ]
    },
    {
      id: "prospect-water-mains-260992", kind: "Public decisions", title: "A plan to move Prospect Avenue water main work forward",
      description: "A proposal would ask the city to address delays in water main replacement and the resurfacing that follows. File 260992 is on the December 1 agenda.",
      source: "KCMO City Clerk · Reviewed Nov. 25, 2026", icon: "map-pin", tone: "educate",
      details: [
        ["What would change", "The City Manager would identify and address barriers to water main replacement on Prospect Avenue from East Linwood Boulevard to East 63rd Street and to the street resurfacing that follows. The proposal singles out the stretch from Emmanuel Cleaver II Boulevard to East 58th Street. A report to the Council within 30 days would identify the bottlenecks, the steps the city plans to take, and an expected completion schedule."],
        december1Finance.participation,
        ["Where it stands", "The December 1 agenda lists the proposed resolution for first reading."]
      ],
      links: [
        ["Read the proposal · File 260992", "https://clerk.kcmo.gov/LegislationDetail.aspx?ID=8316774&GUID=82268F08-9165-402D-90D7-7454BA109BA0&Options=&Search="],
        december1Finance.link
      ]
    },
    {
      id: "digital-accessibility-260996", kind: "Public decisions", title: "Making Kansas City’s digital services more accessible",
      description: "A proposal calls for Kansas City to find and fix accessibility barriers in websites, online forms and apps. File 260996 is on the December 1 agenda.",
      source: "KCMO City Clerk · Reviewed Nov. 25, 2026", icon: "book-open", tone: "activate",
      details: [
        ["What would change", "The City Manager would inventory city websites, forms, apps, and other digital services, then develop a plan to fix accessibility barriers and train staff. The resolution calls for a cost estimate, a first progress report within 60 days of passage, and monthly updates through the April 26, 2027 compliance date. The work would help residents with disabilities use city information and online services."],
        december1Finance.participation,
        ["Where it stands", "The December 1 agenda lists the proposed resolution for first reading."]
      ],
      links: [
        ["Read the proposal · File 260996", "https://clerk.kcmo.gov/LegislationDetail.aspx?ID=8321084&GUID=A2DE6F28-AE6A-41AF-8A50-82795EAD1507&Options=&Search="],
        december1Finance.link,
        ["Federal accessibility timeline", "https://www.ada.gov/resources/web-rule-first-steps/"]
      ]
    },
    {
      id: "barney-allis-plaza-260985", kind: "Public decisions", title: "More construction management for Barney Allis Plaza",
      description: "A proposed contract amendment would extend construction management services for the plaza. File 260985 is on the December 1 agenda.",
      source: "KCMO City Clerk · Reviewed Nov. 25, 2026", icon: "briefcase", tone: "connect",
      details: [
        ["What would change", "Kansas City would authorize a $300,001 amendment to Wellner Architects’ construction management contract for Barney Allis Plaza. The ordinance states a new contract cap of $899,000 and uses funds the city already set aside. The staff memo says the amendment would extend construction management services through June 30, 2027, to support completion of the plaza project."],
        december1Finance.participation,
        ["Where it stands", "The December 1 agenda lists the proposed ordinance for first reading."]
      ],
      links: [
        ["Read the proposal · File 260985", "https://clerk.kcmo.gov/LegislationDetail.aspx?ID=8316758&GUID=21074AAA-96CD-42DB-8818-2D88043260D3&Options=&Search="],
        december1Finance.link,
        ["Staff memo (PDF)", "https://clerk.kcmo.gov/View.ashx?M=F&ID=16157863&GUID=06B76A7E-CFC9-4C0E-A18E-1D1E3400B450"]
      ]
    },
    {
      id: "streetcar-proposal-260993", kind: "Public decisions", title: "How KC could clear blocked streetcar tracks",
      description: "A city proposal would clarify who can arrange towing when vehicles block streetcar service. File 260993 is on the December 1 committee agenda.",
      source: "KCMO City Clerk · Reviewed Nov. 25, 2026", icon: "train", tone: "connect",
      details: [
        ["What would change", "The proposal would update Kansas City’s parking and towing rules. It names the KC Streetcar Authority, the Kansas City Area Transportation Authority, and several city departments among the agencies that could request a tow when a vehicle unlawfully blocks streetcar operations."],
        ["Why it matters", "A vehicle on the tracks can stop service and delay riders. The proposal aims to make it clearer who can act to get service moving again."],
        ["How to participate", "The Transportation, Infrastructure and Operations Committee is scheduled to meet Tuesday, December 1, 2026, at 10:30 a.m. Central in the 26th-floor Council Chamber at City Hall, 414 E. 12th Street. You can give public testimony in person or via the Zoom link on the official meeting page. The agenda sets a two-minute limit for testimony. Mention file 260993 when you speak and check the meeting page for updates."],
        ["Where it stands", "The City Council referred the proposal to the committee on November 12. The City Clerk’s record lists it as referred as of November 25."]
      ],
      links: [
        ["Read the proposal · File 260993", "https://clerk.kcmo.gov/LegislationDetail.aspx?FullText=1&GUID=7139EFC0-9A6F-48EC-BC56-359F66FB5BC3&ID=8316775"],
        ["Meeting details and Zoom link", "https://clerk.kcmo.gov/MeetingDetail.aspx?GUID=A1A54E00-D64C-4255-8836-5FD42108CBF5&ID=1464370"],
        ["Read the December 1 agenda (PDF)", "https://kansascity.legistar1.com/kansascity/meetings/2026/12/19640_A_Transportation%2C_Infrastructure_and_Operations_Committee_26-12-01_Agenda_-_Committees.pdf"]
      ]
    },
    {
      id: "housing-brief", kind: "Local reporting", title: "What the region’s housing data tells us",
      description: "MARC’s reporting puts local housing affordability in regional context.",
      source: "Mid-America Regional Council", icon: "houses", tone: "educate",
      details: [
        ["What’s happening", "MARC is tracking how housing costs and availability vary across the metro."],
        ["Why it matters", "The regional picture helps local leaders see where households face the greatest pressure and where coordination could help."],
        ["How to take part", "Look up trends in your community, then follow the Regional Housing Partnership to see how local organizations are responding."]
      ],
      links: [["Read MARC’s housing reporting", "https://www.marc.org/news/economy-housing/region-repriced-what-new-housing-data-reveals-about-affordability-kansas-city"], links.housing],
      related: [["Explore the housing initiative", "#initiatives"]]
    },
    {
      id: "public-meetings", kind: "Public decisions", title: "Find a public meeting and read the agenda",
      description: "Use official calendars on both sides of the state line to follow an issue before a decision is made.",
      source: "KCMO City Clerk · Unified Government", icon: "bank", tone: "connect",
      details: [
        ["What’s happening", "The city clerk in Kansas City, Missouri, and the Unified Government in Wyandotte County publish their own calendars."],
        ["Why it matters", "Meeting agendas can help you identify which body handles your issue and when you can follow the discussion."],
        ["How to take part", "Open the host’s calendar, find the agenda, and check how public comments are accepted for that meeting."]
      ],
      links: [links.kcmo, links.ug],
      related: [["See upcoming KCMO meetings", "#meetings"], ["Browse civic calendars", "#events"]]
    },
    {
      id: "volunteer-brief", kind: "Nonprofit spotlight", title: "Find a volunteer role around a cause you care about",
      description: "United Way of Greater Kansas City helps residents find ways to support area nonprofits.",
      source: "United Way of Greater Kansas City", icon: "hand-helping", tone: "activate",
      details: [
        ["What’s happening", "United Way offers volunteer opportunities and maintains a directory of community partners."],
        ["Why it matters", "A volunteer role can help you learn how an organization serves its community before exploring longer-term leadership roles."],
        ["How to take part", "Browse a cause or organization that interests you and check the host’s instructions for getting involved."]
      ],
      links: [links.volunteer, ["See the community partners directory", "https://unitedwaygkc.org/community-partners-directory/"]],
      related: [["Explore service pathways", "#opportunities"]]
    }
  ],
  learn: [
    {
      id: "local-government", kind: "Local government", title: "How local decisions get made",
      description: "Identify the right jurisdiction, read a meeting agenda, and find a way to follow the decision.",
      icon: "bank", tone: "connect",
      details: [
        ["Find the right body", "Start with the place and the issue. A city council, county commission, school board, or regional agency can have different responsibilities."],
        ["Read the agenda", "Find the item number, supporting documents, the meeting location, and the date."],
        ["Follow up", "Look for the minutes or recording after the meeting, and check whether the item moved to another committee or a later vote."]
      ],
      links: [links.kcmo, links.ug]
    },
    {
      id: "board-readiness", kind: "Nonprofit governance", title: "Prepare for your first nonprofit board",
      description: "Ask about mission, time, expectations, and the support new board members receive.",
      icon: "book-open", tone: "educate",
      details: [
        ["Understand the role", "Read the mission and ask how the board works with staff. Request an overview of meetings, committees, and board member expectations."],
        ["Ask practical questions", "Discuss orientation, time commitments, fundraising expectations, and what the organization hopes you can bring."],
        ["Take the next step", "Browse board and committee roles through an existing local service and follow its application process."]
      ],
      links: [links.onboard, links.nonprofit],
      related: [["Explore ways to serve", "#opportunities"]]
    },
    {
      id: "public-comment", kind: "Civic participation", title: "Make a public comment",
      description: "Prepare a short contribution, confirm the host’s process, and follow the outcome.",
      icon: "chat", tone: "activate",
      details: [
        ["Check the format", "Use the meeting notice to see whether public comment is scheduled and how the host accepts it."],
        ["Keep it practical", "Name the agenda item, explain how it affects your community, and make a specific request."],
        ["Follow the outcome", "Check the official minutes and note the next public opportunity to participate."]
      ],
      links: [links.kcmo, links.ug]
    }
  ],
  opportunities: [
    {
      id: "nonprofit-boards", kind: "Nonprofit boards", title: "Serve on a nonprofit board",
      description: "Explore board and committee opportunities through Kansas City organizations that already help people find a role.",
      icon: "users", tone: "educate", links: [["Browse OnBoard KC", "https://platform.onboardkc.org/"], ["Browse Nonprofit Connect", "https://www.npconnect.org/volunteer-opportunities/"]]
    },
    {
      id: "public-boards", kind: "Public boards", title: "Apply for a public board or commission",
      description: "Find the appointing agency and check the board’s role, eligibility, and application process.",
      icon: "bank", tone: "connect", links: [["Kansas City, MO boards and commissions", "https://kansascity.granicus.com/boards/w/12a007c7e86bf335"], ["KCMO volunteer and appointment resources", "https://www.kcmo.gov/programs-initiatives/volunteer"]]
    },
    {
      id: "run-for-office", kind: "Run for office", title: "Explore running for public office",
      description: "Start with the election authority for the office you’re considering. Local filing authorities vary by office.",
      icon: "ballot", tone: "activate", links: [["Kansas candidate information", "https://sos.ks.gov/elections/candidates.html"], ["Missouri election calendar", "https://www.sos.mo.gov/elections/calendar"]]
    },
    {
      id: "civic-careers", kind: "Civic careers", title: "Find a paid civic role",
      description: "Browse local government, nonprofit, and community career resources.",
      icon: "briefcase", tone: "educate", links: [["Nonprofit Connect job board", "https://info.npconnect.org/jobs"], ["Regional public-sector jobs via MARC", "https://www.marc.org/about-marc/careers-marc"]]
    }
  ],
  initiatives: [
    {
      id: "housing-initiative", kind: "Housing", title: "Regional housing affordability",
      description: "Explore MARC’s regional housing work and the Greater Kansas City Regional Housing Partnership.",
      icon: "houses", tone: "educate",
      details: [["Where to start", "Read the regional housing data and visit the partnership to see how local organizations are working together."], ["A way to engage", "Use local housing data to prepare for a community conversation or a public meeting in your jurisdiction."]],
      links: [links.housing, ["Regional Housing Partnership", "https://kcrhp.org/"]]
    },
    {
      id: "transport-initiative", kind: "Transportation", title: "A more resilient transportation network",
      description: "See how MARC and local agencies plan for disruptions to transportation across the metro.",
      icon: "train", tone: "connect",
      details: [["Where to start", "Read the project page to learn how the region studies road, bridge, and transit disruptions."], ["A way to engage", "Check MARC’s calendar for planning meetings and public input opportunities."]],
      links: [links.transport, links.marcEvents]
    },
    {
      id: "climate-initiative", kind: "Environment", title: "Regional climate action",
      description: "Explore the Kansas City Regional Climate Action Plan and connect its priorities to your community.",
      icon: "leaf", tone: "activate",
      details: [["Where to start", "Review the regional plan and identify one strategy that matters to your community."], ["A way to engage", "Find the local agency or organization working on that issue and check its public meeting or volunteer calendar."]],
      links: [links.climate, links.marcEvents]
    }
  ],
  directory: [
    { id: "onboard-kc", kind: "Activate", title: "OnBoard KC", description: "Support KC’s program for board, committee, and other nonprofit volunteer roles.", icon: "users", tone: "educate", links: [links.onboard] },
    { id: "nonprofit-connect", kind: "Educate · Activate", title: "Nonprofit Connect", description: "Training, resources, and public volunteer, board, and career listings for the nonprofit community.", icon: "hand-helping", tone: "activate", links: [links.nonprofit, ["Programs and resources", "https://www.npconnect.org/"]] },
    { id: "marc", kind: "Educate · Connect", title: "Mid-America Regional Council", description: "Regional planning, data, public meetings, and collaboration across Kansas and Missouri.", icon: "map-pin", tone: "connect", links: [["Visit MARC", "https://www.marc.org/"], links.marcEvents] },
    { id: "centurions", kind: "Educate · Connect", title: "Centurions Leadership Program", description: "A Greater Kansas City Chamber of Commerce program for leadership development and community service.", icon: "book-open", tone: "educate", links: [links.centurions] },
    { id: "united-way", kind: "Connect · Activate", title: "United Way of Greater Kansas City", description: "Volunteer pathways, community partner organizations, and opportunities to serve.", icon: "hand-helping", tone: "activate", links: [links.volunteer] },
    { id: "kansas-city-tomorrow", kind: "Educate · Connect", title: "Kansas City Tomorrow", description: "A civic leadership development program from the Civic Council of Greater Kansas City.", icon: "users", tone: "connect", links: [["Visit Kansas City Tomorrow", "https://www.kansascitytomorrow.org/"]] }
  ],
  events: [
    { id: "kcmo-calendar", kind: "Public calendar", title: "Kansas City, Missouri public meetings", description: "Council and committee meetings, agendas, minutes, and recordings.", icon: "calendar", tone: "educate", links: [links.kcmo] },
    { id: "wyandotte-calendar", kind: "Public calendar", title: "Unified Government calendar", description: "Public meetings and community events across Kansas City, Kansas and Wyandotte County.", icon: "calendar", tone: "connect", links: [links.ug] },
    { id: "marc-calendar", kind: "Regional calendar", title: "MARC meetings and events", description: "Regional committee meetings and events on planning and community issues.", icon: "calendar", tone: "activate", links: [links.marcEvents] },
    { id: "nonprofit-calendar", kind: "Community calendar", title: "Nonprofit Connect events", description: "Workshops and gatherings for Kansas City’s nonprofit community.", icon: "calendar", tone: "educate", links: [["Nonprofit Connect events", "https://info.npconnect.org/events"]] }
  ]
};

const countyResources = {
  leavenworth: {
    name: "Leavenworth", state: "Kansas",
    civic: ["County Commission agendas", "https://files.leavenworthcounty.gov/government/county_commission/agenda.php", "Find meeting schedules, agendas, and records from the county commission."],
    nonprofit: ["Leavenworth Interfaith Community of Hope", "https://www.lvcommunityofhope.org/programs/day-center", "Explore volunteer roles at the day center serving people experiencing homelessness."]
  },
  platte: {
    name: "Platte", state: "Missouri",
    civic: ["Platte County Commission videos", "https://www.youtube.com/channel/UCy7bdFmn7YzY8GwUXv3ONzg", "Watch commission sessions on the county’s official channel."],
    nonprofit: ["Hillcrest Platte County", "https://hillcrestplatte.org/volunteer/", "Support housing programs through volunteer roles with Hillcrest’s thrift shops."]
  },
  wyandotte: {
    name: "Wyandotte", state: "Kansas",
    civic: [...links.ug, "Find public meetings and events in Kansas City, Kansas, and Wyandotte County."],
    nonprofit: ["Cross-Lines Community Outreach", "https://www.cross-lines.org/how-to-help/volunteer-opportunities.html", "Volunteer at the community market, warehouse, or front desk in Kansas City, Kansas."]
  },
  clay: {
    name: "Clay", state: "Missouri",
    civic: ["County meetings, agendas and video", "https://claycountymo.gov/129/Meetings-Agendas-Video", "Find upcoming county meetings, agendas, and past recordings."],
    nonprofit: ["HOPE.wrx", "https://hopewrx.org/index.php/volunteers", "Help with food programs serving Clay and Platte counties."]
  },
  ray: {
    name: "Ray", state: "Missouri",
    civic: ["Ray County Commission", "https://raycountymo.com/index.php/county-commission/", "Check the county commission’s meeting notices and agendas."],
    nonprofit: ["Humane Society of Ray County", "https://hsrcadopt.org/volunteer-application/", "Volunteer to care for animals at the shelter in Richmond."]
  },
  johnson: {
    name: "Johnson", state: "Kansas",
    civic: ["County Commissioner meetings", "https://www.jocogov.org/department/board-county-commissioners/board-county-commissioner-meetings", "Find agendas, meeting schedules, and public participation information."],
    nonprofit: ["Johnson County Christmas Bureau", "https://jccb.org/volunteer-1", "Find volunteer roles supporting the nonprofit’s work with Johnson County families."]
  },
  jackson: {
    name: "Jackson", state: "Missouri",
    civic: ["Jackson County Legislature", "https://www.jacksongov.org/Government/County-Legislature", "Find county legislative meetings, agendas, and public hearings."],
    nonprofit: ["Jackson County CASA", "https://casakc.org/welcome.html", "Learn about becoming a volunteer advocate for a child in the county’s family court system."]
  },
  miami: {
    name: "Miami", state: "Kansas",
    civic: ["County Commission agendas and minutes", "https://www.miamicountyks.gov/511/Agendas-Minutes", "See board agendas, packets, and meeting minutes."],
    nonprofit: ["My Father’s House", "https://www.my-fathers-house.com/", "Find housing support and community programs serving Miami and Linn counties."]
  },
  cass: {
    name: "Cass", state: "Missouri",
    civic: ["Cass County Agenda Center", "https://www.casscounty.com/AgendaCenter", "Browse commission meeting notices, agenda packets, and minutes."],
    nonprofit: ["Family Resource Center of Cass County", "https://www.mofamilyresource.org/About-us", "Learn about local food assistance and family resource programs."]
  }
};

const image = (name) => `/images/planner/contextual/${name}.webp`;

export const projectTypeImages = {
  "Family Home": image("type-family-home"),
  "Rental Units": image("type-rental-units"),
  "Luxury Villa": image("type-luxury-villa"),
  "Commercial Building": image("type-commercial-building"),
  "Boundary Wall": image("type-boundary-wall"),
  "Renovation / Extension": image("type-renovation-extension"),
};

const option = (title, description, image) => ({ title, description, image });

const goalOptions = {
  "Family Home": [
    option("Growing family", "Flexible spaces that can adapt as children and routines change.", image("goal-family-growing")),
    option("First home", "A practical, cost-aware home with room to improve over time.", image("goal-family-first-home")),
    option("Forever home", "Long-term comfort, accessibility and spaces designed to age well.", image("goal-family-forever")),
    option("Multi-generational living", "Privacy and connection for different generations under one roof.", image("goal-family-multigenerational")),
    option("Home plus income", "A main home with a rental suite or separable income opportunity.", image("goal-family-home-income")),
  ],
  "Rental Units": [
    option("Long-term family rentals", "Comfortable, private units designed for stable family tenancies.", image("goal-rental-family")),
    option("Young professional rentals", "Efficient modern units with parking, security and low-maintenance appeal.", image("goal-rental-young-professional")),
    option("Workforce or student housing", "Compact, robust accommodation with efficient shared services.", image("goal-rental-workforce-student")),
    option("Short-stay accommodation", "Guest-ready units shaped around arrival, privacy and easy turnover.", image("goal-rental-short-stay")),
    option("Premium rental market", "Higher-spec units designed to command stronger rent and tenant quality.", image("goal-rental-premium")),
    option("Maximum site yield", "Test how many viable units the site can support without weakening access or liveability.", image("goal-rental-maximum-yield")),
  ],
  "Luxury Villa": [
    option("Private family retreat", "A generous home balancing togetherness, privacy and calm.", image("goal-villa-private-retreat")),
    option("Executive entertaining", "Impressive arrival and social spaces made for hosting confidently.", image("goal-villa-executive-entertaining")),
    option("Resort-style living", "Indoor-outdoor living, wellness and everyday escape at home.", image("goal-villa-resort")),
    option("Legacy residence", "A timeless, durable home intended to serve the family for generations.", image("goal-villa-legacy")),
    option("Architectural statement", "A distinctive one-off property with memorable form and presence.", image("goal-villa-architectural-statement")),
  ],
  "Commercial Building": [
    option("Professional offices", "A credible workplace supporting staff focus, clients and future growth.", image("goal-commercial-offices")),
    option("Retail or customer-facing space", "Visibility, easy access and a strong customer experience.", image("goal-commercial-retail")),
    option("Mixed-use investment", "Compatible business and rental uses planned for flexible income.", image("goal-commercial-mixed-use")),
    option("Hospitality or accommodation", "Guest flow, service operations and a memorable sense of arrival.", image("goal-commercial-hospitality")),
    option("Workshop or light industrial", "Practical servicing, robust structure and efficient operational flow.", image("goal-commercial-workshop")),
    option("Healthcare or specialist use", "Clear circulation, privacy and fit-for-purpose professional rooms.", image("goal-commercial-healthcare")),
  ],
  "Boundary Wall": [
    option("Security and privacy", "A secure perimeter that controls views and protects the property.", image("goal-wall-security-privacy")),
    option("Entrance and street appeal", "A frontage, gate and arrival that strengthen the property's identity.", image("goal-wall-street-appeal")),
    option("Cost-effective enclosure", "A practical, durable wall focused on essential coverage and value.", image("goal-wall-cost-effective")),
    option("Estate-quality perimeter", "A coordinated premium boundary treatment with refined detailing.", image("goal-wall-estate-quality")),
    option("Access and gate upgrade", "Improve vehicle, pedestrian and service access at the property edge.", image("goal-wall-gate-upgrade")),
    option("Replace a failing wall", "Resolve cracking, leaning, drainage or foundation concerns properly.", image("goal-wall-replacement")),
  ],
  "Renovation / Extension": [
    option("Add more living space", "Create the extra rooms or floor area the property now needs.", image("goal-renovation-more-space")),
    option("Improve layout and flow", "Fix awkward circulation, dark rooms or disconnected living spaces.", image("goal-renovation-flow")),
    option("Modernise an older property", "Upgrade appearance, comfort and services while retaining useful structure.", image("goal-renovation-modernise")),
    option("Repair structural concerns", "Investigate and resolve cracking, movement or deteriorated building elements.", image("goal-renovation-structural-repair")),
    option("Convert for rental income", "Replan the property into practical, private income-generating spaces.", image("goal-renovation-rental-conversion")),
    option("Upgrade for resale or value", "Target improvements that strengthen market appeal without wasteful work.", image("goal-renovation-resale-value")),
  ],
};

const styleOptions = {
  "Family Home": [
    option("Modern Minimalist", "Clean family spaces, calm forms and easy everyday upkeep.", image("style-family-modern-minimalist")),
    option("Contemporary African", "Climate-aware modern living with local warmth and character.", image("style-family-contemporary-african")),
    option("Simple Affordable", "Efficient planning and practical finishes with future flexibility.", image("style-family-simple-affordable")),
    option("Traditional Modern", "Familiar domestic warmth refined for contemporary life.", image("style-family-traditional-modern")),
    option("Bold Architectural", "A more individual home with strong geometry and presence.", image("style-family-bold-architectural")),
  ],
  "Rental Units": [
    option("Durable Modern", "Clean, repeatable units with robust finishes and broad tenant appeal.", image("style-rental-durable-modern")),
    option("Compact Contemporary", "Space-efficient planning that still feels bright and current.", image("style-rental-compact-contemporary")),
    option("Contemporary African", "Climate-responsive rental living with shade and local character.", image("style-rental-contemporary-african")),
    option("Simple Cost-Efficient", "Straightforward forms and finishes that protect the development budget.", image("style-rental-cost-efficient")),
    option("Premium Urban", "Sharper detailing and finishes for a higher-value rental market.", image("style-rental-premium-urban")),
  ],
  "Luxury Villa": [
    option("Luxury Executive", "Confident proportions, premium finishes and impressive arrival.", image("style-villa-luxury-executive")),
    option("Contemporary African", "Resort-like comfort shaped by climate, landscape and place.", image("style-villa-contemporary-african")),
    option("Modern Minimalist", "Quiet luxury expressed through proportion, light and precise detail.", image("style-villa-modern-minimalist")),
    option("Bold Architectural", "Sculptural forms and a memorable one-of-one identity.", image("style-villa-bold-architectural")),
    option("Timeless Modern", "Enduring materials and balanced forms beyond short-lived trends.", image("style-villa-timeless-modern")),
  ],
  "Commercial Building": [
    option("Corporate Contemporary", "A credible, adaptable image for professional organisations.", image("style-commercial-corporate")),
    option("Retail Showcase", "Visible, welcoming architecture designed to attract customers.", image("style-commercial-retail-showcase")),
    option("Industrial Practical", "Robust, efficient construction with clear operational logic.", image("style-commercial-industrial")),
    option("Contemporary African", "Climate-aware commercial design with a distinctive local identity.", image("style-commercial-contemporary-african")),
    option("Premium Business", "Refined materials and arrival for high-value clients and tenants.", image("style-commercial-premium")),
  ],
  "Boundary Wall": [
    option("Modern Screened", "A clean wall with controlled openings, screens or slatted accents.", image("style-wall-modern-screened")),
    option("Solid Privacy", "A strong, private enclosure with restrained practical detailing.", image("style-wall-solid-privacy")),
    option("Contemporary Masonry", "Textured masonry and modern proportions with durable character.", image("style-wall-contemporary-masonry")),
    option("Cost-Efficient Secure", "Simple robust construction focused on coverage and security.", image("style-wall-cost-efficient")),
    option("Estate Statement", "Premium pillars, gates and lighting for a formal arrival.", image("style-wall-estate-statement")),
  ],
  "Renovation / Extension": [
    option("Seamless Match", "Make the new work feel like a natural continuation of the property.", image("style-renovation-seamless-match")),
    option("Modern Contrast", "Let the new addition read clearly while complementing the original.", image("style-renovation-modern-contrast")),
    option("Contemporary African", "Improve shade, ventilation and local character as the property changes.", image("style-renovation-contemporary-african")),
    option("Simple Cost-Efficient", "Prioritise useful change, practical finishes and controlled scope.", image("style-renovation-cost-efficient")),
    option("Premium Upgrade", "Lift the property with refined finishes and stronger architectural detail.", image("style-renovation-premium-upgrade")),
  ],
};

const featureOptions = {
  "Family Home": [
    "Open-plan kitchen and living",
    "Ensuite main bedroom",
    "Flexible extra bedroom",
    "Home office or study",
    "Covered outdoor living",
    "Garage or carport",
    "Laundry and utility space",
    "Generous storage",
    "Natural light and ventilation",
    "Secure child-friendly garden",
    "Future extension allowance",
  ],
  "Rental Units": [
    "Private entrances",
    "Dedicated tenant parking",
    "Separate utility metering",
    "Durable low-maintenance finishes",
    "Efficient repeatable unit layouts",
    "Tenant privacy between units",
    "Secure refuse and service area",
    "Laundry provision",
    "Natural light and ventilation",
    "Secure perimeter and access control",
    "Caretaker or management space",
    "Future unit expansion allowance",
  ],
  "Luxury Villa": [
    "Statement entrance",
    "Double-volume living",
    "Luxury main suite",
    "Guest suites",
    "Chef's kitchen and scullery",
    "Indoor-outdoor entertainment",
    "Swimming pool or wellness area",
    "Home office or library",
    "Multi-car garage",
    "Staff or service accommodation",
    "Landscape and courtyard integration",
    "Smart-home and security systems",
  ],
  "Commercial Building": [
    "Clear customer entrance",
    "Staff and visitor parking",
    "Accessible public facilities",
    "Flexible internal layout",
    "Reception or waiting area",
    "Service and delivery access",
    "Secure storage",
    "Staff facilities",
    "Signage and street visibility",
    "Backup power provision",
    "Efficient ventilation and daylight",
    "Future expansion or subdivision",
  ],
  "Boundary Wall": [
    "Vehicle gate",
    "Pedestrian gate",
    "Automated access",
    "Security lighting",
    "Electric fence provision",
    "Privacy screening",
    "Drainage openings",
    "Retaining sections",
    "Guardhouse or gatehouse",
    "Intercom or access control",
    "Decorative street frontage",
    "Future maintenance access",
  ],
  "Renovation / Extension": [
    "Additional bedroom or suite",
    "Kitchen reconfiguration",
    "Open-plan living",
    "New bathroom or ensuite",
    "Improved natural light",
    "Covered outdoor living",
    "Roof or waterproofing upgrade",
    "Electrical and plumbing upgrade",
    "Structural repairs",
    "Accessibility improvements",
    "Rental unit conversion",
    "Energy and climate improvements",
  ],
};

const goalFeatureBoosts = {
  "Short-stay accommodation": ["Guest check-in point", "Linen and housekeeping storage", "Furnished-ready layouts"],
  "Premium rental market": ["Higher-spec kitchens and bathrooms", "Private outdoor space", "Enhanced acoustic privacy"],
  "Maximum site yield": ["Compact circulation", "Shared service zones", "Phased development plan"],
  "Workforce or student housing": ["Shared social space", "Shared laundry", "Bicycle or compact transport storage"],
  "Home plus income": ["Separate rental entrance", "Acoustic privacy", "Independent services"],
  "Multi-generational living": ["Separate family suite", "Accessible bedroom and bathroom", "Shared central living space"],
  "Executive entertaining": ["Formal reception space", "Catering support space", "Guest parking"],
  "Resort-style living": ["Pool deck", "Wellness room", "Landscape courtyards"],
  "Mixed-use investment": ["Separate user entrances", "Independent service zones", "Flexible lease divisions"],
  "Replace a failing wall": ["Condition assessment", "Foundation replacement", "Crack and movement investigation"],
  "Convert for rental income": ["Independent entrances", "Separate utilities", "Tenant parking"],
  "Repair structural concerns": ["Structural condition assessment", "Temporary safety measures", "Crack monitoring"],
};

const stageGuidance = {
  "Idea only": "We will help turn the selected goal into a clear first concept.",
  "Sketches / inspiration": "Your references will be tested against the site, budget and practical requirements.",
  "Formal drawings": "Your existing drawings can be reviewed against the selected goal and project priorities.",
  "Need guidance": "These choices will give the first consultation a useful decision-making structure.",
};

const projectDetailKeys = {
  "Family Home": ["location", "plotSize", "floorArea", "bedrooms", "bathrooms", "storeys"],
  "Rental Units": [
    "location",
    "plotSize",
    "floorArea",
    "storeys",
    "unitCount",
    "unitMix",
    "rentalOperations",
  ],
  "Luxury Villa": ["location", "plotSize", "floorArea", "bedrooms", "bathrooms", "storeys"],
  "Commercial Building": [
    "location",
    "plotSize",
    "floorArea",
    "storeys",
    "businessUse",
    "parkingNeed",
  ],
  "Boundary Wall": ["location", "plotSize", "wallLength", "gateNeeds"],
  "Renovation / Extension": [
    "location",
    "plotSize",
    "floorArea",
    "bedrooms",
    "bathrooms",
    "storeys",
    "existingCondition",
  ],
};

const designDirections = {
  "Growing family": "A flexible family layout that can adapt as routines, children and space needs change.",
  "First home": "A compact, cost-aware home with a strong core plan and sensible future expansion.",
  "Forever home": "A comfortable long-life home with accessibility, low-maintenance choices and adaptable rooms.",
  "Multi-generational living": "A connected home that gives each generation privacy, dignity and shared gathering space.",
  "Home plus income": "A primary home with a separable rental component, independent access and protected privacy.",
  "Long-term family rentals": "Durable family-sized units with privacy, practical storage, safe outdoor space and dependable parking.",
  "Young professional rentals": "Efficient contemporary units with security, parking, connectivity and low-maintenance appeal.",
  "Workforce or student housing": "Compact robust accommodation with efficient services, controlled shared spaces and simple management.",
  "Short-stay accommodation": "Guest-ready units with intuitive arrival, privacy, housekeeping efficiency and memorable character.",
  "Premium rental market": "Higher-spec rental units with stronger privacy, finishes and amenities to support premium positioning.",
  "Maximum site yield": "A feasibility-led layout balancing viable unit count with access, parking, services and tenant liveability.",
  "Private family retreat": "A generous private home organised around calm family living, landscape and controlled views.",
  "Executive entertaining": "A confident villa with impressive arrival, layered reception spaces and discreet service support.",
  "Resort-style living": "A climate-responsive villa centred on shaded outdoor living, wellness and landscape.",
  "Legacy residence": "A timeless, robust family residence designed for long-term ownership and changing generations.",
  "Architectural statement": "A distinctive one-off villa where structure, form, arrival and landscape create a memorable identity.",
  "Professional offices": "A credible, flexible workplace with clear client arrival, staff flow and future adaptability.",
  "Retail or customer-facing space": "A visible and welcoming commercial layout that supports customer movement and brand presence.",
  "Mixed-use investment": "A flexible income property with separated access, services and compatible occupancies.",
  "Hospitality or accommodation": "A guest-focused building balancing memorable arrival with efficient back-of-house operations.",
  "Workshop or light industrial": "A robust operational building with safe movement, servicing and efficient structural planning.",
  "Healthcare or specialist use": "A professional environment with privacy, accessibility and carefully controlled circulation.",
  "Security and privacy": "A robust perimeter coordinated with gates, visibility, drainage and access control.",
  "Entrance and street appeal": "A composed frontage where wall, landscape, lighting and gates create a strong arrival.",
  "Cost-effective enclosure": "A straightforward secure perimeter using repeatable details and durable low-maintenance materials.",
  "Estate-quality perimeter": "A premium coordinated boundary with formal gates, refined detailing and integrated security.",
  "Access and gate upgrade": "A safer, more convenient entrance planned around vehicle movement, pedestrians and controls.",
  "Replace a failing wall": "A technically resolved replacement based on ground conditions, drainage and the cause of failure.",
  "Add more living space": "An extension that adds useful area while respecting structure, circulation and the existing property.",
  "Improve layout and flow": "A targeted replan that removes daily friction and improves connection, light and usable space.",
  "Modernise an older property": "A coordinated upgrade of layout, services and appearance while retaining sound existing work.",
  "Repair structural concerns": "An assessment-led intervention that addresses causes before finishes or additions are committed.",
  "Convert for rental income": "A compliant rental conversion with practical units, privacy, access and independent services.",
  "Upgrade for resale or value": "A disciplined improvement plan focused on visible value, function and controlled investment.",
};

export function getGoalOptions(projectType, stageProfile = {}) {
  const options = [...(goalOptions[projectType] ?? [])];
  if (projectType === "Rental Units" && stageProfile.siteStatus === "Existing property") {
    options.unshift(
      option(
        "Convert an existing property",
        "Assess how the current building can become compliant, private rental units.",
        image("goal-rental-convert-existing")
      )
    );
  }
  if (projectType === "Rental Units" && stageProfile.siteStatus === "Looking for land") {
    options.push(
      option(
        "Site-led rental opportunity",
        "Choose land by testing access, demand, services and realistic development yield.",
        image("goal-rental-site-led")
      )
    );
  }
  return options;
}

export function getStyleOptions(projectType) {
  return styleOptions[projectType] ?? [];
}

export function getFeatureOptions(projectType, goal) {
  return [...(goalFeatureBoosts[goal] ?? []), ...(featureOptions[projectType] ?? [])]
    .filter((item, index, all) => all.indexOf(item) === index)
    .map((title) => ({ title }));
}

export function getGoalQuestion(answers) {
  const projectType = answers.projectType;
  const noun = {
    "Family Home": "this home",
    "Rental Units": "this rental development",
    "Luxury Villa": "this villa",
    "Commercial Building": "this commercial project",
    "Boundary Wall": "this boundary project",
    "Renovation / Extension": "this property upgrade",
  }[projectType] ?? "this project";

  return {
    title: `What must ${noun} achieve?`,
    helper: `${stageGuidance[answers.stageProfile.designStatus] ?? "Choose the outcome that should guide the design."} Select the closest priority.`,
    valueMessage:
      "This answer changes the design direction, requirements and professional advice that follow.",
    options: getGoalOptions(projectType, answers.stageProfile),
  };
}

export function getStyleQuestion(answers) {
  const projectType = answers.projectType;
  return {
    title: `Which design direction fits your ${projectType.toLowerCase()}?`,
    helper: `These directions are selected for ${projectType.toLowerCase()} projects and the outcome you chose.`,
    valueMessage:
      "The visual direction is now being considered together with use, durability, budget and long-term performance.",
    options: getStyleOptions(projectType),
  };
}

export function getFeatureQuestion(answers) {
  return {
    title: `What must your ${answers.projectType.toLowerCase()} include?`,
    helper: `Select the requirements that support “${answers.lifestyle}”. Choose only what genuinely matters.`,
    valueMessage:
      "These project-specific priorities turn a broad ambition into information a designer can test and use.",
    options: getFeatureOptions(answers.projectType, answers.lifestyle),
  };
}

export function getDesignDirection(goal) {
  return designDirections[goal] ?? "A project direction shaped around the selected use, site and priorities.";
}

export function getContextInsight(answers) {
  if (!answers.projectType) {
    return "Choose your project type and we will highlight the decisions that deserve early attention.";
  }
  if (!answers.lifestyle) {
    return `Next, define what the ${answers.projectType.toLowerCase()} must achieve so the remaining questions can become project-specific.`;
  }
  if (!answers.features.length) {
    return `Your “${answers.lifestyle}” direction is set. The next useful step is identifying the operational and spatial requirements that support it.`;
  }
  return `${answers.features.slice(0, 2).join(" and ")} are now recorded as leading priorities for the ${answers.lifestyle.toLowerCase()} brief.`;
}

export function sanitizeAnswersForProject(answers, nextProjectType) {
  const validGoals = getGoalOptions(nextProjectType, answers.stageProfile).map(({ title }) => title);
  const lifestyle = validGoals.includes(answers.lifestyle) ? answers.lifestyle : "";
  const validStyles = getStyleOptions(nextProjectType).map(({ title }) => title);
  const style = validStyles.includes(answers.style) ? answers.style : "";
  const validFeatures = getFeatureOptions(nextProjectType, lifestyle).map(({ title }) => title);
  const allowedDetailKeys = new Set(projectDetailKeys[nextProjectType] ?? []);
  if (answers.stageProfile.siteStatus === "Existing property") {
    allowedDetailKeys.add("existingSiteUse");
  }
  const projectDetails = Object.fromEntries(
    Object.entries(answers.projectDetails).map(([key, value]) => [
      key,
      allowedDetailKeys.has(key) ? value : "",
    ])
  );
  return {
    ...answers,
    projectType: nextProjectType,
    lifestyle,
    style,
    features: answers.features.filter((feature) => validFeatures.includes(feature)),
    projectDetails,
  };
}

export function sanitizeAnswersForGoal(answers, nextGoal) {
  const validFeatures = getFeatureOptions(answers.projectType, nextGoal).map(({ title }) => title);
  return {
    ...answers,
    lifestyle: nextGoal,
    features: answers.features.filter((feature) => validFeatures.includes(feature)),
  };
}

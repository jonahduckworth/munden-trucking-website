export type DepartmentKind = "service" | "mobile" | "parts";

export type DepartmentPage = {
  department: DepartmentKind;
  group: string;
  slug: string;
  navTitle: string;
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  keywords: string[];
  offeringsTitle: string;
  offerings: string[];
  preparationTitle: string;
  preparationIntro: string;
  preparationItems: string[];
  process: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedSlugs: string[];
  relatedResources: string[];
  updatedAt: string;
};

const updatedAt = "2026-09-02";
const mobileUpdatedAt = "2026-10-24";

export const serviceDepartmentPages: DepartmentPage[] = [
  {
    department: "service",
    group: "Inspections & Maintenance",
    slug: "cvip-inspections",
    navTitle: "CVIP Inspections",
    title: "Commercial Vehicle Inspection Program (CVIP) Inspections",
    eyebrow: "Commercial vehicle inspections in Kamloops",
    description:
      "Book a CVIP inspection for commercial trucks and trailers with Munden Truck & Equipment in Kamloops, BC.",
    intro:
      "A planned inspection is easier to manage than an unexpected interruption. Munden helps commercial operators prepare for and complete CVIP inspections, understand identified defects, and coordinate related repair work at the shop.",
    keywords: [
      "CVIP inspection Kamloops",
      "commercial vehicle inspection BC",
      "truck and trailer inspection Kamloops",
    ],
    offeringsTitle: "CVIP inspection support",
    offerings: [
      "Commercial truck inspections",
      "Commercial trailer inspections",
      "Inspection findings and documentation",
      "Re-inspection planning after repairs",
      "Coordination of related brake, lighting, steering, and suspension work",
      "Maintenance planning around upcoming inspection dates",
    ],
    preparationTitle: "What to have ready when booking",
    preparationIntro:
      "A few accurate details help the service team schedule the right amount of time and prepare for the unit arriving at the shop.",
    preparationItems: [
      "Truck or trailer year, make, model, and unit number",
      "The inspection due date and vehicle class",
      "Previous inspection paperwork or known defects",
      "Recent driver inspection notes",
      "Any warning lights, brake concerns, or lighting faults",
    ],
    process: [
      {
        title: "Book the unit",
        description: "Share the unit details, inspection timing, and any known concerns.",
      },
      {
        title: "Complete the inspection",
        description: "The vehicle is reviewed and the findings are documented.",
      },
      {
        title: "Plan the next step",
        description: "Review any required repairs and coordinate re-inspection when applicable.",
      },
    ],
    faqs: [
      {
        question: "What information should I provide when booking a CVIP inspection?",
        answer:
          "Provide the unit number, year, make, model, vehicle type, inspection due date, and any known defects or recent driver concerns.",
      },
      {
        question: "Can repair work be coordinated with the inspection?",
        answer:
          "Yes. Tell the service team about known repair or maintenance needs when booking so the work can be planned with the inspection.",
      },
      {
        question: "How do I know which inspection schedule applies to my vehicle?",
        answer:
          "Requirements depend on the vehicle and how it is used. Confirm the applicable schedule for your vehicle class and contact Munden when you are ready to book.",
      },
    ],
    relatedSlugs: [
      "commercial-brake-abs-repair",
      "steering-suspension-alignment",
      "preventive-maintenance-fleet-programs",
    ],
    relatedResources: [
      "what-to-gather-before-booking-a-cvip-inspection",
      "why-maintenance-records-make-cvip-inspections-and-fleet-planning-easier",
      "brake-shoe-and-drum-wear-signs-fleets-should-document-between-services",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Inspections & Maintenance",
    slug: "preventive-maintenance-fleet-programs",
    navTitle: "Preventive Maintenance",
    title: "Preventive Maintenance and Fleet Service Programs",
    eyebrow: "Planned maintenance for working fleets",
    description:
      "Plan preventive maintenance and coordinated fleet service for commercial trucks, trailers, and equipment in Kamloops.",
    intro:
      "Preventive maintenance works best when it reflects how each unit is actually used. Munden helps operators bring inspections, service history, recurring concerns, and upcoming work into one practical maintenance plan.",
    keywords: [
      "commercial truck preventive maintenance Kamloops",
      "fleet maintenance Kamloops",
      "truck maintenance program BC",
    ],
    offeringsTitle: "Maintenance and fleet support",
    offerings: [
      "Scheduled oil, filter, and fluid service",
      "Brake, steering, suspension, and electrical checks",
      "Truck and trailer maintenance planning",
      "Coordination of recurring fleet service",
      "Review of driver inspection notes and service history",
      "Planning repairs around operating schedules",
    ],
    preparationTitle: "Build a useful maintenance plan",
    preparationIntro:
      "The right interval depends on the unit, manufacturer guidance, workload, environment, and service history—not a generic number alone.",
    preparationItems: [
      "Unit list with year, make, model, and current mileage or hours",
      "Manufacturer maintenance recommendations",
      "Recent service and inspection records",
      "Typical loads, routes, idle time, and operating conditions",
      "Recurring driver complaints or repeat repairs",
    ],
    process: [
      {
        title: "Review the fleet",
        description: "Identify the units, operating conditions, and current maintenance records.",
      },
      {
        title: "Prioritize the work",
        description: "Separate immediate concerns from work that can be planned into future visits.",
      },
      {
        title: "Keep records current",
        description: "Use service findings and driver notes to make the next visit more productive.",
      },
    ],
    faqs: [
      {
        question: "Can maintenance be planned for more than one vehicle?",
        answer:
          "Yes. Share the fleet list, operating schedule, and available records so the service team can discuss a practical approach for multiple units.",
      },
      {
        question: "How often should a commercial truck be serviced?",
        answer:
          "Intervals vary by vehicle, components, workload, environment, and manufacturer guidance. Munden can help review those factors rather than applying one interval to every unit.",
      },
      {
        question: "What records are useful?",
        answer:
          "Bring recent invoices, inspection reports, mileage or engine-hour records, fluid information, and driver reports about recurring symptoms.",
      },
    ],
    relatedSlugs: [
      "cvip-inspections",
      "diesel-engine-repair",
      "commercial-brake-abs-repair",
    ],
    relatedResources: [
      "daily-walkaround-notes-that-make-preventive-maintenance-easier-to-schedule",
      "how-fleet-owners-can-prioritize-repairs-when-several-units-need-attention",
      "why-maintenance-records-make-cvip-inspections-and-fleet-planning-easier",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Repair & Diagnostics",
    slug: "diesel-engine-repair",
    navTitle: "Diesel Engine Repair",
    title: "Diesel Engine Diagnostics and Repair",
    eyebrow: "Truck and equipment engine service",
    description:
      "Diesel engine diagnostics and repair for commercial trucks and heavy equipment at Munden's Kamloops service shop.",
    intro:
      "Changes in power, temperature, smoke, fluid use, or starting behaviour deserve a methodical diagnosis. Munden services diesel engine systems for working trucks and equipment and helps operators turn accurate symptoms into a practical repair plan.",
    keywords: [
      "diesel engine repair Kamloops",
      "commercial truck engine diagnostics",
      "heavy equipment engine repair Kamloops",
    ],
    offeringsTitle: "Engine systems we can investigate",
    offerings: [
      "Diesel engine diagnostics",
      "Hard-start and no-start concerns",
      "Fuel delivery and injection concerns",
      "Turbocharger and air-system concerns",
      "Cooling-system diagnosis and repair",
      "Oil, coolant, and exhaust leak investigation",
    ],
    preparationTitle: "Details that help with diagnosis",
    preparationIntro:
      "Engine symptoms can change with load, temperature, and operating conditions. Record the pattern instead of relying on a general description.",
    preparationItems: [
      "When the symptom started and whether it is getting worse",
      "Dashboard messages, warning lights, or fault codes",
      "Whether the issue appears cold, hot, loaded, or at idle",
      "Recent repairs, fuel events, or fluid top-ups",
      "Photos or video of smoke, leaks, or unusual behaviour when safe",
    ],
    process: [
      {
        title: "Document the symptom",
        description: "Share when the problem appears and what changed before it started.",
      },
      {
        title: "Inspect and diagnose",
        description: "The service team checks the relevant engine and supporting systems.",
      },
      {
        title: "Review repair options",
        description: "Discuss the findings, required parts, and next repair step.",
      },
    ],
    faqs: [
      {
        question: "What engine symptoms should I report?",
        answer:
          "Report power loss, hard starting, unusual smoke, overheating, new noises, fluid use, leaks, warning lights, and the conditions in which they appear.",
      },
      {
        question: "Do you need the fault code before I call?",
        answer:
          "A fault code is useful when available, but it is not required. Vehicle details and an accurate description of the symptom are a good starting point.",
      },
      {
        question: "Can cooling-system work be handled with engine diagnosis?",
        answer:
          "Yes. Cooling performance, hoses, leaks, fan operation, and temperature complaints can be reviewed as part of the engine-service plan.",
      },
    ],
    relatedSlugs: [
      "electrical-diagnostics-repair",
      "transmission-drivetrain-repair",
      "preventive-maintenance-fleet-programs",
    ],
    relatedResources: [
      "what-rough-idle-and-power-complaints-can-tell-a-service-team",
      "engine-fan-and-fan-clutch-warning-signs-before-an-overheating-event",
      "small-coolant-leaks-that-deserve-attention-before-grades-and-heat-expose-them",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Repair & Diagnostics",
    slug: "transmission-drivetrain-repair",
    navTitle: "Transmission & Drivetrain",
    title: "Transmission and Drivetrain Repair",
    eyebrow: "Powertrain service for commercial vehicles",
    description:
      "Transmission, clutch, differential, driveshaft, and drivetrain repair for commercial trucks and equipment in Kamloops.",
    intro:
      "A vibration, shift concern, leak, or change in engagement can come from several connected components. Munden evaluates the operating symptoms and drivetrain system together before planning the repair.",
    keywords: [
      "truck transmission repair Kamloops",
      "commercial truck drivetrain repair",
      "clutch differential driveshaft service Kamloops",
    ],
    offeringsTitle: "Drivetrain service capabilities",
    offerings: [
      "Manual and automatic transmission concerns",
      "Clutch diagnosis and replacement",
      "Differential inspection and service",
      "Driveshaft and U-joint concerns",
      "Carrier bearing and driveline vibration diagnosis",
      "Transfer-case service where applicable",
    ],
    preparationTitle: "Describe how the concern behaves",
    preparationIntro:
      "The speed, gear, load, and temperature at which a concern appears can help separate a driveline problem from another source of vibration or noise.",
    preparationItems: [
      "The gear, road speed, and load when the symptom occurs",
      "Whether the concern changes while accelerating or coasting",
      "Shift quality, clutch engagement point, or new noises",
      "Location and colour of any visible fluid leak",
      "Recent driveline, wheel, tire, or transmission work",
    ],
    process: [
      {
        title: "Reproduce the concern",
        description: "Use the driver's notes to narrow down the operating conditions involved.",
      },
      {
        title: "Inspect connected systems",
        description: "Review the transmission and driveline components related to the symptom.",
      },
      {
        title: "Plan the repair",
        description: "Identify the required work and coordinate the necessary parts.",
      },
    ],
    faqs: [
      {
        question: "What should I record about a driveline vibration?",
        answer:
          "Record speed, gear, load, whether you are accelerating or coasting, road conditions, and whether the vibration is felt through the seat, floor, or steering wheel.",
      },
      {
        question: "Can a leak help identify the problem?",
        answer:
          "Yes. Note the location, colour, amount, and whether it appears after driving. Do not work beneath an unsupported vehicle to inspect it.",
      },
      {
        question: "Can the Parts Department help prepare for the repair?",
        answer:
          "Yes. VIN, component tags, serial numbers, photos, and existing part numbers can help the parts team identify required components.",
      },
    ],
    relatedSlugs: [
      "diesel-engine-repair",
      "steering-suspension-alignment",
      "preventive-maintenance-fleet-programs",
    ],
    relatedResources: [
      "driveline-vibration-clues-that-should-not-be-ignored",
      "transmission-and-differential-leak-clues-worth-documenting-before-a-shop-visit",
      "why-shop-visit-photos-save-time-on-truck-and-trailer-repairs",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Repair & Diagnostics",
    slug: "commercial-brake-abs-repair",
    navTitle: "Brake & ABS Repair",
    title: "Commercial Truck and Trailer Brake and ABS Repair",
    eyebrow: "Air brake and ABS service in Kamloops",
    description:
      "Commercial truck and trailer air brake, foundation brake, and ABS diagnostics and repair in Kamloops, BC.",
    intro:
      "Brake concerns affect safety, inspection readiness, and whether a unit should continue operating. Munden services commercial brake and ABS systems and helps fleets address reported symptoms and inspection findings.",
    keywords: [
      "commercial truck brake repair Kamloops",
      "air brake service Kamloops",
      "truck trailer ABS diagnostics",
    ],
    offeringsTitle: "Commercial brake-system support",
    offerings: [
      "Air-system leak diagnosis",
      "Brake chamber and slack-adjuster concerns",
      "Drum, rotor, lining, and related brake work",
      "ABS warning-light and sensor diagnosis",
      "Compressor, valve, and air-delivery concerns",
      "Brake findings identified during inspection",
    ],
    preparationTitle: "Brake symptoms to report promptly",
    preparationIntro:
      "Do not continue operating a vehicle you believe is unsafe. When arranging service, share the specific behaviour and conditions rather than only saying the brakes feel different.",
    preparationItems: [
      "Pulling, grabbing, vibration, or a change in stopping response",
      "Air-pressure build time or frequent compressor cycling",
      "Audible leaks and where they seem to come from",
      "ABS lights, messages, or intermittent faults",
      "Heat, odour, or visible wear noticed during a safe walkaround",
    ],
    process: [
      {
        title: "Share the concern",
        description: "Describe the brake or air-system behaviour and whether the unit is safe to move.",
      },
      {
        title: "Inspect the system",
        description: "Check the components connected to the reported symptom or inspection finding.",
      },
      {
        title: "Complete and document work",
        description: "Coordinate repair, parts, and any inspection follow-up that is required.",
      },
    ],
    faqs: [
      {
        question: "Can Munden diagnose an ABS warning light?",
        answer:
          "Yes. The service team can investigate ABS warning lights and related sensor, wiring, tone-ring, and component concerns.",
      },
      {
        question: "What should a driver include in a brake write-up?",
        answer:
          "Include the unit, speed, load, road conditions, warning indicators, air-pressure behaviour, noises, heat, and whether the concern is consistent or intermittent.",
      },
      {
        question: "Can brake repairs be coordinated with a CVIP inspection?",
        answer:
          "Yes. Share known brake concerns while booking so inspection and repair planning can be discussed together.",
      },
    ],
    relatedSlugs: [
      "cvip-inspections",
      "electrical-diagnostics-repair",
      "steering-suspension-alignment",
    ],
    relatedResources: [
      "air-brake-leak-clues-drivers-should-report-before-the-next-dispatch",
      "brake-shoe-and-drum-wear-signs-fleets-should-document-between-services",
      "abs-warning-light-basics-for-truck-and-trailer-operators",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Repair & Diagnostics",
    slug: "electrical-diagnostics-repair",
    navTitle: "Electrical Diagnostics",
    title: "Commercial Truck Electrical Diagnostics and Repair",
    eyebrow: "Electrical troubleshooting for working trucks",
    description:
      "Electrical diagnostics and repair for commercial trucks, trailers, and heavy equipment in Kamloops.",
    intro:
      "Intermittent electrical problems are easier to find when good operator notes are paired with systematic testing. Munden investigates starting, charging, lighting, wiring, and control-system concerns for commercial vehicles and equipment.",
    keywords: [
      "truck electrical repair Kamloops",
      "commercial truck diagnostics Kamloops",
      "truck wiring battery alternator repair",
    ],
    offeringsTitle: "Electrical concerns we can investigate",
    offerings: [
      "Battery, charging, and starting concerns",
      "Alternator and starter diagnosis",
      "Wiring, connector, fuse, and ground faults",
      "Truck and trailer lighting problems",
      "Intermittent electrical complaints",
      "Computer diagnostics and fault-code investigation",
    ],
    preparationTitle: "Make an intermittent fault easier to find",
    preparationIntro:
      "A note about when the fault appears can be as valuable as the warning light itself, especially when a problem disappears before the truck reaches the shop.",
    preparationItems: [
      "Exact warning messages or fault codes",
      "Weather, temperature, vibration, and load conditions",
      "What was switched on when the fault appeared",
      "Recent battery, accessory, lighting, or wiring work",
      "Photos or video of the dashboard when safe",
    ],
    process: [
      {
        title: "Capture the pattern",
        description: "Document what is operating and when the electrical concern appears.",
      },
      {
        title: "Test the circuit",
        description: "Inspect the relevant power, ground, wiring, connector, and component paths.",
      },
      {
        title: "Repair and verify",
        description: "Address the identified fault and review any related parts or follow-up work.",
      },
    ],
    faqs: [
      {
        question: "Can you diagnose a problem that comes and goes?",
        answer:
          "Intermittent faults can take more investigation, but detailed notes about timing and conditions can help narrow down the affected circuit or component.",
      },
      {
        question: "Do you work on trailer lighting?",
        answer:
          "Yes. Munden services truck and trailer lighting, connectors, wiring, and related electrical concerns.",
      },
      {
        question: "What should I bring for an electrical appointment?",
        answer:
          "Bring the unit details, fault codes or photos, recent repair history, and notes describing when the issue appears and what equipment is operating at the time.",
      },
    ],
    relatedSlugs: [
      "diesel-engine-repair",
      "commercial-brake-abs-repair",
      "webasto-engine-cab-heaters",
    ],
    relatedResources: [
      "diagnostic-notes-help-solve-intermittent-electrical-faults-faster",
      "battery-alternator-starter-checks-before-a-truck-becomes-a-no-start",
      "what-repeated-blown-fuses-can-tell-you-about-an-electrical-fault",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Repair & Diagnostics",
    slug: "steering-suspension-alignment",
    navTitle: "Steering & Suspension",
    title: "Truck Steering, Suspension and Alignment Service",
    eyebrow: "Steering and suspension repair in Kamloops",
    description:
      "Commercial truck and trailer steering, suspension, alignment, spring, and ride-quality service in Kamloops.",
    intro:
      "Wander, uneven tire wear, ride-height changes, or new clunks can point to wear across several connected components. Munden inspects steering and suspension concerns with the vehicle's operating symptoms and tire condition in mind.",
    keywords: [
      "truck suspension repair Kamloops",
      "commercial truck alignment Kamloops",
      "truck steering repair Kamloops",
    ],
    offeringsTitle: "Steering and suspension support",
    offerings: [
      "Steering linkage and component concerns",
      "Suspension inspection and repair",
      "Leaf spring and air-suspension concerns",
      "Shock and mounting-component replacement",
      "Front-end and alignment concerns",
      "Tire-wear and ride-height investigation",
    ],
    preparationTitle: "What drivers should document",
    preparationIntro:
      "Steering feel and tire wear patterns often provide useful clues. Record what changed and whether it varies with speed, load, braking, or road conditions.",
    preparationItems: [
      "Pull, wander, looseness, or steering effort changes",
      "Clunks, squeaks, or movement over rough roads",
      "Uneven tire wear or a change in ride height",
      "Recent curb, pothole, or road-impact events",
      "Previous alignment, tire, spring, or steering work",
    ],
    process: [
      {
        title: "Review the symptoms",
        description: "Use driver feedback and tire condition to identify the areas to inspect.",
      },
      {
        title: "Inspect components",
        description: "Check the steering, suspension, mounting, and alignment-related systems.",
      },
      {
        title: "Coordinate repairs",
        description: "Address worn components before completing alignment-related work where needed.",
      },
    ],
    faqs: [
      {
        question: "Can uneven tire wear point to a suspension problem?",
        answer:
          "Yes. Pressure, alignment, steering wear, suspension components, and operating conditions can all contribute, so the overall pattern should be inspected.",
      },
      {
        question: "Should I book an alignment immediately after an impact?",
        answer:
          "If steering feel, tracking, wheel position, or tire condition changed after an impact, contact the service team and describe what happened so the right inspection can be planned.",
      },
      {
        question: "Do you service air suspension?",
        answer:
          "Munden works on commercial suspension systems, including air-system components and ride-height concerns.",
      },
    ],
    relatedSlugs: [
      "commercial-brake-abs-repair",
      "cvip-inspections",
      "transmission-drivetrain-repair",
    ],
    relatedResources: [
      "how-tire-wear-patterns-help-diagnose-larger-truck-and-trailer-issues",
      "kingpin-and-suspension-wear-clues-that-show-up-during-everyday-driving",
      "truck-trailer-corrosion-spots-deserve-attention-before-they-spread",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Repair & Diagnostics",
    slug: "hydraulic-repair-hose-service",
    navTitle: "Hydraulic Repair",
    title: "Hydraulic Repair and Hose Service",
    eyebrow: "Hydraulic troubleshooting for trucks and equipment",
    description:
      "Hydraulic system diagnostics, pump and cylinder work, and hose replacement for trucks and heavy equipment in Kamloops.",
    intro:
      "Hydraulic leaks and performance changes can create downtime, contamination, and safety concerns. Munden helps identify the source of leaks, pressure or movement concerns, and damaged components before coordinating repair and replacement parts.",
    keywords: [
      "hydraulic repair Kamloops",
      "hydraulic hose service Kamloops",
      "truck equipment hydraulic diagnostics",
    ],
    offeringsTitle: "Hydraulic service capabilities",
    offerings: [
      "Hydraulic-system diagnostics",
      "Hose and fitting replacement",
      "Pump and control concerns",
      "Cylinder inspection and repair planning",
      "Leak and contamination investigation",
      "Preventive checks for working hydraulic systems",
    ],
    preparationTitle: "Information that helps identify the problem",
    preparationIntro:
      "Hydraulic concerns can depend on temperature, load, and movement. Note where the problem appears and which function is affected.",
    preparationItems: [
      "Equipment make, model, serial number, and unit number",
      "The function that is slow, weak, noisy, or not moving",
      "Leak location, fluid appearance, and recent top-ups",
      "Whether the symptom changes as the system warms up",
      "Photos of hose routing, fittings, and component tags when safe",
    ],
    process: [
      {
        title: "Identify the affected function",
        description: "Record the movement, load, temperature, and leak conditions involved.",
      },
      {
        title: "Inspect the system",
        description: "Review hoses, fittings, controls, pumps, cylinders, and related components.",
      },
      {
        title: "Repair and protect",
        description: "Coordinate parts and address contamination or routing concerns where applicable.",
      },
    ],
    faqs: [
      {
        question: "What details help identify a hydraulic hose?",
        answer:
          "Photos, overall length, fitting style and orientation, hose markings, equipment model, serial number, and the hose location can all help.",
      },
      {
        question: "Should equipment keep operating with a hydraulic leak?",
        answer:
          "A leak can create injection, slip, environmental, contamination, and equipment-damage risks. Stop and assess the condition rather than touching or searching for a pressurized leak by hand.",
      },
      {
        question: "Can the Parts Department help with fittings and components?",
        answer:
          "Yes. Bring component information, hose markings, measurements, and clear photos so the parts team can help identify what is required.",
      },
    ],
    relatedSlugs: [
      "truck-rigouts-pto-wet-kits",
      "crane-inspections-repair",
      "preventive-maintenance-fleet-programs",
    ],
    relatedResources: [
      "hydraulic-hose-warning-signs-small-leak-becomes-downtime",
      "pto-and-wet-kit-maintenance-questions-to-ask-before-a-busy-job",
      "welding-fabrication-repair-planning-trucks-trailers-equipment",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Specialty Shop Services",
    slug: "crane-inspections-repair",
    navTitle: "Crane Service",
    title: "Truck-Mounted Crane Inspections and Repair",
    eyebrow: "Crane service and repair planning",
    description:
      "Truck-mounted crane inspection, hydraulic service, boom repair, wire-rope work, and control-system support in Kamloops.",
    intro:
      "Crane concerns need clear equipment identification and a careful review of the affected structure, hydraulics, controls, and safety systems. Munden helps operators document the problem and coordinate the inspection or repair work their truck-mounted crane requires.",
    keywords: [
      "truck crane repair Kamloops",
      "crane inspection Kamloops",
      "truck mounted crane hydraulic service",
    ],
    offeringsTitle: "Crane service capabilities",
    offerings: [
      "Crane inspection and service planning",
      "Boom and mounting-point concerns",
      "Hydraulic-system diagnosis and repair",
      "Wire-rope replacement planning",
      "Control and safety-device concerns",
      "Load-testing coordination where applicable",
    ],
    preparationTitle: "Crane details to provide",
    preparationIntro:
      "The crane make, model, serial number, and the exact function involved help the shop prepare more effectively than the truck information alone.",
    preparationItems: [
      "Truck and crane make, model, and serial information",
      "Inspection paperwork or previous repair history",
      "The boom position, load, and control used when the issue appears",
      "Photos of leaks, wear, damage, or component tags when safe",
      "Any warning, lockout, or safety-system behaviour",
    ],
    process: [
      {
        title: "Identify the equipment",
        description: "Confirm both the carrier vehicle and crane information.",
      },
      {
        title: "Review the concern",
        description: "Inspect the structural, hydraulic, control, or safety systems involved.",
      },
      {
        title: "Coordinate the work",
        description: "Plan repair, parts, testing, and documentation appropriate to the findings.",
      },
    ],
    faqs: [
      {
        question: "What information do you need about the crane?",
        answer:
          "Provide the crane make, model, serial number, truck information, recent inspection paperwork, and a description of the affected function.",
      },
      {
        question: "Can hydraulic crane concerns be diagnosed at the shop?",
        answer:
          "Yes. Munden can investigate hydraulic leaks, movement concerns, controls, hoses, and related crane components.",
      },
      {
        question: "Should a crane be used when a safety device is not behaving normally?",
        answer:
          "Do not bypass a safety system. Remove the equipment from service as appropriate and contact the shop with the warning or behaviour you observed.",
      },
    ],
    relatedSlugs: [
      "hydraulic-repair-hose-service",
      "welding-fabrication-frame-repair",
      "truck-rigouts-pto-wet-kits",
    ],
    relatedResources: [
      "hydraulic-hose-warning-signs-small-leak-becomes-downtime",
      "welding-fabrication-repair-planning-small-damage-bigger-job",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Specialty Shop Services",
    slug: "reefer-refrigeration-service",
    navTitle: "Reefer Service",
    title: "Reefer and Transport Refrigeration Service",
    eyebrow: "Transport refrigeration support in Kamloops",
    description:
      "Reefer and transport refrigeration diagnostics, repair, and maintenance support for working trailers in Kamloops.",
    intro:
      "Temperature-control concerns are easier to diagnose when the service team knows the set point, load conditions, alarm history, and operating pattern. Munden services transport refrigeration systems and related electrical and mechanical concerns.",
    keywords: [
      "reefer repair Kamloops",
      "transport refrigeration service Kamloops",
      "refrigerated trailer repair BC",
    ],
    offeringsTitle: "Refrigeration-system support",
    offerings: [
      "Refrigeration-unit diagnostics",
      "Temperature-control concerns",
      "Compressor, condenser, and evaporator service",
      "Electrical and control-system concerns",
      "Refrigerant-system service planning",
      "Door-seal and airflow-related inspection",
    ],
    preparationTitle: "Information to record before service",
    preparationIntro:
      "Alarm history and operating conditions can help the technician understand whether a problem is constant, intermittent, load-related, or affected by ambient temperature.",
    preparationItems: [
      "Unit make, model, serial number, and operating hours",
      "Set point, displayed temperature, and product temperature if available",
      "Alarm codes and when they appeared",
      "Ambient conditions and whether the trailer was loaded",
      "Recent refrigerant, electrical, belt, battery, or control work",
    ],
    process: [
      {
        title: "Capture the operating history",
        description: "Share temperatures, alarms, load conditions, and recent service information.",
      },
      {
        title: "Diagnose the system",
        description: "Review the mechanical, refrigerant, airflow, electrical, and control concerns involved.",
      },
      {
        title: "Plan service",
        description: "Coordinate repair and follow-up based on the inspection findings.",
      },
    ],
    faqs: [
      {
        question: "What details should I bring for a reefer concern?",
        answer:
          "Bring the unit model and serial number, set point, displayed temperatures, alarm codes, operating hours, load conditions, and recent service history.",
      },
      {
        question: "Can intermittent temperature problems be diagnosed?",
        answer:
          "Yes, although a detailed alarm and operating history is especially important when the concern is not present continuously.",
      },
      {
        question: "Do door seals and airflow matter?",
        answer:
          "Yes. Airflow restrictions, damaged seals, doors, and trailer condition can affect temperature performance and should be included in the service discussion.",
      },
    ],
    relatedSlugs: [
      "electrical-diagnostics-repair",
      "preventive-maintenance-fleet-programs",
      "diesel-engine-repair",
    ],
    relatedResources: [
      "reefer-and-refrigeration-trailer-checks-before-warm-weather-freight",
      "battery-alternator-starter-checks-before-a-truck-becomes-a-no-start",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Specialty Shop Services",
    slug: "welding-fabrication-frame-repair",
    navTitle: "Welding & Fabrication",
    title: "Truck Welding, Fabrication and Frame Repair",
    eyebrow: "Planned repairs and custom fabrication",
    description:
      "Truck, trailer, and equipment welding, custom fabrication, bracket, mount, exhaust, and frame repair in Kamloops.",
    intro:
      "A durable repair starts with understanding the load, material, damage, and reason the component failed. Munden handles welding and fabrication work for trucks, trailers, and equipment, from damaged mounts to planned custom modifications.",
    keywords: [
      "truck welding Kamloops",
      "commercial trailer fabrication Kamloops",
      "truck frame repair Kamloops",
    ],
    offeringsTitle: "Welding and fabrication capabilities",
    offerings: [
      "Truck and trailer frame repair planning",
      "Steel, stainless-steel, and aluminum welding",
      "Bracket, mount, and support fabrication",
      "Structural repair and reinforcement planning",
      "Exhaust-system fabrication",
      "Custom modifications for working equipment",
    ],
    preparationTitle: "Help us understand the job",
    preparationIntro:
      "Photos and measurements can help with initial planning, but structural work still requires an in-person assessment before the final repair approach is confirmed.",
    preparationItems: [
      "Clear photos showing the full component and close-up damage",
      "Material, dimensions, and known load or use",
      "How and when the damage occurred",
      "Previous welds, repairs, or modifications",
      "Deadlines and other work being completed on the unit",
    ],
    process: [
      {
        title: "Review the damage or idea",
        description: "Share photos, measurements, operating needs, and repair history.",
      },
      {
        title: "Assess the structure",
        description: "Inspect the material, surrounding components, load path, and access.",
      },
      {
        title: "Fabricate or repair",
        description: "Complete the agreed work and coordinate related mechanical items when needed.",
      },
    ],
    faqs: [
      {
        question: "Can I get a final welding quote from photos alone?",
        answer:
          "Photos can support initial planning, but access, material condition, hidden damage, and previous repairs may need an in-person assessment before scope is confirmed.",
      },
      {
        question: "Do you fabricate custom brackets and mounts?",
        answer:
          "Yes. Munden handles custom bracket, mount, support, exhaust, and modification work for trucks, trailers, and equipment.",
      },
      {
        question: "Should a cracked structural component keep working?",
        answer:
          "If a crack or deformation may affect safe operation, stop and have the condition assessed rather than continuing to load the component.",
      },
    ],
    relatedSlugs: [
      "truck-rigouts-pto-wet-kits",
      "crane-inspections-repair",
      "hydraulic-repair-hose-service",
    ],
    relatedResources: [
      "welding-fabrication-repair-planning-trucks-trailers-equipment",
      "welding-fabrication-repair-planning-small-damage-bigger-job",
      "truck-trailer-corrosion-spots-deserve-attention-before-they-spread",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Specialty Shop Services",
    slug: "webasto-engine-cab-heaters",
    navTitle: "Engine & Cab Heaters",
    title: "Webasto Engine and Cab Heater Service",
    eyebrow: "Cold-weather heater installation and service",
    description:
      "Webasto engine and cab heater installation, diagnostics, maintenance, and repair for trucks and equipment in Kamloops.",
    intro:
      "Engine and cab heaters need reliable fuel, coolant, electrical, exhaust, and control connections. Munden services Webasto heater systems and helps operators prepare trucks and equipment for cold-weather work.",
    keywords: [
      "Webasto service Kamloops",
      "truck cab heater repair Kamloops",
      "diesel engine heater installation BC",
    ],
    offeringsTitle: "Engine and cab heater support",
    offerings: [
      "Webasto heater installation planning",
      "No-start and shutdown diagnosis",
      "Fuel, coolant, and electrical-system checks",
      "Thermostat and controller concerns",
      "Seasonal heater maintenance",
      "Heater component repair and replacement planning",
    ],
    preparationTitle: "Heater information to bring",
    preparationIntro:
      "The heater model and fault behaviour matter as much as the truck information, particularly when a concern occurs only in certain temperatures.",
    preparationItems: [
      "Truck or equipment make, model, and unit number",
      "Heater model, serial information, and controller type",
      "Fault codes, flash patterns, or control messages",
      "Whether the heater starts, smokes, shuts down, or fails to circulate heat",
      "Recent battery, coolant, fuel, or heater-system work",
    ],
    process: [
      {
        title: "Identify the system",
        description: "Confirm the vehicle, heater, controller, and reported fault behaviour.",
      },
      {
        title: "Inspect supporting systems",
        description: "Review electrical, fuel, coolant, airflow, exhaust, and control concerns.",
      },
      {
        title: "Service or install",
        description: "Coordinate the required heater work and verify the completed system.",
      },
    ],
    faqs: [
      {
        question: "What information helps with a Webasto heater diagnosis?",
        answer:
          "Provide the heater model, controller type, any fault code or flash pattern, ambient temperature, and a description of the start-up or shutdown behaviour.",
      },
      {
        question: "Can heater service be combined with other truck maintenance?",
        answer:
          "Yes. Mention other electrical, battery, coolant, or preventive-maintenance needs while booking so the visit can be planned efficiently.",
      },
      {
        question: "When should seasonal heater service be planned?",
        answer:
          "Plan inspection before cold-weather demand is at its highest, especially if the heater has been inactive or showed faults during the previous season.",
      },
    ],
    relatedSlugs: [
      "electrical-diagnostics-repair",
      "diesel-engine-repair",
      "preventive-maintenance-fleet-programs",
    ],
    relatedResources: [
      "battery-alternator-starter-checks-before-a-truck-becomes-a-no-start",
      "prevent-freeze-ups-commercial-truck-air-system",
    ],
    updatedAt,
  },
  {
    department: "service",
    group: "Specialty Shop Services",
    slug: "truck-rigouts-pto-wet-kits",
    navTitle: "Truck Rigouts & Wet Kits",
    title: "Truck Rigouts, PTOs and Wet Kit Installation",
    eyebrow: "Purpose-built truck modifications",
    description:
      "Logging truck rigouts, PTO and wet kit installations, fifth wheels, ramps, hydraulics, and custom truck modifications in Kamloops.",
    intro:
      "A productive rigout depends on how the truck will be loaded, controlled, serviced, and used in the field. Munden combines mechanical, hydraulic, and fabrication capabilities to plan truck modifications around the intended job.",
    keywords: [
      "truck rigout Kamloops",
      "PTO wet kit installation Kamloops",
      "logging truck rigout BC",
    ],
    offeringsTitle: "Rigout and installation capabilities",
    offerings: [
      "Logging truck rigouts",
      "PTO installation",
      "Wet kit and hydraulic-system installation",
      "Fifth-wheel installation",
      "Lowbed ramp fabrication",
      "Chassis modifications and custom truck work",
    ],
    preparationTitle: "Plan the truck around the job",
    preparationIntro:
      "The correct layout depends on the chassis, intended equipment, operating pressures, space, weight, controls, and future service access.",
    preparationItems: [
      "Truck VIN, specifications, wheelbase, and current configuration",
      "The body, trailer, or equipment the truck will operate",
      "Hydraulic flow, pressure, reservoir, and control requirements",
      "Drawings, component specifications, or reference photos",
      "Fabrication needs and the intended operating environment",
    ],
    process: [
      {
        title: "Define the application",
        description: "Confirm what the truck needs to operate and how it will be used.",
      },
      {
        title: "Plan the system",
        description: "Review component fit, hydraulics, controls, fabrication, and service access.",
      },
      {
        title: "Build and verify",
        description: "Complete the approved installation and review system operation.",
      },
    ],
    faqs: [
      {
        question: "What do you need to quote a wet kit or rigout?",
        answer:
          "Start with the truck VIN and specifications, intended equipment, hydraulic requirements, controls, tank needs, and any drawings or component information available.",
      },
      {
        question: "Can fabrication be included in the project?",
        answer:
          "Yes. Munden can coordinate mounts, brackets, ramps, structural work, and related fabrication as part of the agreed rigout scope.",
      },
      {
        question: "Can the Parts Department help identify components?",
        answer:
          "Yes. Component specifications, part numbers, measurements, and application details help the parts team source the right items for planning.",
      },
    ],
    relatedSlugs: [
      "hydraulic-repair-hose-service",
      "welding-fabrication-frame-repair",
      "transmission-drivetrain-repair",
    ],
    relatedResources: [
      "pto-and-wet-kit-maintenance-questions-to-ask-before-a-busy-job",
      "fifth-wheel-inspection-points-that-help-prevent-coupling-problems",
      "logging-truck-maintenance-notes-that-matter-after-rough-bush-roads",
    ],
    updatedAt,
  },
];

export const mobileServicePages: DepartmentPage[] = [
  {
    department: "mobile",
    group: "Roadside Response",
    slug: "emergency-roadside-truck-repair",
    navTitle: "Emergency Roadside Repair",
    title: "24/7 Emergency Roadside Truck Repair",
    eyebrow: "Mobile breakdown support in the BC Interior",
    description:
      "Call Munden for 24/7 mobile truck, trailer, and equipment breakdown support in Kamloops and the BC Interior.",
    intro:
      "When a commercial unit is disabled away from the shop, the first step is a safe location and an accurate description of the problem. Munden's mobile service team can assess the concern, prepare for the call, and determine whether an on-site repair or a shop-based next step is appropriate.",
    keywords: [
      "emergency roadside truck repair Kamloops",
      "24/7 mobile truck service BC Interior",
      "commercial truck breakdown service Kamloops",
    ],
    offeringsTitle: "Roadside response support",
    offerings: [
      "Commercial truck and trailer breakdown assessment",
      "No-start and starting-system concerns",
      "Air and brake-system concerns",
      "Cooling-system and fluid-leak concerns",
      "Basic drivability diagnosis at the breakdown location",
      "Coordination of a shop or towing next step when needed",
    ],
    preparationTitle: "Information to have ready when you call",
    preparationIntro:
      "Clear location and unit details help the mobile team understand the situation and prepare for the safest practical response.",
    preparationItems: [
      "Your exact location, direction of travel, and a nearby landmark or kilometre marker",
      "Truck, trailer, or equipment year, make, model, and unit number",
      "Warning lights, symptoms, noises, leaks, or recent repair history",
      "Whether the unit is loaded and whether it is safely off the road",
      "Photos of the concern when they can be taken safely",
      "A callback number for the driver or site contact",
    ],
    process: [
      {
        title: "Call and describe the breakdown",
        description:
          "Share the location, unit details, safety conditions, and the clearest description available.",
      },
      {
        title: "Prepare and assess",
        description:
          "The mobile team uses those details to prepare for the call and assess the unit on site.",
      },
      {
        title: "Repair or plan the next step",
        description:
          "Complete suitable field work or coordinate shop service or towing when the repair needs more equipment or a controlled environment.",
      },
    ],
    faqs: [
      {
        question: "Is Munden's mobile service available after regular business hours?",
        answer:
          "Munden advertises 24/7 mobile service. Call 250-828-2268 with your location and unit details so the team can review the situation.",
      },
      {
        question: "Can every breakdown be repaired at the roadside?",
        answer:
          "No. The right next step depends on the fault, location, safety conditions, parts, and equipment required. Some units need towing or follow-up work at the shop.",
      },
      {
        question: "What location details are most useful?",
        answer:
          "Provide the highway or road, direction of travel, nearest community or landmark, kilometre marker when available, and a GPS pin if it can be shared safely.",
      },
    ],
    relatedSlugs: [
      "mobile-electrical-starting-repair",
      "mobile-air-brake-wheel-end-repair",
      "mobile-engine-cooling-repair",
    ],
    relatedResources: [
      "when-roadside-issue-belongs-mobile-service-and-when-it-belongs-in-the-shop",
      "what-fleet-managers-should-keep-in-a-practical-roadside-information-kit",
      "how-fleet-owners-can-prioritize-repairs-when-several-units-need-attention",
    ],
    updatedAt: mobileUpdatedAt,
  },
  {
    department: "mobile",
    group: "Mobile Repairs",
    slug: "mobile-engine-cooling-repair",
    navTitle: "Engine & Cooling Repair",
    title: "Mobile Engine and Cooling-System Repair",
    eyebrow: "Field support for engine and cooling concerns",
    description:
      "Mobile assessment and repair support for commercial truck engine, cooling, power-loss, overheating, and fluid-leak concerns around Kamloops.",
    intro:
      "Engine and cooling symptoms can change quickly under load, on grades, or at remote jobsites. Munden's mobile service can begin the diagnosis where the unit is located, address suitable field repairs, and help determine when the unit needs shop equipment or towing.",
    keywords: [
      "mobile diesel repair Kamloops",
      "roadside truck overheating repair",
      "mobile cooling system repair BC Interior",
    ],
    offeringsTitle: "Mobile engine and cooling support",
    offerings: [
      "Engine no-start and rough-running assessment",
      "Loss-of-power and drivability checks",
      "Overheating and high-temperature concerns",
      "Coolant, oil, fuel, and visible fluid-leak assessment",
      "Accessible belt, hose, clamp, and connection checks",
      "Shop or towing recommendations when field repair is not appropriate",
    ],
    preparationTitle: "Details that help narrow the concern",
    preparationIntro:
      "Describe what changed, when it happens, and what the driver observed before stopping the unit.",
    preparationItems: [
      "Unit year, make, model, engine information, and unit number",
      "Warning lights, fault messages, and gauge readings",
      "Whether the symptom appeared at idle, under load, or on a grade",
      "Fluid type, leak location, odour, smoke, or visible residue",
      "Recent maintenance, repairs, or fluid additions",
      "Photos of the dash and affected area when safe",
    ],
    process: [
      {
        title: "Describe the operating condition",
        description:
          "Explain when the symptom appeared, how the unit was working, and why it was stopped.",
      },
      {
        title: "Assess the engine and cooling system",
        description:
          "Review the reported symptoms and inspect accessible systems at the unit's location.",
      },
      {
        title: "Complete suitable work",
        description:
          "Address field-serviceable concerns or plan the safest route to deeper shop diagnosis and repair.",
      },
    ],
    faqs: [
      {
        question: "Should I keep driving if the truck is overheating?",
        answer:
          "Continuing to operate an overheating unit can increase damage and safety risk. Stop in a safe location and call with the gauge readings, warning messages, and visible symptoms.",
      },
      {
        question: "Can a mobile technician diagnose a loss-of-power complaint?",
        answer:
          "A mobile visit can provide an initial assessment and may identify a field-serviceable cause. Some intermittent, internal, or load-dependent faults still require shop testing.",
      },
      {
        question: "What photos are useful for a fluid leak?",
        answer:
          "When safe, photograph the ground pattern, the highest visible wet area, the dash, and any warning message. Do not reach into hot or moving equipment to take a photo.",
      },
    ],
    relatedSlugs: [
      "emergency-roadside-truck-repair",
      "mobile-electrical-starting-repair",
      "mobile-hydraulic-leak-hose-service",
    ],
    relatedResources: [
      "small-coolant-leaks-that-deserve-attention-before-grades-and-heat-expose-them",
      "what-rough-idle-and-power-complaints-can-tell-a-service-team",
      "preventing-small-oil-leaks-from-turning-into-larger-downtime-events",
    ],
    updatedAt: mobileUpdatedAt,
  },
  {
    department: "mobile",
    group: "Mobile Repairs",
    slug: "mobile-electrical-starting-repair",
    navTitle: "Electrical & Starting Repair",
    title: "Mobile Electrical and Starting-System Repair",
    eyebrow: "On-site help for no-start and electrical faults",
    description:
      "Mobile diagnostics and repair support for commercial truck batteries, starters, alternators, wiring, lighting, and no-start concerns around Kamloops.",
    intro:
      "A no-start or intermittent electrical problem is easier to diagnose when the driver can explain exactly what the unit did before it stopped. Munden's mobile service can inspect accessible starting and electrical systems on site and plan follow-up testing when the fault needs shop equipment.",
    keywords: [
      "mobile truck electrical repair Kamloops",
      "roadside truck no-start service",
      "mobile battery starter alternator repair BC Interior",
    ],
    offeringsTitle: "Mobile electrical and starting support",
    offerings: [
      "Battery and connection checks",
      "Starter and no-crank assessment",
      "Alternator and charging-system checks",
      "Accessible wiring, fuse, connector, and ground inspection",
      "Truck and trailer lighting fault assessment",
      "Intermittent-fault notes for deeper shop diagnosis",
    ],
    preparationTitle: "What to report before the service call",
    preparationIntro:
      "Small details about sounds, lights, weather, and recent work can separate a battery concern from a starter, charging, wiring, or control issue.",
    preparationItems: [
      "Whether the engine cranks, clicks, turns slowly, or does nothing",
      "Dash lights, warning messages, and affected circuits",
      "Battery age when known and any recent boost or replacement",
      "Whether the problem changes with temperature or vibration",
      "Recent wiring, lighting, accessory, or charging-system work",
      "Unit and engine information plus the exact location",
    ],
    process: [
      {
        title: "Record the symptom",
        description:
          "Describe what happens at the key or start control and what changed before the failure.",
      },
      {
        title: "Test accessible systems",
        description:
          "Inspect and test the available battery, starting, charging, wiring, or lighting circuits on site.",
      },
      {
        title: "Repair or document the next test",
        description:
          "Complete suitable field work or carry clear findings into a follow-up shop diagnosis.",
      },
    ],
    faqs: [
      {
        question: "Is a no-start always a battery problem?",
        answer:
          "No. Batteries, connections, grounds, starters, charging faults, wiring, controls, and other conditions can produce similar symptoms. The exact behaviour matters.",
      },
      {
        question: "Can an intermittent electrical fault be found on site?",
        answer:
          "Sometimes, especially when the fault is active. If it disappears, detailed driver notes and any captured warning messages help plan the next diagnostic step.",
      },
      {
        question: "Should I keep replacing a fuse that repeatedly blows?",
        answer:
          "A repeat fuse failure points to a fault that needs diagnosis. Replacing the fuse without finding the cause can damage components or create a safety concern.",
      },
    ],
    relatedSlugs: [
      "emergency-roadside-truck-repair",
      "mobile-engine-cooling-repair",
      "mobile-air-brake-wheel-end-repair",
    ],
    relatedResources: [
      "battery-alternator-starter-checks-before-a-truck-becomes-a-no-start",
      "diagnostic-notes-help-solve-intermittent-electrical-faults-faster",
      "what-repeated-blown-fuses-can-tell-you-about-an-electrical-fault",
    ],
    updatedAt: mobileUpdatedAt,
  },
  {
    department: "mobile",
    group: "Mobile Repairs",
    slug: "mobile-air-brake-wheel-end-repair",
    navTitle: "Air Brake & Wheel-End Repair",
    title: "Mobile Air Brake and Wheel-End Repair",
    eyebrow: "Roadside support for air, brake, hub, and wheel-end concerns",
    description:
      "Mobile assessment and repair support for commercial truck and trailer air-system, brake, hub, bearing, and wheel-end concerns around Kamloops.",
    intro:
      "Air-pressure, brake, and wheel-end symptoms can affect whether a commercial unit is safe to move. Munden's mobile service can begin the assessment on site, address suitable repairs, and identify when the unit should remain parked for towing or shop work.",
    keywords: [
      "mobile air brake repair Kamloops",
      "roadside commercial truck brake service",
      "mobile wheel end repair BC Interior",
    ],
    offeringsTitle: "Mobile air, brake, and wheel-end support",
    offerings: [
      "Air-leak and pressure-build assessment",
      "Accessible air line and fitting checks",
      "Brake chamber and release concerns",
      "Compressor, warning, and air-system symptom review",
      "Wheel-end heat, noise, seal, hub, and bearing assessment",
      "Safety-based planning for towing or shop repair",
    ],
    preparationTitle: "Symptoms to report clearly",
    preparationIntro:
      "Brake and wheel-end calls need precise information so the team can understand the safety concern before anyone approaches or moves the unit.",
    preparationItems: [
      "Air-pressure readings, warning lights, and build or drop behaviour",
      "Where an air leak can be heard and when it changes",
      "Whether brakes release, drag, pull, smell hot, or behave differently",
      "Wheel position plus any heat, noise, smoke, oil, or visible damage",
      "Truck or trailer VIN, unit number, axle position, and load status",
      "A safe parking location with brakes secured as appropriate",
    ],
    process: [
      {
        title: "Secure the unit and report the concern",
        description:
          "Keep the unit parked when safe operation is uncertain and share the air, brake, or wheel-end symptoms.",
      },
      {
        title: "Inspect the affected system",
        description:
          "Assess accessible air, brake, hub, and wheel-end components at the unit's location.",
      },
      {
        title: "Choose the safe next step",
        description:
          "Complete suitable field work or keep the unit out of service for towing or controlled shop repair.",
      },
    ],
    faqs: [
      {
        question: "Can I drive with an air leak or brake warning?",
        answer:
          "Do not assume the unit is safe to move. Park in a safe location and call with the pressure readings, warnings, and symptoms so the concern can be assessed.",
      },
      {
        question: "What wheel-end signs should be treated as urgent?",
        answer:
          "Heat, smoke, grinding, looseness, a strong odour, visible damage, or leaking lubricant can indicate a serious concern. Stop safely and avoid touching a hot wheel end.",
      },
      {
        question: "Can every brake repair be completed roadside?",
        answer:
          "No. Safety conditions, damage, parts, adjustment requirements, and the need for controlled inspection can make towing or shop repair the correct option.",
      },
    ],
    relatedSlugs: [
      "emergency-roadside-truck-repair",
      "mobile-electrical-starting-repair",
      "mobile-hydraulic-leak-hose-service",
    ],
    relatedResources: [
      "air-brake-leak-clues-drivers-should-report-before-the-next-dispatch",
      "wheel-end-warning-signs-that-deserve-attention-before-a-long-haul",
      "air-dryer-purge-symptoms-bigger-air-system-problem",
    ],
    updatedAt: mobileUpdatedAt,
  },
  {
    department: "mobile",
    group: "Mobile Repairs",
    slug: "mobile-hydraulic-leak-hose-service",
    navTitle: "Hydraulic Leak & Hose Service",
    title: "Mobile Hydraulic Leak and Hose Service",
    eyebrow: "Field support for hydraulic leaks and hose concerns",
    description:
      "Mobile assessment and repair planning for accessible hydraulic leaks, hoses, fittings, and related equipment concerns around Kamloops.",
    intro:
      "A hydraulic leak can stop a truck or piece of equipment and can create pressure, contamination, fire, and slip hazards. Munden's mobile service can assess accessible hoses and fittings, identify the information needed for repair, and complete suitable field work when conditions allow.",
    keywords: [
      "mobile hydraulic hose service Kamloops",
      "on-site hydraulic leak repair BC Interior",
      "mobile equipment hose service Kamloops",
    ],
    offeringsTitle: "Mobile hydraulic support",
    offerings: [
      "Accessible hose and fitting leak assessment",
      "Hose routing, length, marking, and fitting identification",
      "Visible pump, valve, cylinder, and connection checks",
      "Leak-source and contamination observations",
      "Replacement planning using photos and component details",
      "Shop coordination when the repair needs controlled equipment or teardown",
    ],
    preparationTitle: "Information that helps prepare the repair",
    preparationIntro:
      "Hydraulic components can look similar while using different pressure ratings, fittings, lengths, and orientations. Do not approach or touch a pressurized leak to collect details.",
    preparationItems: [
      "Equipment year, make, model, serial number, and unit number",
      "The affected function and what the equipment was doing when the leak appeared",
      "Fluid location, visible source, and approximate loss when safely observable",
      "Hose markings, fitting style, routing, and orientation from a safe distance",
      "Clear photos without using hands to locate a pressurized leak",
      "Any recent hose, pump, valve, cylinder, or attachment work",
    ],
    process: [
      {
        title: "Shut down and describe the leak",
        description:
          "Secure the equipment, release stored energy according to the applicable procedure, and share the visible symptoms.",
      },
      {
        title: "Identify the source and requirements",
        description:
          "Assess accessible components and collect the specifications needed for the appropriate repair.",
      },
      {
        title: "Repair or coordinate follow-up",
        description:
          "Complete suitable field work or plan shop service when access, contamination, damage, or testing requires a controlled setting.",
      },
    ],
    faqs: [
      {
        question: "How should I look for a hydraulic leak?",
        answer:
          "Never use your hand to find a pressurized leak. Shut the equipment down safely, keep clear of stored energy, and use visual observations from a safe distance.",
      },
      {
        question: "What hose details are useful before the mobile call?",
        answer:
          "Useful details include equipment and component identification, visible hose markings, routing, overall length, fitting style, and fitting orientation when they can be observed safely.",
      },
      {
        question: "Can every hydraulic repair be completed in the field?",
        answer:
          "No. Access, cleanliness, pressure testing, component damage, and the need for teardown can make shop service the better option.",
      },
    ],
    relatedSlugs: [
      "emergency-roadside-truck-repair",
      "mobile-engine-cooling-repair",
      "mobile-air-brake-wheel-end-repair",
    ],
    relatedResources: [
      "hydraulic-hose-warning-signs-small-leak-becomes-downtime",
      "power-steering-leaks-on-trucks-what-to-notice-before-the-problem-gets-worse",
    ],
    updatedAt: mobileUpdatedAt,
  },
];

export const partsDepartmentPages: DepartmentPage[] = [
  {
    department: "parts",
    group: "Mechanical Parts",
    slug: "engine-drivetrain-parts",
    navTitle: "Engine & Drivetrain Parts",
    title: "Commercial Truck Engine and Drivetrain Parts",
    eyebrow: "Parts identification for powertrain systems",
    description:
      "OEM and aftermarket engine, transmission, clutch, differential, and drivetrain parts support in Kamloops.",
    intro:
      "The correct engine or drivetrain part depends on more than the truck make and model. Munden's Parts Department uses VIN, component, serial, and application details to help identify parts for commercial trucks and equipment.",
    keywords: [
      "truck engine parts Kamloops",
      "commercial truck drivetrain parts",
      "transmission clutch differential parts Kamloops",
    ],
    offeringsTitle: "Engine and drivetrain categories",
    offerings: [
      "Engine components and service parts",
      "Turbocharger and fuel-system components",
      "Transmission parts",
      "Clutch assemblies and related components",
      "Differential and axle components",
      "Driveshaft, U-joint, and carrier-bearing parts",
    ],
    preparationTitle: "Details that improve parts lookup",
    preparationIntro:
      "Component tags and serial numbers are especially important when equipment has been modified or when several component options were used in the same model year.",
    preparationItems: [
      "VIN, unit number, year, make, and model",
      "Engine, transmission, or axle serial information",
      "Existing part number and manufacturer markings",
      "Clear photos of the part, connector, mounting, and tag",
      "The truck application and symptom that led to the request",
    ],
    process: [
      { title: "Gather identifiers", description: "Collect the VIN, serial tags, part numbers, and clear photos." },
      { title: "Confirm the application", description: "Explain where the part is used and whether the unit has been modified." },
      { title: "Review options", description: "Discuss available OEM or aftermarket options appropriate to the lookup." },
    ],
    faqs: [
      {
        question: "Is the VIN enough to identify every drivetrain part?",
        answer:
          "Not always. Transmission, axle, engine, and component serial numbers may be needed, especially if a unit has been modified or rebuilt.",
      },
      {
        question: "Can I send photos for a parts lookup?",
        answer:
          "Yes. Include the full component, close-ups of tags and markings, connectors, mounting points, and a size reference where useful.",
      },
      {
        question: "Does Munden offer both OEM and aftermarket options?",
        answer:
          "Munden supplies OEM and aftermarket truck and equipment parts. Availability and suitable options depend on the specific application.",
      },
    ],
    relatedSlugs: ["brake-safety-parts", "suspension-steering-parts", "filters-fluids-maintenance-parts"],
    relatedResources: [
      "identify-truck-trailer-parts-before-calling-parts-counter",
      "parts-ordering-details-that-reduce-repeat-calls-and-wrong-fit-delays",
      "transmission-and-differential-leak-clues-worth-documenting-before-a-shop-visit",
    ],
    updatedAt,
  },
  {
    department: "parts",
    group: "Mechanical Parts",
    slug: "brake-safety-parts",
    navTitle: "Brake & Safety Parts",
    title: "Commercial Truck and Trailer Brake and Safety Parts",
    eyebrow: "Parts support for commercial brake systems",
    description:
      "Commercial truck and trailer air brake, foundation brake, ABS, and safety-system parts support in Kamloops.",
    intro:
      "Brake parts need to match the exact axle, foundation brake, air system, and application. Munden's Parts Department helps identify commercial truck and trailer brake components using vehicle and component information.",
    keywords: [
      "truck brake parts Kamloops",
      "air brake parts Kamloops",
      "commercial trailer ABS parts",
    ],
    offeringsTitle: "Brake and safety categories",
    offerings: [
      "Brake chambers and air-system components",
      "Slack adjusters and foundation brake hardware",
      "Brake drums, rotors, shoes, and related components",
      "Air compressors, valves, fittings, and lines",
      "ABS sensors, wiring, and related components",
      "Commercial truck and trailer safety hardware",
    ],
    preparationTitle: "Avoid a wrong brake-part match",
    preparationIntro:
      "Brake components can look similar while differing in size, stroke, mounting, connector, or application. Do not rely on appearance alone.",
    preparationItems: [
      "Truck or trailer VIN and unit information",
      "Axle and brake-component identification",
      "Existing part number and readable markings",
      "Measurements taken safely with the system secured",
      "Photos of mounting, ports, connectors, and surrounding components",
    ],
    process: [
      { title: "Identify the unit", description: "Provide the VIN, axle, and brake-system details available." },
      { title: "Match the component", description: "Compare markings, dimensions, mounting, and application." },
      { title: "Confirm the order", description: "Review the identified part and available supply options." },
    ],
    faqs: [
      {
        question: "Can a brake chamber be identified from a photo?",
        answer:
          "A photo helps, but chamber type, size, stroke, mounting, ports, markings, and vehicle application may also be required.",
      },
      {
        question: "Do you supply truck and trailer ABS components?",
        answer:
          "Munden can help identify ABS sensors, wiring, and related components when provided with the vehicle and system details.",
      },
      {
        question: "Can the Service Department install the parts?",
        answer:
          "Yes. If the unit needs diagnosis or installation, the Parts and Service departments can coordinate the next step.",
      },
    ],
    relatedSlugs: ["engine-drivetrain-parts", "electrical-parts-components", "suspension-steering-parts"],
    relatedResources: [
      "air-brake-leak-clues-drivers-should-report-before-the-next-dispatch",
      "brake-shoe-and-drum-wear-signs-fleets-should-document-between-services",
      "abs-warning-light-basics-for-truck-and-trailer-operators",
    ],
    updatedAt,
  },
  {
    department: "parts",
    group: "Electrical & Hydraulic",
    slug: "electrical-parts-components",
    navTitle: "Electrical Parts",
    title: "Commercial Truck Electrical Parts and Components",
    eyebrow: "Electrical parts identification and supply",
    description:
      "Commercial truck and trailer batteries, starters, alternators, lighting, sensors, wiring, and electrical parts in Kamloops.",
    intro:
      "Electrical parts should be matched to the circuit, connector, rating, and application—not just the symptom. Munden helps customers identify truck, trailer, and equipment electrical components before ordering.",
    keywords: [
      "truck electrical parts Kamloops",
      "commercial truck batteries alternators starters",
      "truck trailer lighting parts Kamloops",
    ],
    offeringsTitle: "Electrical parts categories",
    offerings: [
      "Heavy-duty batteries",
      "Starters and alternators",
      "Lighting, lamps, and related hardware",
      "Sensors, switches, relays, and fuses",
      "Connectors, pigtails, and wiring components",
      "Control and electrical service components",
    ],
    preparationTitle: "Information for an electrical-parts request",
    preparationIntro:
      "Voltage, amperage, connector, mounting, and component numbers help prevent a visually similar but electrically incorrect match.",
    preparationItems: [
      "Vehicle or equipment VIN, serial number, and unit information",
      "Voltage and electrical ratings",
      "Manufacturer and part number",
      "Photos of connectors, terminals, mounting, and labels",
      "Description of the circuit and diagnosed fault",
    ],
    process: [
      { title: "Record the specification", description: "Collect ratings, connector details, labels, and unit information." },
      { title: "Verify the match", description: "Compare application, mounting, electrical specification, and part number." },
      { title: "Choose the next step", description: "Order the part or coordinate diagnostic help when the fault is not confirmed." },
    ],
    faqs: [
      {
        question: "Should I replace an electrical part based only on a fault code?",
        answer:
          "A fault code identifies an affected system but does not always prove that one component has failed. Diagnostic testing may be appropriate before ordering.",
      },
      {
        question: "What photos are useful for an electrical part?",
        answer:
          "Photograph the full component, label, connector face, wire colours, terminal arrangement, and mounting location when safe.",
      },
      {
        question: "Can Munden help if I have not confirmed the failed part?",
        answer:
          "Yes. The Parts Department can review the information you have, and the Service Department can assist when diagnosis is required.",
      },
    ],
    relatedSlugs: ["brake-safety-parts", "hydraulic-parts-hoses", "filters-fluids-maintenance-parts"],
    relatedResources: [
      "battery-alternator-starter-checks-before-a-truck-becomes-a-no-start",
      "what-repeated-blown-fuses-can-tell-you-about-an-electrical-fault",
      "trailer-lighting-and-wiring-faults-that-cause-avoidable-downtime",
    ],
    updatedAt,
  },
  {
    department: "parts",
    group: "Electrical & Hydraulic",
    slug: "hydraulic-parts-hoses",
    navTitle: "Hydraulic Parts & Hoses",
    title: "Hydraulic Parts, Hoses and Fittings",
    eyebrow: "Hydraulic component identification",
    description:
      "Hydraulic hose, fitting, pump, cylinder, valve, filter, seal, and component parts support in Kamloops.",
    intro:
      "Hydraulic parts must match pressure, fluid, size, fitting, routing, and equipment requirements. Munden's Parts Department helps identify hydraulic components for trucks and working equipment using measurements, markings, and application details.",
    keywords: [
      "hydraulic parts Kamloops",
      "hydraulic hoses fittings Kamloops",
      "truck equipment hydraulic components",
    ],
    offeringsTitle: "Hydraulic parts categories",
    offerings: [
      "Hydraulic hoses and fittings",
      "Pumps and motors",
      "Cylinders and cylinder components",
      "Control valves and related components",
      "Hydraulic filters",
      "Seals, kits, and service parts",
    ],
    preparationTitle: "Prepare for a hydraulic-parts lookup",
    preparationIntro:
      "Never search for a pressurized leak with your hand. Shut down and depressurize equipment according to its procedures before inspecting or removing components.",
    preparationItems: [
      "Equipment make, model, serial number, and unit number",
      "Hose markings, overall length, and fitting orientation",
      "Component manufacturer, model, and serial tag",
      "Port, thread, and fitting information",
      "Photos showing routing, mounting, and the full component",
    ],
    process: [
      { title: "Identify the application", description: "Confirm the machine, function, pressure, fluid, and component involved." },
      { title: "Compare specifications", description: "Review dimensions, threads, fittings, routing, and manufacturer markings." },
      { title: "Coordinate supply or service", description: "Order the required item or involve the shop when diagnosis or installation is needed." },
    ],
    faqs: [
      {
        question: "What should I bring for a hydraulic hose replacement?",
        answer:
          "Bring the hose when safe, or provide clear photos, markings, overall length, fitting types and orientation, equipment information, and operating requirements.",
      },
      {
        question: "Can two fittings that look similar use different threads?",
        answer:
          "Yes. Thread type, pitch, sealing method, size, and orientation need to be confirmed rather than judged by appearance alone.",
      },
      {
        question: "Can the shop diagnose the hydraulic system?",
        answer:
          "Yes. If the failed component has not been identified, Munden's Service Department can investigate the hydraulic concern.",
      },
    ],
    relatedSlugs: ["engine-drivetrain-parts", "electrical-parts-components", "filters-fluids-maintenance-parts"],
    relatedResources: [
      "hydraulic-hose-warning-signs-small-leak-becomes-downtime",
      "parts-ordering-details-that-reduce-repeat-calls-and-wrong-fit-delays",
      "pto-and-wet-kit-maintenance-questions-to-ask-before-a-busy-job",
    ],
    updatedAt,
  },
  {
    department: "parts",
    group: "Mechanical Parts",
    slug: "suspension-steering-parts",
    navTitle: "Suspension & Steering Parts",
    title: "Commercial Truck Suspension and Steering Parts",
    eyebrow: "Chassis and ride-system parts support",
    description:
      "Commercial truck and trailer springs, shocks, steering, kingpin, air-suspension, and chassis parts support in Kamloops.",
    intro:
      "Suspension and steering components need to match axle, chassis, dimensions, mounting, and vehicle application. Munden helps identify parts for commercial trucks and trailers using the unit and component information available.",
    keywords: [
      "truck suspension parts Kamloops",
      "commercial truck steering parts",
      "leaf spring air bag kingpin parts Kamloops",
    ],
    offeringsTitle: "Suspension and steering categories",
    offerings: [
      "Leaf springs and related hardware",
      "Air springs and ride-height components",
      "Shock absorbers and mounts",
      "Tie rods, drag links, and steering components",
      "Kingpins, bushings, and front-end parts",
      "U-bolts and chassis hardware",
    ],
    preparationTitle: "Details for a chassis-parts lookup",
    preparationIntro:
      "Measurements and axle or component tags are often needed because chassis specifications can vary within the same truck model.",
    preparationItems: [
      "VIN, unit number, year, make, and model",
      "Axle, suspension, or steering-system identification",
      "Existing part numbers and readable markings",
      "Measurements and photos of mounting points",
      "Description of wear, damage, ride height, or steering concern",
    ],
    process: [
      { title: "Confirm the chassis", description: "Provide the VIN, axle, suspension, and component information available." },
      { title: "Match dimensions", description: "Compare part numbers, measurements, mounting, and application." },
      { title: "Coordinate the repair", description: "Order the component or arrange shop inspection and installation if needed." },
    ],
    faqs: [
      {
        question: "Why are measurements sometimes required for suspension parts?",
        answer:
          "Wheelbase, axle, suspension package, previous modifications, and component options can vary, so dimensions help confirm the match.",
      },
      {
        question: "Can you help identify an air spring?",
        answer:
          "Yes. Provide the unit information, air-spring markings, mounting configuration, dimensions, and clear photos.",
      },
      {
        question: "What if uneven tire wear is the only symptom?",
        answer:
          "Tire wear can have several causes. A shop inspection may be appropriate before ordering steering or suspension parts.",
      },
    ],
    relatedSlugs: ["brake-safety-parts", "engine-drivetrain-parts", "filters-fluids-maintenance-parts"],
    relatedResources: [
      "how-tire-wear-patterns-help-diagnose-larger-truck-and-trailer-issues",
      "kingpin-and-suspension-wear-clues-that-show-up-during-everyday-driving",
      "trailer-suspension-air-bag-issues-fleets-should-catch-early",
    ],
    updatedAt,
  },
  {
    department: "parts",
    group: "Maintenance Supplies",
    slug: "filters-fluids-maintenance-parts",
    navTitle: "Maintenance Parts",
    title: "Commercial Truck Filters, Fluids and Maintenance Parts",
    eyebrow: "Routine service parts for working fleets",
    description:
      "Commercial truck and equipment filters, fluids, belts, hoses, seals, and routine maintenance parts support in Kamloops.",
    intro:
      "Routine maintenance parts still need an accurate application match. Munden helps operators and fleets organize filters, fluids, belts, hoses, seals, and other service items around specific units and maintenance work.",
    keywords: [
      "truck filters fluids Kamloops",
      "commercial truck maintenance parts",
      "heavy equipment service parts Kamloops",
    ],
    offeringsTitle: "Maintenance-parts categories",
    offerings: [
      "Oil, fuel, air, coolant, and hydraulic filters",
      "Lubricants and service fluids",
      "Belts and coolant hoses",
      "Gaskets, seals, and service kits",
      "Exhaust service components",
      "Common truck, trailer, and equipment maintenance items",
    ],
    preparationTitle: "Organize repeat maintenance orders",
    preparationIntro:
      "A unit-based list helps reduce repeated lookups and makes it easier to confirm which service items belong to each vehicle or machine.",
    preparationItems: [
      "Unit number, VIN or serial number, year, make, and model",
      "Engine and component model information",
      "Manufacturer maintenance recommendations",
      "Current filter and part numbers",
      "Fluid specification and required quantity",
    ],
    process: [
      { title: "Build the unit list", description: "Record each vehicle or machine and its component details." },
      { title: "Confirm specifications", description: "Match filters, fluids, belts, hoses, seals, and kits to the application." },
      { title: "Plan the order", description: "Organize the required items for pickup, supply, or coordinated service work." },
    ],
    faqs: [
      {
        question: "Can Munden help build a recurring filter list?",
        answer:
          "Yes. Provide the unit and component information plus existing filter numbers so the parts team can help organize the request.",
      },
      {
        question: "Why does the fluid specification matter?",
        answer:
          "Different components and operating conditions may require different specifications. Use the applicable manufacturer guidance rather than selecting by viscosity or colour alone.",
      },
      {
        question: "Can maintenance parts be coordinated with a shop appointment?",
        answer:
          "Yes. The Parts and Service departments can coordinate required service items when maintenance is being completed at Munden.",
      },
    ],
    relatedSlugs: ["engine-drivetrain-parts", "electrical-parts-components", "hydraulic-parts-hoses"],
    relatedResources: [
      "parts-ordering-details-that-reduce-repeat-calls-and-wrong-fit-delays",
      "how-to-prepare-a-truck-or-trailer-for-a-productive-shop-visit",
      "daily-walkaround-notes-that-make-preventive-maintenance-easier-to-schedule",
    ],
    updatedAt,
  },
];

export const allDepartmentPages = [
  ...serviceDepartmentPages,
  ...mobileServicePages,
  ...partsDepartmentPages,
];

export const departmentBasePaths: Record<DepartmentKind, string> = {
  service: "/services/service-department",
  mobile: "/services/mobile-service",
  parts: "/services/parts-department",
};

export function getDepartmentPage(kind: DepartmentKind, slug: string) {
  return allDepartmentPages.find(
    (page) => page.department === kind && page.slug === slug,
  );
}

export function getDepartmentPagePath(page: DepartmentPage) {
  return `${departmentBasePaths[page.department]}/${page.slug}`;
}

export function getDepartmentPages(kind: DepartmentKind) {
  if (kind === "service") {
    return serviceDepartmentPages;
  }

  if (kind === "mobile") {
    return mobileServicePages;
  }

  return partsDepartmentPages;
}

export function getDepartmentGroups(kind: DepartmentKind) {
  const pages = getDepartmentPages(kind);

  return Array.from(new Set(pages.map((page) => page.group))).map((name) => ({
    name,
    pages: pages.filter((page) => page.group === name),
  }));
}

export function getRelatedDepartmentPages(page: DepartmentPage) {
  return page.relatedSlugs
    .map((slug) => getDepartmentPage(page.department, slug))
    .filter((related): related is DepartmentPage => Boolean(related));
}

export function getDepartmentNavigation() {
  return {
    serviceGroups: getDepartmentGroups("service").map((group) => ({
      name: group.name,
      pages: group.pages.map((page) => ({
        title: page.navTitle,
        href: getDepartmentPagePath(page),
      })),
    })),
    mobileGroups: getDepartmentGroups("mobile").map((group) => ({
      name: group.name,
      pages: group.pages.map((page) => ({
        title: page.navTitle,
        href: getDepartmentPagePath(page),
      })),
    })),
    partsGroups: getDepartmentGroups("parts").map((group) => ({
      name: group.name,
      pages: group.pages.map((page) => ({
        title: page.navTitle,
        href: getDepartmentPagePath(page),
      })),
    })),
  };
}

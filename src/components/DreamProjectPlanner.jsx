import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PlannerStep from "./PlannerStep";
import PlannerSummary from "./PlannerSummary";
import { downloadProjectVision } from "../projectVisionExport";
import { trackEvent } from "../analytics";
import projectVisionRules from "../../project_vision_rules.json";
import "./DreamProjectPlanner.css";

const projectImages = {
  familyHome: "/images/planner/family-home.webp",
  rentalUnits: "/images/planner/rental-units.webp",
  luxuryVilla: "/images/planner/luxury-villa.webp",
  commercialBuilding: "/images/planner/commercial-building.webp",
  boundaryWall: "/images/planner/boundary-wall.webp",
  renovationExtension: "/images/planner/renovation-extension.webp",
  modernMinimalist: "/images/planner/modern-minimalist.webp",
  contemporaryAfrican: "/images/planner/contemporary-african.webp",
  luxuryExecutive: "/images/planner/luxury-executive.webp",
  simpleAffordable: "/images/planner/simple-affordable.webp",
  boldArchitectural: "/images/planner/bold-architectural.webp",
  traditionalModern: "/images/planner/traditional-modern.webp",
};

const plannerQuestions = [
  {
    id: "projectType",
    title: "What type of project are you dreaming about?",
    helper: "Choose the vision that feels closest to what you want to create.",
    valueMessage:
      "This sets the right professional pathway, from concept design to structural and approval support.",
    visual: true,
    options: [
      {
        title: "Family Home",
        description: "A comfortable place for everyday life, growth and lasting memories.",
        image: projectImages.familyHome,
      },
      {
        title: "Rental Units",
        description: "A well-planned property designed to create dependable income.",
        image: projectImages.rentalUnits,
      },
      {
        title: "Luxury Villa",
        description: "A distinctive home with generous spaces and an executive finish.",
        image: projectImages.luxuryVilla,
      },
      {
        title: "Commercial Building",
        description: "A professional space that supports business growth and visibility.",
        image: projectImages.commercialBuilding,
      },
      {
        title: "Boundary Wall",
        description: "Security, privacy and a strong first impression for your property.",
        image: projectImages.boundaryWall,
      },
      {
        title: "Renovation / Extension",
        description: "Reimagine your existing property and make room for what comes next.",
        image: projectImages.renovationExtension,
      },
    ],
  },
  {
    id: "stage",
    title: "What best describes your current stage?",
    helper: "There is no wrong starting point. We will meet your project where it is.",
    valueMessage:
      "Knowing your starting point helps us avoid unnecessary work and recommend the most useful first appointment.",
    options: [
      { title: "I own land", description: "The site is secured and ready to be considered." },
      { title: "I am looking for land", description: "I want guidance before choosing a property." },
      { title: "I already have a design", description: "I have drawings or a concept to develop." },
      { title: "I only have an idea", description: "I need help turning a vision into a clear brief." },
      { title: "I want to renovate", description: "I want to improve or expand an existing property." },
    ],
  },
  {
    id: "lifestyle",
    title: "What lifestyle or goal fits your project?",
    helper: "Think beyond rooms and walls. What should this project make possible?",
    valueMessage:
      "Your goal guides the layout, priorities and long-term value of the design, not just its appearance.",
    visual: true,
    options: [
      {
        title: "Growing family",
        description: "Flexible, welcoming spaces that can evolve with family life.",
        image: projectImages.familyHome,
      },
      {
        title: "First home",
        description: "A confident, practical first step into property ownership.",
        image: projectImages.simpleAffordable,
      },
      {
        title: "Investment income",
        description: "Efficient planning that balances tenant appeal and long-term value.",
        image: projectImages.rentalUnits,
      },
      {
        title: "Prestige / luxury",
        description: "A statement property with presence, comfort and refined detail.",
        image: projectImages.luxuryVilla,
      },
      {
        title: "Business use",
        description: "A credible, functional environment made for clients and growth.",
        image: projectImages.commercialBuilding,
      },
      {
        title: "Fixing an existing property",
        description: "Restore confidence, improve function and unlock hidden potential.",
        image: projectImages.renovationExtension,
      },
    ],
  },
  {
    id: "style",
    title: "Which style attracts you most?",
    helper: "Choose the architectural mood you would be proud to come home to.",
    valueMessage:
      "A clear visual direction makes the first design conversation faster and more focused.",
    visual: true,
    options: [
      {
        title: "Modern Minimalist",
        description: "Clean forms, calm spaces and purposeful detail.",
        image: projectImages.modernMinimalist,
      },
      {
        title: "Contemporary African",
        description: "Modern living shaped by climate, place and local character.",
        image: projectImages.contemporaryAfrican,
      },
      {
        title: "Luxury Executive",
        description: "Confident proportions, premium finishes and impressive arrival.",
        image: projectImages.luxuryExecutive,
      },
      {
        title: "Simple Affordable",
        description: "Smart planning, practical finishes and value in every square metre.",
        image: projectImages.simpleAffordable,
      },
      {
        title: "Bold Architectural",
        description: "Strong geometry and a memorable, individual presence.",
        image: projectImages.boldArchitectural,
      },
      {
        title: "Traditional Modern",
        description: "Familiar warmth refined with contemporary comfort.",
        image: projectImages.traditionalModern,
      },
    ],
  },
  {
    id: "features",
    title: "What features matter most?",
    helper: "Select as many as you like. These details begin shaping your daily experience.",
    valueMessage:
      "Your priorities help us protect the spaces that matter before budget and site constraints shape the concept.",
    multi: true,
    options: [
      { title: "Garage" },
      { title: "Open-plan kitchen" },
      { title: "Ensuite bedroom" },
      { title: "Walk-in closet" },
      { title: "Outdoor entertainment area" },
      { title: "Home office" },
      { title: "Extra rental room" },
      { title: "Modern exterior" },
      { title: "Large windows" },
      { title: "Secure boundary wall" },
    ],
  },
  {
    id: "projectDetails",
    title: "Tell us a little about the site and project scale.",
    helper:
      "Approximate information is perfectly fine. These details make your project brief more useful.",
    valueMessage:
      "Early scale information helps expose mismatches between ambition, site and budget before expensive design work begins.",
    fields: [
      {
        key: "location",
        label: "Project location",
        placeholder: "e.g. Gaborone North",
        required: true,
      },
      {
        key: "plotSize",
        label: "Plot size",
        placeholder: "e.g. 30 m x 40 m or 1,200 m²",
      },
      {
        key: "floorArea",
        label: "Target floor area",
        placeholder: "e.g. 180 m² or not sure",
      },
      {
        key: "bedrooms",
        label: "Bedrooms / main rooms",
        placeholder: "e.g. 3 bedrooms",
      },
      {
        key: "bathrooms",
        label: "Bathrooms",
        placeholder: "e.g. 2 bathrooms",
      },
      {
        key: "storeys",
        label: "Building levels",
        type: "select",
        options: ["Single storey", "Double storey", "Three or more", "Not sure"],
      },
    ],
  },
  {
    id: "timeline",
    title: "When would you like to start?",
    helper: "Your preferred timing helps define the right professional next step.",
    valueMessage:
      "Timing helps us identify whether you need immediate technical direction or a calmer planning roadmap.",
    options: [
      { title: "Immediately" },
      { title: "Within 3 months" },
      { title: "Within 6 months" },
      { title: "Within 12 months" },
      { title: "Just exploring" },
    ],
  },
  {
    id: "budget",
    title: "Which budget direction feels realistic?",
    helper: "A broad range is enough for now. It helps align ambition, scope and priorities.",
    valueMessage:
      "A realistic range lets us discuss the right size, finish level and phasing strategy without wasting your time.",
    options: [
      { title: "Under P500k" },
      { title: "P500k–P1M" },
      { title: "P1M–P2M" },
      { title: "Above P2M" },
      { title: "Not sure yet" },
    ],
  },
  {
    id: "clientDetails",
    title: "Who should this project vision be prepared for?",
    helper:
      "This step is optional. Adding your details personalises the downloaded brief and consultation request.",
    valueMessage:
      "Add your details once and your downloadable brief and consultation enquiry will already be prepared for you.",
    optional: true,
    fields: [
      {
        key: "clientName",
        label: "Client name",
        placeholder: "Your full name or company",
      },
      {
        key: "phone",
        label: "Phone number",
        placeholder: "e.g. +267 71 000 000",
        type: "tel",
      },
      {
        key: "email",
        label: "Email address",
        placeholder: "you@example.com",
        type: "email",
      },
    ],
  },
];

const initialAnswers = {
  projectType: "",
  stage: "",
  lifestyle: "",
  style: "",
  features: [],
  projectDetails: {
    location: "",
    plotSize: "",
    floorArea: "",
    bedrooms: "",
    bathrooms: "",
    storeys: "",
  },
  timeline: "",
  budget: "",
  clientDetails: {
    clientName: "",
    phone: "",
    email: "",
  },
};

const PLANNER_STORAGE_KEY = "cgm-dream-project-planner";

function loadPlannerState() {
  if (typeof window === "undefined") {
    return { answers: initialAnswers, currentStep: 0, showSummary: false };
  }

  try {
    const saved = JSON.parse(window.localStorage.getItem(PLANNER_STORAGE_KEY));
    const savedAnswers = saved?.answers ?? {};

    return {
      answers: {
        ...initialAnswers,
        ...savedAnswers,
        features: Array.isArray(savedAnswers.features)
          ? savedAnswers.features
          : [],
        projectDetails: {
          ...initialAnswers.projectDetails,
          ...(savedAnswers.projectDetails ?? {}),
        },
        clientDetails: {
          ...initialAnswers.clientDetails,
          ...(savedAnswers.clientDetails ?? {}),
        },
      },
      currentStep: Math.min(
        Math.max(Number(saved?.currentStep) || 0, 0),
        plannerQuestions.length - 1
      ),
      showSummary: Boolean(saved?.showSummary),
    };
  } catch {
    window.localStorage.removeItem(PLANNER_STORAGE_KEY);
    return { answers: initialAnswers, currentStep: 0, showSummary: false };
  }
}

export default function DreamProjectPlanner({ onConsultation }) {
  const [savedPlannerState] = useState(loadPlannerState);
  const [answers, setAnswers] = useState(savedPlannerState.answers);
  const [currentStep, setCurrentStep] = useState(savedPlannerState.currentStep);
  const [exportState, setExportState] = useState({
    format: "",
    error: "",
  });
  const [showSummary, setShowSummary] = useState(savedPlannerState.showSummary);

  const question = plannerQuestions[currentStep];
  const currentAnswer = answers[question.id];
  const requiredFields = question.fields?.filter((field) => field.required) ?? [];
  const canContinue = question.optional
    ? true
    : question.fields
      ? requiredFields.every((field) => Boolean(currentAnswer?.[field.key]?.trim()))
      : question.multi
        ? currentAnswer.length > 0
        : Boolean(currentAnswer);
  const progress = showSummary
    ? 100
    : ((currentStep + 1) / plannerQuestions.length) * 100;
  const remainingMinutes = Math.max(
    1,
    Math.ceil((plannerQuestions.length - currentStep) * 0.3)
  );

  const readinessScore = useMemo(() => {
    const weights = projectVisionRules.readinessWeights;
    let score = 0;
    if (answers.stage === "I own land") score += weights.ownsLand;
    if (answers.stage === "I already have a design") score += weights.hasDesign;
    if (["Immediately", "Within 3 months"].includes(answers.timeline)) {
      score += weights.nearTermTimeline;
    }
    if (answers.budget && answers.budget !== "Not sure yet") {
      score += weights.definedBudget;
    }
    if (answers.features.length >= 3) score += weights.threeOrMoreFeatures;
    return Math.min(score, 100);
  }, [answers]);

  useEffect(() => {
    window.localStorage.setItem(
      PLANNER_STORAGE_KEY,
      JSON.stringify({ answers, currentStep, showSummary })
    );
  }, [answers, currentStep, showSummary]);

  const updateAnswer = (value) => {
    if (currentStep === 0 && !currentAnswer) {
      trackEvent("planner_started");
    }
    setAnswers((current) => ({ ...current, [question.id]: value }));
  };

  const goNext = () => {
    if (!canContinue) return;
    if (currentStep === plannerQuestions.length - 1) {
      setShowSummary(true);
      trackEvent("planner_completed", {
        project_type: answers.projectType,
        readiness_score: readinessScore,
      });
      return;
    }
    trackEvent("planner_step_completed", {
      step: currentStep + 1,
      question: question.id,
    });
    setCurrentStep((step) => step + 1);
  };

  const goBack = () => {
    if (showSummary) {
      setShowSummary(false);
      return;
    }
    setCurrentStep((step) => Math.max(0, step - 1));
  };

  const handleContact = () => {
    trackEvent("planner_consultation_requested", {
      project_type: answers.projectType,
    });
    onConsultation?.(answers);
    document.querySelector(".enquirySection")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const restartPlanner = () => {
    trackEvent("planner_restarted", {
      from_step: showSummary ? "summary" : currentStep + 1,
    });
    setAnswers(initialAnswers);
    setCurrentStep(0);
    setShowSummary(false);
    setExportState({ format: "", error: "" });
    window.localStorage.removeItem(PLANNER_STORAGE_KEY);
  };

  const handleDownload = async (format) => {
    trackEvent("planner_export_started", { format });
    setExportState({ format, error: "" });
    try {
      await downloadProjectVision(answers, format);
      trackEvent("planner_export_completed", { format });
      setExportState({ format: "", error: "" });
    } catch (error) {
      trackEvent("planner_export_failed", { format });
      setExportState({
        format: "",
        error:
          error instanceof Error
            ? error.message
            : "Your professional project summary could not be generated. Please retry.",
      });
    }
  };

  return (
    <section className="dreamPlannerSection revealSection" id="dream-project-planner">
      <div className="dreamPlannerIntro">
        <p className="sectionLabel">
          <Sparkles aria-hidden="true" />
          DREAM PROJECT PLANNER
        </p>
        <h2>Turn Your Idea Into a Project You Can Act On</h2>
        <p className="dreamPlannerSubtitle">
          In about three minutes, clarify your priorities and receive a personalised
          project direction you can download, discuss and build on.
        </p>
        <p className="dreamPlannerSupport">
          No technical knowledge is required. Your answers are saved on this device,
          and you can explore without committing to a consultation.
        </p>
        <div className="plannerValueStrip" aria-label="Planner benefits">
          <span><strong>3 min</strong> guided planning</span>
          <span><strong>Personalised</strong> design direction</span>
          <span><strong>Free</strong> PDF and Word brief</span>
          <span><strong>No pressure</strong> to enquire</span>
        </div>
      </div>

      <div className="plannerShell">
        <div className="plannerProgressHeader">
          <div>
            <span>{showSummary ? "Your project vision is ready" : `Step ${currentStep + 1} of ${plannerQuestions.length}`}</span>
            <strong>{Math.round(progress)}%</strong>
          </div>
          <div
            aria-label={`Planner progress: ${Math.round(progress)}%`}
            aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow={Math.round(progress)}
            className="plannerProgressTrack"
            role="progressbar"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        {showSummary ? (
          <PlannerSummary
            answers={answers}
            designDirection={projectVisionRules.designDirections[answers.lifestyle]}
            exportState={exportState}
            onContact={handleContact}
            onDownload={handleDownload}
            readinessScore={readinessScore}
            recommendedService={
              projectVisionRules.serviceRecommendations[answers.projectType]
            }
          />
        ) : (
          <PlannerStep
            answer={currentAnswer}
            isMulti={question.multi}
            onAnswer={updateAnswer}
            question={question}
            stepNumber={currentStep + 1}
          />
        )}

        <div className="plannerNavigation">
          <div className="plannerNavigationGroup">
            <button
              className="plannerNavButton back"
              disabled={currentStep === 0 && !showSummary}
              onClick={goBack}
              type="button"
            >
              <ArrowLeft aria-hidden="true" />
              Back
            </button>
            <button
              className="plannerNavButton restart"
              onClick={restartPlanner}
              type="button"
            >
              <RotateCcw aria-hidden="true" />
              Start Again
            </button>
          </div>

          {!showSummary && (
            <button
              className="plannerNavButton next"
              disabled={!canContinue}
              onClick={goNext}
              type="button"
            >
              {currentStep === plannerQuestions.length - 1
                ? "Reveal My Project Direction"
                : currentStep === 0
                  ? "Start Shaping My Project"
                  : "Save & Continue"}
              <ArrowRight aria-hidden="true" />
            </button>
          )}
        </div>
        {!showSummary && (
          <p className="plannerReassurance">
            Your progress is saved automatically. About {remainingMinutes} minute
            {remainingMinutes === 1 ? "" : "s"} remaining.
          </p>
        )}
      </div>
    </section>
  );
}

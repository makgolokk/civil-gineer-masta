import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PlannerStep from "./PlannerStep";
import PlannerSummary from "./PlannerSummary";
import PlannerLivePreview from "./PlannerLivePreview";
import { downloadProjectVision } from "../projectVisionExport";
import { trackEvent } from "../analytics";
import projectVisionRules from "../../project_vision_rules.json";
import {
  getDesignDirection,
  getFeatureQuestion,
  getGoalQuestion,
  getStyleQuestion,
  sanitizeAnswersForGoal,
  sanitizeAnswersForProject,
} from "./plannerQuestionConfig";
import "./DreamProjectPlanner.css";

const projectImages = {
  familyHome: "/images/planner/family-home.webp",
  rentalUnits: "/images/planner/rental-units.webp",
  luxuryVilla: "/images/planner/luxury-villa.webp",
  commercialBuilding: "/images/planner/commercial-building.webp",
  boundaryWall: "/images/planner/boundary-wall.webp",
  renovationExtension: "/images/planner/renovation-extension.webp",
};

const projectImageByType = {
  "Family Home": projectImages.familyHome,
  "Rental Units": projectImages.rentalUnits,
  "Luxury Villa": projectImages.luxuryVilla,
  "Commercial Building": projectImages.commercialBuilding,
  "Boundary Wall": projectImages.boundaryWall,
  "Renovation / Extension": projectImages.renovationExtension,
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
    id: "stageProfile",
    title: "Where are you with the site and the design?",
    helper:
      "Choose one answer in each row. Your land position and design progress do not have to be at the same stage.",
    valueMessage:
      "Knowing your starting point helps us avoid unnecessary work and recommend the most useful first appointment.",
    choiceGroups: [
      {
        key: "siteStatus",
        label: "Site position",
        options: [
          {
            title: "Land secured",
            description: "I own or have secured the project site.",
          },
          {
            title: "Looking for land",
            description: "I want guidance before selecting a site.",
          },
          {
            title: "Existing property",
            description: "The project involves a building already on the site.",
          },
          {
            title: "Not sure yet",
            description: "I am still exploring the best route.",
          },
        ],
      },
      {
        key: "designStatus",
        label: "Design position",
        options: [
          {
            title: "Idea only",
            description: "I need help shaping the first clear concept.",
          },
          {
            title: "Sketches / inspiration",
            description: "I have references, sketches or an early concept.",
          },
          {
            title: "Formal drawings",
            description: "I already have drawings or a developed design.",
          },
          {
            title: "Need guidance",
            description: "I want professional advice before choosing a direction.",
          },
        ],
      },
    ],
  },
  {
    id: "lifestyle",
    title: "What must this project achieve?",
    helper: "Choose the outcome that should guide the design.",
    valueMessage:
      "Your goal guides the layout, priorities and long-term value of the design, not just its appearance.",
    visual: true,
  },
  {
    id: "style",
    title: "Which design direction fits the project?",
    helper: "Choose a direction suited to the project's use and market.",
    valueMessage:
      "A clear visual direction makes the first design conversation faster and more focused.",
    visual: true,
  },
  {
    id: "features",
    title: "What must this project include?",
    helper: "Select as many project requirements as you need.",
    valueMessage:
      "Your priorities help us protect the spaces that matter before budget and site constraints shape the concept.",
    multi: true,
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
        projectTypes: [
          "Family Home",
          "Rental Units",
          "Luxury Villa",
          "Commercial Building",
          "Renovation / Extension",
        ],
      },
      {
        key: "bedrooms",
        label: "Bedrooms / main rooms",
        placeholder: "e.g. 3 bedrooms",
        projectTypes: ["Family Home", "Luxury Villa", "Renovation / Extension"],
      },
      {
        key: "bathrooms",
        label: "Bathrooms",
        placeholder: "e.g. 2 bathrooms",
        projectTypes: ["Family Home", "Luxury Villa", "Renovation / Extension"],
      },
      {
        key: "storeys",
        label: "Building levels",
        type: "select",
        options: ["Single storey", "Double storey", "Three or more", "Not sure"],
        projectTypes: [
          "Family Home",
          "Rental Units",
          "Luxury Villa",
          "Commercial Building",
          "Renovation / Extension",
        ],
      },
      {
        key: "unitCount",
        label: "Rental units planned",
        placeholder: "e.g. 4 units or not sure",
        projectTypes: ["Rental Units"],
      },
      {
        key: "unitMix",
        label: "Preferred unit mix",
        placeholder: "e.g. 2 studios and 4 two-bedroom units",
        projectTypes: ["Rental Units"],
      },
      {
        key: "rentalOperations",
        label: "How should the rentals operate?",
        placeholder: "e.g. long-term leases, short stays, managed on site",
        projectTypes: ["Rental Units"],
      },
      {
        key: "businessUse",
        label: "Main business use",
        placeholder: "e.g. offices, retail, workshop",
        projectTypes: ["Commercial Building"],
      },
      {
        key: "parkingNeed",
        label: "Parking requirement",
        placeholder: "e.g. 12 vehicles or not sure",
        projectTypes: ["Commercial Building"],
      },
      {
        key: "wallLength",
        label: "Approximate wall length",
        placeholder: "e.g. 120 m perimeter",
        projectTypes: ["Boundary Wall"],
      },
      {
        key: "gateNeeds",
        label: "Gate and access needs",
        placeholder: "e.g. sliding vehicle gate and pedestrian gate",
        projectTypes: ["Boundary Wall"],
      },
      {
        key: "existingCondition",
        label: "What needs to change?",
        placeholder: "e.g. add bedrooms and improve the kitchen",
        projectTypes: ["Renovation / Extension"],
      },
      {
        key: "existingSiteUse",
        label: "What is currently on the site?",
        placeholder: "e.g. occupied house, incomplete structure, vacant plot",
        siteStatuses: ["Existing property"],
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
  stageProfile: {
    siteStatus: "",
    designStatus: "",
  },
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
    unitCount: "",
    unitMix: "",
    rentalOperations: "",
    businessUse: "",
    parkingNeed: "",
    wallLength: "",
    gateNeeds: "",
    existingCondition: "",
    existingSiteUse: "",
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
    const legacyStage = savedAnswers.stage ?? "";
    const migratedStageProfile = {
      siteStatus:
        legacyStage === "I own land"
          ? "Land secured"
          : legacyStage === "I am looking for land"
            ? "Looking for land"
            : legacyStage === "I want to renovate"
              ? "Existing property"
              : "",
      designStatus:
        legacyStage === "I already have a design"
          ? "Formal drawings"
          : legacyStage === "I only have an idea"
            ? "Idea only"
            : "",
    };

    const mergedAnswers = {
        ...initialAnswers,
        ...savedAnswers,
        features: Array.isArray(savedAnswers.features)
          ? savedAnswers.features
          : [],
        stageProfile: {
          ...initialAnswers.stageProfile,
          ...migratedStageProfile,
          ...(savedAnswers.stageProfile ?? {}),
        },
        projectDetails: {
          ...initialAnswers.projectDetails,
          ...(savedAnswers.projectDetails ?? {}),
        },
        clientDetails: {
          ...initialAnswers.clientDetails,
          ...(savedAnswers.clientDetails ?? {}),
        },
      };

    const sanitizedAnswers = mergedAnswers.projectType
        ? sanitizeAnswersForProject(mergedAnswers, mergedAnswers.projectType)
        : mergedAnswers;
    let restoredStep = Math.min(
        Math.max(Number(saved?.currentStep) || 0, 0),
        plannerQuestions.length - 1
      );
    if (restoredStep > 1 && !sanitizedAnswers.stageProfile.siteStatus) {
      restoredStep = 1;
    } else if (restoredStep > 1 && !sanitizedAnswers.stageProfile.designStatus) {
      restoredStep = 1;
    } else if (restoredStep > 2 && !sanitizedAnswers.lifestyle) {
      restoredStep = 2;
    } else if (restoredStep > 3 && !sanitizedAnswers.style) {
      restoredStep = 3;
    } else if (restoredStep > 4 && !sanitizedAnswers.features.length) {
      restoredStep = 4;
    }

    return {
      answers: sanitizedAnswers,
      currentStep: restoredStep,
      showSummary:
        Boolean(saved?.showSummary) &&
        Boolean(
          sanitizedAnswers.projectType &&
            sanitizedAnswers.stageProfile.siteStatus &&
            sanitizedAnswers.stageProfile.designStatus &&
            sanitizedAnswers.lifestyle &&
            sanitizedAnswers.style &&
            sanitizedAnswers.features.length
        ),
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

  const baseQuestion = plannerQuestions[currentStep];
  const contextualQuestion =
    baseQuestion.id === "lifestyle"
      ? getGoalQuestion(answers)
      : baseQuestion.id === "style"
        ? getStyleQuestion(answers)
        : baseQuestion.id === "features"
          ? getFeatureQuestion(answers)
          : {};
  const question = { ...baseQuestion, ...contextualQuestion };
  const currentAnswer = answers[question.id];
  const visibleFields =
    question.fields?.filter(
      (field) =>
        (!field.projectTypes || field.projectTypes.includes(answers.projectType)) &&
        (!field.siteStatuses ||
          field.siteStatuses.includes(answers.stageProfile.siteStatus))
    ) ?? [];
  const requiredFields = question.fields?.filter((field) => field.required) ?? [];
  const canContinue = question.optional
    ? true
    : question.choiceGroups
      ? question.choiceGroups.every((group) => Boolean(currentAnswer?.[group.key]))
    : question.fields
      ? requiredFields
          .filter(
            (field) =>
              (!field.projectTypes ||
                field.projectTypes.includes(answers.projectType)) &&
              (!field.siteStatuses ||
                field.siteStatuses.includes(answers.stageProfile.siteStatus))
          )
          .every((field) => Boolean(currentAnswer?.[field.key]?.trim()))
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
    if (
      ["Land secured", "Existing property"].includes(
        answers.stageProfile.siteStatus
      )
    ) {
      score += weights.ownsLand;
    }
    if (answers.stageProfile.designStatus === "Formal drawings") {
      score += weights.hasDesign;
    }
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
    setAnswers((current) => {
      if (question.id === "projectType") {
        return sanitizeAnswersForProject(current, value);
      }
      if (question.id === "lifestyle") {
        return sanitizeAnswersForGoal(current, value);
      }
      if (question.id === "stageProfile") {
        const stagedAnswers = { ...current, stageProfile: value };
        return sanitizeAnswersForProject(stagedAnswers, current.projectType);
      }
      return { ...current, [question.id]: value };
    });
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
            designDirection={getDesignDirection(answers.lifestyle)}
            exportState={exportState}
            heroImage={projectImageByType[answers.projectType]}
            onContact={handleContact}
            onDownload={handleDownload}
            readinessScore={readinessScore}
            recommendedService={
              projectVisionRules.serviceRecommendations[answers.projectType]
            }
          />
        ) : (
          <div className="plannerWorkspace">
            <PlannerStep
              answer={currentAnswer}
              answers={answers}
              isMulti={question.multi}
              onAnswer={updateAnswer}
              question={question}
              stepNumber={currentStep + 1}
              visibleFields={visibleFields}
            />
            <PlannerLivePreview answers={answers} />
          </div>
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

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import DreamProjectPlanner from "./DreamProjectPlanner";

describe("DreamProjectPlanner", () => {
  beforeEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("saves a selected project type and restores it after remounting", async () => {
    const view = render(<DreamProjectPlanner />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Family Home.*A comfortable place/i,
      })
    );

    await waitFor(() => {
      const saved = JSON.parse(
        window.localStorage.getItem("cgm-dream-project-planner")
      );
      expect(saved.answers.projectType).toBe("Family Home");
    });

    view.unmount();
    render(<DreamProjectPlanner />);

    expect(
      screen.getByRole("button", {
        name: /Family Home.*A comfortable place/i,
      }).getAttribute("aria-pressed")
    ).toBe("true");
  }, 15000);

  it("clears the active brief when Start Again is selected", () => {
    render(<DreamProjectPlanner />);

    const familyHome = screen.getByRole("button", {
      name: /Family Home.*A comfortable place/i,
    });
    fireEvent.click(familyHome);
    fireEvent.click(screen.getByRole("button", { name: /Start Again/i }));

    expect(familyHome.getAttribute("aria-pressed")).toBe("false");
    expect(
      screen.getByRole("button", { name: "Start Shaping My Project" }).disabled
    ).toBe(true);
  });

  it("explains the value of the current question before asking for an answer", () => {
    render(<DreamProjectPlanner />);

    expect(screen.getByText("Why this matters")).toBeTruthy();
    expect(
      screen.getByText(/sets the right professional pathway/i)
    ).toBeTruthy();
    expect(screen.getByLabelText("Planner benefits").textContent).toContain(
      "Free PDF and Word brief"
    );
  });

  it("accepts independent site and design positions", () => {
    render(<DreamProjectPlanner />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Family Home.*A comfortable place/i,
      })
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Start Shaping My Project" })
    );

    const landChoice = screen.getByRole("button", {
      name: /Land secured.*own or have secured/i,
    });
    const designChoice = screen.getByRole("button", {
      name: /Formal drawings.*already have drawings/i,
    });
    fireEvent.click(landChoice);
    fireEvent.click(designChoice);

    expect(landChoice.getAttribute("aria-pressed")).toBe("true");
    expect(designChoice.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "Save & Continue" }).disabled).toBe(
      false
    );
  });

  it("updates the live project snapshot as the client answers", () => {
    render(<DreamProjectPlanner />);

    expect(screen.getByLabelText("Live project snapshot").textContent).toContain(
      "Choose a project type"
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: /Rental Units.*dependable income/i,
      })
    );

    expect(screen.getByLabelText("Live project snapshot").textContent).toContain(
      "Rental Units"
    );
    expect(screen.getByText(/tenant privacy, parking/i)).toBeTruthy();
  });

  it("tailors rental goals, design directions, and priorities", () => {
    render(<DreamProjectPlanner />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Rental Units.*dependable income/i,
      })
    );
    fireEvent.click(screen.getByRole("button", { name: "Start Shaping My Project" }));
    fireEvent.click(
      screen.getByRole("button", { name: /Land secured.*secured the project site/i })
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: /Sketches.*references, sketches or an early concept/i,
      })
    );
    fireEvent.click(screen.getByRole("button", { name: "Save & Continue" }));

    expect(
      screen.getByRole("heading", {
        name: /What must this rental development achieve/i,
      })
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /Young professional rentals/i })
    ).toBeTruthy();
    expect(screen.queryByRole("button", { name: /Growing family/i })).toBeNull();
    expect(
      screen.queryByRole("button", { name: /Fixing an existing property/i })
    ).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: /Young professional rentals/i })
    );
    fireEvent.click(screen.getByRole("button", { name: "Save & Continue" }));

    expect(screen.getByRole("button", { name: /Durable Modern/i })).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: /Traditional Modern/i })
    ).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Durable Modern/i }));
    fireEvent.click(screen.getByRole("button", { name: "Save & Continue" }));

    expect(screen.getByRole("button", { name: "Private entrances" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Separate utility metering" })
    ).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Walk-in closet" })).toBeNull();
  }, 15000);

  it("returns an older saved brief to the first newly relevant question", () => {
    window.localStorage.setItem(
      "cgm-dream-project-planner",
      JSON.stringify({
        currentStep: 4,
        answers: {
          projectType: "Rental Units",
          stageProfile: {
            siteStatus: "Land secured",
            designStatus: "Sketches / inspiration",
          },
          lifestyle: "Growing family",
          style: "Traditional Modern",
          features: ["Walk-in closet"],
        },
      })
    );

    render(<DreamProjectPlanner />);

    expect(
      screen.getByRole("heading", {
        name: /What must this rental development achieve/i,
      })
    ).toBeTruthy();
    expect(screen.queryByRole("button", { name: /Growing family/i })).toBeNull();
  });
});

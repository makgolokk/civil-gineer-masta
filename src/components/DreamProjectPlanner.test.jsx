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
});

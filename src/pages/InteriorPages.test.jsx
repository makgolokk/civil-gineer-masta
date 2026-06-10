import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import {
  ProjectsPage,
  ServiceDetailPage,
  ServicesPage,
} from "./InteriorPages";

afterEach(cleanup);

describe("interior service and project pages", () => {
  it("shows five consolidated service disciplines with subpage links", () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Architectural Design & Approvals" })
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "Structural Engineering & Assessments",
      })
    ).toBeTruthy();
    expect(screen.getAllByText("Explore this discipline")).toHaveLength(5);
  }, 15000);

  it("renders the selected service discipline route", () => {
    render(
      <MemoryRouter initialEntries={["/services/structural-engineering"]}>
        <Routes>
          <Route
            path="/services/:serviceSlug"
            element={<ServiceDetailPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Structural Engineering & Assessments",
      })
    ).toBeTruthy();
    expect(screen.getByText("Structural reports")).toBeTruthy();
    expect(screen.getByText("Possible deliverables")).toBeTruthy();
  });

  it("marks temporary portfolio content as sample profiles", () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    );

    expect(screen.getAllByText("Sample profile")).toHaveLength(4);
    expect(
      screen.getByText(/without presenting unverified work as completed/i)
    ).toBeTruthy();
  });
});

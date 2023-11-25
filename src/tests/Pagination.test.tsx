import "@testing-library/jest-dom";
import {
  RenderOptions,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import PaginationPage from "../pages/PaginationPage";
import { ReactElement } from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

global["Request"] = jest.fn().mockImplementation(() => ({
  signal: {
    removeEventListener: () => {},
    addEventListener: () => {},
  },
}));

export const renderWithRouter = (
  ui: ReactElement,
  path = "/",
  options?: Omit<RenderOptions, "wrapper">
) => {
  const { pathname } = new URL(`http://www.test.com${path}`);

  const router = createMemoryRouter([{ path: pathname, element: ui }], {
    initialEntries: [path],
  });

  return render(<RouterProvider router={router} />, { ...options });
};

describe("pagination page", () => {
  test("Renders the pagination page and shows page 1 by default", () => {
    renderWithRouter(<PaginationPage />);
    expect(screen.getByText("Item 1")).toBeVisible();
    expect(screen.getByText("Item 10")).toBeVisible();
    expect(screen.queryByText("Item 11")).not.toBeInTheDocument();
    expect(screen.getByTestId("previous")).toBeDisabled();
    expect(screen.getByTestId("page-1-button")).toBeDisabled();
  });

  test("Opens page 10", async () => {
    renderWithRouter(<PaginationPage />, "?page=10");
    fireEvent.click(screen.getByTestId("page-10-button"));
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 10")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 11")).not.toBeInTheDocument();
    expect(screen.getByText("Item 91")).toBeVisible();
    expect(screen.getByText("Item 100")).toBeVisible();
    expect(screen.getByTestId("previous")).not.toBeDisabled();
    expect(screen.getByTestId("page-1-button")).not.toBeDisabled();
    expect(screen.getByTestId("next")).toBeDisabled();
    expect(screen.getByTestId("page-10-button")).toBeDisabled();
  });

  test("Navigation, works", async () => {
    renderWithRouter(<PaginationPage />, "?page=5");
    expect(screen.getByText("Item 41")).toBeVisible();
    expect(screen.getByText("Item 50")).toBeVisible();

    fireEvent.click(screen.getByTestId("next"));
    expect(screen.queryByText("Item 41")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 50")).not.toBeInTheDocument();
    expect(screen.getByText("Item 51")).toBeVisible();
    expect(screen.getByText("Item 60")).toBeVisible();

    fireEvent.click(screen.getByTestId("previous"));
    expect(screen.queryByText("Item 51")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 40")).not.toBeInTheDocument();
    expect(screen.getByText("Item 41")).toBeVisible();
    expect(screen.getByText("Item 50")).toBeVisible();
  });
});

import "@testing-library/jest-dom";
import {
  RenderOptions,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import App from "../pages/TaskListPage";
import { ReactElement } from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

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
describe("task list page", () => {
  test("Renders the task list page and checks functionality", () => {
    const onSubmit = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    renderWithRouter(<App onSubmit={onSubmit} />);
    const input = screen.getByPlaceholderText("Add a new task");
    fireEvent.change(input, { target: { value: "Complete coding test" } });
    const button = screen.getByText("Add");
    fireEvent.click(button);

    const task1 = screen.getByText("Complete coding test");
    expect(task1).toBeVisible();

    fireEvent.change(input, { target: { value: "Learn React" } });
    fireEvent.click(button);

    const task2 = screen.getByText("Learn React");
    expect(task2).toBeVisible();

    const task2cb = screen.getByTestId("checkbox-1");
    fireEvent.click(task2cb);
    expect(task2cb).toBeVisible();
    expect(screen.getByTestId("Learn React-scratched")).toBeVisible();

    const tash2Del = screen.getByTestId("delete-1");
    expect(tash2Del).toBeVisible();
    fireEvent.click(tash2Del);
    expect(task2).not.toBeVisible();
    expect(task1).toBeVisible();
  });
});

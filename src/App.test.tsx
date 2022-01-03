import { configureStore, Store } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import counterReducer from "./store/counter/counterSlice";
import userReducer from "./store/user/userSlice";

describe("App container tests", () => {
  let rootStore: Store;

  beforeEach(() => {
    rootStore = configureStore({
      reducer: {
        user: userReducer,
        counter: counterReducer,
      },
    });
  });

  it("should show counter", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("value")).toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument();
    expect(screen.getByText("-1")).toBeInTheDocument();
  });

  it("should decrease value on button click", () => {
    renderComponent();

    fireEvent.click(screen.getByText("-1"));

    return waitFor(() => {
      expect(screen.getByPlaceholderText("value")).toHaveValue(-1);
    });
  });
  it("should increase value on button click", () => {
    renderComponent();

    fireEvent.click(screen.getByText("+1"));

    return waitFor(() => {
      expect(screen.getByPlaceholderText("value")).toHaveValue(1);
    });
  });

  //   ... userPanel with rootStore bound test

  function renderComponent() {
    render(
      <Provider store={rootStore}>
        <App />
      </Provider>
    );
  }
});

import { fireEvent, render, screen } from "@testing-library/react";
import { RequestStatus } from "../store/user/userSlice";
import { UserPanel } from "./userPanel";

describe("userPanel", () => {
  const reloadUserMock = jest.fn();

  it("should display loader if request is loading", () => {
    render(
      <UserPanel
        reloadUser={reloadUserMock}
        requestStatus={withPendingRequestStatus()}
      />
    );

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("should display User not fetched yet message if user was not fetched", () => {
    render(
      <UserPanel
        reloadUser={reloadUserMock}
        requestStatus={withClearRequest()}
      />
    );

    expect(screen.getByText(/User not fetched yet/)).toBeInTheDocument();
  });

  it("should show error if any occurred during request", () => {
    render(
      <UserPanel
        reloadUser={reloadUserMock}
        requestStatus={withErroredRequestStatus("error!!!")}
      />
    );

    expect(screen.getByText(/error!!!/)).toBeInTheDocument();
  });

  it("should call reload user when button is clicked", () => {
    render(
      <UserPanel
        reloadUser={reloadUserMock}
        requestStatus={withClearRequest()}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(reloadUserMock).toHaveBeenCalled();
  });
});

function withPendingRequestStatus(): RequestStatus {
  return {
    isPending: true,
    isDone: false,
    error: "",
  };
}

function withClearRequest(): RequestStatus {
  return {
    isPending: false,
    isDone: false,
    error: "",
  };
}

function withErroredRequestStatus(error: string): RequestStatus {
  return {
    isPending: false,
    isDone: false,
    error,
  };
}

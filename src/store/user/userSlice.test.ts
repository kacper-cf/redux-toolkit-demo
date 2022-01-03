import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, rootStore } from "../store";
import { fetchUser } from "./user";
import userSlice, { UserState } from "./userSlice";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("store - user - userSlice", () => {
  let getUser: () => UserState;
  let dispatch: AppDispatch;

  beforeEach(() => {
    const fakeStore = configureStore({ reducer: userSlice });
    getUser = fakeStore.getState;
    dispatch = fakeStore.dispatch;
  });

  afterEach(() => {});

  it("should store no user initially and have fresh request status", () => {
    expect(getUser()).toEqual({
      user: null,
      fetchUserRequest: {
        isDone: false,
        isPending: false,
        error: "",
      },
    });
  });

  it("should change request status to pending, when fetch user request is pending", () => {
    dispatch(fetchUser());
    expect(getUser().fetchUserRequest).toEqual({
      isDone: false,
      isPending: true,
      error: "",
    });
  });

  it("should change user and request status to done and not pending when fetch user request finishes", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: [{ name: "Kacper Dąbrowski" }],
    });

    await dispatch(fetchUser());

    expect(getUser().user).toEqual({ name: "Kacper", surname: "Dąbrowski" });
    expect(getUser().fetchUserRequest).toEqual({
      isDone: true,
      isPending: false,
      error: "",
    });
  });

  it("should pass error message properly if any", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Error!"));

    await dispatch(fetchUser());

    expect(getUser().user).toEqual(null);
    expect(getUser().fetchUserRequest.error).toEqual("Error!");
  });

  it("should fallback to default error message if none were returned", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Error!"));

    await dispatch(fetchUser());

    expect(getUser().user).toEqual(null);
    expect(getUser().fetchUserRequest.error).toEqual("Error!");
  });
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserModel } from "./userSlice";

export const fetchUser = createAsyncThunk<UserModel>(
  "user/fetch-user",
  async () => {
    const response = await axios.get("https://api.namefake.com/");

    const user = response.data;

    const [name, surname] = user.name.split(" ");

    return {
      name,
      surname,
    };
  }
);

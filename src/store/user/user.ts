import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserModel } from "./userSlice";

export const fetchUser = createAsyncThunk<UserModel>(
  "user/fetch-user",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    const [user] = response.data;

    const [name, surname] = user.name.split(" ");

    return {
      name,
      surname,
    };
  }
);

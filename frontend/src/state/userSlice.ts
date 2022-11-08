import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store"

interface IUser {
  name: string;
  email: string;
  token: string;
  id: number
}

const initialState: IUser = { name: "", email: "", token: "", id: 0 };

type UserCreateProps = {
  email: string;
  password: string;
  name: string;
};

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (registerData: UserCreateProps, thunkApi) => {
    try {
      const data = await axios.post(
        "http://localhost:8000/user/create",
        registerData
      );
      console.log(data);

      return data.data.data;
    } catch {
      return thunkApi.rejectWithValue(initialState);
    }
  }
);

type UserAuthProps = {
    email: string;
    password: string;
  };

export const userAuth = createAsyncThunk("user/userAuth", async (authData: UserAuthProps, thunkApi) => {
    try {
        const data = await axios.post(
          "http://localhost:8000/user/auth",
          authData
        );
        console.log(data);
  
        return data.data.data;
      } catch {
        return thunkApi.rejectWithValue(initialState);
      }
})

type AddFilmProps = {
  filmId: string;
};

export const addUserFilm = createAsyncThunk("user/addUserFilm", async (addFilmData: AddFilmProps, thunkApi) => {
  const user = thunkApi.getState() as RootState

  try {
    const data = await axios.post(
      "http://localhost:8000/user/add-film",
      {filmId: addFilmData.filmId, userId: user.user.id},
      {headers: {"authorization": user.user.token }}
    );
    console.log(data);
  } catch {
    // return thunkApi.rejectWithValue(initialState);
  }
})


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    });

    builder.addCase(userAuth.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.token = action.payload.token;
      });
  },
});

export default userSlice.reducer;

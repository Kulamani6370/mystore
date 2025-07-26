import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const initialState = {
  theme: getThemeFromLocalStorage(),
  user: getUserFromLocalStorage(),
  isLoading: false,
};

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (userCredentials, thunkAPI) => {
    try {
      const response = await customFetch.post("/user/login", userCredentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message =
        error.message?.data?.message || "Login failed. Try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await customFetch.post("/user/register", userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed. Try again.";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.user = null;
      //   localStorage.clear();
      localStorage.removeItem("user");
      toast.success("logged out successfully");
    },
    toggleTheme: (state) => {
      const { dracula, winter } = themes;
      state.theme = state.theme === dracula ? winter : dracula;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = { ...action.payload.user, token: action.payload.jwt };
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(`Welcome back, ${user.name}`);
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Registered successfully. Please login.");
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;

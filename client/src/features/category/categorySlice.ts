import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios, { AxiosError } from "axios";
import { MAIN_URL } from "../../constants";

const initialState: any = { data: [] };

export const fetchCategoryData = createAsyncThunk(
  "user/category",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${MAIN_URL}/api/v1/categories`);

      console.log("response.data", response.data);

      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      console.log("rejected");

      console.log(err.response?.data);

      return rejectWithValue(err.response?.data);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryData.fulfilled, (state, payload) => {
      state.data = payload.payload;
    });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getUserCategory = (state: RootState) => state.category;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default categorySlice.reducer;
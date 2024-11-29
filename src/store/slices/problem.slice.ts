import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Problems {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  problems: Problems[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  problems: null,
  loading: false,
  error: null,
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk<Problems[], void, { rejectValue: string }>(
  'user/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5500/api/v1/problems');
      console.log("response",response)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
  }
);

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.problems = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default userSlice.reducer;

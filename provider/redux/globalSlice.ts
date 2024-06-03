import { getCurrentUser } from "@/lib/appwrite";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Document = {
  // Add the properties of the Document object here
  $id: string;
  $createdAt: string;
  // Add other properties as needed
};

type GlobalState = {
  isLogged: boolean;
  user: Document | null; // Update the type of user to allow null or Document
  isLoading: boolean;
  bookmarkedPosts: never[];
  likedPosts: never[];
};

const initialState: GlobalState = {
  isLogged: false,
  user: null,
  isLoading: true,
  bookmarkedPosts: [],
  likedPosts: [],
};

export const fetchUser = createAsyncThunk("global/fetchUser", async () => {
  const response = await getCurrentUser();
  return response;
});

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setBookmarkedPosts: (state, action) => {
      state.bookmarkedPosts = action.payload;
    },
    setLikedPosts: (state, action) => {
      state.likedPosts = action.payload;
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogged = Boolean(action.payload);
        state.isLoading = false;
      });
  },
});

export const {
  setIsLogged,
  setUser,
  setIsLoading,
  setBookmarkedPosts,
  setLikedPosts,
  
} = globalSlice.actions;
export default globalSlice.reducer;

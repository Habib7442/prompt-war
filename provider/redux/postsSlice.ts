import { getSinglePost } from "@/lib/appwrite";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Post {
  $id: string;
  likes: number;
  prompt: string;
  name: string;
  thumbnail: string;
  creator: {
    username: string;
  };
  username: string;
  likesCount: number;
  title: string;
}

interface PostsState {
  posts: Post[];
  singlePost: Post | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  singlePost: null,
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllDocuments`
  );
  return response.data.documents;
});

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postId: string) => {
    const response = await getSinglePost(postId);
    const post: Post = {
      $id: response.$id,
      likes: response.likes.length,
      prompt: response.prompt,
      name: response.name,
      thumbnail: response.thumbnail,
      creator: {
        username: response.creator.username,
      },
      username: response.username,
      likesCount: response.likesCount,
      title: response.title,
    };
    return post;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateLikes: (state, action: PayloadAction<{ postId: string }>) => {
      const post = state.posts.find(
        (post) => post.$id === action.payload.postId
      );
      if (post) {
        post.likes = (post.likes || 0) + 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || null;
      })
      .addCase(fetchSinglePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singlePost = action.payload;
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || null;
      });
  },
});

export const { updateLikes } = postsSlice.actions;

export default postsSlice.reducer;

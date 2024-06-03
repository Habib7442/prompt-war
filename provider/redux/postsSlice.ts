import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Post {
  $id: string;
  imageUrl: string;
  likes: number;
  prompt: string;
  name: string;
}

interface PostsState {
  posts: Post[];
  singlePost: Post | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  singlePost: null,
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllDocuments`);
    return response.data.documents;
  }
);

export const fetchSinglePost = createAsyncThunk(
  'post/fetchSinglePost',
  async (postId: string) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSingleDocument?id=${postId}`
    );
    return response.data;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updateLikes: (state, action: PayloadAction<{ postId: string }>) => {
      const post = state.posts.find(post => post.$id === action.payload.postId);
      if (post) {
        post.likes = (post.likes || 0) + 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || null;
      })
      .addCase(fetchSinglePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singlePost = action.payload;
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || null;
      });
  },
});

export const { updateLikes } = postsSlice.actions;

export default postsSlice.reducer;

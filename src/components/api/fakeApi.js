import { FAKE_MOVIES } from "../data/fakeMovies";

export const fakeApi = {
  fetchMovies: async (delay = 400) => {
    // simulate network delay
    await new Promise((r) => setTimeout(r, delay));
    // return a shallow copy
    return [...FAKE_MOVIES];
  },
  fetchTotalUsers: async (delay = 300) => {
    await new Promise((r) => setTimeout(r, delay));
    // return a fake users count
    return { totalUsers: 1245 };
  },
};
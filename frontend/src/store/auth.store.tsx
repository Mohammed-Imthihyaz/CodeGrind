import axios from 'axios';
import { create } from 'zustand';

const PORT = import.meta.env.VITE_SERVER_PORT ;

type Store = {
  user: any | null;
  isAuthenticated: boolean;
  error: any | null;
  isLoading: boolean;
  isSubscriber: boolean;
  isCheckingAuth: boolean;
  message: string | null;
  allQuestions:any;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  forgetpassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string,confirmPassword:string) => Promise<boolean>;
  subscribe:()=>Promise<void>;
  getAllQuestions:()=>Promise<void>;
};

export const authStore = create<Store>()((set) => ({
  user: null,
  isAuthenticated: false,
  isSubscriber: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  allQuestions:[],

  signup: async (email, password, name) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.post(`${PORT}auth/signup`, {
        email,
        password,
        name,
      }, { withCredentials: true });

      set({
        user: res.data.data,
        isAuthenticated: true,
        isSubscriber: res.data.data.isSubscribed,
        isLoading: false,
        error: null,
        message: "Signup successful",
      });
    } catch (err: any) {
      set({ isLoading: false, error: err.response?.data?.message || "Signup failed" });
    }
  },

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      console.log(PORT);
      const res = await axios.post(`${PORT}auth/login`, { email, password }, { withCredentials: true });
      set({
        user: res.data.user,
        isAuthenticated: true,
        isSubscriber: res.data.user.isSubscribed,
        isLoading: false,
        error: null,
        message: "Login successful",
      });
    } catch (err: any) {
      console.log(err);
      set({ isLoading: false, error: err.response?.data?.message || "Login failed" });
    }
  },

  logout: async () => {
    try {
      await axios.post(`${PORT}auth/logout`, {}, { withCredentials: true });
      set({
        user: null,
        isAuthenticated: false,
        isSubscriber: false,
        message: "Logged out",
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Logout failed" });
    }
  },

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axios.get(`${PORT}auth/check-auth`, { withCredentials: true });
      set({
        user: res.data.user,
        isAuthenticated: true,
        isSubscriber: res.data.user.isSubscribed,
        isCheckingAuth: false,
      });
    } catch (err: any) {
      set({
        user: null,
        isAuthenticated: false,
        isSubscriber: false,
        isCheckingAuth: false,
        error: err.response?.data?.message || "Auth check failed",
      });
    }
  },

  forgetpassword: async (email) => {
    try {
      set({ isLoading: true });
      await axios.post(`${PORT}auth/forgetPassword`, { email });
      set({ isLoading: false, message: "Reset email sent" });
    } catch (err: any) {
      set({ isLoading: false, error: err.response?.data?.message || "Failed to send reset email" });
    }
  },

  resetPassword: async (token, password, confirmPassword) => {
    try {
      set({ isLoading: true });
      const res = await axios.post(
        `${PORT}auth/reset-password/${token}`, 
        { password, confirmPassword } 
      );
      set({ 
        isLoading: false, 
        message: "Password reset successful",
        error: null
      });
      return true; 
    } catch (err: any) {
      set({ 
        isLoading: false, 
        error: err.response?.data?.message || "Reset failed" 
      });
      return false;
    }
  },
  subscribe: async () => {
    try {
      set({ isLoading: true });
      const res = await axios.post(`${PORT}auth/subscriber`, {}, { withCredentials: true });
      set((state) => ({
        isSubscriber: true,
        user: { ...state.user, isSubscribed: true },
        isLoading: false,
        message: res.data.message,
      }));
    } catch (err: any) {
      set({ isLoading: false, error: err.response?.data?.message || "Subscription failed" });
    }
  },  
  getAllQuestions: async () => {
    try {
      set({ isLoading: true });
      const res = await axios.get(`${PORT}auth/getquestions`);
      console.log("Questions data:", res.data.data);
      if (res.data.success) {
        set({ 
          allQuestions: res.data.data, 
          isLoading: false,
          error: null
        });
      } else {
        set({ 
          isLoading: false,
          error: "Failed to load questions" 
        });
      }
    } catch (error: any) {
      console.error("Error fetching questions:", error);
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || "Fetching failed" 
      });
    }
  }
}));

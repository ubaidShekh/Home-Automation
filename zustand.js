import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStore = create((set) => ({
  token: true,
  setToken: () => {
    set({ token: false });
  },
}));

export default useStore;

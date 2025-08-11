// import { create } from "zustand";
// // ya object ha is liye is ko hum key value dy gy

// const appStore = (set) => ({
//   userId: "12345",
//   setUserId: (id) => {
//     set({ userId: id });
//   },
// });

// const useAppStore = create(appStore);

// export default useAppStore;

// import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

// const useAppStore = create()(
//   persist(
//     userId: "12345",
//   setUserId: (id) => {
//     set({ userId: id });
//   },
//   ),
// )

// export default useAppStore;


import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create()(
  persist(
    (set) => ({
      userId: "",
      setUserId: (id) => set(() => ({ userId: id })),
    }),
    {
      name: "app-storage",
    }
  )
);
export default useAppStore;
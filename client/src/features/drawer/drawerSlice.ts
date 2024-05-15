import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/appStore";

interface DrawerState {
  isOpen: boolean;
}

const initialState: DrawerState = {
  isOpen: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isOpen = true;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export const selectDrawerStatus = (state: RootState) => state.drawer.isOpen;
export default drawerSlice.reducer;

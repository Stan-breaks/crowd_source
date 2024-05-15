import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@/store/appStore';

interface UserState {
  userName: string;
}

const initialState: UserState = {
  userName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    deleteUser: (state) => {
      state.userName = '';
    }
  },
});

export const {setUserName, deleteUser} = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.userName;

export default userSlice.reducer;

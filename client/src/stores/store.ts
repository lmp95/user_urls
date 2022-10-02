import { configureStore } from '@reduxjs/toolkit';
import urlReducer from '../reducers/url.reducer';
import userReducer from '../reducers/user.reducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    url: urlReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
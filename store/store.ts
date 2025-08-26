import { configureStore } from '@reduxjs/toolkit';

// Simple example reducer - you can replace this with your actual slices
const exampleReducer = (state = { count: 0 }, action: any) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: { 
    example: exampleReducer,
  },
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';

// Example reducer - replace with your actual slices
interface ExampleState {
  count: number;
}

const initialState: ExampleState = { count: 0 };

const exampleReducer = (state = initialState, action: { type: string }) => {
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

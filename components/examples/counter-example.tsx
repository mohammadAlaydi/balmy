'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';

export default function CounterExample() {
  const count = useAppSelector((state) => state.example.count);
  const dispatch = useAppDispatch();

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Redux Counter Example</h3>
      <div className="flex items-center gap-4">
        <Button onClick={decrement} variant="outline">
          -
        </Button>
        <span className="text-2xl font-bold">{count}</span>
        <Button onClick={increment}>
          +
        </Button>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        This demonstrates Redux Toolkit working in a Client Component
      </p>
    </div>
  );
}

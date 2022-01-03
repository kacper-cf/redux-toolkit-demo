import { FC } from "react";

interface CounterProps {
  incrementByOne: () => void;
  decrementByOne: () => void;
  value: number;
}
export const Counter: FC<CounterProps> = ({
  incrementByOne,
  decrementByOne,
  value,
}) => {
  return (
    <div>
      <button onClick={incrementByOne}>+1</button>
      <button onClick={decrementByOne}>-1</button>
      <input type="number" value={value} placeholder="value" readOnly />
    </div>
  );
};

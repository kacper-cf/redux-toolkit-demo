import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { decrement, increment } from './store/counter/counterSlice';
import { AppDispatch, AppState } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: AppState) => state.counter)

  return (
    <div className="App">
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <div>{state.value}</div>
    </div>
  );
}

export default App;

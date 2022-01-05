import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Counter } from "./counter/counter";
import { decrement, increment } from "./store/counter/counterSlice";
import { AppDispatch, AppState } from "./store/store";
import { authorize } from "./store/user/user";
import { UserPanel } from "./userPanel/userPanel";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const counter = useSelector((state: AppState) => state.counter);
  const { user, fetchUserRequest } = useSelector(
    (state: AppState) => state.user
  );

  const reloadUser = useCallback(async () => {
    dispatch(authorize());
  }, []);

  const incrementByOne = useCallback(() => dispatch(increment()), []);
  const decrementByOne = useCallback(() => dispatch(decrement()), []);

  return (
    <div className="App">
      <Counter
        incrementByOne={incrementByOne}
        decrementByOne={decrementByOne}
        value={counter.value}
      />
      <UserPanel
        requestStatus={fetchUserRequest}
        name={user?.name}
        surname={user?.surname}
        reloadUser={reloadUser}
      />
    </div>
  );
}

export default App;

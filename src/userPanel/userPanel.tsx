import { FC } from "react";
import { RequestStatus } from "../store/user/userSlice";

interface UserPanelProps {
  name?: string;
  surname?: string;
  reloadUser: () => Promise<void>;
  requestStatus: RequestStatus;
}

export const UserPanel: FC<UserPanelProps> = ({
  name,
  surname,
  reloadUser,
  requestStatus,
}) => {
  if (requestStatus.isPending) {
    return <div>Loading</div>;
  }

  if (requestStatus.error) {
    return <div>Fetch failed: {requestStatus.error}</div>;
  }

  if (!name || !surname) {
    return (
      <div>
        User not fetched yet <button onClick={reloadUser}>Reload</button>;
      </div>
    );
  }

  return (
    <div>
      <p>name: {name}</p>
      <p>surname: {surname}</p>
      <button onClick={reloadUser}>Reload</button>
    </div>
  );
};

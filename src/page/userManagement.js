import React from "react";
import Drawer from "../container/drawerAppbar";
export default function UserManagement() {
  return (
    <React.Fragment>
      <Drawer menu={"Member Management"} page={"UserManagement"} />
    </React.Fragment>
  );
}

import React from 'react'
import Drawer from '../container/drawerAppbar'
export default function UserManagement() {
  return (
    <React.Fragment>
      <Drawer menu={'Transaction Log'} page={'transactionLog'} />
    </React.Fragment>
  )
}

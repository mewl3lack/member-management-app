import { useState } from "react";

export const useDialog = (props, ref) => {
  const [open, setOpen] = useState(false);
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  return [open, openDialog, closeDialog];
};

export default useDialog;

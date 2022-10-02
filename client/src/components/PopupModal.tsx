import React, { MouseEventHandler } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Breakpoint, IconButton } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function PopupModal({
  open,
  size,
  title,
  body,
  onOk,
  onCancel,
  isFooter = true,
}: {
  open: boolean;
  size: Breakpoint;
  title: string;
  body: string | React.ReactElement;
  onOk: MouseEventHandler | undefined;
  onCancel: MouseEventHandler | undefined;
  isFooter?: boolean;
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      disableEscapeKeyDown
      keepMounted
      fullWidth
      maxWidth={size}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{body}</DialogContent>
      {isFooter && (
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onOk}>Confirm</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default PopupModal;

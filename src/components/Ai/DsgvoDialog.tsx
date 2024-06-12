import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

export default function DsgvoDialog(props: SimpleDialogProps) {
    const {  open } = props;

 


  return (
    <Dialog open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      
    </Dialog>
  );
}

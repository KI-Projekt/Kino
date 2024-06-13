import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, Checkbox, DialogActions, DialogContent, DialogContentText, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

export default function DsgvoDialog(props: SimpleDialogProps) {
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();
  const { onClose, open } = props;
  const handleClose = () => {
    onClose('cancel');
    navigate('/');
  };

  const handleSubmit = () => {
    //request for accept dsgvo

    onClose('accept');
  };


  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle><h1>Do you want to use our AI?</h1></DialogTitle>
      <DialogContent>
        <DialogContentText>
            <h4>Declaration of consent to the processing of personal data in accordance with the GDPR</h4>
            <p>As part of our activities, we require your consent to process your personal data. The protection of your data is very important to us and we want to ensure that you are fully informed about the use of your data.</p>
            <h5>Important! This is a student project of an AI lecture at the DHBW Mannheim (Germany)! This is not a website intended for public use, but serves exclusively for learning purposes!</h5>
            <p>1. The person responsible for data processing is:</p>
            <p>Marcel Bulling<br/>s212532@student.dhbw-mannheim.de</p>
            <p>2. Purpose of data processing:</p>
            <p>We would like to process your personal data for the following purposes:<br/> The data collected is used to further train the AI model and thereby improve and expand it. The data is only used on our own servers and is not passed on to third parties.</p>
            <p>3. Type of data processed:</p>
            <p>The following personal data is processed:<br/>The screenings attended and the ratings of films given by the user are used for training</p>
            <p>4. Legal basis</p>
            <p>Your personal data is processed on the basis of your consent in accordance with Art. 6 para. 1 lit. a GDPR.</p>
            <p>5. Revocation of consent</p>
            <p>You have the right to revoke your consent at any time without giving reasons. The revocation of consent does not affect the legality of the processing carried out until the revocation.</p>
            <p>6. Your rights</p>
            <p>You have the right to information about the personal data processed by us as well as to correction, deletion and restriction of the processing of this data. In addition, you have the right to data portability and the right to lodge a complaint with a supervisory authority.</p>
            <p>7. Contact for data protection inquiries</p>
            <p>For questions and concerns regarding data protection, please contact our data protection officer:<br/>Marcel Bulling<br/>s212532@student.dhbw-mannheim.de</p>
            
        </DialogContentText>
        <FormControlLabel control={<Checkbox  required onChange={()=>setChecked(!checked)}/>} label="*I have taken note of the above information and consent to the processing of my personal data for the purposes stated."  />
        
        
      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!checked} type="submit" onClick={handleSubmit}>Accept</Button>
        </DialogActions>
      
    </Dialog>
  );
}

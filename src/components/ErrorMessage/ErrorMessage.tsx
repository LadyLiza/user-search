import React from 'react';
import { Alert } from '@mui/material';
import './ErrorMessage.scss';

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => (
  <Alert severity="error" className="error-message">
    {message}
  </Alert>
);

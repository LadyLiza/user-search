import React from 'react';
import { Alert } from '@mui/material';
import './ErrorMessage.scss';
import { AppError } from '@/utils/AppError';

interface Props {
  error: AppError;
}

export const ErrorMessage: React.FC<Props> = ({ error }) => (
  <Alert severity="error" className="error-message">
    <div>
      <strong>{error.main}</strong>
      {error.details && (
        <div className="error-message__details">{error.details}</div>
      )}
    </div>
  </Alert>
);
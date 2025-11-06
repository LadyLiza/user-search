import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { User } from '../../../../types/User';
import './UserCard.scss';

interface Props {
  user: User;
}

export const UserCard: React.FC<Props> = ({ user }) => (
  <Card className="user-card" variant="outlined">
    <CardContent>
      <Typography variant="h6" className="user-card__name">
        {user.name}
      </Typography>

      <Typography variant="body2" className="user-card__info">
        <strong>Email:</strong> {user.email}
      </Typography>
      <Typography variant="body2" className="user-card__info">
        <strong>Phone:</strong> {user.phone}
      </Typography>
      <Typography variant="body2" className="user-card__info">
        <strong>City:</strong> {user.address.city}
      </Typography>
      <Typography variant="body2" className="user-card__info">
        <strong>Company:</strong> {user.company.name}
      </Typography>
    </CardContent>
  </Card>
);

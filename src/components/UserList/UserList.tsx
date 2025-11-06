import React from 'react';
import { User } from '../../types/User';
import { UserCard } from './components/UserCard/UserCard';
import './UserList.scss';

interface Props {
  users: User[];
}

export const UserList: React.FC<Props> = ({ users }) => (
  <div className="user-list">
    {users.map((user) => (
      <div key={user.id} className="user-list__item">
        <UserCard user={user} />
      </div>
    ))}
  </div>
);

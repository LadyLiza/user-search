import React from 'react';
import type { User } from '@/types/user';
import { UserCard } from './components/UserCard/UserCard';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import './UserList.scss';

const MotionWrapper = motion.div;
const MotionItem = motion.div;

interface Props {
  users: User[];
}

export const UserList: React.FC<Props> = ({ users }) => (
  <LayoutGroup>
    <MotionWrapper
      className="user-list"
      layout
       transition={{
        layout: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
      }}
    >
      <AnimatePresence>
        {users.map((user) => (
          <MotionItem
            key={user.id}
            className="user-list__item"
            layout="position"
            transition={{ layout: { duration: 0.5, ease: 'easeInOut' } }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <UserCard user={user} />
          </MotionItem>
        ))}
      </AnimatePresence>
    </MotionWrapper>
  </LayoutGroup>
);

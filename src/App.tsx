import React, { useEffect, useState, useMemo } from 'react';
import { fetchUsers } from './API';
import { User } from './types/User';
import { Filter } from './components/Filter/Filter';
import { UserList } from './components/UserList/UserList';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { CircularProgress, Container, Box } from '@mui/material';
import { motion } from 'framer-motion';
import './App.scss';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchUsers();
      setUsers(data);
      setFiltered(data);
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const cities = useMemo(
    () => Array.from(new Set(users.map((u) => u.address?.city).filter(Boolean))),
    [users]
  );

  useEffect(() => {
    let result = users;

    if (search) {
      result = result.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (city) {
      result = result.filter((u) => u.address?.city === city);
    }

    setFiltered(result);
  }, [search, city, users]);

  return (
    <Container className="app-container">
      {error ? (
        <div className="error-retry">
          <ErrorMessage message={error} />
          <button className="retry-button" onClick={loadUsers}>
            Try again
          </button>
        </div>
      ) : (
        <>
          <Filter
            search={search}
            city={city}
            cities={cities}
            onSearchChange={setSearch}
            onCityChange={setCity}
          />

          {loading ? (
            <Box className="app-loader">
              <CircularProgress />
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <UserList users={filtered} />
            </motion.div>
          )}
        </>
      )}
    </Container>
  );
};

import React, { useEffect, useState } from "react";
import { fetchUsers } from "./api";
import { User } from "./types/user";
import { Filter } from "./components/Filter/Filter";
import { UserList } from "./components/UserList/UserList";
import { ErrorMessage } from "./components/ErrorMessage/ErrorMessage";
import { AppError } from "@/utils/AppError";
import { CircularProgress, Container, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "./App.scss";

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchUsers();
      setUsers(data);

      const uniqueCities = Array.from(
        new Set(data.map((u) => u.address.city).filter(Boolean))
      );
      setCities(uniqueCities);
    } catch (err) {
      if (err instanceof AppError) {
        setError(err);
      } else if (err instanceof Error) {
        setError(new AppError(err.message));
      } else {
        setError(new AppError("Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const name = selectedName.trim().toLowerCase();

  const filteredUsers = users.filter((u) => {
    const matchesName = !name || u.name.toLowerCase().includes(name);
    const matchesCity = !selectedCity || u.address.city === selectedCity;
    return matchesName && matchesCity;
  });

  if (error) {
    return (
      <Container className="app">
        <div className="app__error-retry">
          <ErrorMessage error={error} />
          <button className="app__retry-button" onClick={loadUsers}>
            Try again
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="app">
      {loading ? (
        <Box className="app__loader">
          <CircularProgress
            size={100}
            thickness={4}
            sx={{
              color: "#f5f5f5",
              "& .MuiCircularProgress-track": {
                color: "rgba(255, 255, 255, 0.1)",
              },
            }}
          />
          <Typography className="app__loader-text">Loading users...</Typography>
        </Box>
      ) : (
        <>
          <Filter
            cities={cities}
            onNameChange={setSelectedName}
            onCityChange={setSelectedCity}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredUsers.length > 0 ? (
              <UserList users={filteredUsers} />
            ) : (
              <div className="app__no-results">
                No users found for your search
              </div>
            )}
          </motion.div>
        </>
      )}
    </Container>
  );
};

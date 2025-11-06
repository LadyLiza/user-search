import React from 'react';
import { TextField, MenuItem, Paper, Box } from '@mui/material';
import './Filter.scss';

interface Props {
  search: string;
  city: string;
  cities: string[];
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
}

export const Filter: React.FC<Props> = ({
  search,
  city,
  cities,
  onSearchChange,
  onCityChange,
}) => {
  return (
    <Paper elevation={3} className="filter">
      <Box className="filter__inputs">
        <TextField
          placeholder="Search by name"
          variant="outlined"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="filter__input"
          fullWidth
        />

        <TextField
          select
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          className="filter__input"
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">All cities</MenuItem>
          {cities.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Paper>
  );
};

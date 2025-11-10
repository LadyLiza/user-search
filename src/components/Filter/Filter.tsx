import React from 'react';
import {
  TextField,
  MenuItem,
  Paper,
  Box,
  Select,
  SelectChangeEvent,
  FormControl,
} from '@mui/material';
import './Filter.scss';

interface Props {
  cities: string[];
  selectedName: string;
  selectedCity: string;
  onNameChange: (value: string) => void;
  onCityChange: (value: string) => void;
}

export const Filter: React.FC<Props> = ({ cities, selectedName, selectedCity, onNameChange, onCityChange }) => {
  return (
    <Paper elevation={3} className="filter">
      <Box className="filter__inputs">
        <TextField
          placeholder="Search by name"
          variant="outlined"
          value={selectedName}
          onChange={(e) => onNameChange(e.target.value)}
          className="filter__field"
          fullWidth
          size="medium"
        />

        <FormControl fullWidth className="filter__field">
          <Select
            onChange={(e: SelectChangeEvent) => onCityChange(e.target.value)}
            displayEmpty
            value={selectedCity}
            renderValue={(value) =>
              value ? (
                value
              ) : (
                <span className="filter__placeholder">All cities</span>
              )
            }
            variant="outlined"
            size="medium"
          >
            <MenuItem value="">All cities</MenuItem>
            {cities.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

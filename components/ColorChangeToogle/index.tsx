'use client';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';

interface ColorChangeToggleProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const ColorChangeToggle: React.FC<ColorChangeToggleProps> = ({
  toggleDarkMode,
  darkMode
}) => {
  return (
    <IconButton onClick={toggleDarkMode} color='inherit'>
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ColorChangeToggle;

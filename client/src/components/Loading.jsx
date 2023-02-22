import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material';

export default function Loading() {
  const theme = useTheme()
  return (
    <Box sx={{ width: '100%', position: 'absolute' }}>
      <LinearProgress sx={{ bgcolor: theme.palette.secondary[500] }} />
    </Box>
  );
}
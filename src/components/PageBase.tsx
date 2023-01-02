import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { Navbar } from './navbar/Navbar';

export const PageBase = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar />
      <Box component={'main'}>{children}</Box>
    </Box>
  );
};

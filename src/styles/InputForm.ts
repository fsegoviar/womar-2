import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const InputForm = styled(TextField)<{ error?: boolean }>`
  width: 250px;
  font-size: 16px;
  font-family: 'font-medium' !important;
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #0bafdd;
      border-radius: 10px;
    }
    &:hover fieldset {
      border-color: #0bafdd;
    }
    &.Mui-focused fieldset {
      border-color: #0bafdd;
    }
  }
`;

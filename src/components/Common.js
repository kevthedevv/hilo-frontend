import styled from 'styled-components';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

// Reusable styled button
const StyledButton = styled(Button)`
  background-color: ${(props) => props.bgcolor || 'blue'};
  color: white;
  padding: 12px 15px !important;
  margin: 10px;
  border-radius: 5px;
  text-transform: none !important;
  &:hover {
    background-color: ${(props) => props.hovercolor || 'darkblue'};
  }
`;

const StyledTextField = styled(TextField)`
     margin-bottom: 10px; // Add margin at the bottom
     background-color: #1C2E4A; // Set background color to white

     & .MuiInputBase-input {
     color: #ccc; // Set input text color to black
     }

     & .MuiInputLabel-root {
     color: #ccc; // Set label color to black
     font-size: 12px; 
     }

     & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
     border-color: #23395D; // Optional: Set border color
     }

     &:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
     border-color: #23395D; // Optional: Set border color on hover
     }

     &.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
     border-color: #23395D; // Optional: Set border color when focused
     }
     & .MuiInputBase-input::placeholder {
    color: #ccc; // Set placeholder text color
    font-size: 7px; // Change this value to adjust the placeholder size
  }
     `;

export { StyledButton, StyledTextField };
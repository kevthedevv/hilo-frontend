import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import { StyledButton, StyledTextField } from '../components/Common';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Logo from '../images/logo.png'
import LoginImage from '../images/login_image.jpg'
import Header from '../components/Header';
import { useLogin } from '../hooks/useLogin';
import toast, { Toaster } from 'react-hot-toast';



const Main = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
`;
const LeftContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;
const Image = styled.img`
  width: 100%; /* Adjust the size as needed */
  height: auto;
`;
const LoginContainer = styled.div`
    height: 400px;
    width: 400px;
    display: flex;
    margin: 15px;
    justify-content: center;
    position: absolute;
    flex-direction: column;
  
`
const LogoContainer = styled.img`
     width: 120px;
     padding-bottom: 50px;
`
const TermsCheckbox = styled(FormControlLabel)`
    margin-top: 20px; // Optional: Adds space above the checkbox
    & .MuiFormControlLabel-label {
        color: #ccc; // Change the label color if needed
        font-size: 12px; // Change the font size here
        font-weight: normal; // Optional: Change the font weight if desired
    }
`;







const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);

  const { login, error, isLoading } = useLogin();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      console.log("success")

    } catch (error) {
      console.log("error")
      // Handle error
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  }

  const [isChecked, setIsChecked] = useState(false); // State to manage checkbox

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <Main>

      <LeftContainer>
        <Image src={LoginImage} alt='Login Image' />

      </LeftContainer>

      <RightContainer>

        <LoginContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ fontStyle: 'italic', paddingBottom: '30px' }}>Login</h2>
          </div>

          <StyledTextField
            required
            id="outlined"
            label="Username"
            style={{ marginBottom: "10px" }}
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{
              autoComplete: "off", // Disable autocomplete
            }}
          />
          <StyledTextField
            required
            id="outlined"
            type="password"
            label="Password"
            style={{ marginBottom: "10px" }}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            inputProps={{
              autoComplete: "off", // Disable autocomplete
            }}
          />
          <StyledButton style={{ marginTop: "20px" }} onClick={handleLogin}
            disabled={loading} variant='contained'>
            {loading ? 'Logging in. Please wait...' : 'Login'}

          </StyledButton>
          <Toaster
          />
          <Header />
        </LoginContainer>
      </RightContainer>

    </Main>
  )
}

export default Login
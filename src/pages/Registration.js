import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import { StyledButton, StyledTextField } from '../components/Common';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Logo from '../images/logo.png'
import Header from '../components/Header';
import { useSignup } from '../hooks/useSignup';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




const Container = styled.div`
    height: 400px;
    width: 400px;
    display: flex;
    margin: 15px;
    justify-content: center;
    position: absolute;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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





const Registration = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      await signup(username, password, email)
      setUsername('')
      setPassword('')
      setEmail('')
      setTimeout(() => {
        navigate('/login'); // Adjust the path as needed
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch {
      console.log("error")
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }


  }

  const [isChecked, setIsChecked] = useState(false); // State to manage checkbox

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <>
      <Header />
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ fontStyle: 'italic', paddingBottom: '30px' }}>Registration</h2>
          <LogoContainer src={Logo}></LogoContainer>
        </div>

        <StyledTextField
          required
          id="outlined"
          label="Username"
          style={{ marginBottom: "10px" }}
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledTextField
          required
          id="outlined"
          label="Password"
          style={{ marginBottom: "10px" }}
          fullWidth
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <StyledTextField
          required
          id="outlined"
          label="Email"
          style={{ marginBottom: "10px" }}
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TermsCheckbox
          control={
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              required
            />
          }
          label="I agree to the terms and conditions"
        />
        <StyledButton style={{ marginTop: "20px" }} variant='contained'
          onClick={handleSignup}
          disabled={loading}>
          {loading ? 'Creating. Please wait...' : 'Create Account'}


        </StyledButton>

      </Container>
      <Toaster
      />
    </>
  )
}

export default Registration
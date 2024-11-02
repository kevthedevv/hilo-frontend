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
import Wallpaper from '../images/wallpaper.jpg'
import MainHeader from '../components/MainHeader';
import Winner from '../images/winner.jpg'
import Hilo from '../images/hilo.jpg'


const Background = styled.div`
    height: 2000px;
    width: 100%;
    position: relative;
`
const BackgroundImage = styled.img`
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    object-fit: cover; /* Ensures the image covers the entire background */
    z-index: -1; /* Send the background behind the header */
     position: absolute;
`
const GamesContainer = styled.div`
  display: flex;
 gap: 20px;
`;
const GameIconContainer = styled.div`
     height: 200px;
     width: 400px;
     border-radius: 30px;
     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
     overflow: hidden; /* Ensure the image doesn't overflow the container */
    position: relative; /* For potential overlay effects */
`
const GameIcon = styled.img`
  width: 100%; /* Adjust the size as needed */
  height: auto;
  border-radius: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Add transition for smooth animation */
  &:hover {
        transform: scale(1.05); /* Scale the image slightly on hover */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Optional: change box-shadow on hover */
    }
`;

const Content = styled.div`
    position: relative; /* Positioning to stack on top of the background */
    z-index: 1; /* Higher z-index to ensure it appears on top */
    width: 80%;
    margin: auto;
    margin-top: 50px; /* Add some margin if needed */
 
`;

const Dashboard = () => {

     return (
          <Background>
               <MainHeader />
               <BackgroundImage src={Wallpaper} alt='Background'></BackgroundImage> {/* Additional content to ensure page scrolls */}
               <Content>
                    <h2 style={{ marginBottom: "30px" }}>Latest Games</h2>
                    <hr style={{ marginBottom: "30px", borderColor: "gray" }} />
                    <GamesContainer>
                         <GameIconContainer>
                              <GameIcon src={Hilo} alt='Hilo Icon' />
                         </GameIconContainer>
                         <GameIconContainer>
                              <GameIcon src={Winner} alt='Hilo Icon' />
                         </GameIconContainer>
                    </GamesContainer>
               </Content>

          </Background>
     )
}

export default Dashboard
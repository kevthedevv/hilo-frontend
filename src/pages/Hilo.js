import React, { useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components';
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
import HiloWallpaper from '../images/hilo_wallpaper.jpg'
import { Grade } from '@mui/icons-material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { io } from 'socket.io-client';
const socket = io('http://localhost:4000');



const Background = styled.div`
    height: 100vh;
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
const Content = styled.div`
    position: relative; /* Positioning to stack on top of the background */
    z-index: 1; /* Higher z-index to ensure it appears on top */
    width: 80%;
    margin: auto;
    margin-top: 50px; /* Add some margin if needed */
`;

const GameContainer = styled.div`
     width: 70%;
     margin: auto;
     height: 700px;
`

const GameRow1 = styled.div`
     width: auto;
     height: 70px;
    margin: 20px;
     border: solid #394D65 1px;
     border-radius: 20px;
     display: flex;
     justify-content: center;
     align-items: center;
     color: #B3BAC2;
     padding: 20px;
`


const GameRow2 = styled.div`
     width: auto;
     height: 350px;
     margin: 20px;
     border: solid #394D65 1px;
     padding: 10px;
     border-radius: 20px;
     display: flex;
     justify-content: space-between;
     align-items: center;
`
const GameRow3 = styled.div`
     width: auto;
     height: 80px;
     padding: 10px;
     margin: 20px;
     border: solid #394D65 1px;
     border-radius: 20px;
     display: flex;
     justify-content: space-between;
     align-items: center;
`

const ButtonHigher = styled.button`
    border: solid #394d65 1px;
    border-radius: 10px;
    height: 60px;
    width: 200px;
    background-color: #181a63;
    opacity: 0.7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 0;
    cursor: pointer;
    outline: none;

    &:hover {
        opacity: 1;  // Slightly increase opacity on hover
    }
`;
const ButtonLower = styled.button`
    border: solid #394d65 1px;
    border-radius: 10px;
    height: 60px;
    width: 200px;
    background-color: #720808;
    opacity: 0.7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 0;
    cursor: pointer;
    outline: none;

    &:hover {
        opacity: 1;  // Slightly increase opacity on hover
    }
`;
const glowBlue = keyframes`
  0% {
    box-shadow: 0 0 10px skyblue, 0 0 20px skyblue, 0 0 30px skyblue, 0 0 40px skyblue;
  }
  50% {
    box-shadow: 0 0 20px skyblue, 0 0 30px skyblue, 0 0 40px skyblue, 0 0 50px skyblue;
  }
  100% {
    box-shadow: 0 0 10px skyblue, 0 0 20px skyblue, 0 0 30px skyblue, 0 0 40px skyblue;
  }
`;
const glowRed = keyframes`
  0% {
    box-shadow: 0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px red;
  }
  50% {
    box-shadow: 0 0 20px red, 0 0 30px red, 0 0 40px red, 0 0 50px red;
  }
  100% {
    box-shadow: 0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px red;
  }
`;
const glowWhite = keyframes`
  0% {
    box-shadow: 0 0 10px white, 0 0 20px white, 0 0 30px white, 0 0 40px white;
  }
  50% {
    box-shadow: 0 0 20px white, 0 0 30px white, 0 0 40px white, 0 0 50px white;
  }
  100% {
    box-shadow: 0 0 10px white, 0 0 20px white, 0 0 30px white, 0 0 40px white;
  }
`;

const TotalHighBetContainer = styled.div`
  border: solid gray 1px;
  border-radius: 10px;
  margin-top: 10px;
  height: 90px;
  width: 350px;
  background-color: #181a63;
  opacity: 0.7;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;

  /* Conditional styling for glowing effect */
  ${(props) =>
          props.result === "higher" &&
          css`
      animation: ${glowBlue} 1s ease-in-out;
    `}
`;
const TotalLowBetContainer = styled.div`
   border: solid gray 1px;
   border-radius: 10px;
   margin-top: 10px;
   height: 90px;
   width: 350px;
   background-color: #720808;
   opacity: 0.7;
   display: flex;
   justify-content: space-around;
   align-items: center;
   color: white;
   ${(props) =>
          props.result === "lower" &&
          css`
      animation: ${glowRed} 2s ease-in-out;
    `}
`;

const CurrentResultCircles = styled.div`
  border: solid #394D65 1px;
  border-radius: 50%; /* Use 50% to create a circular shape */
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background: linear-gradient(to right, #FF5733, #FFC300);
  ${(props) =>
          props.glow &&
          css`
      animation: ${glowWhite} 2s ease-in-out;
    `}
`;

const Hilo = () => {
     const [gameId, setgameId] = useState('');
     const [betAmount, setBetAmount] = useState('');
     const [username, setUsername] = useState('user123');
     const [totalBetsHigh, settotalBetsHigh] = useState(0);
     const [totalBetsLow, settotalBetsLow] = useState(0);
     const [highPercentage, setHighPercentage] = useState(0);
     const [lowPercentage, setLowPercentage] = useState(0);
     const [potentialWinningsHigh, setPotentialWinningsHigh] = useState(0);
     const [potentialWinningsLow, setPotentialWinningsLow] = useState(0);
     const [recentBetType, setRecentBetType] = useState("")
     const [totalBetsPerGame, settotalBetsPerGame] = useState(0);
     const [glow, setGlow] = useState(false);



     const [drawMessage, setDrawMessage] = useState("");
     const [result, setResult] = useState("");
     const [showResult, setShowResult] = useState(false);
     const [firstDigit, setFirstDigit] = useState("")
     const [secondDigit, setSecondDigit] = useState("")
     const [thirdDigit, setThirdDigit] = useState("")
     const [prevfirstDigit, setPrevFirstDigit] = useState("")
     const [prevsecondDigit, setPrevSecondDigit] = useState("")
     const [prevthirdDigit, setPrevThirdDigit] = useState("")
     const [gameData, setGameData] = useState(null);
     const [currentNumber, setCurrentNumber] = useState(0);
     const [isRumbling, setIsRumbling] = useState(false);
     const [isGameStart, setisGameStart] = useState(false)
     const [isButtonDisabled, setisButtonDisabled] = useState(false);
     const [error, setError] = useState(null); // Store error message


     //Socket IO
     const [newGame, setNewGame] = useState(null); //NEW GAME ID
     const [betData, setBetData] = useState(null);
     const [gameResult, setGameResult] = useState(null);
     const [seconds, setSeconds] = useState(60); // Timer state
     const [currentGameId, setCurrentGameId] = useState(null);
     const [restartGame, setrestartGame] = useState(false);

     useEffect(() => {
          handleStartGame();
     }, [username])

     useEffect(() => {
          // Listen for newGame event and update state
          socket.on('newGame', (data) => {
               console.log('New game started', data);
               setNewGame(data);
          });

          // Listen for betPlaced event and update state
          socket.on('betPlaced', (data) => {
               console.log('Bet placed', data);
               setBetData(data); // Save bet data in state
          });

          // Listen for gameResult event and update state
          // socket.on('gameResult', (data) => {
          //      console.log('Game result', data);
          //      setGameResult(data); // Save game result data in state
          // });

          socket.on('timerUpdate', (data) => {
               setSeconds(data.seconds); // Update the timer
          });

          socket.on('restartTimer', (data) => {
               setrestartGame(data); // Save game result data in state
               setSeconds(60);
          });


          // Cleanup listeners when the component unmounts
          return () => {
               socket.off('newGame');
               socket.off('betPlaced');
               //socket.off('gameResult');
               socket.off('timerUpdate');
               socket.off('restartTimer');
          };
     }, []);

     useEffect(() => {
          if (firstDigit !== "") {
               setGlow(true);
               setTimeout(() => {
                    setGlow(false);
               }, 2000); // 2 seconds duration
          }
          if (secondDigit !== "") {
               setGlow(true);
               setTimeout(() => {
                    setGlow(false);
               }, 2000); // 2 seconds duration
          }
          if (thirdDigit !== "") {
               setGlow(true);
               setTimeout(() => {
                    setGlow(false);
               }, 2000); // 2 seconds duration
          }
     }, [firstDigit,secondDigit,thirdDigit])
     //handleNewGame
     // useEffect(() => {
     //      const startGame = async () => {
     //           try {
     //                const response = await fetch('http://localhost:4000/api/hilo/start-game', {
     //                     method: 'POST', 
     //                     headers: {
     //                          'Content-Type': 'application/json', 
     //                     },
     //                });
     //                const data = await response.json();  
     //                setGameData(data); //{game_id, message}



     //                if (data && data.game_id) {
     //                     setgameId(data.game_id);
     //                     socket.emit('newGame', { game_id: data.game_id }); //send this to Server to start the timer

     //                }
     //           } catch (error) {
     //                setError('Error starting game');
     //                console.error('Error starting game:', error);
     //           }
     //      };

     //      if (isGameStart) {
     //           startGame();  // Call startGame when isGameStart is true
     //      }

     // }, [isGameStart]);

     // const handleStartGame = async (e) => {
     //      e.preventDefault();
     //      setisGameStart(true);
     // }
     const handleStartGame = async () => {
          try {
               const response = await fetch('http://localhost:4000/api/hilo/start-game', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
               });
               const data = await response.json();
               setgameId(data.game_id);
               socket.emit('newGame', { game_id: data.game_id }); // Send game ID to server to start the timer
          } catch (error) {
               setError('Error starting game');
               console.error('Error starting game:', error);
          }
     };



     useEffect(() => {
          const updateGameResult = async () => {
               try {
                    const result = {
                         game_id: gameId,
                         first_digit: firstDigit,
                         second_digit: secondDigit,
                         third_digit: thirdDigit,
                    };

                    const response = await fetch('http://localhost:4000/api/hilo/update-game', {
                         method: 'PATCH',
                         body: JSON.stringify(result),
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    });

                    if (response.ok) {
                         const data = await response.json();
                         setError(null); // Clear any previous errors
                         setPrevFirstDigit(data.first_digit)
                         setPrevSecondDigit(data.second_digit)
                         setPrevThirdDigit(data.third_digit)
                         console.log(data)
                    } else {
                         const errMessage = await response.json();
                         setError(errMessage.message || 'Failed to update game');
                    }
               } catch (error) {
                    setError('Error updating the game: ' + error.message);
               }
          };

          // Only run when all three digits are non-zero
          if (gameId && firstDigit !== 0 && secondDigit !== 0 && thirdDigit !== 0) {
               updateGameResult();
          }
     }, [firstDigit, secondDigit, thirdDigit]);




     const handlePlaceBet = async (betType) => {
          if (!betAmount || !username) {
               alert('Please provide both username and bet amount');
               return;
          }

          try {
               const betData = {
                    game_id: gameId,  // Make sure `gameId` is available in the component's state
                    username: username,
                    bet_amount: parseFloat(betAmount),
                    bet_type: betType,  // This will be 'high' or 'low' based on which button was clicked
               };

               const response = await fetch('http://localhost:4000/api/hilo/place-bet', {
                    method: 'UPDATE', // Update the game with the new bet
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(betData),
               });

               const data = await response.json();

               if (response.ok) {
                    //CALL FUNCTION HERE TO LIGHT UP THE DIV(HIGH OR LOW DIVS)
                    const totalBets = data.high_bets + data.low_bets;
                    settotalBetsHigh(data.high_bets)
                    settotalBetsLow(data.low_bets)
                    setRecentBetType(data.bet_type)

                    const highBetPercentage = ((data.high_bets / totalBets) * 100).toFixed(2);
                    const lowBetPercentage = ((data.low_bets / totalBets) * 100).toFixed(2);

                    const totalHighBets = data.total_my_bets.high
                    const totalLowBets = data.total_my_bets.low
                    if (data.bet_type === "high") {
                         settotalBetsPerGame(totalHighBets)
                    } else {
                         settotalBetsPerGame(totalLowBets)
                    }

                    setHighPercentage(highBetPercentage);
                    setLowPercentage(lowBetPercentage);

                    let potentialWinningsHigh = 0;
                    let potentialWinningsLow = 0;
                    //Winning = (Player's Bet / Total Bets on Winning Side) * Total Bets
                    if (betType === 'high') {
                         potentialWinningsHigh = ((betData.bet_amount / data.high_bets) * totalBets).toFixed(2);
                    } else if (betType === 'low') {
                         potentialWinningsLow = ((betData.bet_amount / data.low_bets) * totalBets).toFixed(2);
                    }
                    setPotentialWinningsHigh(potentialWinningsHigh);
                    setPotentialWinningsLow(potentialWinningsLow);


               } else {
                    alert(data.message || 'Failed to place bet');
               }
          } catch (error) {
               console.error('Error placing bet:', error);
               alert('Error placing bet');
          }
     };

     useEffect(() => {
          if (seconds <= 0) {
               setisGameStart(false)
               setCurrentNumber("-");
          }

          //Update draw message based on remaining seconds
          if (seconds <= 40 && seconds > 35) {
               if (seconds === 40) {
                    setDrawMessage("Drawing First Result");
                    setIsRumbling(true);
                    setCurrentNumber("");
               }

          } else if (seconds <= 35 && seconds > 30) {
               if (seconds === 35) {
                    setDrawMessage("First Result");
                    setIsRumbling(false)
                    setSecondDigit(currentNumber);
               }
          } else if (seconds <= 30 && seconds > 25) {
               if (seconds === 30) {
                    setDrawMessage("Drawing Second Result");
                    setIsRumbling(true)
                    setCurrentNumber("");
               }
          } else if (seconds <= 25 && seconds > 20) {
               if (seconds === 25) {
                    setDrawMessage("Second Result");
                    setIsRumbling(false)
                    setThirdDigit(currentNumber);
               }
          } else if (seconds <= 20 && seconds > 15) {
               if (seconds === 20) {
                    setDrawMessage("Last Result. Betting now closed");
                    setIsRumbling(true)
                    setCurrentNumber("");
               }
          } else if (seconds <= 15 && seconds > 10) {
               if (seconds === 15) {
                    setDrawMessage("Last Result");
                    setIsRumbling(false)
                    setFirstDigit(currentNumber);
               }

          } else if (seconds <= 10 && seconds > 1) {
               if (seconds === 10) {
                    console.log(firstDigit + " " + secondDigit + " " + thirdDigit)
                    setShowResult(true)
                    const combinedPrevious = prevfirstDigit * 100 + prevsecondDigit * 10 + prevthirdDigit;
                    const combinedCurrent = firstDigit * 100 + secondDigit * 10 + thirdDigit;

                    let resultMessage;
                    if (combinedCurrent > combinedPrevious) {
                         setResult("higher")
                         resultMessage = "Higher Wins";
                    } else if (combinedCurrent < combinedPrevious) {
                         setResult("lower")
                         resultMessage = "Lower Wins";
                    } else {
                         setResult("same")
                         resultMessage = "The Same";
                    }
                    setDrawMessage(resultMessage);
               }
          }

          else {
               setShowResult(false)

               setDrawMessage(`Betting now opened! Draw will start in ${seconds - 40}`)
               setFirstDigit("") // Message when seconds are above 10
               setSecondDigit("")
               setThirdDigit("")
          }
     }, [seconds]); // This effect depends on seconds


     useEffect(() => {
          let rumbleInterval;

          if (isRumbling) {
               // Start rumbling the number every 100ms
               rumbleInterval = setInterval(() => {
                    const randomNumber = Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
                    setCurrentNumber(randomNumber); // Update the displayed number
               }, 50);
          }

          // Cleanup function to clear the interval
          return () => {
               clearInterval(rumbleInterval);
          };
     }, [isRumbling]);






     return (
          <Background>
               <MainHeader />
               <BackgroundImage src={HiloWallpaper} alt='Background'></BackgroundImage> {/* Additional content to ensure page scrolls */}
               <Content>
                    <GameContainer>
                         <GameRow1>
                              <h4 style={{ margin: 0, fontWeight: 600, fontSize: "25px", textTransform: "uppercase" }}>
                                   {drawMessage}
                              </h4>
                         </GameRow1>
                         <GameRow2>
                              <div>
                                   <div>
                                        <div id="CurrentResult"
                                             style={{
                                                  border: "solid gray 1px",
                                                  borderRadius: "10px",
                                                  height: "200px",
                                                  width: "350px",
                                                  backgroundColor: "rgba(22, 36, 53, 0.4)",
                                                  opacity: 0.7,
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  flexDirection: "column",
                                                  color: "white"

                                             }}>
                                             <h4 style={{ margin: 0, padding: 0, fontWeight: 400 }}>Current Result</h4>
                                             <div style={{ display: "flex", gap: 10, paddingTop: "30px" }}>
                                                  <CurrentResultCircles glow={glow}>
                                                       <h3>{firstDigit}</h3>
                                                  </CurrentResultCircles>



                                                  <CurrentResultCircles glow={glow}>
                                                       <h3>{secondDigit}</h3>
                                                  </CurrentResultCircles>



                                                  <CurrentResultCircles glow={glow}>
                                                       <h3>{thirdDigit}</h3>
                                                  </CurrentResultCircles>


                                             </div>

                                        </div>
                                        <TotalHighBetContainer result={result}>
                                             <div>HIGHER BETS</div>
                                             <div>{totalBetsHigh}</div>
                                             <div style={{ color: "gray" }}>{highPercentage}%</div>
                                             <div style={{ color: "gray" }}>{potentialWinningsHigh}</div>
                                        </TotalHighBetContainer>
                                   </div>
                              </div>
                              <div>
                                   <div
                                        style={{
                                             border: "solid gray 1px",
                                             borderRadius: "10px",
                                             height: "300px",
                                             width: "260px",
                                             opacity: 0.7,
                                             display: "flex",
                                             justifyContent: "center",
                                             alignItems: "center",
                                             flexDirection: "column",
                                             color: "white",
                                             background: "linear-gradient(to right, #FF5733, #FFC300)",
                                        }}
                                   >
                                        <p style={{ margin: 0, padding: 0, fontSize: "100px" }}>
                                             {currentNumber}
                                        </p>
                                   </div>
                              </div>
                              <div>
                                   <div id="PreviousResult"
                                        style={{
                                             border: "solid gray 1px",
                                             borderRadius: "10px",
                                             height: "200px",
                                             width: "350px",
                                             backgroundColor: "rgba(22, 36, 53, 0.4)",

                                             display: "flex",
                                             justifyContent: "center",
                                             alignItems: "center",
                                             flexDirection: "column",
                                             color: "white"

                                        }}>
                                        <h4 style={{ margin: 0, padding: 0, fontWeight: 400 }}>Previous Result</h4>
                                        <div style={{ display: "flex", gap: 10, paddingTop: "30px" }}>
                                             <div style={{
                                                  border: "solid #394D65 1px",
                                                  borderRadius: "100%",
                                                  height: "50px",
                                                  width: "50px",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  color: "black",
                                                  background: "linear-gradient(to right, #ffffff, #848484)",

                                             }}>
                                                  <h3>{prevfirstDigit}</h3>
                                             </div>

                                             <div style={{
                                                  border: "solid #394D65 1px",
                                                  borderRadius: "100%",
                                                  height: "50px",
                                                  width: "50px",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  color: "black",
                                                  background: "linear-gradient(to right, #ffffff, #848484)",
                                             }}>
                                                  <h3>{prevsecondDigit}</h3>
                                             </div>

                                             <div style={{
                                                  border: "solid #394D65 1px",
                                                  borderRadius: "100%",
                                                  height: "50px",
                                                  width: "50px",
                                                  display: "flex",
                                                  color: "black",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  background: "linear-gradient(to right, #ffffff, #848484)",
                                             }}>
                                                  <h3>{prevthirdDigit}</h3>
                                             </div>
                                        </div>
                                   </div>
                                   <TotalLowBetContainer result="lower">
                                        <div>LOWER BETS</div>
                                        <div>{totalBetsLow}</div>
                                        <div style={{ color: "gray" }}>{lowPercentage}%</div>
                                        <div style={{ color: "gray" }}>{potentialWinningsLow}</div>
                                   </TotalLowBetContainer>
                              </div>

                         </GameRow2>
                         <GameRow3>
                              <div>
                                   {/* <p style={{ color: "#B3BAC2", fontSize: "12px", marginBottom: "5px" }}>BET AMOUNT</p> */}
                                   <div> <StyledTextField
                                        required
                                        id="outlined"
                                        label="Bet Amount"
                                        style={{ width: "280px", backgroundColor: "#162435", opacity: 0.7 }}
                                        fullWidth
                                        type='number'
                                        value={betAmount}
                                        onChange={(e) => setBetAmount(e.target.value)}
                                        InputProps={{
                                             inputProps: { min: 0 }, // Example: min value can be set if needed
                                             sx: {
                                                  // Hide arrows for Chrome, Safari, Edge, etc.
                                                  '& input[type=number]': {
                                                       MozAppearance: 'textfield', // For Firefox
                                                  },
                                                  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                                       WebkitAppearance: 'none', // For Chrome, Safari, Edge
                                                       margin: 0,
                                                  },
                                             },
                                        }}
                                        onWheel={(e) => e.target.blur()} // Disable scrolling to change number
                                   /></div>

                              </div>
                              <div style={{
                                   display: "flex",
                                   justifyContent: "center",
                                   alignItems: "center",
                                   gap: 10
                              }}>
                                   <ButtonHigher onClick={() => handlePlaceBet('high')}>
                                        <div style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                             <h4 style={{ margin: 0, paddingLeft: 0, fontWeight: 400 }}>BET HIGHER</h4>
                                             <p style={{ margin: 0, padding: 0, color: "gray" }}>1.334%</p>
                                        </div>
                                        <div style={{ paddingRight: "20px" }}>
                                             <KeyboardArrowUpIcon
                                                  sx={{ fontSize: 40 }}
                                             />
                                        </div>

                                   </ButtonHigher>
                                   <ButtonLower onClick={() => handlePlaceBet('low')}>
                                        <div style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                             <h4 style={{ margin: 0, paddingLeft: 0, fontWeight: 400 }}>BET LOWER</h4>
                                             <p style={{ margin: 0, padding: 0, color: "gray" }}>7.44%</p>
                                        </div>
                                        <div style={{ paddingRight: "20px" }}>
                                             <KeyboardArrowDownIcon
                                                  sx={{ fontSize: 40 }}
                                             />
                                        </div>
                                   </ButtonLower>
                              </div>
                              <div style={{
                                   width: "280px",
                                   display: "flex",
                                   alignItems: "center",
                                   border: "solid #394D65 1px",
                                   borderRadius: "10px",
                                   height: "60px",
                                   width: "280px",
                                   backgroundColor: "#162435",
                                   opacity: 0.7,
                                   display: "flex",
                                   justifyContent: "left",
                                   color: "white"


                              }}>

                                   <p style={{ color: "#B3BAC2", fontSize: "12px", margin: "10px", textTransform: "uppercase" }}>My Bet: {recentBetType}</p>
                                   <p style={{ color: "#B3BAC2", fontSize: "12px", margin: "10px" }}>Amount: {totalBetsPerGame}</p>
                                   <p style={{ color: "ffffff", fontSize: "12px" }}>Potential Winning: </p>

                              </div>
                         </GameRow3>
                    </GameContainer>
               </Content>

          </Background >
     )
}

export default Hilo
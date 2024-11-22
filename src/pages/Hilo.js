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
import { useAuthContext } from '../context/AuthContext';
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

const StyledDiv = styled.div`
  width: 280px;
  display: flex;
  align-items: center;
  border: solid #394D65 1px;
  border-radius: 10px;
  height: 60px;
  background-color: #162435;
  opacity: 0.7;
  justify-content: left;
  color: white;
  ${(props) =>
          props.result === "higher" &&
          css`
      animation: ${glowBlue} 1s ease-in-out;
    `}
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

const FirstCurrentResultCircles = styled.div`
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
const SecondCurrentResultCircles = styled.div`
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
const ThirdCurrentResultCircles = styled.div`
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
     const { user } = useAuthContext();
     const usr = user?.username || 'Guest';

     const [gameId, setgameId] = useState('');
     const [gameId2, setgameId2] = useState('');
     const [betAmount, setBetAmount] = useState('');
     const [username, setUsername] = useState(usr);
     const [totalBetsHigh, settotalBetsHigh] = useState(0);
     const [totalBetsLow, settotalBetsLow] = useState(0);
     const [highPercentage, setHighPercentage] = useState(0);
     const [lowPercentage, setLowPercentage] = useState(0);
     const [potentialWinningsHigh, setPotentialWinningsHigh] = useState(0);
     const [potentialWinningsLow, setPotentialWinningsLow] = useState(0);
     const [recentBetType, setRecentBetType] = useState("")
     const [totalBetsPerGame, settotalBetsPerGame] = useState(0);
     const [glow1, setGlow1] = useState(false);
     const [glow2, setGlow2] = useState(false);
     const [glow3, setGlow3] = useState(false);
     const [prevResult, setprevResult] = useState("");




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
     const [rolling, setRolling] = useState(false);
     const [isRumbling, setIsRumbling] = useState(false);
     const [isGameStart, setisGameStart] = useState(false)
     const [isButtonDisabled, setisButtonDisabled] = useState(false);
     const [error, setError] = useState(null); // Store error message
     const [style, setStyle] = useState({
          transform: "translateX(0px)",
          opacity: 1,
     });


     //Socket IO
     const [newGame, setNewGame] = useState(""); //NEW GAME ID
     const [betData, setBetData] = useState(null);
     const [gameResult, setGameResult] = useState(null);
     const [seconds, setSeconds] = useState(60); // Timer state
     const [currentGameId, setCurrentGameId] = useState(null);
     const [restartGame, setrestartGame] = useState(false);
     const [countdownToDraw, setcountdownToDraw] = useState();

     // useEffect(() => {
     //      handleStartGame();
     // }, [username])

     useEffect(() => {
          // Listen for newGame event and update state
          socket.on('newGame', (data) => {
               console.log('New game started', data);
               setNewGame(data.game_id);
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
               setGlow1(true);
               setTimeout(() => {
                    setGlow1(false);
               }, 2000); // 2 seconds duration
          }
          if (secondDigit !== "") {
               setGlow2(true);
               setTimeout(() => {
                    setGlow2(false);
               }, 2000); // 2 seconds duration
          }
          if (thirdDigit !== "") {
               setGlow3(true);
               setTimeout(() => {
                    setGlow3(false);
               }, 2000); // 2 seconds duration
          }
     }, [firstDigit, secondDigit, thirdDigit])


   

     useEffect(() => {
          // Listen for game over event
          socket.on('gameOver', () => {
               handleStartGame();
               console.log("")
               setFirstDigit("")
               setSecondDigit("")
               setThirdDigit("")
          });

          // Cleanup event listener on component unmount
          return () => {
               socket.off('gameOver');
          };
     }, []);

     /* Creating an empty game data just to get the game_id
     This will be use later on when updating the game by placing bets, adding the result, etc */
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
               socket.emit('newGame', 'start'); // Send game ID to server to start the timer
          } catch (error) {
               setError('Error starting game');
               console.error('Error starting game:', error);
          }
     };



     useEffect(() => {
          const updateGameResult = async () => {

               console.log("gameId:", gameId, "firstDigit:", firstDigit, "secondDigit:", secondDigit, "thirdDigit:", thirdDigit, result); // Check the values
               try {
                    const reslt = {
                         game_id: gameId,
                         first_digit: firstDigit,
                         second_digit: secondDigit,
                         third_digit: thirdDigit,
                         result: result

                    };

                    const response = await fetch('http://localhost:4000/api/hilo/update-game', {
                         method: 'PATCH',
                         body: JSON.stringify(reslt),
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
                         setprevResult(data.result)
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
          if (gameId && firstDigit !== "" && secondDigit !== "" && thirdDigit !== "" && result !== "") {
               updateGameResult();
          }
     }, [firstDigit, secondDigit, thirdDigit, result]);



     const handlePlaceBet = async (betType) => {
          updateBalance()
          if (!betAmount || !username) {
               alert('Please provide both username and bet amount');
               return;
          }
          try {
               const betData = {
                    game_id: newGame,// Make sure `gameId` is available in the component's state
                    username: username,
                    bet_amount: parseFloat(betAmount),
                    bet_type: betType,  // This will be 'high' or 'low' based on which button was clicked
               };

               const response = await fetch('http://localhost:4000/api/hilo/place-bet', {
                    method: 'PATCH', // Update the game with the new bet
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

                    const totalHighBets = data.total_my_bets?.high || 0;
                    const totalLowBets = data.total_my_bets?.low || 0;
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
          // Listen for timer updates
          socket.on('timerUpdate', (data) => {
               setSeconds(data.seconds);
          });

          // Listen for rumble updates
          socket.on('rumbleUpdate', (data) => {
               setCurrentNumber(data.number);
          });

          socket.on('result2', (data) => {
               setSecondDigit(data.randomNumber);
          });

          socket.on('result3', (data) => {
               setThirdDigit(data.randomNumber);
          });

          socket.on('result1', (data) => {
               setFirstDigit(data.randomNumber);
          });

          socket.on('countdownToDraw', (data) => {
               setcountdownToDraw(data.number);
          });

          socket.on('higherLower', (data) => {
               setResult(data.highlow);
          });

          // Listen for draw messages
          socket.on('drawMessage', (data) => {
               setDrawMessage(data.message);
               if (data.message === "HIGHER WINS") {
                    setfbalance(1000)
               }
          });


          // Listen for showResult event
          socket.on('showResult', (show) => {
               setShowResult(show);
          });

          return () => {
               socket.off('timerUpdate');
               socket.off('rumbleUpdate');
               socket.off('drawMessage');
               socket.off('result');
               socket.off('showResult');
          };
     }, []);

     useEffect(() => {
          // Listen for rumble updates from the server
          socket.on('rumbleUpdate', (data) => {
               setCurrentNumber(data.randomNumber);
          });

          return () => {
               socket.off('rumbleUpdate');
          };
     }, []);

     const [fbalance, setfbalance] = useState(700);
     const updateBalance = async () => {
          const valueToSubtract = parseInt(betAmount, 10);
          setfbalance(fbalance - valueToSubtract);
     }

     return (
          <Background>
               <MainHeader balance={fbalance} />
               <BackgroundImage src={HiloWallpaper} alt='Background'></BackgroundImage> {/* Additional content to ensure page scrolls */}
               <Content>
                    <GameContainer>
                         <GameRow1>
                              <h4 style={{ margin: 0, fontWeight: 600, fontSize: "25px", textTransform: "uppercase" }}>
                                   {drawMessage} {countdownToDraw}

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
                                                  <FirstCurrentResultCircles glow={glow1}>
                                                       <h3>{firstDigit}</h3>
                                                  </FirstCurrentResultCircles>



                                                  <SecondCurrentResultCircles glow={glow2}>
                                                       <h3>{secondDigit}</h3>
                                                  </SecondCurrentResultCircles>



                                                  <ThirdCurrentResultCircles glow={glow3}>
                                                       <h3>{thirdDigit}</h3>
                                                  </ThirdCurrentResultCircles>


                                             </div>

                                        </div>
                                        <TotalHighBetContainer result={result}>
                                             <div>HIGHER BETS</div>
                                             <div>${betData?.high_bets}</div>
                                             <div style={{ color: "gray" }}>ODDS: <div style={{ marginRight: "5px" }}>{betData?.payout_odds.high}</div></div>
                                             {/* <div style={{ color: "gray" }}>{potentialWinningsHigh}</div> */}
                                        </TotalHighBetContainer>
                                   </div>
                              </div>
                              <div>
                                   <div onClick={handleStartGame}
                                        style={{
                                             ...style,
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
                                             <h1 style={{ textTransform: "uppercase" }}>{prevResult}</h1>
                                        </div>
                                   </div>
                                   <TotalLowBetContainer result={result}>
                                        <div>LOWER BETS</div>
                                        <div>${betData?.low_bets}</div>
                                        <div style={{ color: "gray" }}>ODDS: <div style={{ marginRight: "5px" }}>{betData?.payout_odds.low}</div></div>
                                        {/* <div style={{ color: "gray" }}>{potentialWinningsLow}</div> */}
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
                                             <p style={{ margin: 0, padding: 0, color: "gray" }}>{betData?.payout_odds.high}</p>
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
                                             <p style={{ margin: 0, padding: 0, color: "gray" }}>{betData?.payout_odds.low}</p>
                                        </div>
                                        <div style={{ paddingRight: "20px" }}>
                                             <KeyboardArrowDownIcon
                                                  sx={{ fontSize: 40 }}
                                             />
                                        </div>
                                   </ButtonLower>
                              </div>
                              <StyledDiv result={result}>

                                   {/* <p style={{ color: "#B3BAC2", fontSize: "12px", margin: "10px", textTransform: "uppercase" }}>My Bet: {recentBetType}</p>
                                   <p style={{ color: "#B3BAC2", fontSize: "12px", margin: "10px" }}>Amount: ${totalBetsPerGame}</p> */}
                                   <p style={{ color: "ffffff", fontSize: "15px", paddingLeft: "20px" }}>Potential Winning: ${betData?.potential_payout} </p>

                              </StyledDiv>
                         </GameRow3>
                    </GameContainer>
               </Content>

          </Background >
     )
}

export default Hilo
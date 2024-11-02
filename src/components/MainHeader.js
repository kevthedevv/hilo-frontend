import { Link, useLocation } from "react-router-dom";
import Logo from '../images/logo.png'
import React from 'react';
import styled from 'styled-components';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout } from '../hooks/useLogout'

const Container = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #142131;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 30px;
    padding: 0;
    margin: 0;
    padding-right: 50px;
`;

const LogoContainer = styled.img`
     width: 80px;
`
const NavItem = styled.li`
    font-size: 16px;
`;
const StyledLink = styled(Link)`

    text-decoration: none;
    color: gray;
    &:hover {
        color: #0056b3;
    }
`;

function MainHeader() {
     const { logout } = useLogout()
     const handleLogout = () => {
          logout()
     }
     const location = useLocation();
     console.log('Current pathname:', location.pathname);
     return (
          <Container>
               <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ paddingLeft: "50px", paddingRight: "20px", paddingTop: "5px" }}>
                         <LogoContainer src={Logo} alt="Logo" />
                    </div>
                    <h3>Bola Swerte</h3>
               </div>
               <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ padding: "5px 20px", borderRadius: "50px", backgroundColor: "#1B4569", marginRight: "20px" }}>
                         Available Balance: P10,000
                    </div>
                    <div style={{ padding: "0", marginRight: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                         <SettingsIcon /> {/* Adjust negative margin if needed */}
                    </div>
                    <div style={{ padding: "0", marginRight: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                         <LogoutIcon onClick={handleLogout}/>
                    </div>

               </div>
          </Container >
     );
}

export default MainHeader;

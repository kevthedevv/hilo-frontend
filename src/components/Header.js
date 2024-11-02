import { Link, useLocation } from "react-router-dom";

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 50px;
    padding: 0;
    margin: 0;
    padding-right: 50px;
`;

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

function Header() {
     const location = useLocation();
     console.log('Current pathname:', location.pathname);
     return (
          <nav>
               <Container>
                    <NavList>
                         {location.pathname === '/register' ? (
                              <NavItem>
                                   Already a member? <StyledLink to="/login">Login here</StyledLink>
                              </NavItem>
                         ) : (
                              <NavItem>
                                   Don't have an account yet? <StyledLink to="/register">Register here</StyledLink>
                              </NavItem>
                         )}
                    </NavList>
               </Container>
          </nav>
     );
}

export default Header;

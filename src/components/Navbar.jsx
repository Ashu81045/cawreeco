import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #295329;
  color: #fff;
  padding: 0 6rem;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.h2`
  margin-right: 2rem;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  margin-right: 2rem;
  text-decoration: none;
  font-weight: 300;
  font-size: 14px;

  &:hover {
    color: #ccc;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const CartIcon = styled(AiOutlineShoppingCart)`
  font-size: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  font-weight: 400;
`;

const Account = styled.div`
  position: relative;
  cursor: pointer;
`;

const AccountPopup = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  padding: 1rem;
  display: ${(props) => (props.open ? 'block' : 'none')};
`;

const Navbar = () => {
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);

  const handleAccountClick = () => {
    setIsAccountPopupOpen((prev) => !prev);
  };

  return (
    <NavbarContainer>
      <LogoSection>
        <LogoText>Reeco</LogoText>
        <LinksContainer>
            <NavLink to="/store">Store</NavLink>
            <NavLink to="/orders">Orders</NavLink>
            <NavLink to="/analytics">Analytics</NavLink>
          {/* Add other links as needed */}
        </LinksContainer>
      </LogoSection>
      <RightSection>
        <CartIcon />
        <Account onClick={handleAccountClick}>Account</Account>
        {isAccountPopupOpen && (
          <AccountPopup open={isAccountPopupOpen}>
            <p>Username: demo_user</p>
            <p>Email: demo@example.com</p>
            {/* Add more account information here */}
          </AccountPopup>
        )}
      </RightSection>
    </NavbarContainer>
  );
};

export default Navbar;

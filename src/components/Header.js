import React, { useState, useEffect, useRef } from "react";

// @styled-component
import {
  Layout,
  Container,
  Logo,
  Menu,
  MenuItem,
  MobileMenuButton,
  ButtonGroup,
  MobileMenu,
  MobileMenuItem,
} from "./Header.styled";

// @data
import { MenuItemList } from "../utils/Header";
import { WalletConnectt } from "./WalletConnect";

// @assets
import { BiMenu } from "react-icons/bi";

//------------------------------------------------------------------

export const Header = () => {
  const [show, setShow] = useState(-1);

  // const dropMenuRef = (useRef < HTMLDivElement) | (null > null);
  // const menuButtonRef = (useRef < HTMLDivElement) | (null > null);

  // const handleClickOutside = (e) => {
  //   if (dropMenuRef.current?.contains(e.target)) {
  //     return;
  //   } else {
  //     if (menuButtonRef.current?.contains(e.target)) {
  //       return;
  //     } else {
  //       setShow(-1);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (show > 0) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [show]);

  return (
    <Layout>
      <Container>
        <Logo data-aos="zoom-in" onClick={() => {}}>
          POW Pirates
        </Logo>
        <Menu>
          {MenuItemList.map((item, index) => (
            <MenuItem key={index} href={item.link} data-aos="fade-up">
              {item.label}
            </MenuItem>
          ))}
        </Menu>
        <ButtonGroup>
          <WalletConnectt />
          <MobileMenuButton
            data-aos="zoom-in"
            onClick={() => setShow(show * -1)}
            // ref={menuButtonRef}
          >
            <BiMenu size={20} />
          </MobileMenuButton>
        </ButtonGroup>
        <MobileMenu show={show > 0}>
          {MenuItemList.map((item, index) => (
            <div key={index}>
              <MobileMenuItem href={item.link}>{item.label}</MobileMenuItem>
            </div>
          ))}
        </MobileMenu>
      </Container>
    </Layout>
  );
};

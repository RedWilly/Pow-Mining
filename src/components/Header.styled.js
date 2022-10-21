import styled from "styled-components";

//----------------------------------------------------

export const Layout = styled.div`
  position: fixed;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #11181e;

  padding: 20px 0px;

  z-index: 2;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1320px;

  @media screen and (max-width: 1440px) {
    max-width: 1150px;
  }
  @media screen and (max-width: 1250px) {
    max-width: 900px;
  }
  @media screen and (max-width: 1024px) {
    max-width: 700px;
  }
  @media screen and (max-width: 768px) {
    max-width: 510px;
  }
  @media screen and (max-width: 570px) {
    width: 90%;
  }
`;
export const Logo = styled.div`
  color: #fe009c;

  font-size: 30px;
  font-weight: 900;

  cursor: pointer;
`;
export const Menu = styled.div`
  display: flex;

  @media screen and (max-width: 1440px) {
    display: none;
  }
`;
export const MenuItem = styled.a`
  color: #fff;

  font-size: 30px;
  font-weight: 700;
  padding: 5px 10px;

  position: relative;
  margin: 0 12px;

  text-align: center;
  text-decoration: none;

  transition: all 0.2s;
  cursor: pointer;

  ::after {
    transition: all 0.2s ease-in-out;
    position: absolute;
    content: "";
    height: 3px;
    background-color: #fff;
    width: 100%;
    left: 0;
    bottom: 0;
    transform: scaleX(0);
  }

  :hover {
    color: #fff;
    ::after {
      transform: scaleX(1);
    }
  }
`;

export const MobileMenuButton = styled.div`
  display: none;

  @media screen and (max-width: 1440px) {
    width: 50px;
    height: 45px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #fe009c;

    cursor: pointer;

    transition: all 0.2s ease-out;

    :hover {
      box-shadow: inset 50px 0 0 0 white;
      color: #fe009c;
    }
  }
  @media screen and (max-width: 570px) {
    width: 35px;
    height: 35px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 20px;
  }

  @media screen and (max-width: 570px) {
    & > :not(:last-child) {
      margin-right: 10px;
    }
  }
`;

export const MobileMenu = styled.div`
  display: none;

  @media screen and (max-width: 1440px) {
    display: block;
    position: absolute;
    border-radius: 20px;
    top: 85px;
    left: 0;
    width: 100vw;

    z-index: 2;

    visibility: ${({ show }) => (show ? "visible" : "collapse")};

    & > div {
      ${({ show }) =>
        show
          ? `opacity: 1;
      visibility: visible;
        &:nth-child(2) {
    transition-delay: 0.1s;
  }
  &:nth-child(3) {
    transition-delay: 0.2s;
  }
  &:nth-child(4) {
    transition-delay: 0.3s;
  }
  &:nth-child(5) {
    transition-delay: 0.4s;
  }
  &:nth-child(6) {
    transition-delay: 0.5s;
  }
  &:nth-child(7) {
    transition-delay: 0.6s;
  }
      `
          : `opacity: 0;
      visibility: hidden;
        &:nth-child(1) {
    transition-delay: 0.6s;
  }
  &:nth-child(2) {
    transition-delay: 0.5s;
  }
  &:nth-child(3) {
    transition-delay: 0.4s;
  }
  &:nth-child(4) {
    transition-delay: 0.3s;
  }
  &:nth-child(5) {
    transition-delay: 0.2s;
  }
  &:nth-child(6) {
    transition-delay: 0.1s;
  }`};
    }
  }
`;
export const MobileMenuItem = styled.a`
  display: block;
  text-decoration: none;
  text-align: center;
  background: #11181e;
  color: white;
  font-size: 17px;
  font-weight: 500;
  padding: 5px 0px;
  :hover {
    color: #fe009c;
  }
`;

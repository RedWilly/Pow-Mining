import styled from "styled-components";
//#fe009c - new
//----------------------------------------------------
//old- #07fea3
export const Layout = styled.div`
  width: 140px;
  height: 45px;

  background: #fe009c;
  

  font-size: 16px;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: all 0.2s ease-out;

  :hover {
    box-shadow: inset 140px 0 0 0 white;
    color: #fe009c;
  }

  @media screen and (max-width: 570px) {
    width: 100px;
    height: 35px;
    font-size: 12px;
    font-weight: 500;
  }
`;

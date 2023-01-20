import styled from '@emotion/styled';

export const BtnNavbar = styled.button`
  color: #000afe;
  font-size: 1rem;
  font-weight: normal;
  font-family: 'sailec-medium' !important;
  width: 8rem;
  padding: 5px 10px;
  text-align: center;
  transition-property: text-align;
  transition-duration: 4s;
  transition-delay: 2s;

  :hover {
    text-align: left;
    color: #ffffff;
    background: rgb(0, 229, 182);
    background: linear-gradient(
      90deg,
      rgba(0, 229, 182, 1) 0%,
      rgba(0, 124, 240, 1) 100%
    );
  }
`;

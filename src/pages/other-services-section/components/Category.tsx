import styled from '@emotion/styled';
import { Box } from '@mui/material';

type PropsCategory = {
  title: string;
  img: string;
};

const CategoryStyled = styled.div<{ img: string }>`
  z-index: 1;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  width: 350px;
  padding: 20px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 30px;
  transition: all 0.4s;
  cursor: pointer;

  :hover {
    box-shadow: 1px 1px 24px grey;
    transform: scale(1.05);
  }
`;

export const Category = (props: PropsCategory) => {
  return (
    <CategoryStyled img={props.img}>
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          left: '0',
          backgroundColor: '#000000',
          width: '100%',
          height: '100%',
          opacity: '.6',
          borderRadius: '30px'
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          color: '#ffffff',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '32px'
        }}
      >
        {String(props.title).toUpperCase()}
      </Box>
    </CategoryStyled>
  );
};

import { InputBase, alpha, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.8),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 1)
  },
  // marginRight: theme.spacing(2),
  // marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'gray'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'gray',
  fontFamily: 'sailec',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

export const SearchBar = () => {
  return (
    <Search style={{ width: '50%' }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Buscar"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

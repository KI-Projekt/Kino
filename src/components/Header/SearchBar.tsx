import { styled, alpha, InputBase } from '@mui/material';
import { drawerWidth } from './Header';

interface SearchBarProps {
    searchOpen: boolean,
    setSearchOpen: Function,
}

const Search = styled('div')(
    ({ theme }) => ({
        position: 'relative',
        marginLeft: 0,
        marginRight: 0,
        width: `calc(${drawerWidth} - 5rem)`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%',
          },
    }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        // vertical padding + font size from searchIcon
        paddingLeft: '0.5rem',
        transition: theme.transitions.create('width'),
    },
}));

function SearchBar(prop: SearchBarProps) {
    return (
            <Search>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    
                />
            </Search>
    )
}

export default SearchBar;
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

function Header() {
  return (
    <>
      <header>
        <nav>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonGroup variant="text" aria-label="text button group">
              <Link to={"/"}>
                <Button>Home</Button>
              </Link>
              <Link to={"/about"}>
                <Button>About</Button>
              </Link>
              <Link to={"/screeners/1"}>
                <Button>Screeners</Button>
              </Link>
            </ButtonGroup>
          </Box>
        </nav>
      </header>
    </>
  );
}

export default Header;
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <nav>
          <Link to={"/"}>
            <button>Home</button>
          </Link>
          <Link to={"/about"}>
            <button>About</button>
          </Link>
          <Link to={"/screeners/1"}>
            <button>Screeners</button>
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
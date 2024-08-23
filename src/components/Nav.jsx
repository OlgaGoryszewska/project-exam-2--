import { Link } from "react-router-dom";

import logo from '../assets/img/logo.png';

function Nav() {
  return (
    <>
      <header className="flex flex-row bg-deep-blue h-12">
        <img class=" h-11 "src={logo} alt="Logo for a nav bar" />
        <nav >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
export default Nav;

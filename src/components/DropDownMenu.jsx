import {useState} from 'react';
import { Link } from "react-router-dom";    

function DropDownMenu() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <button onClick={() => setShowMenu(!showMenu)}>Menu</button>
      {showMenu && (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
export default DropDownMenu;

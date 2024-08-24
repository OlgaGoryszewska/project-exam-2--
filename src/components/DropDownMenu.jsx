import {useState} from 'react';
import { Link } from "react-router-dom"; 

//Icons
import palm from '../assets/img/palm.png';   

function DropDownMenu() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <button onClick={() => setShowMenu(!showMenu)}>< img className="relative h-8 " src={palm} alt="menu icon"/></button>
      {showMenu && (
        <nav className='absolute'>
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

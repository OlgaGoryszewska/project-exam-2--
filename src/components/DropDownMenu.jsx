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
        <nav className='absolute bg-deep-blue '>
          <ul>
            <li>
              <Link className="link" to="/">Home</Link>
            </li>
            <li>
              <Link className="link" to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
export default DropDownMenu;

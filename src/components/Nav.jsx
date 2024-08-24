

import logo from '../assets/img/logo.png';
import DropDownMenu from "./DropDownMenu";

function Nav() {
  return (
    <>
      <header className="flex flex-row justify-between bg-deep-blue h-12">
        <img className=" h-11 "src={logo} alt="Logo for a nav bar" />
        <DropDownMenu/>
      </header>
    </>
  );
}
export default Nav;

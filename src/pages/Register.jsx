import { registerUser } from "../api/RegisterUser";
import RegisterForm from "../components/RegisterForm";


function Register() {
registerUser();
    return (
      <div>
        <RegisterForm/>
      </div>
    );
  }
  
  export default Register;
  
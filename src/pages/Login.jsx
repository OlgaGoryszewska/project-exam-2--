import LoginForm from "../components/LoginForm" 
import { useAuthState } from '../hooks/useAuthState'
import Nav from '../components/Nav'

function Login() {
    const { profile } = useAuthState()
    return (
        <>
          <Nav profile={profile} />
        <div className="px-4">
            <LoginForm />

        </div>
        </>
    )
}

export default Login

import RegisterForm from '../components/RegisterUserForm'
import { useAuthState } from '../hooks/useAuthState'
import Nav from '../components/Nav'

function Register() {
    const { profile } = useAuthState()
    return (
        <>
            <Nav profile={profile} />
            <div className="px-4">
                <RegisterForm />
            </div>
        </>
    )
}

export default Register

import LoginForm from "../components/LoginForm" 

function Login() {
    return (
        <div className="">
            <LoginForm />
            <button
            onClick={() => window.location.href = '/Profile'}
            >Profile</button>

        </div>
    )
}

export default Login

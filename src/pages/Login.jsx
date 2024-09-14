import LoginForm from "../components/LoginForm" 

function Login() {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
            <button
            onClick={() => window.location.href = '/Profile'}
            >Profile</button>

        </div>
    )
}

export default Login

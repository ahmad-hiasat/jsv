import { useState } from 'react';
import './styles/Login.css';

function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'https://jsv-back-end.onrender.com/api/login',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            const data = await response.json();
            alert(data.message);

        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>username</label>
                        <input
                            type={'text'}
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/NavBar.css";

function NavBar() {
    const [isSigned, setIsSigned] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSign = async () => {
            try {
                const res = await fetch(
                    "https://jsv-back-end.onrender.com/api/isSign",
                    { credentials: "include" }
                );

                const data = await res.json();
                setIsSigned(data.isSign);
            } catch {
                setIsSigned(false);
            }
        };

        checkSign();
    }, []);

    const signOut = async () => {
        await fetch(
            "https://jsv-back-end.onrender.com/api/sing-out",
            {
                method: "POST",
                credentials: "include",
            }
        );

        setIsSigned(false);
        navigate("/login");
    };

    return (
        <div className="nav">
            <p className="JSV">JSV</p>

            <ul className="list">
                <li>
                    <Link to="/" className="router_name">home</Link>
                </li>

                <li>
                    <Link to="/about" className="router_name">about</Link>
                </li>

                {!isSigned && (
                    <>
                        <li>
                            <Link to="/login" className="router_name">login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="router_name">register</Link>
                        </li>
                    </>
                )}

                {isSigned && (
                    <li>
                        <button onClick={signOut} className="router_name">
                            signout
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default NavBar;

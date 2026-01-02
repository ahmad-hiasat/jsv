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
        await fetch("https://jsv-back-end.onrender.com/api/sing-out", {
            method: "POST",
            credentials: "include",
        });

        setIsSigned(false);
        navigate("/login");
    };

    const navItems = [
        { name: "home", to: "/" },
        { name: "about", to: "/about" },
    ];

    if (isSigned === true) {
        navItems.push({ name: "sign-out", action: signOut });
    }

    if (isSigned === false) {
        navItems.push(
            { name: "login", to: "/login" },
            { name: "register", to: "/register" }
        );
    }

    return (
        <div className="nav">
            <p className="JSV">JSV</p>

            <ul className="list">
                {navItems.map((item, index) => (
                    <li key={index}>
                        {item.to ? (
                            <Link to={item.to} className="router_name">
                                {item.name}
                            </Link>
                        ) : (
                            <span onClick={item.action} className="router_name">
                {item.name}
              </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NavBar;

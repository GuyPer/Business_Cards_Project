import { useContext, useEffect, useState } from 'react';
import './NavbarMenu.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { ThemeContext } from '../../../context/ThemeContext';

export default function NavbarMenu() {
    const theme = useContext(ThemeContext)
    const auth = useContext(AuthContext)
    const [isLightMode, setIsLightMode] = useState(true);

    useEffect(() => {
        const handleLightDarkMode = () => {
            const themeResult = localStorage.getItem("theme");
            if (themeResult === "light") { setIsLightMode(true) }
            else if (themeResult === "dark") { setIsLightMode(false) }
            else { return }
        }
        handleLightDarkMode()
    }, [isLightMode])

    return (
        <div className='NavbarMenu'>
            <Link className={`navLinks homeLink ${theme?.isLightMode ? 'lightLinks' : 'darkLinks'}`} to="home">Home</Link>
            {auth?.isSignedIn && <Link className={`navLinks ${theme?.isLightMode ? 'lightLinks' : 'darkLinks'}`} to={"favourites"}>Fav cards</Link>}
            {auth?.isBusiness && <Link className={`navLinks ${theme?.isLightMode ? 'lightLinks' : 'darkLinks'}`} to={"mycards"}>My cards</Link>}
            {auth?.isAdmin && <Link className={`navLinks ${theme?.isLightMode ? 'lightLinks' : 'darkLinks'}`} to={"admin"}>Admin</Link>}
            <Link className={`navLinks ${theme?.isLightMode ? 'lightLinks' : 'darkLinks'}`} to="about">About</Link>
        </div>
    );
}

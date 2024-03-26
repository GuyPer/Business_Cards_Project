import { useContext } from 'react'
import LightMode from '../DarkLightMode/LightMode/LightMode'
import LoginSignup from '../LoginSignup/LoginSignup'
import NavbarMenu from '../NavbarMenu/NavbarMenu'
import './MenuForHamburger.css'
import { AuthContext } from '../../../context/AuthContext'
import UserImage from '../UserImage/UserImage'
import { ThemeContext } from '../../../context/ThemeContext'
import DarkMode from '../DarkLightMode/DarkMode/DarkMode'

interface IMenuForHamburger {
    onclick?: (isOpen: boolean) => void;
    isOpen?: boolean;
    imageUrl?: string
    ImageAlt?: string
}

export default function MenuForHamburger(props: IMenuForHamburger) {

    const theme = useContext(ThemeContext)
    const auth = useContext(AuthContext)

    return (
        <div onClick={() => { props.onclick && props.onclick(!props.isOpen) }} className='HamburgerForMdsobile'>
            <div className={`divMenu ${theme?.isLightMode ? 'light menuLight' : 'dark menuDark'}`}>
                <NavbarMenu />
                {auth?.isSignedIn ?
                    <UserImage imageUrl={auth.userDetails?.image.url} ImageAlt={auth.userDetails?.image.alt} />
                    :
                    <LoginSignup />
                }{
                    theme?.isLightMode ?
                        <LightMode />
                        : <DarkMode />
                }
            </div>
        </div>
    )
}

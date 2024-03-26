import './Header.css'
import SearchNav from './SearchNav/SearchNav'
import HamburgerForMobile from './HamburgerForMobile/HamburgerForMobile'
import Company from './Company/Company'
import MenuForHamburger from './MenuForHamburger/MenuForHamburger'
import { useContext, useEffect, useState } from 'react'
import NavbarMenu from './NavbarMenu/NavbarMenu'
import LoginSignup from './LoginSignup/LoginSignup'
import LightMode from './DarkLightMode/LightMode/LightMode'
import { AuthContext } from '../../context/AuthContext'
import UserImage from './UserImage/UserImage'
import { ThemeContext } from '../../context/ThemeContext'
import DarkMode from './DarkLightMode/DarkMode/DarkMode'

export default function Header() {

    const auth = useContext(AuthContext)
    const theme = useContext(ThemeContext)
    const [isOpenMenuForMobile, setIsOpenMenuForMobile] = useState(false);

    useEffect(() => {
        auth?.loadUserFromLS()
    }, [auth?.isSignedIn])

    useEffect(() => {
        theme?.loadThemeFromLS()
    }, [theme?.isLightMode])

    return (
        <div className='Header'>
            <nav className={`navBar ${theme?.isLightMode ? 'light' : 'dark'}`}>
                <Company isLogoForMobileSize={'logoForMobileSize'} />
                <HamburgerForMobile onclick={setIsOpenMenuForMobile} isOpen={isOpenMenuForMobile} />
                {isOpenMenuForMobile && <div className='mobile'>
                    <MenuForHamburger onclick={setIsOpenMenuForMobile} isOpen={isOpenMenuForMobile} />
                </div>}
                <div className='notMobile'>
                    <Company isLogoForMobileSize={'logoForNotMobileSize'} />
                    <NavbarMenu />
                    <div><SearchNav /></div>
                    {auth?.isSignedIn ?
                        <UserImage imageUrl={auth.userDetails?.image.url} ImageAlt={auth.userDetails?.image.alt} />
                        :
                        <LoginSignup />
                    }{theme?.isLightMode ?
                        <LightMode />
                        :
                        <DarkMode />}
                </div>
                <div className='mobile'>
                    <SearchNav />
                </div>
            </nav>
        </div>
    )
}
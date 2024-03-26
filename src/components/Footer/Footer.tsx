
import './Footer.css'
import { Link } from 'react-router-dom'
import FooterForm from './FooterForm/FooterForm'
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';


export default function Footer() {

  const theme = useContext(ThemeContext)
  const check = localStorage.getItem("theme")
  useEffect(() => { theme?.loadThemeFromLS }, [check])

  return (
    <div className={`Footer`}>
      <footer className={`footer ${theme?.isLightMode ? 'light' : 'dark'}`}>
        <div className='AboutUs'>
          <h5 className='footerHeaders aboutUsHeader'>
            About us</h5>
          <p className='pAboutUs'>Our company expert on exposing businesses with our more than 100,000 users</p>
          <p className='copyrights'>&copy; Guy Peretz. All rights reserved.</p>
        </div>
        <div className='quickLinks'>
          <h5 className='footerHeaders'>Quick Links</h5>
          <Link className='footerLinks homeFooterLink' to={"/home"}>Home</Link>
          <Link className='footerLinks' to={"/about"}>About</Link>
        </div>
        <div className='socialMedia'>
          <h5 className='footerHeaders'>Join our social media</h5>
          <div className='socialMediaLogos'>
            <a href="https://www.linkedin.com/in/guy-peretz-bba8a2133" target="_blank"><img className="myPersonalLogos" src="/public/images/logos/linkedin.png" alt="Linkedin" /></a>
            <a href="https://www.facebook.com/guy.peretz1?mibextid=ZbWKwL" target="_blank"><img className="myPersonalLogos" src="/public/images/logos/facebook.png" alt="facebook" /></a>
            <a href="https://www.instagram.com/guy__peretz?igsh=MXZraDMwbGJwYTkzdg==" target="_blank"><img className="myPersonalLogos" src="/public/images/logos/instagram.png" alt="instagram" /></a>
          </div>
        </div>
        <div className={`contactUs ${theme?.isLightMode ? 'contactUsLight' : 'contactUsDark'}`}>
          <h5 className='footerHeaders contactUsHeader'>Contact us</h5>
          <FooterForm />
        </div>
      </footer>
    </div>
  )
}

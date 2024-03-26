import { Link } from 'react-router-dom';
import './UserImage.css'
import { FaUser } from "react-icons/fa";
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { IUserImage } from '../../../interfaces/UserInterfaces';

export default function UserImage(props: IUserImage) {

    const theme = useContext(ThemeContext)
    return (
        <div className='UserImage'>
            <Link className='' to="user">
                {props.imageUrl !== undefined ? <img className={`userLogo ${theme?.isLightMode ? "light" : "dark"}`} src={props.imageUrl} alt={props.ImageAlt} /> :
                    <div className={`userIcon`}>
                        <FaUser className={`userDefaultLogo ${theme?.isLightMode ? "light" : "dark"}`} />
                    </div>
                }
            </Link>
        </div>
    )
}

import { Link } from 'react-router-dom';
import './AppLinks.css';

interface IAppLinks {
    linkTo: string;
    context: string;
    isLightMode?: boolean;
}

export default function AppLinks(props: IAppLinks) {
    return (
        <div className='AppLinks'>
            <Link to={props.linkTo} className={props.isLightMode ? 'lightMode' : 'darkMode'}>
                {props.context}
            </Link>
        </div>
    );
}

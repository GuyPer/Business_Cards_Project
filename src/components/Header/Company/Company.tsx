import { TiBusinessCard } from 'react-icons/ti'
import './Company.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext'

interface ICompany {
    isLogoForMobileSize: string
}

export default function Company(props: ICompany) {

    const auth = useContext(AuthContext)

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M2 2v20h20V2H2zm9 16H5v-2h6v2zm0-4H5v-2h6v2zm0-4H5V8h6v2zm8 8h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6V8h6v2zm2 8h-1v-3h-6V5h7v2h-4.586l-1.707 1.707L15.414 9H18v10zm1-12h-3V3h3v3z"/></svg>';
        document.head.appendChild(link);
    }, []);


    return (
        <div className={`Company ${props.isLogoForMobileSize}`}>
            <TiBusinessCard className={`businessCardLogo ${auth?.isSignedIn && `LoggedIn`}`} size={30} />
            <div className='webName'>BCards</div>
        </div>
    )
}

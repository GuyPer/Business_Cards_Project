import './LoginSignup.css'
import { Link } from 'react-router-dom'
import AppButton from '../../AppButton/AppButton'

export default function LoginSignup() {

    return (
        <div className='LoginSignup'>
            <div className='LoginSignupDiv'>
                <Link style={{ textDecoration: 'none' }} to="login"><AppButton className='loginBtn' bootstarpButton='btn btn-success' context='LOGIN' /></Link>
                <Link style={{ textDecoration: 'none' }} to="signup"><AppButton className='signupBtn' bootstarpButton='btn btn-success' context='SIGNUP' /></Link>
            </div>
        </div>
    )
}

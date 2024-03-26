import { MdDarkMode } from 'react-icons/md'
import './LightMode.css'
import { useContext } from 'react'
import { ThemeContext } from '../../../../context/ThemeContext'

export default function LightMode() {

    const theme = useContext(ThemeContext)

    return (
        <div className='LightMode'>
            <MdDarkMode onClick={() => theme?.handleLightDarkModes()} size={30} />
        </div>
    )
}

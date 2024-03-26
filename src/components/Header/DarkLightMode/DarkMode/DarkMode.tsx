import { useContext } from "react"
import "./DarkMode.css"
import { ThemeContext } from "../../../../context/ThemeContext"
import { IoSunny } from "react-icons/io5"

export default function DarkMode() {

    const theme=useContext(ThemeContext)

    return (
        <div className="DarkMode">
            <IoSunny onClick={()=>theme?.handleLightDarkModes()} size={30}/>  
        </div>
    )
}

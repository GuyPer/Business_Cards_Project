
import './AppButton.css'

interface IAppButton {
    context: string
    width?: string
    height?: string
    color?: string
    backGroundColor?: string
    bootstarpButton?: string
    className?: string
    fnHandleButton?: (param?: string | undefined) => void
    type?: "submit" | "reset" | "button" | undefined
}

export default function AppButton(props: IAppButton) {

    const handleClick = () => {
        if (props.fnHandleButton) {
            // Check if fnHandleButton exists before calling it
            props.fnHandleButton("optional parameter");
        }
    };


    return (
        <div className="AppButton">
            <button className={`${props.bootstarpButton} ${props.className}`} onClick={handleClick} type={props.type} style={{ color: props.color, backgroundColor: props.backGroundColor, width: props.width, height: props.height }}>{props.context}</button>
        </div>
    )
}

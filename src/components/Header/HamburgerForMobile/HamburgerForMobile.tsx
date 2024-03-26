import './HamburgerForMobile.css'

interface IHamburgerForMobile {
    onclick: (isOpen: boolean) => void;
    isOpen: boolean;
}

export default function HamburgerForMobile(props: IHamburgerForMobile) {
    return (
        <div onClick={() => { props.onclick(!props.isOpen) }} className='HamburgerForMobile'>
            &#9776;
        </div>
    )
}

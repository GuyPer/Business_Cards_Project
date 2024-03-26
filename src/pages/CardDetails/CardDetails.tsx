import { useContext, useEffect, useState } from 'react';
import './CardDetails.css'
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { FaHeart } from 'react-icons/fa';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { LikedCardsContext } from '../../context/LikedCardsContext';
import { ToastsContext } from '../../context/ToastsContext';
import { ICards } from '../../interfaces/CardInterfaces';
import { doDeleteMyCard, doGetCardById, doGetMyCards } from '../../Services/CardsService';

export default function CardDetails() {

    const cardIdFromLS: string = localStorage.getItem("cardIdToRender") || "";

    const toast = useContext(ToastsContext)
    const likeCard = useContext(LikedCardsContext);
    const auth = useContext(AuthContext)
    const theme = useContext(ThemeContext)
    const [cardsOfUser, setCardsOfUser] = useState<ICards[] | null>(null);
    const [error, setError] = useState("")
    const [cardDetails, setCardDetails] = useState<ICards | null>(null)

    useEffect(() => {
        const getMyCards = async () => {
            let { error, result } = await doGetMyCards()
            if (result) { setCardsOfUser(result) }
            if (error) { setError(error) }
        }
        getMyCards()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchCardData = async () => {
            const cardIdToRender: string | null = localStorage.getItem("cardIdToRender")
            if (cardIdToRender) {
                let { error, result } = await doGetCardById(cardIdToRender)
                if (result) { setCardDetails(result) }
                if (error) { return error }
            }
        }
        fetchCardData()
    }, [])

    const handleLikedByUser = (cardId: string) => {
        likeCard?.likedCards(cardId)
    };

    useEffect(() => {
        ("likedCardsArray");
        const likedArrayToLS = JSON.stringify(likeCard?.likedCardsArray)

        localStorage.setItem("likedCardsArray", `${likedArrayToLS}`)
    }, [likeCard?.likedCards])

    const deleteCard = async (cardId: string) => {
        let { error, result } = await doDeleteMyCard(cardId)
        if (result) {
            toast?.addToast("Card Deleted ! ")
        }
        if (error) { return error }
    }

    return (
        <div className={`CardDetails ${theme?.isLightMode ? `cardDetailsLight` : `cardDetailsDark`}`}>
            {cardDetails ?
                <div className='divOfCard'>
                    <div className='aboveImg'>
                        <h1 className='title'>{cardDetails.title}</h1>
                        <h3 className='subtitle'>{cardDetails.subtitle}</h3>
                    </div>
                    <img className='image' src={`${cardDetails.image.url}`} alt={`${cardDetails.image.alt}`} />
                    <div className='belowImg'>
                        <h4 className='description'>{cardDetails.description}</h4>
                        <h5 className='phone'>Phone number: {cardDetails.phone}</h5>
                        <h5 className='email'>Email: {cardDetails.email}</h5>
                        <h5 className='address'>Address: {cardDetails.address.state}  {cardDetails.address.country} {cardDetails.address.city} {cardDetails.address.street} {cardDetails.address.houseNumber} {cardDetails.address.zip}</h5>
                        {cardDetails.web &&
                            <div className='web'>
                                <p>Web Link: <a className='web' href={`${cardDetails.web}`} target="_blank" > {cardDetails.web}</a></p>
                            </div>
                        }</div>
                    <div className='cardIconsDiv'>
                        {auth?.isAdmin || cardsOfUser?.some(card => card._id === cardIdFromLS) ? (
                            <div className='adminIcons'>
                                <div className=''>
                                    <MdDelete onClick={() => deleteCard(cardIdFromLS)} />
                                    <Link onClick={() => localStorage.setItem("cardIdToEdit", `${cardIdFromLS}`)} to={"/mycards/editcard"}>
                                        <MdOutlineEdit className={
                                            `editIcon ${theme?.isLightMode ? `light` : `dark`}`
                                        } />
                                    </Link>
                                </div>
                            </div>
                        ) : null}
                        {auth?.isSignedIn &&
                            <div className='heartIcon'>
                                <FaHeart onClick={() => handleLikedByUser(cardIdFromLS)} className={`likeBtn ${likeCard?.likedCardsArray.includes(cardIdFromLS) ? `liked` : ``}`} />
                            </div>}
                    </div>
                </div>
                :
                (!error) && <h1>Loading, please wait</h1>
            }
        </div >
    )
}
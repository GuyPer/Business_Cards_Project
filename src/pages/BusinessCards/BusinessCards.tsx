import { useContext, useEffect, useState } from 'react'
import './BusinessCards.css'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import AppButton from '../../components/AppButton/AppButton'
import { Button } from 'react-bootstrap'
import { FaHeart } from 'react-icons/fa'
import { LikedCardsContext } from '../../context/LikedCardsContext'
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ToastsContext } from '../../context/ToastsContext'
import { SearchContext } from '../../context/SearchContext'
import { ThemeContext } from '../../context/ThemeContext'
import { ICards } from '../../interfaces/CardInterfaces'
import { doDeleteMyCard, doGetMyCards } from '../../Services/CardsService'

export default function BusinessCards() {
    const theme = useContext(ThemeContext)
    const auth = useContext(AuthContext)
    const likeCard = useContext(LikedCardsContext);
    const toast = useContext(ToastsContext)
    const search = useContext(SearchContext)
    const navigate = useNavigate();
    const [cards, setCards] = useState<ICards[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isHavingCards, SetIsHavingCards] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const getMyCards = async () => {
            let { error, result } = await doGetMyCards()
            if (result) {
                search?.setSearchVal("")
                setCards(result)
                if (result.length === 0) {
                    SetIsHavingCards("Empty")
                } else { SetIsHavingCards("") }
            }
            if (error) { setError(error) }
        }
        getMyCards()
    }, [toast?.addToast])

    const descriptionLimit = (description: string, limit: number): string => {
        if (description.length > limit) {
            description = description.slice(0, limit);
        }
        return description;
    };

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
        if (error) {
            setError(error)
        }
    }

    const handleClickOnImg = (cardId: string) => {
        localStorage.setItem("cardIdToRender", `${cardId}`)
        navigate("/mycards/cardDetails")
    }

    return (
        <div className={`BusinessCards Page ${isHavingCards}`}>
            <h3 className='title'>Business Page</h3>
            <br></br>
            {
                (auth?.isSignedIn && (auth.isBusiness || auth.isAdmin)) ? <>
                    <Link style={{ textDecoration: 'none' }} to="../newcards">
                        <Button className='SubmitBtn btn btn-success'>Create New Business Card</Button>
                    </Link>
                    <div className='cardsContainer'>
                        {search?.searchVal && cards?.map((card) => card) ?
                            (cards.filter(card => card.title.toLowerCase().includes(search?.searchVal.toLowerCase())).length == 0 ?
                                <div style={{ color: "red" }}>
                                    It looks like there is no good match for your search</div>
                                : cards.filter(card => card.title.toLowerCase().includes(search?.searchVal.toLowerCase())).map((card) => (
                                    <div key={card._id} className={`divofCard ${theme?.isLightMode ? `divofCardLight` : `divofCardDark`}`}>
                                        <img className='cardImage' src={card.image.url} alt='' onClick={() => handleClickOnImg(card._id)} />
                                        <h2 className='cardTitle'>{card.title}</h2>
                                        <h5 className='cardDescription'>{descriptionLimit(card.description, 33)}</h5>
                                        <p className='cardPhone'>{card.phone}</p>
                                        <p className='cardAddress'>{`${card.address.street} ${card.address.houseNumber} ${card.address.country}`}</p>
                                        {auth?.isSignedIn &&
                                            <div className='adminIcons'>
                                                <div className='leftIcons'>
                                                    <MdDelete onClick={() => deleteCard(card._id)} />
                                                    <Link onClick={() => localStorage.setItem("cardIdToEdit", `${card._id}`)} to={"/mycards/editcard"}>
                                                        <MdOutlineEdit className={
                                                            `editIcon ${theme?.isLightMode ? `light` : `dark`}`
                                                        } />
                                                    </Link>
                                                </div>
                                                <div className='rightIcons'>
                                                    <FaHeart onClick={() => handleLikedByUser(card._id)} className={`likeBtn ${likeCard?.likedCardsArray.includes(card._id) ? `liked` : ``}`} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))
                            )
                            : (cards) ? (
                                cards.map((card) => (
                                    <div key={card._id} className={`divofCard ${theme?.isLightMode ? `divofCardLight` : `divofCardDark`}`}>
                                        <img className='cardImage' src={card.image.url} alt='' onClick={() => handleClickOnImg(card._id)} />
                                        <h2 className='cardTitle'>{card.title}</h2>
                                        <h5 className='cardDescription'>{descriptionLimit(card.description, 33)}</h5>
                                        <p className='cardPhone'>{card.phone}</p>
                                        <p className='cardAddress'>{`${card.address.street} ${card.address.houseNumber} ${card.address.country}`}</p>
                                        {auth?.isSignedIn &&
                                            <div className='adminIcons'>
                                                <div className='leftIcons'>
                                                    <MdDelete onClick={() => deleteCard(card._id)} />
                                                    <Link onClick={() => localStorage.setItem("cardIdToEdit", `${card._id}`)} to={"/mycards/editcard"}>
                                                        <MdOutlineEdit className={
                                                            `editIcon ${theme?.isLightMode ? `light` : `dark`}`
                                                        } />
                                                    </Link>
                                                </div>
                                                <div className='rightIcons'>
                                                    <FaHeart onClick={() => handleLikedByUser(card._id)} className={`likeBtn ${likeCard?.likedCardsArray.includes(card._id) ? `liked` : ``}`} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))
                            ) :
                                (!error) && <h1>Loading, please wait</h1>
                        }
                    </div>
                </>
                    :
                    <>
                        <p>You logged Out, you have to be signed in as Business to see this page </p>
                        <div className="btn">
                            <Link style={{ textDecoration: 'none' }} to="../login"><AppButton bootstarpButton='btn btn-success' context='LOGIN' /></Link>
                        </div>
                    </>
            }
        </div>
    )
}
import { useContext, useEffect, useState } from 'react';
import './Home.css';
import { AuthContext } from '../../context/AuthContext';
import { FaHeart } from "react-icons/fa";
import { LikedCardsContext } from '../../context/LikedCardsContext';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { SearchContext } from '../../context/SearchContext';
import { ThemeContext } from '../../context/ThemeContext';
import { ICards } from '../../interfaces/CardInterfaces';
import { doDeleteMyCard, doGetAllCards, doGetMyCards } from '../../Services/CardsService';

export default function Home() {
    const [cards, setCards] = useState<ICards[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const toast = useContext(ToastsContext)
    const search = useContext(SearchContext)
    const auth = useContext(AuthContext);
    const theme = useContext(ThemeContext)
    const likeCard = useContext(LikedCardsContext);
    const navigate = useNavigate();
    const [cardsOfUser, setCardsOfUser] = useState<ICards[] | null>(null);

    useEffect(() => {
        const getMyCards = async () => {
            let { error, result } = await doGetMyCards()
            if (result) {
                setCardsOfUser(result)
            }
            if (error) { setError(error) }
        }
        getMyCards()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchAllCardsfromServer = async () => {
            let { error, result } = await doGetAllCards()
            if (result) {
                setCards(result);
                search?.setSearchVal("");
            }
            if (error) { setError(error) }
        };
        fetchAllCardsfromServer();
    }, []);

    useEffect(() => {
        const fetchAllCardsfromServer = async () => {
            let { error, result } = await doGetAllCards()
            if (result) {
                setCards(result);
                search?.setSearchVal("");
            }
            if (error) { setError(error) }
        };
        fetchAllCardsfromServer();
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
        if (error) { setError(error) }
    }

    const handleClickOnImg = (cardId: string) => {
        localStorage.setItem("cardIdToRender", `${cardId}`)
        navigate("/mycards/cardDetails")
    }

    return (
        <div className='Home Page'>
            <div className='pageTitles'>
                <h1 className='title'>Cards Page</h1>

                <h4 className='subTitle'>Here you can find business cards from all categories</h4>
            </div>
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
                                <div className='cardIconsDiv'>
                                    {auth?.isAdmin || cardsOfUser?.some(cardOfList => cardOfList._id === card._id) ? (
                                        <div className='adminIcons'>
                                            <div className=''>
                                                <MdDelete onClick={() => deleteCard(card._id)} />
                                                <Link onClick={() => localStorage.setItem("cardIdToEdit", `${card._id}`)} to={"/mycards/editcard"}>
                                                    <MdOutlineEdit className={
                                                        `editIcon ${theme?.isLightMode ? `light` : `dark`}`
                                                    } />
                                                </Link>
                                            </div>
                                        </div>
                                    ) : null}
                                    {auth?.isSignedIn &&
                                        <div className='heartIcon'>
                                            <FaHeart onClick={() => handleLikedByUser(card._id)} className={`likeBtn ${likeCard?.likedCardsArray.includes(card._id) ? `liked` : ``}`} />
                                        </div>}
                                </div>
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
                                <div className='cardIconsDiv'>
                                    {auth?.isAdmin || cardsOfUser?.some(cardOfList => cardOfList._id === card._id) ? (
                                        <div className='adminIcons'>
                                            <div className=''>
                                                <MdDelete onClick={() => deleteCard(card._id)} />
                                                <Link onClick={() => localStorage.setItem("cardIdToEdit", `${card._id}`)} to={"/mycards/editcard"}>
                                                    <MdOutlineEdit className={
                                                        `editIcon ${theme?.isLightMode ? `light` : `dark`}`
                                                    } />
                                                </Link>
                                            </div>
                                        </div>
                                    ) : null}
                                    {auth?.isSignedIn &&
                                        <div className='heartIcon'>
                                            <FaHeart onClick={() => handleLikedByUser(card._id)} className={`likeBtn ${likeCard?.likedCardsArray.includes(card._id) ? `liked` : ``}`} />
                                        </div>}
                                </div>
                            </div>
                        ))
                    ) : error ?
                        <div className='errorDiv'>
                            <p className='textError'>Error getting cards: {error}</p>
                        </div>
                        :
                        (!error) && <p className='textLoading'>Loading, please wait</p>
                }
            </div>
        </div>
    );
}
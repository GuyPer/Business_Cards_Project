import { useContext, useEffect, useState } from 'react';
import './FavoriteCards.css';
import { LikedCardsContext } from '../../context/LikedCardsContext';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import AppButton from '../../components/AppButton/AppButton';
import { ICards } from '../../interfaces/CardInterfaces';
import { doGetAllCards } from '../../Services/CardsService';

export default function FavoriteCards() {
    const theme = useContext(ThemeContext)
    const search = useContext(SearchContext)
    const likeCard = useContext(LikedCardsContext);
    const { likedCardsArray } = useContext(LikedCardsContext)!;
    const [favCards, setFavCards] = useState<ICards[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchAllCardsfromServer = async () => {
            let { error, result } = await doGetAllCards()
            if (result) {
                const userId = localStorage.getItem("userId")
                const likedArrayByUser = localStorage.getItem(`${userId}`);
                const filteredCards = result.filter((card: ICards) => likedArrayByUser?.includes(card._id));
                search?.setSearchVal("");
                setFavCards(filteredCards);
                setIsLoading(false);
            }
            if (error) { setError(error) }
        };
        fetchAllCardsfromServer();
    }, [likedCardsArray]);

    const handleClickOnImg = (cardId: string) => {
        localStorage.setItem("cardIdToRender", `${cardId}`)
        navigate("../myCards/CardDetails")
    }

    useEffect(() => {
        const likedArrayToLS = JSON.stringify(likeCard?.likedCardsArray)
        localStorage.setItem("likedCardsArray", `${likedArrayToLS}`)
    }, [likeCard?.likedCards])

    const handleLikedByUser = (cardId: string) => {
        likeCard?.likedCards(cardId)
    };

    return (
        <div className={`FavoriteCards Page ${favCards?.length === 0 ? `Empty` : ``}`}>
            <h1 className='title'>Favourites cards </h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                favCards?.length ? (
                    <div className='cardsContainer'>
                        {favCards.filter((card) => card.title.toLocaleLowerCase().includes(search?.searchVal.toLocaleLowerCase() || ""))
                            .map((card) => (
                                <div key={card._id} className={`divofCard ${theme?.isLightMode ? `divofCardLight` : `divofCardDark`}`}>
                                    <img className='cardImage' src={card.image.url} alt='' onClick={() => handleClickOnImg(card._id)} />
                                    <h2 className='cardTitle'>{card.title}</h2>
                                    <h5 className='cardDescription'>{card.description}</h5>
                                    <p className='cardPhone'>{card.phone}</p>
                                    <p className='cardAddress'>{`${card.address.street} ${card.address.houseNumber} ${card.address.country}`}</p>
                                    <div className='removeBtn'>
                                        <AppButton fnHandleButton={() => handleLikedByUser(card._id)} bootstarpButton='btn btn-danger' className='removeBtn' context={'Remove'} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    error ? <p>Error: {error}</p> : <p className='pNoFavCards'>No favorite cards found.</p>
                )
            )}
        </div>
    );
}
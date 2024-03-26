import React, { createContext, useState, useEffect } from "react";

interface LikedCardsContextType {
    likedCards: (id: string) => void;
    likedCardsArray: string[];
    isLiked: boolean;
    likedArrayOfUser: string[];
    resetLikedArr: () => void;
    initializeLikedArray: () => void;
}

export const LikedCardsContext = createContext<LikedCardsContextType | undefined>(undefined);

export default function LikedCardsProvider({ children }: { children: React.ReactNode }) {
    const userId = localStorage.getItem("userId");
    const [isLiked, setIsLiked] = useState(false);
    const [likedCardsArray, setLikedCardsArray] = useState<string[]>([]);
    const [likedArrayOfUser, useLikedArrayOfUser] = useState<string[]>([]);


    useEffect(() => {
        initializeLikedArray();
    }, [userId]);

    useEffect(() => {
        if (userId !== null) {
            localStorage.setItem(`${userId}`, JSON.stringify(likedCardsArray));
        }
    }, [likedCardsArray, userId]);

    const likedCards = (id: string) => {
        setLikedCardsArray(prevLikedCardsArray => {
            const updatedArray = prevLikedCardsArray.includes(id)
                ? prevLikedCardsArray.filter(cardId => cardId !== id)
                : [...prevLikedCardsArray, id];

            localStorage.setItem("likedCardsArray", JSON.stringify(updatedArray));
            localStorage.setItem(`${userId}`, JSON.stringify(updatedArray));
            useLikedArrayOfUser(updatedArray)

            setIsLiked(updatedArray.includes(id));
            return updatedArray;
        });
    };

    const resetLikedArr = () => {
        localStorage.removeItem("likedCardsArray");
    };

    const initializeLikedArray = () => {
        const likedArrayOfUser = localStorage.getItem(`${userId}`);
        if (likedArrayOfUser) {
            setLikedCardsArray(JSON.parse(likedArrayOfUser));
        }
    };

    return (
        <LikedCardsContext.Provider value={{ likedCards, likedCardsArray, isLiked, likedArrayOfUser, resetLikedArr, initializeLikedArray }}>
            {children}
        </LikedCardsContext.Provider>
    );
}
import React, { useContext } from 'react';
import AppButton from '../../AppButton/AppButton';
import './SearchNav.css';
import { SearchContext } from '../../../context/SearchContext';

let inputValue: string;

export default function SearchNav() {

    const search = useContext(SearchContext);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputValue = event.target.value;
        if (search?.searchVal === null) {
            search.setSearchVal(inputValue)
        }
    };

    const handleSearchBtn = () => {
        search?.setSearchVal(inputValue);
    }

    return (
        <div className='SearchNav'>
            <input onChange={handleInput} className='searchInput' type="text" />
            <AppButton className='searchBtn' fnHandleButton={handleSearchBtn} bootstarpButton='btn btn-primary' context='Search' />
        </div>
    );
}

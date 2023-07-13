import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GameCard from "../../../components/games-card";
import GameCategories from "../../../components/game-categories";
import SearchBox from "../../../components/search-filter";
import {getCharacters, getCharactersTypes} from "../../../service/characters"
import CharactersContainer from "../../../components/characters/characterContainers"


const AllCharacters = ({ data, setActive }) => {
    const [filterCharacters, setfilterCharacters] = useState([]);
    const [allCharacters, setallCharacters] = useState([]);
    const [types, setTypes] = useState([]);
    const fetchAllCharacters = () => {
        getCharacters()
        .then(charData => {
            setfilterCharacters(charData)
            setallCharacters(charData);
            console.log(charData)
        })
        getCharactersTypes()
        .then(typesOfChar => {
            setTypes(typesOfChar)
            console.log(typesOfChar)
        })
    }
    
    useEffect(() => {
        fetchAllCharacters()
    }, [])
    const selectItem = function (e) {
        const selectedCharacter = e.target.value;
        const filteredCharacters = allCharacters
            .filter((character) => character.category == selectedCharacter.toLowerCase());
        setfilterCharacters(filteredCharacters);
    };

    // -------------------------
    // Search Box Flter
    // -------------------------

    // const searchValueTitle = data?.items.map((item) => item.title);
    const searchHelander = function (e) {
        const searchVal = e.target.value;
    };
    return (
        <section className="games-section pt-16 md:pt-12 pb-16 md:pb-28">
        <div className="container">
            <div className="filter-wrap bg-secondary-70 rounded-2xl px-5 py-7 mb-10 flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-5 md:mb-0">
                    <GameCategories
                        categories={types}
                        selectItem={selectItem}
                    />
                </div>
                <div className="md:ml-5">
                    <SearchBox
                        searchHelander={searchHelander}
                    />
                </div>
            </div>
                <CharactersContainer setActive={setActive} data={filterCharacters}></CharactersContainer>

        </div>
    </section>
    
    );
};
AllCharacters.propTypes = {
    data: PropTypes.shape({
        section_title: PropTypes.shape({
            heading: PropTypes.string,
        }),
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            })
        ),
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            })
        ),
    }),
};
export default AllCharacters;
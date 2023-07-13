import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GameCard from "../../../components/games-card";
import GameCategories from "../../../components/game-categories";
import SearchBox from "../../../components/search-filter";
import {getWeapons, getTypesOfGuns} from "../../../service/weapons"
import WeaponsContainer from "../../../components/weapons/weaponsContainer"


const AllWeapons = ({ data }) => {
    const [filterGames, setFilterGames] = useState([]);
    const [allWeapons, setallWeapons] = useState([]);
    const [types, setTypes] = useState([]);
    const fetchGunsData = () => {
        getWeapons()
        .then(wepData => {
            setFilterGames(wepData)
            setallWeapons(wepData);
            console.log(wepData)
        })
        getTypesOfGuns()
        .then(typesOfWep => {
            setTypes(typesOfWep)
            console.log(typesOfWep)
        })
    }
    
    useEffect(() => {
        fetchGunsData()
    }, [])
    const selectItem = function (e) {
        const selectWeapon = e.target.value;
        const filteredGames = allWeapons
            .filter((weapon) => weapon.type.toLowerCase() == selectWeapon.toLowerCase());
        setFilterGames(filteredGames);
    };

    // -------------------------
    // Search Box Flter
    // -------------------------

    // const searchValueTitle = data?.items.map((item) => item.title);
    const searchHelander = function (e) {
        const selectWeapon = e.target.value;
        const filteredGames = allWeapons
            .filter((weapon) => weapon.name.toLowerCase().includes(selectWeapon.toLowerCase()) || weapon.subType.toLowerCase().includes(selectWeapon.toLowerCase()) );
        setFilterGames(filteredGames);
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
                <WeaponsContainer data={filterGames}></WeaponsContainer>
        </div>
    </section>
    
    );
};
AllWeapons.propTypes = {
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
export default AllWeapons;

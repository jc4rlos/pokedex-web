import React, {memo, useState} from 'react';
import RandomPokemons from './components/random-pokemons/random-pokemons';
import {Pokemons, RandomPokemon} from '../../assets/images/index';
import {Link} from 'react-router-dom';
import {getGeneratePokemons} from '../../utils/pokemon';
import './map.scss';

const Map = () => {
    const [pokemons, setPokemons] = useState(getGeneratePokemons());

    const getRandomNumber = (min, max) => {
        return Math.random() * (max - min) + min;
    };
    const handleGetRandomPokemons = () => {
        setPokemons(getGeneratePokemons());
    };
    return (
        <div className="map">
            <div className="map__header-container">
                <div className="map__pokemons">
                    <Link to="/pokedex">
                        <img src={Pokemons} width="80" alt="pokemons" />
                    </Link>
                </div>
                <div
                    className="map__random"
                    role="presentation"
                    onClick={handleGetRandomPokemons}
                >
                    <img src={RandomPokemon} width="80" alt="random-pokemons" />
                </div>
            </div>
            <RandomPokemons
                pokemons={pokemons}
                setPokemons={setPokemons}
                getRandomNumber={getRandomNumber}
            />
        </div>
    );
};

export default memo(Map);

import React, {memo, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import useInterval from '../../../../hooks/use-interval';
import {getGeneratePokemons} from '../../../../utils/pokemon';
import './random-pokemons.scss';

const RandomPokemons = ({pokemons, setPokemons, getRandomNumber}) => {
    const container = useRef(null);

    const winWidth = container.current
        ? container.current.offsetWidth
        : window.innerWidth;
    const winHeight = container.current
        ? container.current.offsetHeight
        : window.innerHeight;

    useInterval(() => {
        setPokemons(getGeneratePokemons());
    }, 20000);

    return (
        <div className="random-pokemons">
            <div className="random-pokemons__container" ref={container}>
                {pokemons.map((pokemon) => {
                    return (
                        <Link key={pokemon.id} to={`catch/${pokemon.id}`}>
                            <img
                                className="random-pokemons__image"
                                alt="pokemon"
                                src={pokemon.image}
                                style={{
                                    top: getRandomNumber(0, winHeight) + 'px',
                                    left: getRandomNumber(0, winWidth) + 'px',
                                }}
                                width="110"
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(RandomPokemons);

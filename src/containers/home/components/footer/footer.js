import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {Pokemons, Pokeball, RandomPokemon} from '../../../../assets/images/index';
import './footer.scss';

const Footer = ({handleOnGetPokemon, hasPokemon, handleOnCatchPokemon}) => {
    return (
        <div className="footer">
            <div className="footer__container">
                <div className="footer__pokemon">
                    <Link to="/pokedex">
                        <img src={Pokemons} alt="pokemons" width="90" />
                    </Link>
                </div>
                {hasPokemon && (
                    <div
                        className="footer__pokeball"
                        role="presentation"
                        onClick={handleOnCatchPokemon}
                    >
                        <img src={Pokeball} alt="pokeball" width="60" />
                    </div>
                )}
                {!hasPokemon && <div />}
                <div
                    className="footer__random"
                    role="presentation"
                    onClick={handleOnGetPokemon}
                >
                    <img src={RandomPokemon} alt="random-pokemon" width="100" />
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);

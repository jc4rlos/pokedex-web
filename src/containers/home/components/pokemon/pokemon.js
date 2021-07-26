import React, {memo} from 'react';
import {BadgePokeball, ExitCatch} from '../../../../assets/images';
import {POKEMON_TYPES} from '../../../../constants/pokemon-types';
import {toTitleCase} from '../../../../utils/string';
import './pokemon.scss';

const Pokemon = ({pokemon, onFinishCapture}) => {
    return (
        <div className="pokemon">
            <div
                className="pokemon__exit-catch"
                role="presentation"
                onClick={onFinishCapture}
            >
                <img src={ExitCatch} alt="exit" width="50" />
            </div>
            <div className="pokemon__type">
                <img src={POKEMON_TYPES[pokemon.firstType]} alt="type" width="50" />
            </div>
            <div className="pokemon__container">
                <div className="pokemon__information">
                    <img src={BadgePokeball} alt="badge-pokeball" width="25" />
                    <span>{toTitleCase(pokemon.name)}</span>
                    <span>/</span>
                    <span>CP {pokemon.cp}</span>
                </div>
                {pokemon && (
                    <div className="pokemon__image">
                        <img src={pokemon.image} width="120" alt="pokemon" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(Pokemon);

import React, {memo} from 'react';
import PokemonThumb from '../pokemon-thumb/pokemon-thumb';
import './pokemons.scss';

const Pokemons = ({pokemons}) => {
    return (
        <div className="pokemons">
            {pokemons &&
                pokemons.map((pokemon) => (
                    <PokemonThumb key={pokemon.id} pokemon={pokemon} />
                ))}
        </div>
    );
};

export default memo(Pokemons);

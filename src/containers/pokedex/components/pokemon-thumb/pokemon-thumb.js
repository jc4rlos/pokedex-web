import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {Favorite, Shiny} from '../../../../assets/images';
import {toTitleCase} from '../../../../utils/string';
import './pokemon-thumb.scss';

const PokemonThumb = ({pokemon}) => {
    return (
        <div className="pokemon-thumb">
            <Link to={`/pokemon-details/${pokemon.id}`}>
                <div>
                    <div className="pokemon-thumb__cp">
                        CP <span>{pokemon.cp}</span>
                    </div>
                    <div className="pokemon-thumb__shiny-favorite">
                        {pokemon.shiny && (
                            <div className="pokemon-thumb__shiny">
                                <img alt="shiny" src={Shiny} width="25" />
                            </div>
                        )}
                        {!pokemon.shiny && <span />}
                        {pokemon.favorite && (
                            <div className="pokemon-thumb__favorite">
                                <img alt="favorite" src={Favorite} width="16" />
                            </div>
                        )}
                        {!pokemon.favorite && <span />}
                    </div>
                    <div className="pokemon-thumb__image">
                        <img alt={pokemon.name} src={pokemon.image} width="100" />
                    </div>
                    <div className="pokemon-thumb__name">{toTitleCase(pokemon.name)}</div>
                </div>
            </Link>
        </div>
    );
};

export default memo(PokemonThumb);

import React, {memo, useEffect} from 'react';
import SemiCircleProgressBar from 'react-progressbar-semicircle';
import {useHistory, useParams} from 'react-router-dom';
import {
    Candy,
    Favorite,
    FavoriteUnpressed,
    Male,
    Ok,
    StarDust,
} from '../../../../assets/images';
import LoadingOverlay from '../../../../components/loading-overlay/loading-overlay';
import {POKEMON_GENDER, POKEMON_TYPES} from '../../../../constants/pokemon-types';
import {getFirstType} from '../../../../utils/pokemon';
import {toTitleCase} from '../../../../utils/string';
import useGetPokemon from '../../../home/hooks/use-get-pokemon';
import useGetPokemonDetail from '../../hooks/use-get-pokemon-detail';
import './pokemon-detail.scss';

const PokemonDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const {getPokemonById, pokemon, loading} = useGetPokemonDetail();
    const {evolution} = pokemon || {};
    const {getPokemon: getEvolutionPokemon, pokemon: pokemonEvolution} = useGetPokemon();
    const firstType = getFirstType(pokemon ? pokemon.type : 'default');
    const gender = pokemon?.shiny
        ? POKEMON_GENDER[`${pokemon?.gender || 'male'}_shiny`]
        : POKEMON_GENDER[pokemon?.gender || 'male'];

    const goBack = () => {
        history.goBack();
    };

    useEffect(() => {
        getPokemonById(id);
    }, [id]);

    useEffect(() => {
        if (evolution) {
            getEvolutionPokemon(evolution);
        }
    }, [evolution]);

    return (
        <div className={`pokemon-detail pokemon-detail__${firstType}`}>
            <LoadingOverlay show={loading} />
            {pokemon && (
                <>
                    <div className="pokemon-detail__cp">
                        CP <span>{pokemon.cp}</span>
                    </div>
                    <div className="pokemon-detail__favorite">
                        {pokemon.favorite && (
                            <img src={Favorite} alt="favorite" width="40" />
                        )}
                        {!pokemon.favorite && (
                            <img src={FavoriteUnpressed} alt="favorite" width="40" />
                        )}
                    </div>
                    <div className="pokemon-detail__progress-bar">
                        <SemiCircleProgressBar
                            percentage={80}
                            stroke="#ffffff"
                            strokeWidth={5}
                            diameter={350}
                        />
                        ;
                    </div>

                    <div>
                        <img src={pokemon.image} alt="image-pokemon" height="200" />
                    </div>
                    <div className="pokemon-detail__card">
                        <div className="pokemon-detail__gender">
                            <img src={gender || Male} alt="gender" width="40" />
                        </div>
                        <div className="pokemon-detail__name">
                            {toTitleCase(pokemon.name)}
                        </div>

                        <div className="pokemon-detail__hp">
                            {pokemon.cp} / {pokemon.cp} HP
                        </div>

                        <div className="pokemon-detail__height-weight">
                            <div className="pokemon-detail__weight">
                                <div>{pokemon.weight}kg</div>
                                <span>WEIGHT</span>
                            </div>
                            <div className="pokemon-detail__type">
                                <div>
                                    <img
                                        src={POKEMON_TYPES[firstType]}
                                        alt="type"
                                        width="16"
                                    />
                                </div>
                                <span>{firstType.toUpperCase()}</span>
                            </div>
                            <div className="pokemon-detail__height">
                                <div>{pokemon.height}m</div>
                                <span>HEIGHT</span>
                            </div>
                        </div>
                        <hr className="pokemon-detail__hr" />
                        <div className="pokemon-detail__candy-stardust">
                            <div className="pokemon-detail__stardust">
                                <div className="pokemon-detail__candy-text">
                                    <div>
                                        <img src={StarDust} alt="StarDust" width="6" />{' '}
                                        {pokemon.starDust}
                                    </div>
                                    <span>STARDUST</span>
                                </div>
                            </div>
                            <div className="pokemon-detail__candy">
                                <div className="pokemon-detail__candy-text">
                                    <div>
                                        <img src={Candy} alt="candy" width="14" />{' '}
                                        {pokemon.candy}
                                    </div>
                                    <span>{pokemon.name.toUpperCase()} CANDY</span>
                                </div>
                            </div>
                        </div>

                        {pokemon.evolution && pokemonEvolution && (
                            <div className="pokemon-detail__envolve">
                                <div className="pokemon-detail__envolve-button">
                                    <img
                                        className="pokemon-detail__envolve-image"
                                        src={pokemonEvolution.image}
                                        alt="evolution"
                                        width="35"
                                    />
                                    <span>ENVOLVE</span>
                                </div>
                                <div className="pokemon-detail__envolve-candy">
                                    <div>
                                        <img src={Candy} alt="candy" width="14" />
                                        {' 50'}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div onClick={goBack}>
                            <img src={Ok} alt="exit" width="50" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(PokemonDetail);

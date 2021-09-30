/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useEffect, useState} from 'react';
import SemiCircleProgressBar from 'react-progressbar-semicircle';
import {useHistory, useParams} from 'react-router-dom';
import {
    Candy,
    Favorite,
    FavoriteUnpressed,
    Male,
    Ok,
    StarDust,
    Transfer,
} from '../../../../assets/images';
import LoadingOverlay from '../../../../components/loading-overlay/loading-overlay';
import {POKEMON_GENDER, POKEMON_TYPES} from '../../../../constants/pokemon-types';
import {getFirstType, getPokemonRealImage} from '../../../../utils/pokemon';
import useGetPokemon from '../../../home/hooks/use-get-pokemon';
import useEnvolvePokemon from '../../hooks/use-envolve-pokemon';
import useGetPokemonDetail from '../../hooks/use-get-pokemon-detail';
import usePokemonTransfer from '../../hooks/use-pokemon-transfer';
import useSetFavorite from '../../hooks/use-set-favorite';
import PokemonMoves from '../pokemon-moves/pokemon-moves';
import PokemonName from '../pokemon-name/pokemon-name';
import './pokemon-detail.scss';

const PokemonDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const [isFavorite, setIsFavorite] = useState(false);
    const [evolutionLoading, setEvolutionLoading] = useState(false);
    const {getPokemonById, pokemon, loading} = useGetPokemonDetail();
    const {evolution} = pokemon || {};
    const {getPokemon: getEvolutionPokemon, pokemon: pokemonEvolution} = useGetPokemon();
    const {setFavorite, loading: favotiteLoading} = useSetFavorite();
    const {transfer, loading: transferLoading} = usePokemonTransfer();
    const {envolvePokemon, loading: loadingEnvolve} = useEnvolvePokemon();
    const firstType = getFirstType(pokemon ? pokemon.type : 'default');
    const gender = pokemon?.shiny
        ? POKEMON_GENDER[`${pokemon?.gender || 'male'}_shiny`]
        : POKEMON_GENDER[pokemon?.gender || 'male'];

    const goBack = () => {
        history.push('/pokedex');
    };

    const handleOnSetFavorite = () => {
        setFavorite({
            id,
            favorite: !pokemon.favorite,
        });
        setIsFavorite(!pokemon.favorite);
    };

    const handleoOnTransfer = () => {
        transfer(id);
        goBack();
    };

    const handleOnEnvolve = () => {
        if (pokemonEvolution) {
            setEvolutionLoading(true);
            setTimeout(() => {
                const newPokemon = {
                    ...pokemon,
                    name: pokemonEvolution.name,
                    cp: pokemonEvolution.cp,
                    height: pokemonEvolution.height,
                    weight: pokemonEvolution.weight,
                    image: getPokemonRealImage(
                        pokemonEvolution.pokedexId,
                        pokemonEvolution.name,
                        pokemon.shiny
                    ),
                    pokedexId: pokemonEvolution.pokedexId,
                    evolution: null,
                    requiredCandies: null,
                    moves: [],
                };
                envolvePokemon(newPokemon);
                setEvolutionLoading(false);
                window.location.reload();
            }, 3000);
        }
    };

    useEffect(() => {
        getPokemonById(id);
    }, [id]);

    useEffect(() => {
        if (evolution) {
            getEvolutionPokemon(evolution);
        }
    }, [evolution]);

    useEffect(() => {
        setIsFavorite(pokemon?.favorite || false);
    }, [pokemon]);

    return (
        <div className={`pokemon-detail pokemon-detail__${firstType}`}>
            <LoadingOverlay
                show={
                    loading ||
                    favotiteLoading ||
                    transferLoading ||
                    loadingEnvolve ||
                    evolutionLoading
                }
            />
            {pokemon && (
                <>
                    <div className="pokemon-detail__cp">
                        CP <span>{pokemon.cp}</span>
                    </div>
                    <div
                        className="pokemon-detail__favorite"
                        role="presentation"
                        onClick={handleOnSetFavorite}
                    >
                        {isFavorite && <img src={Favorite} alt="favorite" width="40" />}
                        {!isFavorite && (
                            <img src={FavoriteUnpressed} alt="favorite" width="40" />
                        )}
                    </div>
                    <div className="pokemon-detail__progress-bar">
                        <SemiCircleProgressBar
                            percentage={(pokemon.cp / 3000) * 100}
                            stroke="#ffffff"
                            strokeWidth={5}
                            diameter={350}
                        />
                    </div>

                    <div>
                        <img src={pokemon.image} alt="imagen-pokemon" height="200" />
                    </div>
                    <div className="pokemon-detail__card">
                        <div className="pokemon-detail__gender">
                            <img src={gender || Male} alt="gender" width="40" />
                        </div>
                        <PokemonName pokemon={pokemon} />

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
                                <button
                                    className="pokemon-detail__envolve-button"
                                    type="button"
                                    onClick={handleOnEnvolve}
                                    disabled={pokemon.candy < pokemon.requiredCandies}
                                >
                                    <img
                                        className="pokemon-detail__envolve-image"
                                        src={pokemonEvolution.image}
                                        alt="evolution"
                                        width="35"
                                    />
                                    <span>ENVOLVE</span>
                                </button>
                                <div className="pokemon-detail__envolve-candy">
                                    <div>
                                        <img src={Candy} alt="candy" width="14" />
                                        {pokemon.requiredCandies}
                                    </div>
                                </div>
                            </div>
                        )}
                        {pokemon.moves && <PokemonMoves moves={pokemon.moves} />}

                        <div className="pokemon-detail__options">
                            <div />
                            <div onClick={goBack} className="pokemon-detail__options-ok">
                                <img src={Ok} alt="exit" width="50" />
                            </div>
                            {!isFavorite && (
                                <div
                                    className="pokemon-detail__options-transfer"
                                    onClick={handleoOnTransfer}
                                >
                                    <img src={Transfer} alt="transfer" width="50" />
                                </div>
                            )}
                            {isFavorite && <div />}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(PokemonDetail);

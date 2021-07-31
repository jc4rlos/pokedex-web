import {env} from '../constants/environment';
import PokemonMove from '../models/pokemon-moves';
import {generateRandomNumber} from './number';

export const getPokemonType = (types = []) => {
    return types.map((item) => item.type.name).join('/');
};

export const getFirstType = (type) => {
    const [firstType] = type.split('/');
    return firstType;
};

export const getSecondType = (type) => {
    const [, secondType] = type.split('/');
    return secondType;
};

export const getGenerateId = () => {
    const id = generateRandomNumber();

    return `00${id}`.slice(-3);
};

export const getPokemonImage = (id, width = 3) => {
    const newId = `00${id}`.slice(-width);
    return `${env.POKEMON_IMAGES}/${newId}.png`;
};

export const getPokemonShinyImage = (name) => {
    return `${env.POKEMON_SHINY_IMAGES}/${name}.png`;
};

export const getPokemonRealImage = (id, name, isShiny) => {
    return isShiny ? getPokemonShinyImage(name) : getPokemonImage(id);
};

export const getPokemonMove = (moves = [], type) => {
    const items = [
        generateRandomNumber(moves.length - 1),
        generateRandomNumber(moves.length - 1),
    ];
    return moves
        .filter((item, index) => !!item.move && items.includes(index))
        .map(
            ({move}) =>
                new PokemonMove({
                    name: move.name,
                    type,
                })
        );
};

export const getRandomPokemon = () => {
    const id = generateRandomNumber();
    return {
        id,
        image: getPokemonImage(id),
    };
};

export const getGeneratePokemons = (max = env.NUMBER_GENERATE_POKEMONS) => {
    const pokemons = [];
    for (let index = 0; index < max; index++) {
        pokemons.push(getRandomPokemon());
    }

    return pokemons;
};

export const isCatchPokemon = () => {
    const id = generateRandomNumber(5);
    return id % 2 === 0;
};

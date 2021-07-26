import {env} from '../constants/environment';

export const getPokemonType = (types = []) => {
    return types.map((item) => item.type.name).join('/');
};

export const getFirstType = (type) => {
    const [firstType] = type.split('/');
    return firstType;
};

export const getPokemonImage = (id, width = 3) => {
    const newId = `00${id}`.slice(-width);
    return `${env.POKEMON_IMAGES}/${newId}.png`;
};

export const getPokemonShinyImage = (id, width = 3) => {
    const newId = `00${id}`.slice(-width);
    return `https://www.cpokemon.com/images/pokedex/sprites/isshu_frente_shinys/${newId}.png`;
};

export const getPokemonRealImage = (id, isShiny) => {
    return isShiny ? getPokemonShinyImage(id) : getPokemonImage(id);
};

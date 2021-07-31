import {env} from '../constants/environment';

export const generateRandomNumber = (max = env.NUMBER_POKEMONS) => {
    return Math.floor(Math.random() * max) + 1;
};

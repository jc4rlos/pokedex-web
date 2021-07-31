import {generateRandomNumber} from '../utils/number';

class PokemonMove {
    constructor({name = null, type = null} = {}) {
        this.name = name;
        this.type = type;
        this.power = generateRandomNumber(3);
    }
}

export default PokemonMove;

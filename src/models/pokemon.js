import {generateRandomNumber} from '../utils/number';
import {
    getFirstType,
    getPokemonImage,
    getPokemonRealImage,
    getPokemonShinyImage,
    getPokemonType,
} from '../utils/pokemon';

class Pokemon {
    constructor({
        id = null,
        name = null,
        weight = null,
        height = null,
        base_experience = null,
        order = null,
        types = null,
        stats = null,
        evolution = null,
        image = null,
        type = null,
    } = {}) {
        this.pokedexId = id;
        this.shiny = generateRandomNumber() % 2 === 0;
        this.gender = generateRandomNumber() % 2 === 0 ? 'male' : 'female';
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.cp = base_experience;
        this.order = order;
        this.image = image || getPokemonRealImage(this.pokedexId, this.shiny);
        this.type = type || getPokemonType(types);
        this.firstType = getFirstType(this.type);
        this.hp = stats[0].base_stat;
        this.candy = Math.floor(Math.random() * 30 + 1);
        this.starDust = Math.floor(Math.random() * 200 + 1);
        this.favorite = false;
        this.id = id;
        this.evolution = evolution;
    }
}
export default Pokemon;

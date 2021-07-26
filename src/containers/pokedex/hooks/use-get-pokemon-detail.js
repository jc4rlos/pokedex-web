import axios from 'axios';
import {useState} from 'react';
import {env} from '../../../constants/environment';
import Pokemon from '../../../models/pokemon';

const useGetPokemonDetail = () => {
    const [pokemon, setPokemon] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const getPokemonById = async (id) => {
        try {
            setLoading(true);
            const result = await axios.get(`${env.POKEDEX_API_URL}pokemons/${id}`);
            console.log(`result.data`, result.data);
            setPokemon(result.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {getPokemonById, pokemon, loading, error};
};

export default useGetPokemonDetail;

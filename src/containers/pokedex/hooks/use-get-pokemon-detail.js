import axios from 'axios';
import {useState} from 'react';
import {env} from '../../../constants/environment';

const useGetPokemonDetail = () => {
    const [pokemon, setPokemon] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const getPokemonById = async (id) => {
        try {
            setLoading(true);
            const result = await axios.get(`${env.POKEDEX_API_URL}pokemons/${id}`);
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

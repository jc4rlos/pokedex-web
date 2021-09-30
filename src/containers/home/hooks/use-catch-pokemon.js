import axios from 'axios';
import {useState} from 'react';
import {env} from '../../../constants/environment';
import Pokemon from '../../../models/pokemon';

const useCatchPokemon = () => {
    const [pokemon, setPokemon] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const catchPokemon = async (data) => {
        try {
            setLoading(true);
            const result = await axios.post(`${env.POKEDEX_API_URL}pokemons`, {
                ...data,
                id: null,
            });
            setPokemon(new Pokemon({...result.data}));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {catchPokemon, pokemon, loading, error};
};

export default useCatchPokemon;

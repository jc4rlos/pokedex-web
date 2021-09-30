import axios from 'axios';
import {useState} from 'react';
import {env} from '../../../constants/environment';
import Pokemon from '../../../models/pokemon';

const useGetPokemon = () => {
    const [pokemon, setPokemon] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const getPokemon = async (id) => {
        try {
            setLoading(true);
            const result = await axios.get(`${env.POKE_API_URL}pokemon/${id}`);
            setPokemon(new Pokemon({...result.data}));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {getPokemon, setPokemon, pokemon, loading, error};
};

export default useGetPokemon;

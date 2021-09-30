import axios from 'axios';
import {useState} from 'react';
import {env} from '../../../constants/environment';
import Pokemon from '../../../models/pokemon';

const useEnvolvePokemon = () => {
    const [pokemon, setPokemon] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const envolvePokemon = async (data) => {
        try {
            setLoading(true);
            const result = await axios.put(
                `${env.POKEDEX_API_URL}pokemons/${data.id}`,
                data
            );
            setPokemon(new Pokemon({...result.data}));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {envolvePokemon, pokemon, loading, error};
};

export default useEnvolvePokemon;

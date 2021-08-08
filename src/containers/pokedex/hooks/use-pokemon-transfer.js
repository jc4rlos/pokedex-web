import axios from 'axios';
import {useState} from 'react';
import {env} from '../../../constants/environment';
import Pokemon from '../../../models/pokemon';

const usePokemonTransfer = () => {
    const [pokemon, setPokemon] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const transfer = async (id) => {
        try {
            setLoading(true);
            const result = await axios.delete(`${env.POKEDEX_API_URL}pokemons/${id}`);
            setPokemon(new Pokemon({...result.data}));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {transfer, pokemon, loading, error};
};

export default usePokemonTransfer;

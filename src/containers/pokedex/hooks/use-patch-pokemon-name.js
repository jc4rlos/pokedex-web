import axios from 'axios';
import {useState} from 'react';
import {env} from '../../../constants/environment';
import Pokemon from '../../../models/pokemon';

const usePatchPokemonName = () => {
    const [pokemon, setPokemon] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const patchName = async (data) => {
        try {
            setLoading(true);
            const result = await axios.patch(
                `${env.POKEDEX_API_URL}pokemons/update-name/${data.id}`,
                data
            );
            setPokemon(new Pokemon({...result.data}));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {patchName, pokemon, loading, error};
};

export default usePatchPokemonName;

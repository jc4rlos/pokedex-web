import axios from 'axios';
import {useState} from 'react';
import {env} from '../../../constants/environment';

const useGetPokedex = () => {
    const [pokemons, setPokemons] = useState([]);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const getPokedex = async (orderByColumn) => {
        try {
            setLoading(true);
            const result = await axios.get(
                `${env.POKEDEX_API_URL}pokemons?orderByColumn=${orderByColumn}&ascending=false`
            );
            setPokemons(result.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {getPokedex, pokemons, loading, error};
};
export default useGetPokedex;

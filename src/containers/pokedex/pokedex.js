import React, {memo} from 'react';
import {useEffect} from 'react';
import Pokemons from './components/pokemons/pokemons';
import useGetPokedex from './hooks/use-get-pokedex';
import LoadingOverlay from '../../components/loading-overlay/loading-overlay';
import './pokedex.scss';
import {Close} from '../../assets/images';
import {Link} from 'react-router-dom';

const Pokedex = () => {
    const {getPokedex, pokemons, loading} = useGetPokedex();
    useEffect(() => {
        getPokedex();
    }, []);
    return (
        <div className="pokedex">
            <LoadingOverlay show={loading} />
            <div className="pokedex__container">
                <Pokemons pokemons={pokemons} />
                <div className="pokedex__button">
                    <Link to="/">
                        <img src={Close} alt="close" width="50" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default memo(Pokedex);

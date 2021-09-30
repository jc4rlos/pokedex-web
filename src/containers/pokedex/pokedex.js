/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from 'react';
import {useEffect} from 'react';
import Pokemons from './components/pokemons/pokemons';
import useGetPokedex from './hooks/use-get-pokedex';
import LoadingOverlay from '../../components/loading-overlay/loading-overlay';
import './pokedex.scss';
import {Close, Cp, Date} from '../../assets/images';
import {Link} from 'react-router-dom';

const Pokedex = () => {
    const {getPokedex, pokemons, loading} = useGetPokedex();
    const handleOnGetByCp = () => {
        getPokedex('CP');
    };
    const handleOnGetByDate = () => {
        getPokedex('DATE');
    };
    useEffect(() => {
        getPokedex('');
    }, []);
    return (
        <div className="pokedex">
            <LoadingOverlay show={loading} />
            <div className="pokedex__container">
                <Pokemons pokemons={pokemons} />
                <div
                    className="pokedex__button-left"
                    role="presentation"
                    onClick={handleOnGetByCp}
                >
                    <img src={Cp} alt="cp" width="25" />
                </div>
                <div className="pokedex__button">
                    <Link to="/">
                        <img src={Close} alt="close" width="50" />
                    </Link>
                </div>
                <div
                    className="pokedex__button-right"
                    role="presentation"
                    onClick={handleOnGetByDate}
                >
                    <img src={Date} alt="date" width="25" />
                </div>
            </div>
        </div>
    );
};

export default memo(Pokedex);

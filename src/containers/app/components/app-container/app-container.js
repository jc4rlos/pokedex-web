import React, {memo, Suspense} from 'react';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import Home from '../../../home/home';
import PokemonDetail from '../../../pokedex/components/pokemon-detail/pokemon-detail';
import Pokedex from '../../../pokedex/pokedex';
import './app-container.scss';

const AppContaniner = () => {
    return (
        <div className="app-container">
            <Router>
                <Suspense fallback={<span>Cargando...</span>}>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/pokedex">
                            <Pokedex />
                        </Route>
                        <Route path="/pokemon-details/:id" children={<PokemonDetail />} />
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
};

export default memo(AppContaniner);

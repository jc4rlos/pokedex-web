import {memo} from 'react';
import AppContainer from './components/app-container/app-container';

const App = () => {
    return (
        <div>
            <AppContainer />
        </div>
    );
};
export default memo(App);

// ./src/components/App.js
import React from 'react';
import Box from './Box';
import Div from './Div';
import { TextContext } from '../context';

function App() {
    const { Provider } = TextContext;
    return (
        <section>
            <Box />
            <Provider value="sibling">
                <Div />
            </Provider>
        </section>
    );
}

export default App;

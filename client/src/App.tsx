import React from 'react';
import './App.css';
import { ConditionList } from './features/conditions/ConditionList';

function App() {
    return (
        <div className="App">
            <header>
                <h1>Conditions Application</h1>
            </header>
            <ConditionList />
        </div>
    );
}

export default App;

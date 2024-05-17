import React from 'react';
import ChatRoom from './ChatRoom';

function App() {
    const userId = 1; // Este es un ejemplo. Obtén el userId de la fuente adecuada.

    return (
        <div className="App">
            <header className="App-header">
                <h1>Chat Room</h1>
                <ChatRoom roomName="general" userId={userId}/>
            </header>
        </div>
    );
}

export default App;

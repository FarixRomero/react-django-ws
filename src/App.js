import React from 'react';
import ChatRoom from './ChatRoom';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Chat Room</h1>
                <ChatRoom roomName="general" />
            </header>
        </div>
    );
}

export default App;

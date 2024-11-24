import axios from 'axios';
import './App.css';

function App() {
    return (
        <button
            onClick={() => {
                axios.get('http://localhost:3000').then((res) => {
                    console.log(res.data);
                });
            }}
        >
            Click!
        </button>
    );
}

export default App;

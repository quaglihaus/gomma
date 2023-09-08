import logo from './logo.svg';
import './App.css';
import Routerz from './api/Routerz';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      

        <Routerz/>


      </BrowserRouter>
    </div>
  );
}

export default App;

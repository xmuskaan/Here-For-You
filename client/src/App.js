import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Router>
        <Route exact path = '/' >
          <Home/>
        </Route>
        <Route exact path='/login'>
          <Login/>
        </Route>
        <Route exact path ='/register'>
          <Register/>
        </Route>
      </Router>

    </div>
   
    
  );
}

export default App;

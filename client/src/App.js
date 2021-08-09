import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import SideBar from './Components/SideBar';
import NavButtons from './Components/NavButtons';

function App() {
  return (
    <Router>
    <div className="App">
      <SideBar/>
      <NavButtons/>
      <Switch>
        <div className="Content">
          <Route exact path = '/' >
            <Home/>
           </Route>
        
           <Route exact path='/login'>
            <Login/>
           </Route>
        
           <Route exact path ='/register'>
            <Register/>
           </Route>
        </div>
      </Switch>
    </div>
    
    </Router>
   
    
  );
}

export default App;

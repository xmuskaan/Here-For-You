import './App.css';
import { AuthProvider } from './context/auth';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Discussions from './Pages/Discussions';
import SideBar from './Components/SideBar';
import NavButtons from './Components/NavButtons';
import AuthRoute from './utils/AuthRoute';
import SinglePost from './Pages/SinglePost';
import Rooms from './Pages/Rooms';
import ProfilePage from './Pages/ProfiePage';
import RegisterLogin from './Pages/RegisterLogin';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <SideBar/>
          <NavButtons/>
          <Switch>
            <div className="Content">

            
            <Route exact path= '/RegisterLogin' component = {RegisterLogin} />
            <Route exact path='/login' component= {Login} />
        
            <Route exact path ='/register' component= {Register} />

            <Route exact path= '/' component = {Home} />

              
            
            <AuthRoute exact path ='/disc' component= {Discussions} />
             

            <AuthRoute exact path="/posts/:postId" component= {SinglePost}/>
                

            <AuthRoute exact path="/Rooms" component= {Rooms}/>
               

            <AuthRoute exact path ='/:username' component= {ProfilePage}/>

            </div>
          </Switch> 
        </div>
      </Router>
    </AuthProvider>
   
    
  );
}

export default App;

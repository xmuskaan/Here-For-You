import Login from './Login';
import Register from './Register';
import { useState } from 'react';
import '../Stylesheets/RegisterLogin.css'


const RegisterLogin = () => {

   const [toggle, setToggle] = useState('register');


   const handleToggleClick = () => {
        if(toggle==='register'){
            return(
                <div className="buttonsDiv">
                    <button className='lgButtons' onClick={()=>setToggle('login')}>Login</button>
                    <button className={toggle==='register' ? 'lgButtons active':'lgButtons notActive'}>Register</button>
                </div>
                
            )
        }
        if(toggle==='login'){
            return(
                <div className="buttonsDiv"> 
                      <button className={toggle==='login'? 'lgButtons active' : 'lgButtons notActive'} >Login</button>
                      <button className='lgButtons' onClick={()=>setToggle('register')}>Register</button>
                  
                </div>
                
            )
        }
    }
   
    const handleToggleDisplay = () => {
        if(toggle==='register'){
            return(
                <Register/>
            )
        }

        if(toggle==='login'){
            return(
                <Login/>
            )
        }
    }

    return ( 
        <div className='RegisterLogin'>
             
            <div >
              
            {handleToggleClick()} 
                {handleToggleDisplay()}
            </div>
        </div>    
     );
}
 
export default RegisterLogin;
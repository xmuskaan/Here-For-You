import { useState , useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import {useForm} from '../utils/hooks';
import { useHistory} from 'react-router-dom';
import { AuthContext } from '../context/auth';
import '../Stylesheets/Login.css';

const Login = () => { 

    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
     
    const { handleChange, handleSubmit , values} = useForm(loginUserCallback ,{
        username:'',
        password:''
    })
    
    const history = useHistory();

    const [loginUser , //{loading}//  
    ] = useMutation(LOGIN_USER , {
        update(_, { data : {login: userData}}){
            context.login(userData);
            history.push('/disc');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    function loginUserCallback(){
        loginUser();
    }


    return ( 
        <div>
            <form className="loginForm" onSubmit={handleSubmit} noValidate>
                <p>Welcome Back!</p>
                             
                <label htmlFor="username">Username</label>
                <input type="text"
                id="username" 
                placeholder="Username" 
                value={values.username} 
                name="username" 
                error={errors.username ? true : false}
                onChange={handleChange}/>

                <label htmlFor="password">Password</label>
                <input type="password" 
                id="password" 
                placeholder="Password" 
                value={values.password} 
                name="password"
                error={errors.password ? true : false}
                onChange={handleChange}/>
              
                <button className="submitButton smallButtons">Login</button>
            
            </form>


            {Object.keys(errors).length > 0 && (
                <div className="errorMessage">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                    ))}
                    </ul>
                </div>
            )}

            {/* <p>New to HFY? <Link to="/register">Register Here!</Link></p> */}
        </div>
     );
} 

const LOGIN_USER = gql`
    mutation login(
        $username:String!
        $password:String!
    )
    
    { 
        login(
                username: $username
                password:$password 
        ) 
        {
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`
export default Login;
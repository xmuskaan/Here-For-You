import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import {useForm} from '../utils/hooks';

const Login = (props) => { 

    const [errors, setErrors] = useState({});
     
    const { handleChange, handleSubmit , values} = useForm(loginUserCallback ,{
        username:'',
        password:''
    })
   
    const [loginUser , {loading}] = useMutation(LOGIN_USER , {
        update(_, result){
            props.history.push('/');
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.exceptions.errors);
            // setErrors(err.graphQLErrors[0].extensions.exceptions.errors);
        },
        variables: values
    });

    function loginUserCallback(){
        loginUser();
    }


    return ( 
        <div>
            <form onSubmit={handleSubmit} noValidate>
                <h1>Login</h1>
                             
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
              
                <button className="submitButton">Login</button>
            
            </form>


            {Object.keys(errors).length > 0 && (
                <div className="error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                    ))}
                    </ul>
                </div>
            )}
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
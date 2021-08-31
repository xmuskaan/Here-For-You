import { useState, useContext } from 'react';
import {gql} from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import '../Stylesheets/Register.css';

const Register = () => {

    const context = useContext(AuthContext);
    const history = useHistory()

    const { handleChange, handleSubmit, values} = useForm(registerUser, {
        username: '',
        email:'',
        password:'',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({});

    const [addUser , {loading}] = useMutation(REGISTER_USER , {
        update(_, {data : { register: userData}}){
            context.login(userData)
            history.push('/disc');
        },
        onError(err){
           setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    })

    function registerUser() {
        addUser();
    }
    
    return ( 
        <div>
            <form className="registerForm" onSubmit={handleSubmit} noValidate>
                <p>Create Account~</p>
                             
                <label htmlFor="username">Username</label>
                <input type="text"
                id="username" 
                placeholder="Username" 
                value={values.username} 
                name="username"
                error={errors.username ? true : false}
                onChange={handleChange}/>
                
                <label htmlFor="email">Email</label>
                <input type="email" 
                id="email" 
                placeholder="Email" 
                value={values.email}
                name="email" 
                error={errors.email ? true : false}
                onChange={handleChange}/>

                <label htmlFor="password">Password</label>
                <input type="password" 
                id="password" 
                placeholder="Password" 
                value={values.password} 
                name="password"
                error={errors.password ? true : false}
                onChange={handleChange}/>
                
                <label htmlFor="confirmPassword">confirmPassword</label>
                <input type="password" 
                id="confirmPassword" 
                placeholder="ConfirmPassword" 
                value={values.confirmPassword} 
                name="confirmPassword"
                error={errors.confirmPassword ? true : false}
                onChange={handleChange}/>          

                <button className="submitButton smallButtons">Register</button>
            
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
        </div>
     );
} 

const REGISTER_USER = gql`
    mutation register(
        $username:String!
        $email:String!
        $password:String!
        $confirmPassword:String!
    )
    
    { 
        register(
            registerInput: {
                username: $username
                email:$email
                password:$password
                confirmPassword:$confirmPassword
            }
        ) {
            id email username createdAt token
        }
    }
`
export default Register;
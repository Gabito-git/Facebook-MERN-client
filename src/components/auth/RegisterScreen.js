import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from 'validator';

import { startRegisterWithForm } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";


const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);

    const { formState, handleInputChange } = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {
        name,
        email,
        password,
        password2
    } = formState;


    const handleSubmit = ( e ) =>{
        e.preventDefault();

        if( !isValid()) return;

        dispatch( startRegisterWithForm( name, email, password ) )
    }

    const isValid = () => {

        if( password !== password2 || password.length < 6 ){
            dispatch( setError( 'Las contraseñas deben coincidir y ser de una longitud mayor a 5 caracteres' ) )
            return false;
        }else if( name.trim() === '' ){
            dispatch( setError('Por favor introduce un nombre'));
            return false;
        }else if( !validator.isEmail( email )  ){
            dispatch( setError('Por favor ingrese un email válido') )
            return false;
        }

        
        dispatch( removeError() );
        return true;

    }

    return (
        <div className="login">

            <div className="login__box login__box--register">
                <h2>Registrarte</h2>
                <p>Es rápido y facil</p>

                <div className="login__separator mt-2   "></div>

                <form className="login__form" onSubmit={ handleSubmit }>
                     <div className="login__input-field">
                        <input 
                            className="login__input login__input--register"
                            placeholder="Nombre"
                            value={ name }
                            name="name"
                            onChange={ handleInputChange }
                        />
                    </div>

                    <div className="login__input-field">
                        <input 
                            className="login__input login__input--register"
                            type="email"
                            placeholder="Correo electrónico"
                            value={ email }
                            name="email"
                            onChange={ handleInputChange }
                        />
                    </div>

                    <div className="login__input-field">
                        <input 
                            className="login__input login__input--register"
                            type="password"
                            placeholder="Contraseña"
                            value={ password }
                            name="password"
                            onChange={ handleInputChange }
                        />
                    </div>

                    <div className="login__input-field">
                        <input 
                            className="login__input login__input--register"
                            type="password"
                            placeholder="Confirme la contraseña"
                            value={ password2 }
                            name="password2"
                            onChange={ handleInputChange }
                        />
                    </div>

                    {
                        msgError  
                            &&
                        <div className="login__alert">
                            <p>{ msgError }</p>
                        </div>

                    }                    

                    <div className="login__newuser-field">
                        <button className="btn btn--secondary block font-small">
                            Registrarte
                        </button>
                    </div>

                </form>

                <Link className="login__linkLogin" to="/auth/login"> Ya tienes una cuenta? </Link>
            </div>
            
        </div>
    )
}

export default RegisterScreen

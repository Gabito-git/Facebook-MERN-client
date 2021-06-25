import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { startGoogleSignIn, startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm"

const LoginScreen = () => {

    const dispatch = useDispatch();

    const { formState, handleInputChange } = useForm({
        email: '',
        password: ''
    })

    const { email, password } = formState;

    const handleSubmit = ( e ) => {
        e.preventDefault();

        dispatch( startLogin( email, password ) );
    }

    const googleSignIn = ( googleUser ) => {
        const  id_token = googleUser.getAuthResponse().id_token;
        dispatch( startGoogleSignIn( id_token ) )
    }

    const googleFail= ( error ) => {
        console.log(error);
    }

    return (
        <div className="login">

            <div>
                <div className="login__facebook">
                    <img src="../assets/facebook.svg" alt="facebook" />
                </div>

                <div className="login__box">
                   
                    <form onSubmit={ handleSubmit }>
                        <div className="login__input-field">
                            <input 
                                className="login__input"
                                placeholder="Correo electrónico"
                                type="email"
                                name="email"
                                value={ email }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="login__input-field">
                            <input 
                                className="login__input"
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                value={ password }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <button className="btn btn--primary block font-medium">
                            Iniciar sesión
                        </button>
                    </form>

                    <div className="login__separator mt-3   "></div>

                    <div className="login__newuser-field">
                        <Link className="login__linkRegister" to="/auth/register" >Crear cuenta nueva</Link>
                    </div>

                    <div className="login__google mt-2">                      
                        <GoogleLogin
                            clientId={ process.env.GOOGLE_ID_CLIENT  }
                            buttonText="Inicie sesión con Google"
                            onSuccess={googleSignIn}
                            onFailure={googleFail}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default LoginScreen

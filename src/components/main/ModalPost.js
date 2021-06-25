import { Avatar, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ClearIcon from '@material-ui/icons/Clear';
import PublicIcon from '@material-ui/icons/Public';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeModalStatus } from '../../actions/ui';
import { cleanActive, startPost,  } from '../../actions/post';

const useStyles = makeStyles((theme) => ({  
    root: {
        display: 'flex',
        justifyContent: 'center',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
    },
}));

const ModalPost = () => { 

    const { user:{ name } } = useSelector(state => state.auth);
    const { userImage, isLoading } = useSelector(state => state.ui);
    const { active } = useSelector(state => state.posts);

    const [body, setBody] = useState(active.body);
    const [postImage, setPostImage] = useState( active.image );
    const dispatch = useDispatch();

    const classes = useStyles();

    // Establece el eventlistener en toda el area del modal post
    // la cual es toda la ventana por como está configurado
    // Se verifica si se da click en el area externa solamente
    // La interna (box) tambien activaría el listener ya que es hija de la externa
    // por eso la verificación
    useEffect(() => {
        const nodeOutsideModal = document.querySelector('#modal-post');        

        const handleClick = (e) => {
            if (e.target === nodeOutsideModal) {
                dispatch( changeModalStatus( false ) )
            }
        };

        nodeOutsideModal.addEventListener('click', handleClick);

        return () => nodeOutsideModal.removeEventListener('click', handleClick);
    }, [dispatch]);

    // Establece el cursor en el text area una vez se carga el componente
    useEffect(() => {
        const nodeTextArea = document.querySelector('#textarea');
        nodeTextArea.focus();
    }, []);

    const handleCloseModal = () =>{

        dispatch( cleanActive() );
        dispatch( changeModalStatus( false ) )
    }

    
    const handleAddImageFromModal = () => {
        document.getElementById( 'image-input-modal' ).click();
    }

    const handlePostImageFromModal = ( e) => {
        const file = e.target.files[0];
        setPostImage( {src:URL.createObjectURL( file ), file } );
    }

    const handleNewPost = (e) => {
        e.preventDefault();

        // Si no hay body en active quiere decir que la publicación se abrió de cero, 
        // Si hay body en active quiere decir que la publicación se va a editar
        
        active.body 
            ? dispatch( startPost(active.id, body, postImage.file, postImage.deleted ) )
            : dispatch( startPost(null, body, postImage.file ) );

        dispatch( cleanActive() );
        
    }

    return (
        <div className="modalPost" id="modal-post">
            <div className="modalPost__box">
                <form>
                    <div className="modalPost__header">
                        <div className="modalPost__title">
                            <h3>{ active.body ? 'Editar publicación': 'Crear publicación'  }</h3>
                        </div>
                        <div
                            className="modalPost__closeIcon"
                            onClick={ handleCloseModal }
                        >
                            <ClearIcon color="inherit" fontSize="inherit" />
                        </div>
                    </div>

                    <div className="modalPost__user-info">
                        <Avatar src={ userImage } />
                        <div className="modalPost__user-name">
                            <h4>{ name }</h4>
                            <span>
                                <div className="modalPost__public">
                                    <PublicIcon fontSize="inherit" />
                                </div>
                                <p>Público</p>
                            </span>
                        </div>
                    </div>

                    <textarea
                        id="textarea"
                        placeholder={`¿Qué estas pensando, ${ name.split(' ')[0] } ?`}
                        className={  `modalPost__body ${ postImage.src && "modalPost__body--update" }`}
                        onChange={ (e) => setBody( e.target.value  ) }
                        value = { body }
                    >
                        
                    </textarea>

                    {
                        postImage.src &&
                        <div className="modalPost__iconReference">
                            
                            <div className="modalPost__image">                                
                                <img src={ postImage.src }  alt="user-upload"/>
                            </div>
                            <div 
                                className="modalPost__closeImage"
                                onClick={ () => setPostImage({ src:'', file: null, deleted: true }) }
                            >
                                    <ClearIcon color="inherit" fontSize="inherit"/>
                            </div>

                        </div>
                        
                    }                   
                   

                    <div className="modalPost__add-image mt-2">
                        <p>Agregar a tu publicación</p>
                        <div 
                            className="modalPost__img-icon"
                            onClick={ handleAddImageFromModal }
                        >                        
                            <PhotoLibraryIcon
                                color="inherit"
                                fontSize="inherit"
                            />
                        </div>
                        <input 
                            id="image-input-modal"
                            type="file"
                            className="hidden"
                            onChange={  handlePostImageFromModal  }
                            accept="image/*"
                        />
                    </div>

                    {
                        !isLoading
                        ? (
                            <button 
                                className={`btn  block mt-2 ${ !body ? 'btn--disabled' : 'btn--primary' }  `}
                                onClick= { handleNewPost }
                                disabled={ isLoading || !body }
                            >
                                { active.body ? 'Editar': 'Publicar' }
                            </button>
                          )
                        : (
                            <div className={classes.root}>
                                    <CircularProgress />
                            </div>
                          )
                    } 

                </form>
            </div>
        </div>
    );
};

export default ModalPost;

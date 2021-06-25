import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

import { changeModalStatus } from '../../actions/ui';
import { setActive } from '../../actions/post';

import ModalPost from './ModalPost';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
    },
}));

const Postbox = () => { 
    const classes = useStyles();
    const dispatch = useDispatch();

    const { user:{name} } = useSelector(state => state.auth);
    const {userImage, modalStatus} = useSelector(state => state.ui);

    const handleAddImage = () => {
        document.getElementById( 'image-input' ).click();
    }

    const handleChooseImage = ( e) => {    
        const file = e.target.files[0];
        dispatch( setActive({ 
            image: {
                src:URL.createObjectURL( file ), 
                file },
            body: ''
            }) ) ;
        dispatch( changeModalStatus( true ) )
    }


    return (
        <div className="postbox">
            <div className="postbox__top">
                <Avatar 
                    className={classes.small} 
                    src={ userImage }
                />
                <div
                    className="postbox__input-box"
                    onClick={() => dispatch( changeModalStatus( true ) )}
                >
                    <input
                        placeholder={`¿Qué estas pensando, ${ name.split(' ')[0] } ?`}
                        disabled={ modalStatus }
                    />
                </div>
            </div>
            <div className="postbox__bottom">
                <div className="postbox__option">
                    <div className="postbox__icon postbox__icon--red">
                        <VideocamIcon fontSize="inherit" />
                    </div>
                    <p>Video en vivo</p>
                </div>
                <div 
                    className="postbox__option "
                    onClick={ handleAddImage }
                >
                    
                    <div className="postbox__icon postbox__icon--green">
                        <PhotoLibraryIcon fontSize="inherit" />
                    </div>
                    <p>Foto/video</p>
                </div>
                <input 
                    id="image-input"
                    type="file"
                    className="hidden"
                    onChange={  handleChooseImage  }
                />
                <div className="postbox__option ">
                    <div className="postbox__icon postbox__icon--yellow">
                        <InsertEmoticonIcon fontSize="inherit" />
                    </div>
                    <p>Sentimiento/actividad</p>
                </div>
            </div>
            { modalStatus && <ModalPost />}
        </div>
    );
};

export default Postbox;

import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../actions/auth';
import { startUploadingImage } from '../../actions/uploads';
import { changeIsLoadingStatus } from '../../actions/ui';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    root: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
    },
}));

const ModalLogout = () => {

    const { user:{ name, uid } } = useSelector(state => state.auth);
    const {userImage, isLoading} = useSelector(state => state.ui);


    const dispatch = useDispatch();
    const classes = useStyles();

    const handleLogout = () => {
        dispatch(startLogout());
    };

    const handleAddImage = () => {
        document.getElementById("image-input-user").click();
    }

    const handleChooseImage = ( e) => {
        const file = e.target.files[0];
        dispatch( changeIsLoadingStatus( true ) );
        dispatch( startUploadingImage( file, 'users', uid ) );
    }

    return (
        <div className="modal"  >
            <div 
                className="modal__top"
                id="click-me"               
                onClick={ handleAddImage }
            >
                {
                    !isLoading 
                    ?(
                        <Avatar 
                            className={classes.small} 
                            src={ userImage }
                        />
                    ):(
                        <div className={classes.root}>
                            <CircularProgress />
                        </div>
                    )
                }               
                
                <div className="modal__user-info">
                    <p>{ name }</p>
                    <span>Cambia tu imagen</span>
                </div>
               
            </div>
            <input 
                id="image-input-user"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={ handleChooseImage }
            />

            <div className="modal__separator"></div>

            <div className="modal__bottom" onClick={handleLogout}>
                <div className="modal__close-icon">
                    <MeetingRoomIcon fontSize="inherit" />
                </div>
                <p>Cerrar sesión</p>
            </div>
        </div>
    );
};

export default ModalLogout;

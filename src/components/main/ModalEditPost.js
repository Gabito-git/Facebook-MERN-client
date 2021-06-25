import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeModalStatus } from '../../actions/ui';
import { deletePost, setActive } from '../../actions/post';

const ModalEditPost = ({ setModal, id, body, image}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const handleClick = () => {
            setModal(false);
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [setModal]);

    const handleOpenMainModal = () => {
        dispatch( setActive( {
            image: {
                src: image,
                file: null
            },
            body,
            id
        } ) )
        dispatch( changeModalStatus( true ) )
    }

    const handleDeletePost = () =>{
        dispatch( deletePost( id ) );
    }

    return (
        <div className="edit">
            <div className="edit__top"
                onClick={ handleOpenMainModal }
            >
                <div className="edit__icon">
                    <EditOutlinedIcon fontSize="inherit" />
                </div>
                <p>Editar publicación</p>
            </div>

            <div 
                className="edit__bottom"
                onClick = { handleDeletePost }
            >
                <div className="edit__icon">
                    <DeleteForeverOutlinedIcon fontSize="inherit" />
                </div>
                <p>Mover a la papelera</p>
            </div>
        </div>
    );
};

export default ModalEditPost;

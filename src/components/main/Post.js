import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PublicIcon from '@material-ui/icons/Public';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';
import { useState } from 'react';
import ModalEditPost from './ModalEditPost';
import {  useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4.2),
        height: theme.spacing(4.2),
    },
}));

const Post = ({ user, image, body, updatedAt, id }) => {
    const classes = useStyles();

    const [modalOpen, setModalOpen] = useState(false);
    const { userImage } = useSelector(state => state.ui);
    const { user:{ uid } } = useSelector(state => state.auth);

    return (
        <div className="post animate__animated animate__fadeInDown animate__faster">
            <div className="post__header">
                <Avatar className={classes.small} src={ user.image }/>
                <div className="post__user-info-container">
                    <div className="post__user-info">
                        <p>{ user.name }</p>
                        <span>
                           { updatedAt } <PublicIcon color="inherit" />
                        </span>
                    </div>

                    {
                        user._id === uid 
                            &&
                        <div
                            className="post__more"
                            onClick={() => setModalOpen(!modalOpen)}
                        >
                            <MoreHorizIcon fontSize="inherit" />
                        </div>
                    }
                </div>
            </div>

            <div className="post__message">
                <p> { body } </p>
            </div>

            {
                image 
                &&
                <div className="post__image">
                    <img src={ image } alt="message" />
                </div>
            }            

            <div className="post__footer">
                <div className="post__options">
                    <div className="post__option">
                        <ThumbUpAltOutlinedIcon fontSize="inherit" />
                        <p>Me gusta</p>
                    </div>

                    <div className="post__option">
                        <ChatBubbleOutlineRoundedIcon fontSize="inherit" />
                        <p>Comentar</p>
                    </div>

                    <div className="post__option">
                        <ForwardOutlinedIcon fontSize="inherit" />
                        <p>Compartir</p>
                    </div>
                </div>

                <div className="post__comment">
                    <Avatar className={classes.small} src={ userImage }/>
                    <div className="post__input-box-comment">
                        <input placeholder="Escribe un comentario" />
                    </div>
                </div>
            </div>

            {modalOpen && <ModalEditPost 
                                setModal={setModalOpen} 
                                id={ id } 
                                body={ body }
                                image={ image }
                        />}
        </div>
    );
};

export default Post;

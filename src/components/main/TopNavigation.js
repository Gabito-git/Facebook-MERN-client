import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import OndemandVideoOutlinedIcon from '@material-ui/icons/OndemandVideoOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import { Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ModalLogout from './ModalLogout';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
    },
}));

const TopNavigation = () => {

    const { user:{ name } } = useSelector(state => state.auth);
    const {userImage} = useSelector(state => state.ui);
    const [modalOpen, setModalOpen] = useState(false);
    const classes = useStyles();

    return (
        <div className="navigation">
            <div className="navigation__left"> 
                <div className="navigation__logo">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                        alt="facebook-logo"
                    />
                </div>
                <div className="navigation__search-container">
                    <SearchIcon fontSize="large" color="inherit" />
                    <input placeholder="Buscar en Facebook" />
                </div>
            </div>

            <div className="navigation__center">
                <div className="navigation__icon active">
                    <HomeIcon fontSize="inherit" color="inherit" />
                </div>
                <div className="navigation__icon">
                    <PeopleAltOutlinedIcon fontSize="inherit" color="inherit" />
                </div>
                <div className="navigation__icon">
                    <OndemandVideoOutlinedIcon
                        fontSize="inherit"
                        color="inherit"
                    />
                </div>
                <div className="navigation__icon">
                    <StorefrontOutlinedIcon
                        fontSize="inherit"
                        color="inherit"
                    />
                </div>
                <div className="navigation__icon">
                    <SupervisedUserCircleOutlinedIcon
                        fontSize="inherit"
                        color="inherit"
                    />
                </div>
            </div>

            <div className="navigation__right">
                <div className="navigation__user-info">
                    <Avatar 
                        className={classes.small} 
                        src={ userImage }
                    />
                    <p> { name.split(' ')[0] } </p>
                </div>

                <div className="navigation__right-icons">
                    <div className="navigation__right-icon-container">
                        <AddIcon fontSize="inherit" />
                    </div>
                    <div className="navigation__right-icon-container">
                        <ForumIcon fontSize="inherit" />
                    </div>
                    <div className="navigation__right-icon-container">
                        <NotificationsIcon fontSize="inherit" />
                    </div>
                    <div
                        className={`navigation__right-icon-container ${
                            modalOpen && 'navigation__active'
                        }`}
                        onClick={() => setModalOpen(!modalOpen)}
                    >
                        <ArrowDropDownIcon fontSize="inherit" />
                    </div>
                </div>
            </div>

            {modalOpen && <ModalLogout />}
        </div>
    );
};

export default TopNavigation;

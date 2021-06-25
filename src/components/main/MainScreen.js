
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import { startSocketConnect } from '../../actions/socket';
import { startGettingUserImage } from '../../actions/ui';

import Histories from './Histories';
import Postbox from './Postbox';
import PostScreen from './PostScreen';
import Sidebar from './Sidebar';
import TopNavigation from './TopNavigation';

import {  loadPosts, startGettingPosts } from '../../actions/post';

const MainScreen = () => {

    const dispatch = useDispatch();
    const { socket } = useSelector(state => state.socket);

    useLayoutEffect(() => {
       dispatch( startSocketConnect('http://localhost:4000') );
    }, [ dispatch ])

    useEffect(() => {
        dispatch( startGettingUserImage() );        
    }, [ dispatch ])

    useEffect(() => {
        dispatch( startGettingPosts() );
    }, [ dispatch ])

    useEffect(() => {
        if( socket ){
            socket.on('post-update', ( posts ) => {
                dispatch( loadPosts( posts ) )
            })
        }
    }, [ socket, dispatch ])


    return (
        <div className="mainscreen">
            <TopNavigation />
            <div className="mainscreen__body">
                <aside className="mainscreen__left">
                    <Sidebar />
                </aside>
                <main className="mainscreen__center">
                    <div className="mainscreen__center-content">
                        <Histories />
                        <Postbox />
                        <PostScreen />
                    </div>                    
                </main>   
                <div className="mainscreen__right">
                    <img src="./assets/lateral.png" alt='chat'/>
                </div>            
            </div>
        </div>
    );
};

export default MainScreen;

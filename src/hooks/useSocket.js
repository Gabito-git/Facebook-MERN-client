import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client"

 const useSocket = ( serverPath ) => {
     
    const [online, setOnline] = useState(false);

    const socket = useMemo( () => io.connect( serverPath ), [ serverPath ] ) ;

    useEffect(() => {
        socket.on('connect', () => {
          setOnline( true )
        })
    }, [socket])
    
    useEffect(() => {
        socket.on('disconnect', () => {
            setOnline( false )
        })
    }, [socket])

   

    return {
        socket,
        online,
        
    }

 }
 
 export default useSocket
 

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = (  body, endpoint  ) => {

    const url =  `${ baseUrl }/${ endpoint }`;
    

    return fetch( url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( body )
    } )
   
}

export const fetchConToken = ( endpoint, body, method='GET' ) => {

    const url   =  `${ baseUrl }/${ endpoint }`;

    const token =  localStorage.getItem( 'token' );

    if( method === 'GET' ){
        return fetch( url, {
            method,
            headers:{
                'Content-Type': 'application/json',
                'x-token': token
            }
        } )
    }

    return fetch( url, {
        method,
        headers:{
            'Content-Type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify( body )
    } )

}

export const fetchImages = ( endpoint, file ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token =  localStorage.getItem( 'token' );

    const formData = new FormData();
    formData.append('file', file);

    return fetch( url, {
        method:'PUT',
        headers:{
            // 'Content-Type': 'application/json',
            'x-token': token
        },
        body: formData
    } )
}


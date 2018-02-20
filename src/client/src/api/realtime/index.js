import io from 'socket.io-client'
import Cookies from 'cookies-js'



const tryConnect = () => {
    const token = Cookies.get('authToken');
    const socket = io.connect('http://localhost:3000', {
        'query': 'authToken=' + token
    })

    return socket;
}

// debugging
window.tryConnect = tryConnect;

//let socket = tryConnect();





export default tryConnect;
import { firebase, provider }  from "../../firebase"

const inicialState = {}

// REDUCER
const authReducer = (state = inicialState, action) => {
    switch (action.type) {
        case 'auth/login':
            return {
                uid: action.payload
            }
        case 'auth/logout':
            return {}
        default:
            return state 
    }
}

// ACTION CREATORS

// 1. Login
const login = (uid) => ({
    type: 'auth/login',
    payload: uid
})

const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(provider);
    }
}

// 2. Logout
const logout = () => ({
    type: 'auth/logout'
})

const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    }
}

export {
    login,
    startLogin,
    logout,
    startLogout
}

export default authReducer
import authReducer, {
    login,
    logout
} from "../../../features/auth/authSlice"

// REDUCER
test('should set default values', () => {
    const state = authReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({ })
})

test('should setup uid on login action dispatch', () => {
    const action = {
        type: 'auth/login',
        payload: '123asd'
    }
    const state = authReducer({ }, action)
    expect(state).toEqual({ uid: action.payload })
})

test('should set up state on logout action dispatch', () => {
    const action = {
        type: 'auth/logout'
    }
    const state = authReducer({ }, action)
    expect(state).toEqual({ })
})

// ACTIONS
test('should set up login action object', () => {
    const uid = '123asd'
    const action = login(uid)

    expect(action).toEqual({
        type: 'auth/login',
        payload: uid
    })
})

test('should set up logout action object', () => {
    const action = logout()
    
    expect(action).toEqual({
        type: 'auth/logout'
    })
})
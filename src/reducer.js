import { combineReducers } from 'redux'

import postsReducer from './features/posts/postsSlice'
import filtersReducer from './features/filters/filtersSlice'
import authReducer from './features/auth/authSlice'

const rootReducer = combineReducers({
    posts: postsReducer,
    filters: filtersReducer,
    auth: authReducer
})

export default rootReducer
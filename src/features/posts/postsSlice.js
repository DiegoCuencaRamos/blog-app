import database from '../../firebase';

const inicialState = []

// Reducer
const postsReducer = (state = inicialState, action) => {
    switch (action.type) {
        case 'posts/postAdded': {
            return [
                ...state,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    body: action.payload.body
                }
            ]
        }
        case 'posts/postEdited': {
            return state.map(post => {
                if(post.id !== action.payload.id) {
                    return post 
                }

                return {
                    ...post,
                    ...action.payload.updates
                }
            })
        }
        case 'posts/postRemoved': {
            return state.filter(post => post.id !== action.payload)
        }
        case 'posts/postsSet': {
            return action.payload
        }     
        default: 
            return state
    }
}

// Actions creators

// 1. ADD_POST
const postAdded = (post) => ({
    type: 'posts/postAdded',
    payload: {
        ...post
    }
})

const startPostAdded = (postData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const {
            title = '',
            body = ''
        } = postData
        const post = { title, body }

        return database.ref(`users/${uid}/posts`).push(post)
            .then((ref) => {
                dispatch(postAdded({
                    id: ref.key,
                    ...post
                }))
            })

    }
} 

// 2. EDIT_POST
const postEdited = (id, updates) => ({
    type: 'posts/postEdited',
    payload: {
        id,
        updates
    }
})

const startPostEdited = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid

        return database.ref(`users/${uid}/posts/${id}`).update(updates)
            .then(() => {
                dispatch(postEdited(id, updates))
            })
    }
}

// 3. REMOVE_POST
const postRemoved = (id) => ({
    type: 'posts/postRemoved',
    payload: id
})

const startPostRemoved = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid

        return database.ref(`users/${uid}/posts/${id}`).remove()
            .then(() => {
                dispatch(postRemoved(id))
            })
    }
}

// 4. SET_POSTS
const postsSet = (posts) => ({
    type: 'posts/postsSet',
    payload: posts
})

const startPostsSet = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid

        return database.ref(`users/${uid}/posts`).once('value')
            .then((dataSnapshot) => {
                const posts = []

                dataSnapshot.forEach((childDataSnapshot) => {
                    posts.push({
                        id: childDataSnapshot.key,
                        ...childDataSnapshot.val()
                    })
                })

                dispatch(postsSet(posts))
            })
    }
} 

export {
    postAdded,
    startPostAdded,
    postEdited,
    startPostEdited,
    postRemoved,
    startPostRemoved,
    postsSet,
    startPostsSet
}

export default postsReducer
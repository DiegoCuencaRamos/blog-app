import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { 
    postAdded, 
    postEdited, 
    postRemoved, 
    postsSet,
    startPostAdded,
    startPostEdited,
    startPostRemoved,
    startPostsSet
} from '../../../../features/posts/postsSlice'
import posts from '../../../fixures/posts'
import database from '../../../../firebase'

const uid = '123asd'
const defaultAtuhState = { auth: { uid } }
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

beforeEach((done) => {
    const postsData = {}
    posts.forEach(({ id, title, body }) => {
        postsData[id] = { title, body }
    })
    database.ref(`users/${uid}/posts`).set(postsData).then(() => done())
})

// ADD_POST
test('should setup postAdded action object', () => {
    const action = postAdded({ id: '123', title: 'Post title', body: 'Post body' })
    expect(action).toEqual({ 
        type: 'posts/postAdded',
        payload: {
            id: expect.any(String),
            title: 'Post title',
            body: 'Post body'
        }
     })
})

test('should add post to database and store', (done) => {
    const store = mockStore(defaultAtuhState)
    const postData = {
        title: 'Some title',
        body: 'Some body'
    }
    
    store.dispatch(startPostAdded(postData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'posts/postAdded',
            payload: {
                id: expect.any(String),
                ...postData
            }
        })

        return database.ref(`users/${uid}/posts/${actions[0].payload.id}`).once('value')
    }).then((dataSnapshot) => {
        expect(dataSnapshot.val()).toEqual(postData)
        done()
    })
})

test('should add post with defaults to database and store', (done) => {
    const store = mockStore(defaultAtuhState)
    const postData = {
        title: '',
        body: ''
    }
    
    store.dispatch(startPostAdded({})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'posts/postAdded',
            payload: {
                id: expect.any(String),
                ...postData
            }
        })

        return database.ref(`users/${uid}/posts/${actions[0].payload.id}`).once('value')
    }).then((dataSnapshot) => {
        expect(dataSnapshot.val()).toEqual(postData)
        done()
    })
})

// EDIT_POST
test('should setup postEdited action object', () => {
    const action = postEdited('123', { title: 'New title', body: 'New body' })
    expect(action).toEqual({
        type: 'posts/postEdited',
        payload: {
            id: '123',
            updates: {
                title: 'New title',
                body: 'New body'
            }
        }
    })
})

test('should edit posts from firebase', (done) => {
    const store = mockStore(defaultAtuhState)
    const { id } = posts[1]
    const updates = {
        title: 'New title',
        body: 'New body'
    }

    store.dispatch(startPostEdited(id, updates)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'posts/postEdited',
            payload: {
                id,
                updates
            }
        })

        return database.ref(`users/${uid}/posts/${id}`).once('value')
    }).then((dataSnapshot) => {
        expect(dataSnapshot.val().title).toBe(updates.title)
        expect(dataSnapshot.val().body).toBe(updates.body)
        done()
    })
})

// REMOVE_POST
test('should setup postRemoved action object', () => {
    const action = postRemoved('123')
    expect(action).toEqual({
        type: 'posts/postRemoved',
        payload: '123'
    })
})

test('should remove posts from firebase', (done) => {
    const store = mockStore(defaultAtuhState)
    const { id } = posts[0]

    store.dispatch(startPostRemoved(id)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'posts/postRemoved',
            payload: id
        })

        return database.ref(`users/${uid}/posts/${id}`).once('value')
    }).then((dataSnapshot) => {
        expect(dataSnapshot.val()).toBeFalsy()
        done()
    })
})

// SET_POSTS
test('should setup postsSet action object', () => {
    const action = postsSet(posts)
    expect(action).toEqual({
        type: 'posts/postsSet',
        payload: posts
    })
})

test('should fetch posts from database', (done) => {
    const store = mockStore(defaultAtuhState)

    store.dispatch(startPostsSet()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'posts/postsSet',
            payload: posts
        })
        done()
    })
})
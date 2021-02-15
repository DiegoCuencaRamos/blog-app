import postsReducer from '../../../../features/posts/postsSlice'
import posts from '../../../fixures/posts'

test('should set default state', () => {
    const state = postsReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should add post', () => {
    const newPost = {
        id: '4',
        title: 'Some title',
        body: 'Some body'
    }
    const action = {
        type: 'posts/postAdded',
        payload: newPost
    }
    const state = postsReducer(posts, action)
    expect(state).toEqual([...posts, newPost])
})

test('should edit post', () => {
    const updates = {
        title: 'New title',
        body: 'New body'
    }
    const action = {
        type: 'posts/postEdited',
        payload: {
            id: '2',
            updates
        }
    }
    const state = postsReducer(posts, action)
    expect(state).toEqual([posts[0], { ...posts[1], ...updates }, posts[2]])
})

test('should not edit post if post id not found', () => {
    const updates = {
        title: 'New title',
        body: 'New body'
    }
    const action = {
        type: 'posts/postEdited',
        payload: {
            id: '4',
            updates
        }
    }
    const state = postsReducer(posts, action)
    expect(state).toEqual(posts)
})

test('should remove post', () => {
    const action = {
        type: 'posts/postRemoved',
        payload: '3'
    }
    const state = postsReducer(posts, action)
    expect(state).toEqual([posts[0], posts[1]])
})

test('should not remove post if post id not found', () => {
    const action = {
        type: 'posts/postRemoved',
        payload: '4'
    }
    const state = postsReducer(posts, action)
    expect(state).toEqual(posts)
})
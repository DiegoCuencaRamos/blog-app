import filteredPosts from '../../../features/posts/filteredPosts'
import posts from '../../fixures/posts'

test('should filter by text value', () => {
    const filters = {
        text: 'First',
        sortBy: ''
    }
    const result = filteredPosts(posts, filters)
    expect(result).toEqual([posts[0]])
})

test('should sort by title', () => {
    const filters = {
        text: '',
        sortBy: 'title'
    }
    const result = filteredPosts(posts, filters)
    expect(result).toEqual([...posts])
})
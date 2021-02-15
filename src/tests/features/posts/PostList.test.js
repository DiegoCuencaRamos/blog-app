import React from 'react'
import { shallow } from 'enzyme'
import { PostList } from '../../../features/posts/PostList'
import posts from '../../fixures/posts'
import filters from '../../fixures/filters'

test('should render PostList with posts', () => {
    const wrapper = shallow(<PostList posts={posts} filters={filters} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render PostList with empty message', () => {
    const wrapper = shallow(<PostList posts={[]} filters={filters} />)
    expect(wrapper).toMatchSnapshot()
})
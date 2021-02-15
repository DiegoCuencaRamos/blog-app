import React from 'react'
import { shallow } from 'enzyme'
import { ReadPostPage } from '../../../features/posts/ReadPostPage'
import posts from '../../fixures/posts'

test('should render ReadPosPage correctly', () => {
    const wrapper = shallow(<ReadPostPage post={posts[0]} />) 
    expect(wrapper).toMatchSnapshot()
})
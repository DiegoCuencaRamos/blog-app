import React from 'react'
import { shallow } from 'enzyme'
import { EditPostPage } from '../../../features/posts/EditPostPage'
import posts from '../../fixures/posts'

let mockStartPostEdited, mockStartPostRemoved, mockHistory, wrapper;

beforeEach(() => {
    mockStartPostEdited = jest.fn()
    mockStartPostRemoved = jest.fn()
    mockHistory = { push: jest.fn() }
    wrapper = shallow(
        <EditPostPage 
            post={posts[0]} 
            startPostEdited={mockStartPostEdited} 
            startPostRemoved={mockStartPostRemoved}
            history={mockHistory} 
        />
    )
})

test('should render EditPostPage correctly', () => {
    const wrapper = shallow(<EditPostPage post={posts[0]} />)
    expect(wrapper).toMatchSnapshot()
})

test('should set edit post title on input change', () => {
    const value = 'New title'
    wrapper.find('input').simulate('change', {
        target: { value }
    })
    expect(wrapper.state('title')).toBe(value)
})

test('should set edit post body on textarea change', () => {
    const value = 'New body'
    wrapper.find('textarea').simulate('change', {
        target: { value }
    })
    expect(wrapper.state('body')).toBe(value)
})

test('should handle onSubmit on submit post editted', () => {
    // Simulate events
    const newTitleValue = 'New title'
    const newBodyValue = 'New body'

    wrapper.find('input').simulate('change', {
        target: { value: newTitleValue }
    })
    wrapper.find('textarea').simulate('change', {
        target: { value: newBodyValue }
    })
    wrapper.find('.button').simulate('click', {
        preventDefault: () => { }
    })
    // Make assertions
    const { id } =  wrapper.instance().props.post
    expect(mockStartPostEdited).toHaveBeenLastCalledWith(id, { ...wrapper.state() })
    expect(mockHistory.push).toHaveBeenLastCalledWith('/')
})

test('should handle onRemove on remove button clicked', () => {
    // Simulate events
    wrapper.find('.button--remove').simulate('click')
    // Make assertions
    const { id } =  wrapper.instance().props.post
    expect(mockStartPostRemoved).toHaveBeenLastCalledWith(id, { ...wrapper.state() })
    expect(mockHistory.push).toHaveBeenLastCalledWith('/')
})
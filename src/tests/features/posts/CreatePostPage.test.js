import React from 'react'
import { shallow } from 'enzyme'
import { CreatePostPage } from '../../../features/posts/CreatePostPage'

let mockStartPostAdded, mockHistory, wrapper;

beforeEach(() => {
    mockStartPostAdded = jest.fn()
    mockHistory = { push: jest.fn() }
    wrapper = shallow(
        <CreatePostPage 
            startPostAdded={mockStartPostAdded} 
            history={mockHistory} 
        />
    )
})

test('should render CreatePostPage correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should set post title on input change', () => {
    const value = 'Title'
    wrapper.find('input').simulate('change', {
        target: { value }
    })
    expect(wrapper.state('title')).toBe(value)
})

test('should set post body on textarea change', () => {
    const value = 'Body'
    wrapper.find('textarea').simulate('change', {
        target: { value }
    })
    expect(wrapper.state('body')).toBe(value)
})

test('should handle onSubmit on submit post added', () => {
    // Simulate events
    const titleValue = 'Title'
    const bodyValue = 'Body'

    wrapper.find('input').simulate('change', {
        target: { value: titleValue }
    })
    wrapper.find('textarea').simulate('change', {
        target: { value: bodyValue }
    })
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    // Make assertions
    expect(mockStartPostAdded.mock.calls[0][0]).toEqual({
        ...wrapper.state()
    })
    expect(mockHistory.push.mock.calls[0][0]).toBe('/')
})
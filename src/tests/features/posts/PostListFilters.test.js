import React from 'react'
import { shallow } from 'enzyme'
import { PostListFilters } from '../../../features/posts/PostListFilters'
import filters from '../../fixures/filters'

let mockTextFilterChanged, mockSortByFilterChanged, wrapper;

beforeEach(() => {
    mockTextFilterChanged = jest.fn()
    mockSortByFilterChanged = jest.fn()
    wrapper = shallow(
        <PostListFilters 
            textFilterChanged={mockTextFilterChanged}
            sortByFilterChanged={mockSortByFilterChanged}
            filters={filters}
        />
    )
})

test('should render PostListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
    const value = 'some text'
    wrapper.find('input').simulate('change', {
        target: { value }
    })
    expect(mockTextFilterChanged).toHaveBeenLastCalledWith(value)
})

test('should handle sort by title', () => {
    const value = 'title'
    wrapper.find('select').simulate('change', {
        target: { value }
    })
    expect(mockSortByFilterChanged).toHaveBeenLastCalledWith(value)
})
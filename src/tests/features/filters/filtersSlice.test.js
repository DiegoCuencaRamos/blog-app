import { textFilterChanged, sortByFilterChanged } from '../../../features/filters/filtersSlice'
import filtersReducer from '../../../features/filters/filtersSlice'
import filters from '../../fixures/filters'

// Reducer
test('should set default state', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual({
        text: '',
        sortBy: ''
    })
})

test('should filter posts by text', () => {
    const action = {
        type: 'filters/textFilterChanged',
        payload: 'some text'
    }
    const state = filtersReducer(filters, action)
    expect(state).toEqual({ 
        ...state,
        text: action.payload
    })
})

test('should sort posts by title', () => {
    const action = {
        type: 'filters/sortByFilterChanged',
        payload: 'title'
    }
    const state = filtersReducer(filters, action)
    expect(state).toEqual({
        ...state,
        sortBy: action.payload
    })
})

// Action generators
test('should setup textFilterChanged action object', () => {
    const action = textFilterChanged('Some text')
    expect(action).toEqual({
        type: 'filters/textFilterChanged',
        payload: 'Some text'
    })
})

test('should setup sortByFilterChanged action object', () => {
    const action = sortByFilterChanged('title')
    expect(action).toEqual({
        type: 'filters/sortByFilterChanged',
        payload: 'title'
    })
})
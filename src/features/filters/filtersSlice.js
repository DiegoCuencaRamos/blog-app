const inicialState = {
    text: '',
    sortBy: ''
}

// Reducer
const filtersReducer = (state = inicialState, action) => {
    switch (action.type) {
        case 'filters/textFilterChanged': {
            return {
                ...state,
                text: action.payload
            }
        }
        case 'filters/sortByFilterChanged': {
            return {
                ...state,
                sortBy: action.payload
            }
        }
        default:
            return state
    }
}

// Action creators
const textFilterChanged = (text) => ({
    type: 'filters/textFilterChanged',
    payload: text
})

const sortByFilterChanged = (sortBy) => ({
    type: 'filters/sortByFilterChanged',
    payload: sortBy
})

export { textFilterChanged, sortByFilterChanged }

export default filtersReducer
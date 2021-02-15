import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { textFilterChanged, sortByFilterChanged } from '../filters/filtersSlice'

export const PostListFilters = ({ filters, textFilterChanged, sortByFilterChanged }) => {

    const onTextChange = (e) => {
        textFilterChanged(e.target.value)
    };

    const onSortByChange = (e) => {
        sortByFilterChanged(e.target.value)
    }

    return (
        <div className="filters">
            <div className="container">
                <div className="filters__wrapper">
                    <div className="filters__content">
                        <input 
                            className="filters__item"
                            type="text"
                            placeholder="Search posts"
                            value={filters.text}
                            onChange={onTextChange}   
                        />
                        <select 
                            className="filters__item"
                            onChange={onSortByChange}
                        >
                            <option value="" defaultValue>Order by</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                    <Link className="button" to="/create">Add post</Link>
                </div>
                
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({ 
    filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
    textFilterChanged: (text) => dispatch(textFilterChanged(text)),
    sortByFilterChanged: (sortBy) => dispatch(sortByFilterChanged(sortBy)) 
}) 

export default connect(mapStateToProps, mapDispatchToProps)(PostListFilters)


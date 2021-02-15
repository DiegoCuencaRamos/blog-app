import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import filteredPosts from './filteredPosts'

export const PostList = ({ posts, filters }) => {
    
    const selectedPosts = filteredPosts(posts, filters)

    return (
        <div className="list">
            <div className="container">
                {
                    selectedPosts.length === 0
                        ? (
                            <div>
                                <span>No posts to show</span>
                            </div>
                        ) : (
                            <div className="list__table">
                                <div className="list__header">
                                    <div className="list__header-item">
                                        <p>Title</p>
                                    </div>
                                    <div className="list__header-item">
                                        <p>Date</p>
                                    </div>
                                    </div>
                                <div className="list__body">
                                    {
                                        selectedPosts.map(({ id, title }) => (
                                            <Link 
                                                className="list__body-item"
                                                key={id} to={`/edit/${id}`}
                                            >
                                                <p>
                                                    {title}
                                                </p> 
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    posts: state.posts,
    filters: state.filters
})

export default connect(mapStateToProps)(PostList)
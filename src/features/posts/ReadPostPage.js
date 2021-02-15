import React from 'react'
import { connect } from 'react-redux'

export const ReadPostPage = ({ post }) => (
    <div className="read-page">
        <div className="container">
            <h1 className="read-page__title">{post.title}</h1>
            <p className="read-page__text">{post.body}</p>
        </div>
    </div>
)

const mapStateToProps = (state, ownProps) => ({
    post: state.posts.find(post => post.id === ownProps.match.params.id)
})

export default connect(mapStateToProps)(ReadPostPage)
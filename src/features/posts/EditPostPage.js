import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import PageTitle from '../PageTitle'
import { startPostEdited, startPostRemoved } from './postsSlice'

export class EditPostPage extends React.Component {
    constructor(props) {
        super(props);
        //Bind methods
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
        this.onSaveButtonClicked = this.onSaveButtonClicked.bind(this);
        this.onRemoveButtonClicked = this.onRemoveButtonClicked.bind(this);
        // State
        this.state = {
            title: this.props.post.title,
            body: this.props.post.body
        }
    }

    onTitleChange(e) {
        const title = e.target.value
        this.setState((state, props) => ({ title }))
    }

    onBodyChange(e) {
        const body = e.target.value
        this.setState((state, props) => ({ body }))
    }

    onSaveButtonClicked(e) {
        e.preventDefault()
        this.props.startPostEdited(this.props.post.id, this.state)
        this.props.history.push('/')
    }

    onRemoveButtonClicked() {
        this.props.startPostRemoved(this.props.post.id, this.state)
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>
                <PageTitle 
                    title={'Edit post'}
                    description={'Make some changes and update your posts'}
                />

                <div className="container">
                    <Link 
                        className="link"
                        to={`/read/${this.props.post.id}`}
                    >
                        > Read
                    </Link>
                    <form className="form">
                        <div className="form__item-wrapper--title">
                            <input 
                                className="form__item--normal"
                                type="text" 
                                value={this.state.title} 
                                onChange={this.onTitleChange}
                            />
                        </div>
                        <div className="form__item-wrapper--normal">
                            <textarea 
                                className="form__item--textarea"
                                value={this.state.body} 
                                onChange={this.onBodyChange}
                            />
                        </div>
                        <div className="form__buttons-wrapper">
                            <button 
                                className="button"
                                onClick={this.onSaveButtonClicked}
                            >
                                Save Post
                            </button>
                            <button 
                                className="button--remove" 
                                onClick={this.onRemoveButtonClicked}
                            >
                                Remove Post
                            </button>
                        </div>
                    </form>
                    
                </div> 
            </React.Fragment>
        )
    }
};

const mapStateToProps = (state, ownProps) => ({
    post: state.posts.find(post => post.id === ownProps.match.params.id)
})


const mapDispatchToProps = (dispatch) => ({
    startPostEdited: (id, updates) => dispatch(startPostEdited(id, updates)),
    startPostRemoved: (id) => dispatch(startPostRemoved(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
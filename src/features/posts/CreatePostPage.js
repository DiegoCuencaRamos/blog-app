import React from 'react'
import { connect } from 'react-redux'

import PageTitle from '../PageTitle'
import { startPostAdded } from './postsSlice'

export class CreatePostPage extends React.Component {
    constructor(props) {
        super(props)
        // Bind methods
        this.onTitleChange = this.onTitleChange.bind(this)
        this.onBodyChange = this.onBodyChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        //State
        this.state = {
            title: '',
            body: ''
        }
    }

    onTitleChange(e) {
        const title = e.target.value
        this.setState(() => ({ title }))
    }

    onBodyChange(e) {
        const body = e.target.value
        this.setState(() => ({ body }))
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.startPostAdded(this.state)
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>
                <PageTitle 
                    title={'Add post'} 
                    description={'Add new posts to to your site'} 
                />
                
                <div className="container">
                    <form 
                        className="form"
                        onSubmit={this.onSubmit}
                    >
                        <div className="form__item-wrapper--title">
                            <input 
                                className="form__item--normal"
                                type="text" 
                                value={this.state.title} 
                                placeholder="Post Title" 
                                onChange={this.onTitleChange} 
                            />
                        </div>
                        <div className="form__item-wrapper--normal">
                            <textarea 
                                className="form__item--textarea"
                                value={this.state.body} 
                                placeholder="Post Body" 
                                onChange={this.onBodyChange} 
                            />
                        </div>
                        <div>
                            <button className="button">
                                Save Post
                            </button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    } 
}

const mapDispatchToProps = (dispatch) => ({
    startPostAdded: (post) => dispatch(startPostAdded(post))
})

export default connect(null, mapDispatchToProps)(CreatePostPage);
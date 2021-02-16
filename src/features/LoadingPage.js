import React from 'react'
import Loader from '../images/loader.gif'

const LoadingPage = () => (
    <div className="loader">
        <img
            className="loader__image" 
            src={Loader}
        />
    </div>
)

export default LoadingPage;
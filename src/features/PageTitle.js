import React from 'react'

const PageTitle = ({ title, description }) => (
    <div className="page-header">
        <div className="container">
            <h1 className="page-header__title">{title}</h1>
            <h5 className="page-header__text">{description}</h5>
            </div>
    </div>
)

export default PageTitle


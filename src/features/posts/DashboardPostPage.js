import React from 'react'

import PageTitle from '../PageTitle'
import PostListFilters from './PostListFilters'
import PostList from './PostList'

export const DashboardPage = (props) => (
    <section>
        <PageTitle 
            title={'Dashboard'} 
            description={'From here you will be able visualice all your posts'}
        />
        <PostListFilters/>
        <PostList />
    </section>
)

export default DashboardPage
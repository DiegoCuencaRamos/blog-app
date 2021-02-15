import React from 'react'
import { shallow } from 'enzyme'
import { DashboardPage } from '../../../features/posts/DashboardPostPage'

test('should render PostDashboardPage correctly', () => {
    const wrapper = shallow(<DashboardPage />)
    expect(wrapper).toMatchSnapshot()
})
import React from 'react'
import { shallow } from 'enzyme'
import PageTitle from '../../../features/PageTitle'

test('should render PageTitle correctly', () => {
    const wrapper = shallow(<PageTitle title={'Some title'} />)
    expect(wrapper).toMatchSnapshot()
})
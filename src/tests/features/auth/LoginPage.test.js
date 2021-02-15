import React from 'react'
import { shallow } from 'enzyme'
import { LoginPage } from '../../../features/auth/LoginPage'

let startLogin, wrapper;

beforeEach(() =>{
    startLogin = jest.fn()
    wrapper = shallow(<LoginPage startLogin={startLogin} />)
})

// Snapshot
test('should render login page correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

// User interaction
test('should startLogin action on button clicked', () => {
    wrapper.find('button').simulate('click')
    expect(startLogin).toHaveBeenCalled()
})
import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../../../features/Header'

let startLogout, wrapper;

beforeEach(() => {
    startLogout = jest.fn()
    wrapper = shallow(<Header startLogout={startLogout}/>)
})

// Snapshot
test('should render Header component', () => {
    expect(wrapper).toMatchSnapshot()
})

// User interaction
test('should handle startLogout on button clicked', () => {
    wrapper.find('button').simulate('click')
    expect(startLogout).toHaveBeenCalled()
})
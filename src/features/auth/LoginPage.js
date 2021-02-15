import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from './authSlice'

export const LoginPage = ({ startLogin }) => (
    <section className="box-layout">
        <div className="">
            <div className="box-layout__box">
                <h1 className="box-layout__title">My blog</h1>
                <p>Lets write something awesome</p>
                <button
                    className="button"
                    onClick={startLogin}
                >
                    Login with Google
                </button>
            </div>
        </div>
    </section>
)

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
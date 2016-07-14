import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/vk-master'
import SigninForm from './components/signin-form'

const SigninPage = React.createClass({
    render: function() {
        return (
            <div>
                <div className="header clearfix">
                    <Header />
                </div>
                <SigninForm />
            </div>
        )
    }
})

ReactDOM.render(<SigninPage />, document.getElementById('content'))
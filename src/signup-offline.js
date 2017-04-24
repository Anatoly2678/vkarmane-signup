import SignupForm from './components/signupoffline-form'
import Header from './components/vk-master'
import Footer from './components/signup-footer'
import React from 'react'
import ReactDOM from 'react-dom'

const SignupPage = React.createClass({
 		render: function() {
 			return (
 				<div>
	                <div className="header clearfix">
	                    <Header />
	                </div>
                	<SignupForm />
                	<div className="adaptive-space" ></div>
					<Footer />
            	</div>
            );
 		}
 	});

ReactDOM.render(< SignupPage />, document.getElementById('content'));
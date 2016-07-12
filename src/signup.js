import SignupForm from './components/signup-form'
import Header from './components/vk-master'
import React from 'react'
import ReactDOM from 'react-dom'

const SignupPage = React.createClass({
 		render: function() {
 			return (
 				<div>
	                <div className="header clearfix">
	                    < Header />
	                </div>
                	<SignupForm />
            	</div>
            );
 		}
 	});

ReactDOM.render(< SignupPage />, document.getElementById('content'));
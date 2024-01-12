
import React, { useState } from 'react';
import './ForgotPassword.css'; 

function ForgotPassword({ onClose }) {

    const [email, setEmail] = useState('');
    const [isLinkSent, setIsLinkSent] = useState(false);
    

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            
            const response = await fetch('http://localhost:3001/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                console.log('Reset password link sent successfully');
                setIsLinkSent(true);
            } else {
                console.error('Failed to send reset password link');
            }
        } catch (error) {
            console.error('Error during reset password:', error);
        }
    };

    const handleResendLink = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/resend-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                console.log('Reset password link resent successfully');
            } else {
                console.error('Failed to resend reset password link');
            }
        } catch (error) {
            console.error('Error during resend link:', error);
        }
    };
   
    return (
        <div className="create-account-container">
             
            <div className="content-container">
                {!isLinkSent ? (
                    <>
                        <div className="button-container">
                            <button className='join-button'>
                                Join Panda
                            </button>
                            <p className="button-separator">or</p>
                            <button className='sign-in-button'>
                                Sign In
                            </button>
                        </div>
                        <div className="form-container">
                            <div className="boundary">
                                <div className="icon-container">
                                    <img src="/Union.png" alt="Icon" />
                                </div>
                                <h1>Forgot Password</h1>
                                <form onSubmit={handleResetPassword}>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder='Email address'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <p className='passreset'>Please enter your login email address to receive your password reset link.</p>
                                    
                                </form>
                                

                               
                            </div>
                            <button type="submit" onClick={handleResetPassword}>Get Reset Link</button>
                        </div>
                    </>
                ) : (
                        
                         <>
                        <div className="button-container">
                            <button className='join-button'>
                                Join Panda
                            </button>
                            <p className="button-separator">or</p>
                            <button className='sign-in-button'>
                                Sign In
                            </button>
                        </div>
                        <div className="form-container">
                            <div className="boundary">
                                <div className="icon-container">
                                    <img src="/Union.png" alt="Icon" />
                                </div>
                                    <h1>Forgot Password</h1>
                                    <div className="link-sent-container">
                                        <p className='reset'>Password reset link sent to {email}. Check your email and click on the link to reset your password.</p>
                                        
                                    </div>
                               
                                </div>
                                <p className='passresetLink'>Didn't get the password reset link?</p>
                                <button onClick={handleResendLink}>Resend Link</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;

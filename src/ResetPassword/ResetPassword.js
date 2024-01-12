import React, { useState } from 'react';
import './ResetPassword.css'; 

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    const handleResetPassword = async () => {
        try {
            
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            
            const resetToken = window.location.search.split('=')[1]; 
            const response = await fetch('http://localhost:3001/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword, resetToken }),
            });

            if (response.ok) {
                setResetSuccess(true); 
            } else {
                const data = await response.json();
                alert(data.error || 'Password reset failed');
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            alert('An error occurred during password reset');
        }
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    };

    return (
        <>
            <div className="reset-password-container">
                <img className='Common' src='/CommonImage.png' alt="Account" />
                <div className="icon-overlay">
                    <img id='logo' src="/Logo.png" alt="Icon" />
                </div>
                <div className="reset-password-content">
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
                            <h1>Reset Password</h1>
                            <form>
                                <div className="form-group">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        id="new-password"
                                        name="new-password"
                                        placeholder='New Password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <span className="show-password" onClick={toggleShowNewPassword}>
                                        {showNewPassword ? 'hide' : 'show'}
                                    </span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirm-password"
                                        name="confirm-password"
                                        placeholder='Confirm Password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <span className="show-password" onClick={toggleShowConfirmPassword}>
                                        {showConfirmPassword ? 'hide' : 'show'}
                                    </span>
                                   
                                    
                                </div>
                                
                            </form>
                           
                            {resetSuccess && <span className="reset-success">Your password has been reset.</span>}
                            

                        </div>
                        <button id='reset-btn' type="button" onClick={handleResetPassword}>
                            Reset Password
                        </button>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;

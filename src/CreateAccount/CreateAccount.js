import React, { useState } from 'react';
import './CreateAccount.css';
import ForgotPassword from '../ForgetPassword/ForgotPassword'; 

function CreateAccount() {
    const [createAccountEmail, setCreateAccountEmail] = useState('');
    const [signInEmail, setSignInEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignInMode, setIsSignInMode] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showPassword, setShowPassword] = useState({
        createAccount: false,
        signIn: false,
    });
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [emailExists, setEmailExists] = useState(false);
  
   

    const resetState = () => {
        setCreateAccountEmail('');
        setSignInEmail('');
        setPassword('');
        setConfirmPassword('');
        setCheckbox1(false);
        setCheckbox2(false);
        setEmailError('');
        setEmailExists(false);
    };

    const isValidEmail = (email) => {
        // Regular expression for a simple email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleAuthAction = async (e) => {
        e.preventDefault();

        const emailToUse = isSignInMode ? signInEmail : createAccountEmail;

        if (!isValidEmail(emailToUse) || !password || (!isSignInMode && !confirmPassword)) {
            alert('Format of email is not valid');
            return;
        }
        try {
            const endpoint = isSignInMode ? 'http://localhost:3001/api/signin' : 'http://localhost:3001/api/register';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailToUse,
                    password,
                    confirmPassword,
                    isExpert: checkbox1,  
                    isOrganization: checkbox2,  
                }),
            });
            if (response.ok) {
                alert(`${isSignInMode ? 'Sign In' : 'Account Creation'} successful`);
                resetState(); 
            } else {
                const data = await response.json();

                if (data.error && data.error.includes('email already exists')) {
                    setEmailExists(true);
                    setEmailError('This email address already exists. Sign In instead.');
                    console.log(emailError)
                } else {
                    setEmailExists(false);
                    setEmailError('');
                    alert(data.error || `${isSignInMode ? 'Sign In' : 'Registration'} failed`);
                }
            }
        } catch (error) {
            console.error(`Error during ${isSignInMode ? 'sign-in' : 'registration'}:`, error);
            setEmailExists(false);
            setEmailError('');
            alert(`An error occurred during ${isSignInMode ? 'sign-in' : 'registration'}`);
        }
    };

    
    const toggleForgotPassword = () => {
        setShowForgotPassword((prev) => !prev);
    };

    const toggleShowPassword = (field) => {
        setShowPassword((prevShowPassword) => ({
            ...prevShowPassword,
            [field]: !prevShowPassword[field],
        }));
    };

    const switchAuthMode = () => {
        setIsSignInMode((prevMode) => !prevMode);
        setShowForgotPassword(false);
    };

    const handleCheckbox1Change = () => {
        setCheckbox1((prev) => !prev);
    };

    const handleCheckbox2Change = () => {
        setCheckbox2((prev) => !prev);
    };

    return (
        <div className="create-account-container">
            <img className='Common' src='/CommonImage.png' alt="Account" />
            <div className="icon-overlay">
                <img src="/Logo.png" alt="Icon" />
            </div>
            <div className="content-container">
                {showForgotPassword ? (
                    <ForgotPassword onClose={toggleForgotPassword} />
                ) : (
                    <>
                        <div className="button-container">
                            <button className={`join-button ${!isSignInMode ? 'selected' : ''}`} onClick={() => setIsSignInMode(false)}>
                                Join Panda
                            </button>
                            <p className="button-separator">or</p>
                            <button className={`sign-in-button ${isSignInMode ? 'selected' : ''}`} onClick={() => setIsSignInMode(true)}>
                                Sign In
                            </button>
                        </div>
                        <div className="form-container">
                            <div className="boundary">
                                <div className="icon-container">
                                    <img src="/Union.png" alt="Icon" />
                                </div>
                                <h1>{isSignInMode ? 'Sign In ' : 'Create your free account'}</h1>
                                <h3>
                                    {isSignInMode ? '' : 'Takes less than '}
                                    {isSignInMode ? '' : <span style={{ color: '#A95454' }}>5 minutes...</span>}
                                </h3>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder={isSignInMode ? 'Enter your email here' : 'Create your email here'}
                                        value={isSignInMode ? signInEmail : createAccountEmail}
                                        onChange={(e) => isSignInMode ? setSignInEmail(e.target.value) : setCreateAccountEmail(e.target.value)}
                                        required
                                    />
                                    <p onClick={switchAuthMode} className="switch-auth-mode">
                                        {isSignInMode ? 'Need an account? Sign Up' : emailExists ? (
                                            <> Username already exists. <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'gray' }}>
                                                Sign In
                                            </span>
                                            </>
                                        ) : ''}
                                    </p>
                                </div>
                                <div className="form-group password-group">
                                    <input
                                        type={showPassword.createAccount ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder='Enter your password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span className="show-password" onClick={() => toggleShowPassword('createAccount')}>
                                        {showPassword.createAccount ? 'hide' : 'show'}
                                    </span>
                                    {isSignInMode && (
                                        <p className="forgot-password" onClick={toggleForgotPassword}>
                                            Forgot Password?
                                        </p>
                                    )}
                                    {!isSignInMode && (
                                        <div className="form-group password-group">
                                            <input
                                                type={showPassword.signIn ? 'text' : 'password'}
                                                id="confirm-password"
                                                name="confirm-password"
                                                placeholder='Confirm your password'
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                            <span className="show-password" onClick={() => toggleShowPassword('signIn')}>
                                                {showPassword.signIn ? 'hide' : 'show'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {!isSignInMode && (
                                <div className="form-group checkboxes-group">
                                    <div className="checkbox-group1">
                                        <input
                                            type="checkbox"
                                            id="checkbox1"
                                            name="checkbox1"
                                            checked={checkbox1}
                                            onChange={handleCheckbox1Change}
                                        />
                                        <label htmlFor="checkbox1">I'm an Expert</label>
                                    </div>
                                    <div className="checkbox-group2">
                                        <input
                                            type="checkbox"
                                            id="checkbox2"
                                            name="checkbox2"
                                            checked={checkbox2}
                                            onChange={handleCheckbox2Change}
                                        />
                                        <label htmlFor="checkbox2">I'm an Organization in Africa</label>
                                    </div>
                                </div>
                            )}
                            <button type="submit" onClick={handleAuthAction}>{isSignInMode ? 'Sign In' : 'Join PANDA'}</button>
                            <p className='privacy'>By clicking on "Create an account", you agree to our <span>terms of use</span> and <span>privacy policy</span>.</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CreateAccount;

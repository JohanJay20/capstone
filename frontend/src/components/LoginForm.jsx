import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle, loginManually } from '../api';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const { credential } = credentialResponse;
      const data = await loginWithGoogle(credential);
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Google login failed', err);
      setMessage('❌ Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleManualLogin = async () => {
    try {
      setLoading(true);
      setMessage('');
      const data = await loginManually(email, password);
      localStorage.setItem('token', data.token);
      setMessage("✅ Login successful!");
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (err) {
      setMessage('❌ Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/dashboard';
    }
  }, []);
  return (

    <div className="authincation-content">
      <div className="row no-gutters">
        <div className="col-xl-12">
          <div className="auth-form">
            <div className="text-center mb-3">
              <img src="images/RatRepel.svg" alt="Logo" />
            </div>
            <h4 className="text-center mb-4">Sign in your account</h4>
            <form role="form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="mb-1"><strong>Email</strong></label>
                <input type="email" placeholder="Enter your email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="mb-1"><strong>Password</strong></label>
                <input type="password" placeholder="Enter your password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="form-row d-flex justify-content-between mt-4 mb-2">
                
               
                {message && (
                  <div className="text-center mb-3">
                    <small className={`text-${message.startsWith("✅") ? "success" : "danger"}`}>
                      {message}
                    </small>
                  </div>
                )}
              </div>
              <div className="text-center">
                <button type="submit" onClick={handleManualLogin} className="btn btn-primary col-xl-6" disabled={loading}> {loading ? 'Signing in...' : 'Sign In'} </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <p className="text-primary">or</p>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setMessage('❌ Google login failed')}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;


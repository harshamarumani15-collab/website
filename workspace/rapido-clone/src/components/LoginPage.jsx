import { useState, useEffect, useCallback } from 'react';
import { sendOTP, verifyOTP } from '../services/authService';
import { Phone, Shield, CheckCircle, AlertCircle, Loader, ArrowLeft } from 'lucide-react';
import './LoginPage.css';

function LoginPage({ onLoginSuccess }) {
  const [step, setStep] = useState('PHONE'); // PHONE, OTP, SUCCESS
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  // Validate Indian mobile number (10 digits starting with 6-9)
  const isValidMobile = (number) => /^[6-9]\d{9}$/.test(number);

  // Handle phone number submission
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isValidMobile(mobileNumber)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setLoading(true);
    try {
      const response = await sendOTP(mobileNumber);
      setSessionId(response.sessionId);
      setStep('OTP');
      setTimeLeft(30); // 30 seconds cooldown for resend
      setSuccessMessage('OTP sent successfully to your mobile number');
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only single digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP keydown (backspace navigation)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOTP(mobileNumber, otpValue, sessionId);
      if (response.success) {
        setStep('SUCCESS');
        setTimeout(() => {
          onLoginSuccess({ mobileNumber, ...response.user });
        }, 1500);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP resend
  const handleResendOtp = async () => {
    if (timeLeft > 0) return;
    
    setError('');
    setLoading(true);
    try {
      const response = await sendOTP(mobileNumber);
      setSessionId(response.sessionId);
      setTimeLeft(30);
      setSuccessMessage('OTP resent successfully');
      setOtp(['', '', '', '', '', '']); // Clear OTP inputs
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Go back to phone step
  const handleBackToPhone = () => {
    setStep('PHONE');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          {/* Logo/Header */}
          <div className="login-header">
            <h1 className="login-logo">Rapido</h1>
            <p className="login-tagline">Your Ride, Your Way</p>
          </div>

          {/* Step 1: Phone Number Input */}
          {step === 'PHONE' && (
            <form onSubmit={handlePhoneSubmit} className="login-form">
              <div className="form-section">
                <div className="icon-wrapper">
                  <Phone size={48} />
                </div>
                <h2 className="form-title">Enter Mobile Number</h2>
                <p className="form-subtitle">
                  We'll send you an OTP to verify your identity
                </p>
              </div>

              <div className="input-group">
                <label htmlFor="mobile">Mobile Number</label>
                <div className="input-with-prefix">
                  <span className="country-code">+91</span>
                  <input
                    id="mobile"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    maxLength="10"
                    className="form-input"
                    disabled={loading}
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading || mobileNumber.length !== 10}
              >
                {loading ? (
                  <>
                    <Loader className="spin" size={20} />
                    Sending OTP...
                  </>
                ) : (
                  'Get OTP'
                )}
              </button>

              <p className="terms-text">
                By continuing, you agree to our{' '}
                <a href="/terms">Terms of Service</a> and{' '}
                <a href="/privacy">Privacy Policy</a>
              </p>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'OTP' && (
            <form onSubmit={handleOtpSubmit} className="login-form">
              <div className="form-section">
                <button 
                  type="button" 
                  className="btn-back" 
                  onClick={handleBackToPhone}
                  disabled={loading}
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="icon-wrapper">
                  <Shield size={48} />
                </div>
                <h2 className="form-title">Enter OTP</h2>
                <p className="form-subtitle">
                  Enter the 6-digit code sent to +91 {mobileNumber}
                </p>
              </div>

              {successMessage && (
                <div className="success-message">
                  <CheckCircle size={18} />
                  <span>{successMessage}</span>
                </div>
              )}

              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="otp-input"
                    disabled={loading}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {error && (
                <div className="error-message">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading || otp.some(d => d === '')}
              >
                {loading ? (
                  <>
                    <Loader className="spin" size={20} />
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </button>

              <div className="resend-section">
                <p>Didn't receive the code?</p>
                {timeLeft > 0 ? (
                  <p className="resend-timer">Resend in {timeLeft}s</p>
                ) : (
                  <button 
                    type="button" 
                    className="btn-resend"
                    onClick={handleResendOtp}
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Step 3: Success */}
          {step === 'SUCCESS' && (
            <div className="login-success">
              <div className="success-icon">
                <CheckCircle size={80} />
              </div>
              <h2>Login Successful!</h2>
              <p>Redirecting to your dashboard...</p>
              <Loader className="spin" size={32} />
            </div>
          )}
        </div>

        {/* Background Decorations */}
        <div className="background-decoration decoration-1"></div>
        <div className="background-decoration decoration-2"></div>
        <div className="background-decoration decoration-3"></div>
      </div>
    </div>
  );
}

export default LoginPage;

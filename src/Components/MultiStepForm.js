import React, { useState } from 'react';
import './Multi.css';  

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [paymentOption, setPaymentOption] = useState('');

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert('Payment completed successfully!');
  };

  return (
    <div className="form-container">
      <div className="steps-indicator">
        <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className="arrow">&#8594;</div>
        <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className="arrow">&#8594;</div>
        <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>
      <div className={step === 1 ? 'form-step active step1' : 'form-step step1'}>
      <br></br>
        <form onSubmit={handlePhoneNumberSubmit}>
          <label>Enter your phone number:</label>
          <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} required/>
          <button type="submit">Enter</button>
        </form>
      </div>
      <div className={step === 2 ? 'form-step active step2' : 'form-step step2'}>
        <br></br>
        <form onSubmit={handleOtpSubmit}>
          <label>Enter OTP:</label>
          <input type="text" value={otp} onChange={handleOtpChange} required/>
          <button type="submit">OK</button>
        </form>
      </div>
      <div className={step === 3 ? 'form-step active step3' : 'form-step step3'}>
      <br></br>
        <form onSubmit={handlePaymentSubmit}>
          <label>Select Payment Option:</label>
          <select value={paymentOption} onChange={handlePaymentOptionChange} required>
            <option value="">Select Payment Option</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;

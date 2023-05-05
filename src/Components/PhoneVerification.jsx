import React, { useState, useRef, useEffect } from "react";
import "./PhoneVerification.css";
const PhoneVerificationPopup = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) {
      return;
    }

    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);

    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    const otpCopy = [...otp];
    for (let i = 0; i < otp.length; i++) {
      if (pastedData[i] && !isNaN(pastedData[i])) {
        otpCopy[i] = pastedData[i];
        inputRefs.current[i].value = pastedData[i]; // auto-fill the input box
      }
    }
    setOtp(otpCopy);
  };
  const handleVerifyButtonClick = () => {
    const enteredOtp = otp.join("");
    console.log(`Verifying OTP: ${enteredOtp}`);
    if (enteredOtp === "") {
      alert("Please enter OTP");
    } else {
      // Call backend API to verify the entered OTP
      // If the entered OTP is correct, show success message and close the popup
      alert("Phone number verified!");
    }
  };

  const handleResendButtonClick = () => {
    console.log("Resending OTP");
    // Call backend API to resend OTP to the user's phone number
    const newOtp = Math.floor(100000 + Math.random() * 900000)
      .toString()
      .split("");
    setOtp(newOtp);
  };

  return (
    <div className="phone-verification-popup">
      <div className="phone-verification-popup-content">
        <h3>Phone Verification</h3>
        <p>
          Enter the OTP you received on  9546xxxxx2
        </p>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </div>
        <p className="resend-otp">
          Change Number ?{" "}
          <button onClick={handleResendButtonClick}>Resend OTP</button>
        </p>
        <button className="verify-button" onClick={handleVerifyButtonClick}>
          Verify Phone Number
        </button>
      </div>
    </div>
  );
};
export default PhoneVerificationPopup;

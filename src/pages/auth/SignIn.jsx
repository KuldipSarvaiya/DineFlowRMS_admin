import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { firebase_app } from "./FirebaseConfig";
import { context } from "../../AppState";

function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [accData, setAccData] = useState({});
  const navigate = useNavigate();
  const recaptcha = useRef(null);
  const { Dispatch } = useContext(context);
  const auth = getAuth(firebase_app);
  const model = useRef(null);

  // verify captcha firebase
  // https://firebase.google.com/docs/auth/web/phone-auth
  const verifyCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptcha.current, {
      size: "invisible",
      callback: (response) => {},
    });
  };

  async function sendOTP(phoneNumber) {
    verifyCaptcha(); // Replace with actual element ID
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, "+91" + phoneNumber.toString(), appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        setOtpSent(true);
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
        setError("mobile_no", {
          message: "Faild to send OTP !!. Try again.",
        });
      });
  }
  function verifyOTP(code = 123456) {
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        localStorage.setItem("id", accData.employee_id);
        Dispatch({ type: "setAuth", payload: accData });
        navigate("/");
        console.log(result);
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        setError("otp", {
          message: "Failed to verify This OTP !! Check Again.",
        });
      });
  }

  async function handleFormSubmit(formdata) {
    if (otpSent) return verifyOTP(formdata.otp);

    // send additional data
    try {
      const res = await axios.get(
        "/employee/search?mobile_no=" +
          formdata.mobile_no +
          "&password=" +
          formdata.password
      );
      console.log(res.data);
      if (res?.data?.legth >= 1) {
        reset();
        return setError("password", {
          message: "Could Not find Account with this Credentials.",
        });
      } else {
        setAccData(res.data[0]);
        sendOTP(formdata.mobile_no);
      }
    } catch (e) {
      console.log(e);
      setError("password", {
        type: "NETWORK",
        message: "Network Error while searching your account.",
      });
    }
    // console.log(formdata);
  }

  model?.current?.showModal();

  return (
    <dialog
      ref={model}
      style={{
        width: "400px",
        boxShadow: "0px 0px 10px 600px white",
        display: "block",
      }}
    >
      <section
        // id="book-a-table"
        // class="book-a-table card col-lg-6 row card-body"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <center>
          <div class="d-flex align-items-center justify-content-between">
            <a href="/" class="logo d-flex align-items-center">
              <img src="assets/img/logo.png" alt="" />
              <span class="d-none d-lg-block">DineFlowRMS</span>
            </a>
          </div>
          {/* <h1>Sign In</h1> */}
        </center>
        <br />
        <br />
        <div ref={recaptcha}></div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <fieldset role="tree">
            <div class="col-sm-10">
              <input
                disabled={otpSent}
                {...register("mobile_no", {
                  required: "Please enter Your 10 Digit Mobile Number",
                  maxLength: 100,
                  pattern: {
                    value: /[0-9]{10}/,
                    message: "Please enter valid 10 digit mobile Number",
                  },
                })}
                type="tel"
                placeholder="Mobile No."
                aria-label="Mobile Number"
                title="enter your mobile"
                class="form-control"
              />
              <label htmlFor="name" style={{ color: "red" }}>
                {errors?.mobile_no?.message}
              </label>
            </div>
            <div class="col-sm-10">
              <input
                disabled={otpSent}
                {...register("password", {
                  required: "Please Enter Your Password",
                  pattern: {
                    value: /[0-9a-zA-Z]{8,}/,
                    message: "Please enter Strong password",
                  },
                })}
                type="password"
                placeholder="Password"
                aria-label="Password"
                title="enter strong password"
                class="form-control"
              />
              <label htmlFor="password" style={{ color: "red" }}>
                {errors?.password?.message}
              </label>
            </div>
            {otpSent && (
              <div class="col-sm-10">
                <input
                  title="enter otp sent to entered Mobile"
                  {...register("otp", {
                    required: "please enter OTP before continuing",
                    pattern: {
                      value: /[0-9]{6}/,
                      message: "Wrong OTP!! Please check again.",
                    },
                    min: 100000,
                    max: 999999,
                  })}
                  type="number"
                  placeholder="OTP"
                  aria-label="otp"
                  class="form-control"
                />
                <label htmlFor="otp" style={{ color: "red" }}>
                  {errors?.otp?.message}
                </label>
              </div>
            )}
            <input
              type="submit"
              value="SIGN IN"
              title="signin"
              class="btn btn-primary"
            />
          </fieldset>
        </form>
      </section>
    </dialog>
  );
}

export default SignIn;

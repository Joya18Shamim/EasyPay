import { useState } from "react"
import {BottomWarning} from "../components/BottomWarning"
import {Button} from "../components/Button"
import {Heading} from "../components/Heading"
import {InputBox} from "../components/InputBox"
import {SubHeading} from "../components/SubHeading"
import { useNavigate } from "react-router-dom";
import axios from "axios";



export const Signin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
  const navigate = useNavigate();

  const handleSignIn = async () => {
     // Check if username and password fields are filled
     if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
  }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
       // Save the token to localStorage or sessionStorage
       localStorage.setItem('token', response.data.token);

       console.log('Sign-in successful! Redirecting to dashboard...');
       navigate('/dashboard'); // Navigate to the dashboard page
   } catch (error) {
       if (error.response && error.response.data) {
           // Handle errors and display the error message
           setErrorMessage(error.response.data.message || 'Sign-in failed. Please try again.');
       } else {
           setErrorMessage("Error signing in. Please try again.");
       }
       console.error('Error:', error);
   }
  };
    return <div className="bg-slate-400 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="joya11@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          {/* <InputBox placeholder="joya11@gmail.com" label={"Email"} />
          <InputBox placeholder= "123456" label={"Password"} /> */}
          <div className="pt-4">
            <Button  onClick={handleSignIn} label={"Sign in"} />
          </div>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>} {/* Display error message */}
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
          
        </div>
      </div>
    </div>
};
"use client";

import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { LiaCopyrightSolid } from "react-icons/lia";
import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import {
  fetchUserAttributes,
  getCurrentUser,
  signInWithRedirect,
} from "aws-amplify/auth";
import awsExports from "../aws-exports";

const LandingPage: React.FC = () => {
  Amplify.configure(awsExports);

  const currentAuthenticatedUser = async () => {
    try {
      const { userId } = await getCurrentUser();
      console.log('user id', userId)

      if(userId){
        window.location.href = "/home";
      }else{
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    currentAuthenticatedUser();
  })

  Hub.listen("auth", ({ payload }) => {
    if (payload.event === "signInWithRedirect") {
      // router.push('/home');
      window.location.href = "/home";
    }

    if(payload.event === "signedOut") {
      
    }
  });
  const handleClick = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const test = signInWithRedirect({ provider: "Google" });
    console.log(test);
    const user = await getCurrentUser();
    const userAtt = await fetchUserAttributes();

    console.log("ATTRIBUTES: ", userAtt);
    console.log(user);
  };
  return (
    <div className="flex justify-center md:justify-evenly flex-col min-h-screen md:flex-row">
      <div className="flex hero flex-col items-center justify-center bg-gray-200 w-full absolute h-1/2 top-0 md:relative md:h-auto">
        {/* <h1 className="text-4xl text-white">AUIS Eagle</h1> */}
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center mt-56 md:mt-96 gap-2">
          <h1 className="text-xl">Get Started</h1>
          <button
            onClick={handleClick}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 transition ease-in duration-200 hover:text-white hover:bg-black"
          >
            <FaGoogle />
            Login With Google
          </button>
        </div>
        <footer className="flex items-center justify-center gap-1 absolute bottom-5">
          <LiaCopyrightSolid />
          <p>AUIS Eagle</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;

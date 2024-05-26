"use client";

// import ProfileProps from "@/interface/ProfileProps";
import { IoPerson } from "react-icons/io5";

const Profile = () => {
  return (
    <>
      <div className="w-full mx-2 h-64">
        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="flex space-x-2 font-semibold text-gray-900 leading-8">
            <IoPerson className="w-7 h-7"/>
            <span className="tracking-wide">Profile</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">First Name</div>
                <div className="px-4 py-2">Jane</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Middle Name</div>
                <div className="px-4 py-2">Mohammed</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Last Name</div>
                <div className="px-4 py-2">Doe</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email</div>
                <div className="px-4 py-2">
                  <a className="text-blue-800" href="mailto:jane@example.com">
                    jane@example.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

import dayjs from "dayjs";
import { BellDot } from "lucide-react";
export default function Profile() {
  const userFirstName = "Elly";
  const userLastName = "Ma";
  const registeredDate = "2025-10-01";
  const userEmail = "rmruitingma@gmail.com";
  const userType = "Student";
  const profilePicture = "/images/default_profile.jpg";
  const today = dayjs().format("dddd, MMMM D, YYYY");
  return (
    <div id="profile" className="flex flex-col px-6">
      <header
        id="profile-header"
        className="flex items-center justify-between mb-5 mt-6"
      >
        <div>
          <h1 className="text-xl text-stone-600">Welcome, {userFirstName}</h1>
          <h3 className="text-stone-600">{today}</h3>
        </div>
        <div className="flex space-x-5 items-center">
          <BellDot size={20} className="text-stone-600" />
          <img
            src={profilePicture}
            alt="Profile"
            className="w-11 h-11 rounded-sm border-stone-200 border-2 object-cover text-sm"
          />
        </div>
      </header>
      <main
        id="profile-box"
        className="rounded-lg bg-white pt-8 pb-15 px-5 shadow-lg"
      >
        <div id="profile-content" className="flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6 items-center">
              <img
                src={profilePicture}
                alt="Profile"
                className="rounded-full h-20 w-20 shadow-sm"
              />
              <div>
                <div className="text-xl text-stone-800 font-semibold">
                  {userFirstName} {userLastName}
                </div>
                <div className="text-sm text-stone-600">{userEmail}</div>
              </div>
            </div>
            <button
              id="edit-profile-btn"
              className="text-lg text-white bg-sky-600 rounded-sm px-5 py-1 hover:bg-sky-700"
            >
              Edit
            </button>
          </div>
          <div className="flex flex-col text-stone-600 text-m space-y-5">
            <div className="flex space-x-10">
              <div className="flex flex-col flex-1">
                <label htmlFor="first-name">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  value={userFirstName}
                  className="px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="nickname">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  value={userLastName}
                  className="px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 "
                />
              </div>
            </div>
            <div className="flex space-x-10">
              <div className="flex flex-col flex-1">
                <label htmlFor="register-date">Registered Date</label>
                <input
                  id="register-date"
                  type="text"
                  value={registeredDate}
                  className="px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="user-type">User Type</label>
                <div
                  id="user-type"
                  className="flex items-center space-x-8 h-full"
                >
                  <div>
                    <input
                      disabled
                      id="student-btn"
                      type="radio"
                      className="me-2 ms-1"
                      checked={userType === "Student"}
                    />
                    <label htmlFor="student-btn">Student</label>
                  </div>
                  <div>
                    <input
                      disabled
                      id="admin-btn"
                      type="radio"
                      className="me-2"
                      // checked={userType === "Administrator"}
                    />
                    <label htmlFor="admin-btn">Administrator</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

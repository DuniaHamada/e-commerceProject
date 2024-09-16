import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("profile");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        const { firstName, lastName, email, address } = response.data;

        setProfileData({
          firstName,
          lastName,
          email,
          address,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    console.log("Profile saved", profileData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const sections = [
    {
      title: "Manage My Account",
      options: [
        { id: "profile", label: "My Profile" },
        { id: "addressBook", label: "Address Book" },
        { id: "paymentOptions", label: "My Payment Options" },
      ],
    },
    {
      title: "My Orders",
      options: [
        { id: "orders", label: "My Orders" },
        { id: "returns", label: "My Returns" },
        { id: "cancellations", label: "My Cancellations" },
      ],
    },
    {
      title: "My Wishlist",
      options: [{ id: "wishlist", label: "My Wishlist" }],
    },
  ];

  return (
    <div className="container mx-auto py-10 poppins-medium">
      <div className="bg-white rounded shadow p-8 max-w-6xl mx-auto flex">
        <div className="w-1/4 pr-8 border-r">
          {sections.map((section) => (
            <div key={section.title} className="mb-3">
              <h3 className=" font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>

              <ul className="space-y-5">
                {section.options.map((option) => (
                  <li
                    key={option.id}
                    className={`cursor-pointer py-1 px-4 rounded text-base transition-all duration-200 ${
                      selectedSection === option.id
                        ? "bg-gray-100 text-rose-800 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedSection(option.id)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-3/4 pl-10">
          {selectedSection === "profile" && (
            <>
              <h2 className="text-xl font-semibold text-rose-800 mb-8">
                Edit Your Profile
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-600"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-lg font-normal text-gray-800 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-lg font-normal text-gray-800 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-600"
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-rose-800 mt-8 mb-8">
                Change Password
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="col-span-2">
                  <label className="block text-lg font-normal text-gray-800 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={profileData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={profileData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-lg font-normal text-gray-800 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={profileData.confirmNewPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-red-600"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-10 space-x-6">
                <button className="text-gray-600 hover:text-gray-800 font-medium">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-rose-800 text-white px-6 py-3 rounded-lg hover:bg-rise transition duration-200"
                >
                  Save Changes
                </button>
              </div>
            </>
          )}

          {selectedSection !== "profile" && (
            <div>
              <h2 className="text-xl font-semibold text-rose-800 mb-6">
                {
                  sections
                    .flatMap((section) => section.options)
                    .find((s) => s.id === selectedSection)?.label
                }
              </h2>
              <p>This section is under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

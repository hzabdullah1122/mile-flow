import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { User, Phone, Building2, Calendar, ShieldCheck } from "lucide-react";

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the most recent profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select(
            "user_id, first_name, last_name, business_name, phone, created_at"
          )
          .order("created_at", { ascending: false })
          .limit(1);

        if (profileError) throw profileError;

        if (profileData && profileData.length > 0) {
          setProfile(profileData[0]);
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-600">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl overflow-hidden">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 flex items-center gap-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="text-white">
            <h2 className="text-3xl font-bold">
              {profile.first_name} {profile.last_name}
            </h2>
            <p className="text-lg opacity-90">{profile.business_name}</p>
            <p className="text-sm opacity-80">
              Member since {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" /> Personal Info
            </h3>
            <p className="mb-2">
              <span className="font-medium">Full Name:</span>{" "}
              {profile.first_name} {profile.last_name}
            </p>
          <p className="mb-2"> <span className=" font-medium">Company Name:</ span> 
              {/* <Building2 className="w-4 h-4 text-gray-500" /> */}
              {profile.business_name}
            </p>
            <p className="mb-2" >
              <span className=" font-medium">Phone No:</ span>
              {profile.phone ?? "—"}
            </p>
            <p className="mb-2">
              <span className="font-medium">User ID:</span> {profile.user_id}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 mb-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 mb-2 h-5 text-indigo-600" /> Account Info
            </h3>
            <p className="mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              {new Date(profile.created_at).toLocaleString()}
            </p>
            <p className="mb-2">
              <span className="font-medium">Role:</span> Customer
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className="text-green-600 font-medium">Active</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 px-8 pb-8">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 transition"
          >
            Back
          </button>
          {/* <button
            className="px-6 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition"
          >
            Edit Profile
          </button> */}
        </div>
      </div>
    </div>
  );
}

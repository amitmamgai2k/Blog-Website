import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AllBlogs from "./AllBlogs";
import CreateBlog from "./CreateBlog";
import axios from "axios";


function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [totalBlogs, setTotalBlogs] = useState(0);
  const [todayBlogs, setTodayBlogs] = useState(0);
 useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/blogs/get-blogs`);
        setTotalBlogs(response.data.length);
        setTodayBlogs(response.data.filter(blog => new Date(blog.createdAt).toDateString() === new Date().toDateString()).length);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  console.log(totalBlogs, todayBlogs);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm border-b border-gray-700/50 p-6 flex justify-between items-center shadow-2xl">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-3xl font-extrabold tracking-wide">
          Admin Dashboard
        </h1>

        <div className="flex gap-4 text-white">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
              activeTab === "dashboard"
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 border border-indigo-400/30"
                : "bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30"
            }`}
          >
            <span className="relative z-10">Dashboard</span>
            {activeTab === "dashboard" && <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
          </button>

          <button
            onClick={() => setActiveTab("allBlogs")}
            className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
              activeTab === "allBlogs"
                ? "bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25 border border-violet-400/30"
                : "bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30"
            }`}
          >
            <span className="relative z-10">All Blogs</span>
            {activeTab === "allBlogs" && <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
          </button>

          <button
            onClick={() => setActiveTab("createBlog")}
            className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
              activeTab === "createBlog"
                ? "bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/25 border border-emerald-400/30"
                : "bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/30"
            }`}
          >
            <span className="relative z-10">Create Blog</span>
            {activeTab === "createBlog" && <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
          </button>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="group relative bg-gradient-to-r from-red-500 to-rose-600 px-6 py-3 rounded-xl hover:from-red-600 hover:to-rose-700 shadow-lg hover:shadow-red-500/25 border border-red-400/30 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 font-semibold text-white"
        >
          <span className="relative z-10">Logout</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </nav>

      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 transition-all duration-500">
            {activeTab === "dashboard" && <DashboardStats todayBlogs={todayBlogs} totalBlogs={totalBlogs} />}
            {activeTab === "allBlogs" && (
              <div className="animate-fadeIn">
                <AllBlogs  />
              </div>
            )}
            {activeTab === "createBlog" && (
              <div className="animate-fadeIn">
                <CreateBlog />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardStats({ todayBlogs, totalBlogs }) {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">Welcome to Admin Panel</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div className="group bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-8 border border-purple-300/30 hover:border-purple-300/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/30 rounded-full">
              <svg className="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
          <div className="text-purple-300 text-4xl font-bold mb-2 group-hover:text-purple-200 transition-colors">{totalBlogs}</div>
          <div className="text-white/80 text-lg font-medium">Total Blogs</div>
        </div>

        <div className="group bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-xl p-8 border border-emerald-300/30 hover:border-emerald-300/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500/30 rounded-full">
              <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-emerald-300 text-4xl font-bold mb-2 group-hover:text-emerald-200 transition-colors">{todayBlogs}</div>
          <div className="text-white/80 text-lg font-medium">Today Blogs</div>
        </div>


      </div>
    </div>
  );
}

export default AdminDashboard;
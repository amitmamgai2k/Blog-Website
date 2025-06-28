import React, { useState, useEffect } from 'react';

// Mock API function - replace with your actual API call
const fetchPosts = async () => {
  // Simulated API response - replace with actual API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          _id: '1',
          title: 'Getting Started with React Hooks',
          content: 'React Hooks revolutionized how we write React components by allowing us to use state and lifecycle methods in functional components...',
          slug: 'getting-started-with-react-hooks',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          _id: '2',
          title: 'Building Modern Web Applications',
          content: 'Modern web development requires understanding of various technologies and frameworks. In this comprehensive guide, we explore...',
          slug: 'building-modern-web-applications',
          createdAt: '2024-01-12T14:20:00Z'
        },
        {
          _id: '3',
          title: 'The Future of JavaScript',
          content: 'JavaScript continues to evolve with new features and capabilities. From ES6 to the latest proposals, let\'s explore what\'s coming...',
          slug: 'the-future-of-javascript',
          createdAt: '2024-01-10T09:15:00Z'
        }
      ]);
    }, 1000);
  });
};

function UserHomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock auth state
  const [user, setUser] = useState(null); // Mock user data
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    // Mock authentication check - replace with actual auth logic
    const checkAuth = () => {
      const token = localStorage.getItem('authToken'); // This would normally check for auth token
      // For demo purposes, randomly set authentication
      const mockAuth = Math.random() > 0.5; // 50% chance of being "logged in"
      setIsAuthenticated(mockAuth);
      if (mockAuth) {
        setUser({
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format',
          role: 'admin' // or 'user'
        });
      }
    };

    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
      if (!event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };

    loadPosts();
    checkAuth();
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const truncateText = (text, maxLength = 150) => {
    const stripped = stripHtml(text);
    return stripped.length > maxLength ? stripped.substring(0, maxLength) + '...' : stripped;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TechBlog
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <a
                  href="/"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Contact
                </a>

                {/* Authentication Section */}
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    {/* Admin Link (only for admin users) */}
                    {user?.role === 'admin' && (
                      <a
                        href="/admin"
                        className="text-purple-600 hover:text-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        Dashboard
                      </a>
                    )}

                    {/* User Profile Dropdown */}
                    <div className="relative user-menu-container">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-200"
                      >
                        <img
                          src={user?.avatar}
                          alt={user?.name}
                          className="w-8 h-8 rounded-full border-2 border-gray-200"
                        />
                        <span className="text-sm font-medium">{user?.name}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                          </div>
                          <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Your Profile
                          </a>
                          <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Settings
                          </a>
                          <a href="/my-posts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            My Posts
                          </a>
                          <div className="border-t border-gray-100 mt-2">
                            <button
                              onClick={() => {
                                setIsAuthenticated(false);
                                setUser(null);
                                setUserMenuOpen(false);
                                // Add actual logout logic here
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <a
                      href="/login"
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Login
                    </a>
                    <a
                      href="/register"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Sign Up
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden mobile-menu-container">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="/" className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="/about" className="text-gray-500 block px-3 py-2 rounded-md text-base font-medium">About</a>
              <a href="/contact" className="text-gray-500 block px-3 py-2 rounded-md text-base font-medium">Contact</a>

              {/* Mobile Authentication */}
              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 pt-4 pb-3">
                    <div className="flex items-center px-3">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                      />
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">{user?.name}</div>
                        <div className="text-sm text-gray-500">{user?.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {user?.role === 'admin' && (
                        <a href="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-purple-600">
                          Dashboard
                        </a>
                      )}
                      <a href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">
                        Your Profile
                      </a>
                      <a href="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">
                        Settings
                      </a>
                      <a href="/my-posts" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">
                        My Posts
                      </a>
                      <button
                        onClick={() => {
                          setIsAuthenticated(false);
                          setUser(null);
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 pt-4 pb-3 space-y-1">
                    <a href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">
                      Login
                    </a>
                    <a href="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white mx-3">
                      Sign Up
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechBlog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the latest insights, tutorials, and trends in web development, programming, and technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Explore Posts
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Posts</h2>
          <p className="text-lg text-gray-600">Stay updated with our latest articles and tutorials</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-8">Be the first to create an amazing blog post!</p>
            <a
              href="/admin/create"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create First Post
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {formatDate(post.createdAt)}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    <a href={`/post/${post.slug}`} className="hover:underline">
                      {post.title}
                    </a>
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {truncateText(post.content)}
                  </p>

                  <div className="flex items-center justify-between">
                    <a
                      href={`/post/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>

                    <div className="flex items-center text-sm text-gray-400">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      5 min read
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                TechBlog
              </h3>
              <p className="text-gray-300 mb-4">
                Your go-to destination for the latest in web development, programming tutorials, and tech insights.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="/admin" className="text-gray-300 hover:text-white transition-colors duration-200">Admin</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Web Development</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">JavaScript</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">React</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Node.js</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2025 TechBlog. All rights reserved. Built with ❤️ using React.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UserHomePage;
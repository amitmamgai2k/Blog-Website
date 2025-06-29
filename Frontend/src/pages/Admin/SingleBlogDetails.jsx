import React from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';

function SingleBlogDetails() {
    const location = useLocation();


  const blog = location.state?.blog;

  // Format date (e.g., June 28, 2025)
  const formatDate = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoDate).toLocaleDateString('en-US', options);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">


      <main className="py-8 px-4 sm:px-6 lg:px-2">
        {blog ? (
          <article className="max-w-5xl mx-auto">
            {/* Article Container */}
            <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 shadow-lg border border-gray-200 text-white rounded-2xl overflow-hidden">
              {/* Article Header */}
              <header className="px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight  mb-6">
                  {blog.title}
                </h1>

                <div className="flex items-center text-gray-300 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-medium">Published on {formatDate(blog.createdAt)}</span>
                </div>
              </header>

              {/* Article Content */}
              <div className="px-6 sm:px-8 lg:px-12 pb-8 sm:pb-12">
                <div
                  className="prose prose-lg sm:prose-xl max-w-none
                           prose-headings:text-gray-900 prose-headings:font-bold
                           prose-h1:text-3xl prose-h1:mb-4
                           prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                           prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                           prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                           prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                           prose-strong:text-gray-900 prose-strong:font-semibold
                           prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-gray-800
                           prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-blue-900 prose-blockquote:rounded-r-lg
                           prose-ul:my-6 prose-li:my-2 prose-li:text-gray-700
                           prose-img:rounded-lg prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </div>

            {/* Article Footer */}
            <footer className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-500">
                <span>Thank you for reading!</span>
              </div>
            </footer>
          </article>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-sm rounded-2xl p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
              <p className="text-gray-600 mb-6">The article you're looking for could not be found.</p>
              <button
                onClick={handleGoBack}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SingleBlogDetails;
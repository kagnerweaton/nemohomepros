import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { User } from 'lucide-react';

const BlogListPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">
            NEMO Home Pros Blog
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 sm:mt-5">
            Expert advice and insights for homeowners in Northeast Missouri.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
          {blogPosts.map((post) => (
            <div key={post.slug} className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={post.imageUrl} alt={post.title} />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <Link to={`/blog/${post.slug}`} className="block mt-2 group">
                    <p className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500">{post.summary}</p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="sr-only">{post.author}</span>
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {post.author}
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;

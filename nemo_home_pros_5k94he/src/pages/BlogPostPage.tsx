import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-yellow-600 hover:underline mt-4 inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-yellow-600 hover:text-yellow-800 font-semibold">
            <ArrowLeft size={18} className="mr-2" />
            Back to all articles
          </Link>
        </div>
        
        <article>
          <div className="mb-8">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto rounded-lg shadow-lg object-cover aspect-video" />
          </div>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center text-sm text-gray-500 mt-4 space-x-4">
              <div className="flex items-center space-x-2">
                <User size={14} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={14} />
                <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none prose-a:text-yellow-600 hover:prose-a:text-yellow-800 prose-headings:font-bold prose-headings:text-black">
            {post.content}
          </div>
        </article>

        <div className="mt-12 border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-800">Keywords:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
                {post.keywords.map(keyword => (
                    <span key={keyword} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                        {keyword}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;

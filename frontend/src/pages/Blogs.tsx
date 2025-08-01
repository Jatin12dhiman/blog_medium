import { Appbar } from "../component/Appbar";
import { BlogCard } from "../component/BlogCard";
import { BlogSkeleton } from "../component/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    // Create on our own custom hook called useBlogs
    const {loading , blogs }  = useBlogs()
    if(loading){
        return<div>
            <Appbar />
         <div className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                
            </div>
        </div>
    </div>

    }

  return ( <div>
            <Appbar />
    <div className="flex justify-center">

        <div >
            {blogs.map(blog => <BlogCard 
            id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
           publishedDate={"8th August 2025"}

            /> )}
            
             
        </div>
    </div>
    </div>
  );
}
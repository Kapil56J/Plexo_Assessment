import React from 'react'
import PostItem from './PostItem'
import './PostList.css'

const PostList = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="post-list-empty">
        <p>No posts found for the selected filter.</p>
      </div>
    )
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList 
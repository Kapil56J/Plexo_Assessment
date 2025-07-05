import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { approvePost, rejectPost, togglePostSelection, openModal } from '../store/postsSlice'
import './PostItem.css'

const PostItem = ({ post }) => {
  const dispatch = useDispatch()
  const { selectedPosts } = useSelector(state => state.posts)
  const isSelected = selectedPosts.includes(post.id)

  const handleApprove = () => {
    dispatch(approvePost(post.id))
  }

  const handleReject = () => {
    dispatch(rejectPost(post.id))
  }

  const handleToggleSelection = () => {
    dispatch(togglePostSelection(post.id))
  }

  const handleViewPost = () => {
    dispatch(openModal(post))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getStatusBadge = () => {
    switch(post.status) {
      case 'pending':
        return <span className="status-badge pending">⏳ Pending</span>
      case 'approved':
        return <span className="status-badge approved">✅ Approved</span>
      case 'rejected':
        return <span className="status-badge rejected">❌ Rejected</span>
      default:
        return null
    }
  }

  return (
    <div className={`post-item ${isSelected ? 'selected' : ''}`}>
      <div className="post-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleToggleSelection}
        />
      </div>

      <div className="post-content">
        <div className="post-header">
          <h3 className="post-title" onClick={handleViewPost}>
            {post.title}
          </h3>
          {getStatusBadge()}
        </div>

        <div className="post-meta">
          <span className="post-author">👤 {post.author.username}</span>
          <span className="post-date">🕐 {formatDate(post.reportedAt)}</span>
          <span className="post-reports">📢 {post.reportCount} report{post.reportCount !== 1 ? 's' : ''}</span>
        </div>

        <div className="post-reported-reason">
          <span className="warning-icon">⚠️</span>
          <span className="reported-text">Reported: {post.reportedReason}</span>
        </div>

        <div className="post-preview">
          {post.content.substring(0, 150)}...
        </div>
      </div>

      <div className="post-actions">
        <button 
          className="btn btn-view"
          onClick={handleViewPost}
        >
          👁️ View
        </button>
        
        {post.status === 'pending' && (
          <>
            <button 
              className="btn btn-approve"
              onClick={handleApprove}
            >
              ✅ Approve
            </button>
            <button 
              className="btn btn-reject"
              onClick={handleReject}
            >
              ❌ Reject
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default PostItem 
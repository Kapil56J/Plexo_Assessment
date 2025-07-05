import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal, approvePost, rejectPost } from '../store/postsSlice'
import './ContentPreviewModal.css'

const ContentPreviewModal = () => {
  const dispatch = useDispatch()
  const { selectedPost, isModalOpen, posts } = useSelector(state => state.posts)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        dispatch(closeModal())
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen, dispatch])

  if (!isModalOpen || !selectedPost) return null

  const handleApprove = () => {
    dispatch(approvePost(selectedPost.id))
    dispatch(closeModal())
  }

  const handleReject = () => {
    dispatch(rejectPost(selectedPost.id))
    dispatch(closeModal())
  }

  const handleClose = () => {
    dispatch(closeModal())
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getStatusBadge = () => {
    switch(selectedPost.status) {
      case 'pending':
        return <span className="status-badge pending">⏳ Pending Review</span>
      case 'approved':
        return <span className="status-badge approved">✅ Approved</span>
      case 'rejected':
        return <span className="status-badge rejected">❌ Rejected</span>
      default:
        return null
    }
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <h2>Content Review</h2>
            {getStatusBadge()}
          </div>
          <div className="modal-navigation">
            <button className="close-btn" onClick={handleClose}>✕</button>
          </div>
        </div>

        <div className="modal-body">
          <div className="post-details">
            <h3 className="post-title">{selectedPost.title}</h3>
            
            <div className="post-meta">
              <span className="author">👤 {selectedPost.author.username}</span>
              <span className="date">🕐 {formatDate(selectedPost.reportedAt)}</span>
              <span className="reports">📢 {selectedPost.reportCount} report{selectedPost.reportCount !== 1 ? 's' : ''}</span>
            </div>

            <div className="reported-reason">
              <span className="warning-icon">⚠️</span>
              <span className="reason-text">Reported Reason: {selectedPost.reportedReason}</span>
            </div>
          </div>

          <div className="post-content-section">
            <h4>Post Content</h4>
            <div className="post-content-text">
              {selectedPost.content}
            </div>
          </div>

          <div className="author-info-section">
            <h4>Author Information</h4>
            <div className="author-details">
              <div className="author-avatar">👤</div>
              <div className="author-data">
                <div className="author-name">{selectedPost.author.username}</div>
                <div className="author-id">ID: {selectedPost.author.id}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          {selectedPost.status === 'pending' && (
            <>
              <button className="btn btn-reject" onClick={handleReject}>
                ❌ Reject Post
              </button>
              <button className="btn btn-approve" onClick={handleApprove}>
                ✅ Approve Post
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentPreviewModal 
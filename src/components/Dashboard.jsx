import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, selectAllPosts, clearSelection, batchApprove, batchReject, clearLastAction } from '../store/postsSlice'
import StatsCards from './StatsCards'
import PostList from './PostList'
import './Dashboard.css'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { posts, selectedPosts, filter, lastAction } = useSelector(state => state.posts)

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true
    return post.status === filter
  })

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter))
  }

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      dispatch(clearSelection())
    } else {
      dispatch(selectAllPosts())
    }
  }

  const handleBatchApprove = () => {
    if (selectedPosts.length > 0) {
      dispatch(batchApprove(selectedPosts))
    }
  }

  const handleBatchReject = () => {
    if (selectedPosts.length > 0) {
      dispatch(batchReject(selectedPosts))
    }
  }

  // Clear last action after 5 seconds
  useEffect(() => {
    if (lastAction) {
      const timer = setTimeout(() => {
        dispatch(clearLastAction())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [lastAction, dispatch])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      
      switch(e.key.toLowerCase()) {
        case 'a':
          e.preventDefault()
          handleBatchApprove()
          break
        case 'r':
          e.preventDefault()
          handleBatchReject()
          break
        case 'escape':
          dispatch(clearSelection())
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [selectedPosts])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Moderation Queue Interface</h1>
        <p className="dashboard-subtitle">Review and moderate user-submitted content efficiently</p>
      </div>

      <StatsCards />

      <div className="dashboard-controls">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => handleFilterChange('pending')}
          >
            Pending Review
          </button>
          <button 
            className={`filter-tab ${filter === 'approved' ? 'active' : ''}`}
            onClick={() => handleFilterChange('approved')}
          >
            Approved
          </button>
          <button 
            className={`filter-tab ${filter === 'rejected' ? 'active' : ''}`}
            onClick={() => handleFilterChange('rejected')}
          >
            Rejected
          </button>
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Posts
          </button>
        </div>

        {filteredPosts.length > 0 && (
          <div className="bulk-actions">
            <label className="select-all-checkbox">
              <input
                type="checkbox"
                checked={selectedPosts.length === filteredPosts.length}
                onChange={handleSelectAll}
              />
              Select All
            </label>
            
            {selectedPosts.length > 0 && (
              <div className="batch-actions">
                <span className="selected-count">
                  {selectedPosts.length} selected
                </span>
                <button 
                  className="btn btn-approve"
                  onClick={handleBatchApprove}
                  disabled={selectedPosts.length === 0}
                >
                  Approve Selected
                </button>
                <button 
                  className="btn btn-reject"
                  onClick={handleBatchReject}
                  disabled={selectedPosts.length === 0}
                >
                  Reject Selected
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <PostList posts={filteredPosts} />

      <div className="keyboard-shortcuts">
        <p><strong>Keyboard Shortcuts:</strong> A - Approve | R - Reject | Esc - Clear Selection</p>
      </div>
    </div>
  )
}

export default Dashboard 
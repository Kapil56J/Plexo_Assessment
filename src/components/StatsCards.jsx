import React from 'react'
import { useSelector } from 'react-redux'
import './StatsCards.css'

const StatsCards = () => {
  const { posts } = useSelector(state => state.posts)

  const stats = {
    total: posts.length,
    pending: posts.filter(p => p.status === 'pending').length,
    approved: posts.filter(p => p.status === 'approved').length,
    rejected: posts.filter(p => p.status === 'rejected').length,
  }

  return (
    <div className="stats-cards">
      <div className="stat-card total">
        <div className="stat-icon">📋</div>
        <div className="stat-info">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Posts</div>
        </div>
      </div>

      <div className="stat-card pending">
        <div className="stat-icon">⏳</div>
        <div className="stat-info">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending Review</div>
        </div>
      </div>

      <div className="stat-card approved">
        <div className="stat-icon">✅</div>
        <div className="stat-info">
          <div className="stat-number">{stats.approved}</div>
          <div className="stat-label">Approved</div>
        </div>
      </div>

      <div className="stat-card rejected">
        <div className="stat-icon">❌</div>
        <div className="stat-info">
          <div className="stat-number">{stats.rejected}</div>
          <div className="stat-label">Rejected</div>
          <div className="stat-meta">{stats.total} total posts</div>
        </div>
      </div>
    </div>
  )
}

export default StatsCards 
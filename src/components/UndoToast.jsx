import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { undoLastAction, clearLastAction } from '../store/postsSlice'
import './UndoToast.css'

const UndoToast = () => {
  const dispatch = useDispatch()
  const { lastAction } = useSelector(state => state.posts)

  if (!lastAction) return null

  const handleUndo = () => {
    dispatch(undoLastAction())
  }

  const handleDismiss = () => {
    dispatch(clearLastAction())
  }

  const getMessage = () => {
    switch(lastAction.type) {
      case 'approve':
        return 'Post approved successfully'
      case 'reject':
        return 'Post rejected successfully'
      case 'batchApprove':
        return `${lastAction.postIds.length} posts approved successfully`
      case 'batchReject':
        return `${lastAction.postIds.length} posts rejected successfully`
      default:
        return 'Action completed'
    }
  }

  return (
    <div className="undo-toast">
      <div className="toast-content">
        <span className="toast-message">{getMessage()}</span>
        <div className="toast-actions">
          <button className="toast-btn undo-btn" onClick={handleUndo}>
            ↶ Undo
          </button>
          <button className="toast-btn dismiss-btn" onClick={handleDismiss}>
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

export default UndoToast 
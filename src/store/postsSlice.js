import { createSlice } from '@reduxjs/toolkit'

const samplePosts = [
  {
    id: "post_001",
    title: "Amazing sunset at the beach today!",
    content: "Just captured this incredible sunset at Malibu Beach. The colors were absolutely stunning today! The orange and pink hues reflecting off the water created such a magical moment. I used my Canon EOS R5 with a 24-70mm lens to capture this breathtaking view. The golden hour really makes all the difference in photography. Can't wait to share more shots from this location!",
    author: {
      username: "photographer_jane",
      id: "user_001"
    },
    reportedReason: "Inappropriate content",
    reportedAt: "2025-01-15T08:00:00Z",
    status: "pending",
    reportCount: 2
  },
  {
    id: "post_002",
    title: "My homemade pizza recipe - family secret!",
    content: "After 20 years of perfecting this recipe, I finally feel ready to share it with the world. This pizza dough has been passed down in my family for generations. The secret is in the fermentation process - we let it rise for exactly 48 hours at room temperature.",
    author: {
      username: "chef_marco",
      id: "user_002"
    },
    reportedReason: "Spam/self-promotion",
    reportedAt: "2025-01-15T05:45:00Z",
    status: "pending",
    reportCount: 1
  },
  {
    id: "post_003",
    title: "Check out my new gaming setup!",
    content: "Finally finished building my dream gaming setup! RTX 4090, 32GB RAM, and a custom water cooling loop. This beast can handle anything I throw at it. The RGB lighting really ties the whole setup together. What do you think?",
    author: {
      username: "gamer_alex",
      id: "user_003"
    },
    reportedReason: "Off-topic content",
    reportedAt: "2025-01-15T04:15:00Z",
    status: "approved",
    reportCount: 1
  },
  {
    id: "post_004",
    title: "Best coffee shops in downtown",
    content: "I've been exploring downtown coffee shops for the past month and here are my top 5 picks. Each one has its own unique character and amazing coffee blends.",
    author: {
      username: "coffee_lover",
      id: "user_004"
    },
    reportedReason: "Inappropriate content",
    reportedAt: "2025-01-15T03:30:00Z",
    status: "rejected",
    reportCount: 3
  },
  {
    id: "post_005",
    title: "Weekend hiking adventure",
    content: "Had an amazing weekend hiking in the mountains. The weather was perfect and the views were breathtaking. Here are some photos from the trail.",
    author: {
      username: "hiker_sam",
      id: "user_005"
    },
    reportedReason: "Spam",
    reportedAt: "2025-01-15T02:15:00Z",
    status: "approved",
    reportCount: 1
  },
  {
    id: "post_006",
    title: "Learning guitar at 40!",
    content: "Never thought I'd pick up a guitar at this age, but here I am! It's challenging but incredibly rewarding. Any tips for adult beginners?",
    author: {
      username: "music_newbie",
      id: "user_006"
    },
    reportedReason: "Off-topic",
    reportedAt: "2025-01-15T01:45:00Z",
    status: "pending",
    reportCount: 1
  },
  {
    id: "post_007",
    title: "Homemade bread recipe",
    content: "Sharing my grandmother's secret bread recipe. It's been in our family for over 100 years and produces the most delicious, fluffy bread you've ever tasted.",
    author: {
      username: "baker_betty",
      id: "user_007"
    },
    reportedReason: "Spam/self-promotion",
    reportedAt: "2025-01-15T01:00:00Z",
    status: "rejected",
    reportCount: 2
  },
  {
    id: "post_008",
    title: "Travel tips for Europe",
    content: "Just got back from a month-long trip across Europe. Here are my top tips for budget traveling and must-see hidden gems in each country I visited.",
    author: {
      username: "travel_guru",
      id: "user_008"
    },
    reportedReason: "Inappropriate content",
    reportedAt: "2025-01-15T00:30:00Z",
    status: "pending",
    reportCount: 2
  }
]

const initialState = {
  posts: samplePosts,
  selectedPosts: [],
  filter: 'pending', // pending, approved, rejected, all
  selectedPost: null,
  isModalOpen: false,
  lastAction: null,
  undoTimeout: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    approvePost: (state, action) => {
      const postId = action.payload
      const post = state.posts.find(p => p.id === postId)
      if (post) {
        post.status = 'approved'
        state.lastAction = { type: 'approve', postId, previousStatus: 'pending' }
      }
    },
    rejectPost: (state, action) => {
      const postId = action.payload
      const post = state.posts.find(p => p.id === postId)
      if (post) {
        post.status = 'rejected'
        state.lastAction = { type: 'reject', postId, previousStatus: 'pending' }
      }
    },
    batchApprove: (state, action) => {
      const postIds = action.payload
      postIds.forEach(postId => {
        const post = state.posts.find(p => p.id === postId)
        if (post) {
          post.status = 'approved'
        }
      })
      state.selectedPosts = []
      state.lastAction = { type: 'batchApprove', postIds, previousStatus: 'pending' }
    },
    batchReject: (state, action) => {
      const postIds = action.payload
      postIds.forEach(postId => {
        const post = state.posts.find(p => p.id === postId)
        if (post) {
          post.status = 'rejected'
        }
      })
      state.selectedPosts = []
      state.lastAction = { type: 'batchReject', postIds, previousStatus: 'pending' }
    },
    togglePostSelection: (state, action) => {
      const postId = action.payload
      const index = state.selectedPosts.indexOf(postId)
      if (index > -1) {
        state.selectedPosts.splice(index, 1)
      } else {
        state.selectedPosts.push(postId)
      }
    },
    selectAllPosts: (state) => {
      const filteredPosts = state.posts.filter(post => {
        if (state.filter === 'all') return true
        return post.status === state.filter
      })
      state.selectedPosts = filteredPosts.map(post => post.id)
    },
    clearSelection: (state) => {
      state.selectedPosts = []
    },
    setFilter: (state, action) => {
      state.filter = action.payload
      state.selectedPosts = []
    },
    openModal: (state, action) => {
      state.selectedPost = action.payload
      state.isModalOpen = true
    },
    closeModal: (state) => {
      state.selectedPost = null
      state.isModalOpen = false
    },
    undoLastAction: (state) => {
      if (state.lastAction) {
        const { type, postId, postIds, previousStatus } = state.lastAction
        if (type === 'approve' || type === 'reject') {
          const post = state.posts.find(p => p.id === postId)
          if (post) {
            post.status = previousStatus
          }
        } else if (type === 'batchApprove' || type === 'batchReject') {
          postIds.forEach(id => {
            const post = state.posts.find(p => p.id === id)
            if (post) {
              post.status = previousStatus
            }
          })
        }
        state.lastAction = null
      }
    },
    clearLastAction: (state) => {
      state.lastAction = null
    }
  },
})

export const {
  approvePost,
  rejectPost,
  batchApprove,
  batchReject,
  togglePostSelection,
  selectAllPosts,
  clearSelection,
  setFilter,
  openModal,
  closeModal,
  undoLastAction,
  clearLastAction
} = postsSlice.actions

export default postsSlice.reducer 
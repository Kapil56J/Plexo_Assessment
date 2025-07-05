# Content Moderation Dashboard

A comprehensive React-based content moderation dashboard that allows moderators to efficiently review and manage user-submitted content with streamlined workflows and batch operations.

## 🚀 Features

### ✅ Core Features (Required)
- **📊 Statistics Dashboard**: Real-time overview of total posts, pending reviews, approved, and rejected content
- **📝 Post List View**: Clean, scannable interface with post titles, usernames, timestamps, and report reasons
- **⚡ Individual Post Actions**: Quick approve/reject buttons with visual feedback
- **🔍 Content Preview Modal**: Detailed view of full post content with navigation and actions
- **📦 Batch Operations**: Multi-select functionality with bulk approve/reject capabilities
- **📱 Responsive Design**: Works seamlessly on desktop and tablet devices

### 🎯 Enhanced Features (Nice to Have)
- **🔄 Status Filtering**: Tab-based navigation between Pending, Approved, Rejected, and All posts
- **✨ Confirmation Dialogs**: Built-in confirmation for actions to prevent mistakes
- **🔔 Undo Functionality**: Toast notifications with undo capabilities for recent actions
- **⌨️ Keyboard Shortcuts**: Efficiency shortcuts for power users

### 🏆 Bonus Features
- **🎹 Advanced Keyboard Shortcuts**: 
  - `A` - Approve selected posts
  - `R` - Reject selected posts
  - `Esc` - Clear selections
  - `Space` - Open content preview
- **↩️ Undo System**: 5-second window to revert recent actions
- **🎨 Modern UI/UX**: Clean, professional interface with smooth animations

## 🛠️ Technology Stack

- **Frontend**: React 18+ with Hooks
- **State Management**: Redux Toolkit
- **Styling**: CSS Modules with responsive design
- **Build Tool**: Vite
- **Icons**: Emoji-based icons for accessibility

## 📋 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd plexo_Assessment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

## 🎯 Usage Guide

### Dashboard Overview
The main dashboard provides a comprehensive view of all content moderation activities:

- **Statistics Cards**: View total posts, pending reviews, approved, and rejected content
- **Filter Tabs**: Switch between different post statuses
- **Bulk Actions**: Select multiple posts for batch operations

### Individual Post Management
Each post displays:
- **Post Title**: Click to open detailed view
- **Author Information**: Username and submission timestamp
- **Report Details**: Reason for reporting and number of reports
- **Content Preview**: First 150 characters of the post
- **Action Buttons**: View, Approve, or Reject individual posts

### Batch Operations
- **Select All**: Checkbox to select all visible posts
- **Multi-Select**: Individual checkboxes for selective operations
- **Batch Actions**: Approve or reject multiple posts simultaneously
- **Selection Counter**: Shows number of selected posts

### Content Preview Modal
- **Full Content View**: Complete post content and metadata
- **Author Information**: Detailed author profile
- **Reported Reason**: Highlighted report information
- **Navigation**: Browse between posts (placeholder for future implementation)
- **Actions**: Approve, reject, or close from modal

### Keyboard Shortcuts
- **A**: Approve selected posts
- **R**: Reject selected posts
- **Esc**: Clear all selections
- **Space**: Open content preview modal (when post is focused)

## 🎨 Design System

### Color Palette
- **Primary**: #007bff (Blue)
- **Success**: #28a745 (Green)
- **Danger**: #dc3545 (Red)
- **Warning**: #ffc107 (Yellow)
- **Info**: #17a2b8 (Teal)

### Status Colors
- **Pending**: Yellow background with orange text
- **Approved**: Green background with dark green text
- **Rejected**: Red background with dark red text

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Headings**: 600 weight for emphasis
- **Body**: 400 weight for readability

## 📊 Data Structure

### Post Object
```javascript
{
  id: "post_123",
  title: "Sample Post Title",
  content: "Full post content here...",
  author: {
    username: "user123",
    id: "user_456"
  },
  reportedReason: "Spam",
  reportedAt: "2025-01-15T10:30:00Z",
  status: "pending", // pending, approved, rejected
  reportCount: 3
}
```

### Redux State
```javascript
{
  posts: Array<Post>,
  selectedPosts: Array<string>,
  filter: 'pending' | 'approved' | 'rejected' | 'all',
  selectedPost: Post | null,
  isModalOpen: boolean,
  lastAction: ActionHistory | null
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 767px and below

## 🎯 Future Enhancements

### Planned Features
- **🔍 Search & Filter**: Search posts by title, author, or content
- **📄 Pagination**: Handle large datasets efficiently
- **📈 Analytics**: Detailed moderation statistics and trends
- **👥 User Profiles**: Enhanced author information and history
- **📱 Mobile App**: Native mobile application
- **🔄 Real-time Updates**: Live updates for collaborative moderation

### Performance Optimizations
- **Virtual Scrolling**: For large post lists
- **Lazy Loading**: Load images and content on demand
- **Caching**: Redis integration for frequently accessed data
- **API Optimization**: GraphQL for efficient data fetching

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for efficient content moderation**

# Connect With Bayezid Agency - Backend Infrastructure

A polished, full-featured agency website with elegant design, comprehensive form management, admin dashboard, and real-time owner notifications. Built with React 19, Express, tRPC, and MySQL.

## 🌟 Features

### Frontend Experience
- **Elegant Landing Page** - Premium hero section with agency branding and trust indicators
- **Services Showcase** - Beautiful service cards with descriptions and pricing
- **Client Inquiry Form** - Collect inquiries with real-time validation
- **Service Order Forms** - Individual forms for each service offering
- **Newsletter Subscription** - Build your subscriber list
- **Customer Feedback** - 1-5 star rating system with detailed feedback
- **Responsive Design** - Mobile-first approach with premium typography

### Admin Dashboard (Owner-Only)
- **Real-Time Data Views** - All inquiries, orders, subscriptions, and feedback in one place
- **Status Management** - Update inquiry status (New, Read, Responded)
- **Order Tracking** - Monitor service orders with status updates (Pending, Confirmed, Completed)
- **Feedback Management** - Review and archive customer feedback
- **Search & Filter** - Find submissions quickly
- **Protected Routes** - Admin-only access with authentication

### Backend Infrastructure
- **tRPC API** - Type-safe backend procedures for all operations
- **Database Persistence** - All form submissions stored in MySQL
- **Owner Notifications** - Email and push notifications on every submission
- **Validation** - Comprehensive input validation on all forms
- **Authentication** - Manus OAuth integration for admin access
- **Error Handling** - Graceful error management with user-friendly messages

## 📊 Database Schema

### Tables
- **inquiries** - Client inquiry submissions
- **serviceOrders** - Service order requests
- **newsletters** - Newsletter subscriber list
- **feedback** - Customer feedback and ratings
- **services** - Available agency services (pre-seeded)
- **users** - User accounts with role-based access

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- pnpm 10+
- MySQL database

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
# Copy .env.example to .env and fill in your values
cp .env.example .env

# Generate database migrations
pnpm drizzle-kit generate

# Apply migrations
pnpm drizzle-kit migrate

# Seed services table (optional)
node seed-services.mjs

# Start development server
pnpm dev
```

### Build for Production

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
client/
  ├── src/
  │   ├── pages/
  │   │   ├── Landing.tsx          # Hero section and landing page
  │   │   ├── Services.tsx         # Services and forms
  │   │   └── AdminDashboard.tsx   # Admin-only dashboard
  │   ├── components/              # Reusable UI components
  │   ├── lib/trpc.ts             # tRPC client setup
  │   └── App.tsx                 # Route configuration
  └── index.html

server/
  ├── routers.ts                  # tRPC procedure definitions
  ├── db.ts                       # Database query helpers
  ├── forms.test.ts               # Comprehensive test suite
  └── _core/                      # Core infrastructure

drizzle/
  ├── schema.ts                   # Database schema definitions
  └── migrations/                 # SQL migrations

shared/
  ├── const.ts                    # Shared constants
  └── types.ts                    # Shared TypeScript types
```

## 🔌 API Endpoints

All API endpoints are tRPC procedures under `/api/trpc`:

### Public Endpoints
- `inquiries.submit` - Submit a client inquiry
- `serviceOrders.submit` - Submit a service order
- `newsletters.subscribe` - Subscribe to newsletter
- `feedback.submit` - Submit customer feedback
- `services.list` - Get available services

### Protected Endpoints (Admin Only)
- `inquiries.list` - Get all inquiries
- `inquiries.updateStatus` - Update inquiry status
- `serviceOrders.list` - Get all service orders
- `serviceOrders.updateStatus` - Update order status
- `newsletters.list` - Get all subscriptions
- `feedback.list` - Get all feedback
- `feedback.updateStatus` - Update feedback status
- `admin.dashboard` - Get dashboard statistics

## 📧 Notifications

The system sends automatic notifications to the project owner whenever:
- A new client inquiry is submitted
- A new service order is placed
- Someone subscribes to the newsletter
- Customer feedback is submitted

Notifications are sent via:
- **Email** - Direct email to owner
- **Push Notifications** - Real-time browser/app notifications

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

Test suite includes:
- Form submission validation (21 tests)
- Database persistence verification
- Admin access control
- Error handling

## 🎨 Design System

### Color Palette
- **Primary** - Purple (#9333EA)
- **Secondary** - Blue (#3B82F6)
- **Accent** - Pink (#EC4899)
- **Neutral** - Gray scale for backgrounds and text

### Typography
- **Headings** - Playfair Display (serif)
- **Body** - Inter (sans-serif)
- **Font Sizes** - Responsive scaling

### Components
- Premium card designs with subtle shadows
- Smooth transitions and micro-interactions
- Accessible form inputs with validation feedback
- Mobile-first responsive layouts

## 🔐 Security

- **Authentication** - Manus OAuth integration
- **Authorization** - Role-based access control (admin/user)
- **Input Validation** - Server-side validation on all endpoints
- **HTTPS** - Secure connections enforced
- **CORS** - Properly configured cross-origin policies
- **Environment Variables** - Sensitive data in .env

## 📱 Responsive Breakpoints

- **Mobile** - 320px and up
- **Tablet** - 768px and up
- **Desktop** - 1024px and up
- **Large Desktop** - 1280px and up

## 🌐 Deployment

The project is ready for deployment on Manus hosting:

1. Create a checkpoint via the Management UI
2. Click the "Publish" button
3. Configure custom domain (optional)
4. Your site goes live!

## 📝 Environment Variables

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/bayezid

# Authentication
JWT_SECRET=your-secret-key
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im

# Notifications
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key

# Owner Info
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write tests for new features
4. Run `pnpm test` to verify
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your agency!

## 🎯 Next Steps

- [ ] Customize branding and colors
- [ ] Add your services to the database
- [ ] Set up email notifications
- [ ] Configure custom domain
- [ ] Deploy to production
- [ ] Monitor submissions and respond to inquiries

## 📞 Support

For issues or questions, please check the GitHub issues or contact the development team.

---

Built with ❤️ for Connect With Bayezid Agency

# Band Rehearsal Scheduler

A comprehensive web application designed to streamline the process of scheduling and managing band rehearsals, with features for availability tracking, smart scheduling, and integrated planning tools.

## Features

- **User Authentication & Management**
  - Band administrators can create accounts and set up band profiles
  - Band members can be invited and join with different permission levels
  - User profiles with instrument/role information

- **Rehearsal Scheduling**
  - Create and manage rehearsal events with date, time, duration, location
  - Recurring rehearsal options (weekly, bi-weekly, monthly)
  - Conflict detection with existing schedules
  - Room/venue booking integration

- **Availability Tracking**
  - Members can mark available/unavailable time slots
  - RSVP functionality for scheduled rehearsals
  - Attendance history and statistics

- **Smart Scheduling**
  - Algorithm to suggest optimal rehearsal times based on member availability
  - Priority settings for essential members/instruments

- **Notifications & Reminders**
  - Automated email/SMS reminders before rehearsals
  - Notifications for schedule changes, cancellations
  - Custom notification preferences

- **Rehearsal Planning**
  - Song/setlist management for each rehearsal
  - Notes and goals for specific rehearsals
  - File sharing for sheet music, backing tracks

- **Calendar Integration**
  - Sync with Google Calendar, Apple Calendar, Outlook
  - Export rehearsal schedule to standard calendar formats

## Technology Stack

### Frontend:
- React.js
- Material-UI
- Redux
- FullCalendar
- Formik with Yup validation
- Axios
- Vite

### Backend:
- Node.js with Express
- RESTful API
- JWT authentication
- Joi validation
- Sequelize ORM

### Database:
- PostgreSQL
- Redis (for caching)

### External Services:
- SendGrid (email)
- Twilio (SMS)
- Calendar APIs
- AWS S3 (file storage)

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- PostgreSQL 13+
- Redis 6+

### Installation

1. Clone the repository
```
git clone https://github.com/dxaginfo/music-band-rehearsal-scheduler-xyz123.git
cd music-band-rehearsal-scheduler-xyz123
```

2. Install dependencies
```
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```
# In the server directory, create a .env file with:
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/rehearsal_scheduler
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_sendgrid_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket
```

4. Set up the database
```
# In the server directory
npm run db:migrate
npm run db:seed  # Optional: adds sample data
```

5. Start development servers
```
# Start backend server (from server directory)
npm run dev

# Start frontend server (from client directory)
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
music-band-rehearsal-scheduler-xyz123/
├── client/                  # Frontend React application
│   ├── public/              # Static files
│   └── src/                 # React source code
│       ├── components/      # Reusable UI components
│       ├── hooks/           # Custom React hooks
│       ├── pages/           # Page components
│       ├── services/        # API services
│       ├── store/           # Redux store
│       └── utils/           # Utility functions
│
├── server/                  # Backend Node.js application
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Express middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   └── utils/               # Utility functions
│
├── database/                # Database migrations and seeds
├── docs/                    # Documentation
└── docker/                  # Docker configuration
```

## Deployment

The application can be deployed using Docker and Docker Compose:

```
# Build and start containers
docker-compose up -d
```

For production deployment, consider using AWS Elastic Beanstalk, Heroku, or any other cloud platform that supports Node.js applications.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

DX AG - dxag.info@gmail.com

Project Link: [https://github.com/dxaginfo/music-band-rehearsal-scheduler-xyz123](https://github.com/dxaginfo/music-band-rehearsal-scheduler-xyz123)
# 🎯 Talent Platform - JPD Hub Hackathon 2025

<div align="center">
  <img src="/talent-platform/talent-platform-frontend/public/talentModule-baner.png" alt="Talent Platform Banner" width="100%">
  
  [![Made for JPD Hub](https://img.shields.io/badge/Made%20for-JPD%20Hub-blue)](https://jpdhub.com)
  [![Hackathon](https://img.shields.io/badge/Hackathon-Advitiya%202025-orange)](https://advitiya.iitrpr.ac.in)
  [![Team Size](https://img.shields.io/badge/Team%20Size-5-green)]()
  [![Status](https://img.shields.io/badge/Status-Live-success)]()
</div>


## 🏆 Hackathon Submission

#### This project was developed for the JPD Hub x Advitiya Hackathon 2025, IIT Ropar.




## 💡 Problem Statement

<div style="display: flex; align-items: center; gap: 20px;">
  <div>

#### JPD Hub needs a Talent Module that connects talented individuals with clients while maintaining admin control. The platform should:

- Enable talent registration and profile management
- Provide client access to talent pool
- Include admin controls for profile verification
- Facilitate hiring process management
  </div>
  
  <img src="/talent-platform/talent-platform-frontend/public/JPD_Card.png" alt="JPD Hub Card" width="300px" style="border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
</div>


## 💡 Our Solution
### Our solution is a comprehensive talent management platform that streamlines the process of connecting talented individuals with potential clients, while ensuring quality through admin verification.

<div align="center">
  <img src="public/solution-overview.png" alt="Solution Overview" width="80%">
</div>

### Key Features Implemented
1. **Talent Registration & Admin Approval** ✅
   - Secure registration form with validation
   - Profile photo upload with preview
   - Admin review system
   - Email/WhatsApp notifications

2. **Talent Profile Display** ✅
   - Clean, responsive UI
   - Advanced search and filters
   - Skill-based categorization

3. **Client Interaction** ✅
   - Seamless browsing experience
   - Secure hire request system
   - Real-time notifications

4. **Admin Dashboard** ✅
   - Profile verification system
   - Request management
   - Analytics and reporting

<!-- ## 🖥️ Demo & Screenshots

<div align="center">
  <img src="public/screenshots/dashboard.png" alt="Dashboard" width="45%">
  <img src="public/screenshots/profile.png" alt="Profile Page" width="45%">
</div> -->

<!-- ### 🔗 Live Demo
- [Frontend Application](https://your-demo-link.com)
- [Admin Dashboard](https://your-admin-demo.com)
- [Demo Video](https://youtube.com/your-demo-video) -->

## 📊 Architecture

#### The Talent Platform uses a simple three-tier architecture with React frontend, Node.js backend, and MongoDB database.

```mermaid
graph TD
    A[Client] -->|HTTP| B[React Frontend]
    B -->|API Calls| C[Node.js Backend]
    C -->|Database Queries| D[MongoDB]
    C -->|File Storage| E[Local Storage]
    C -->|Email Service| F[Nodemailer]
    
    subgraph Frontend
        B -->|React Components| B1[Talent Registration]
        B -->|React Components| B2[Admin Dashboard]
        B -->|React Components| B3[Client Interface]
    end
    
    subgraph Backend Services
        C -->|Express Routes| C1[Talent Routes]
        C -->|Express Routes| C2[Admin Routes]
        C -->|Middleware| C3[Authentication]
    end
```

<br>

## 📝 UI Wireframes (Rough Layout)

<details>
  <summary>Click to expand!</summary>

> **Note**: These are ASCII art representations of our planned UI layout, not the final design. They serve as a basic visualization of component structure and user flow.

### 🏠 Home Page Layout

```bash
+-------------Home Page / Landing-----------------+
|                                                |
|     🎯 Connect with Top Tech Talent            |
|     Find the perfect talent for your project   |
|                                                |
|     [Browse Talents]  [Register as Talent]     |
|                                                |
|  +----------------Features------------------+  |
|  |                                          |  |
|  |  🔍 Easy Search    🔒 Verified Profiles |  |
|  |  📝 Quick Apply    ⭐ Top Talent        |  |
|  |                                          |  |
|  +-----------------------------------------+   |
+------------------------------------------------+

```

### 📋 Registration Form Layout

```bash
+------------------------------------------+
|           Talent Platform                 |
|  [Logo]     Browse  Register   Admin     |
+------------------------------------------+

+------------------Registration Form----------------+
|                                                  |
|                 [Photo Upload]                   |
|                     ⭕️                          |
|                                                  |
|  Full Name: +-------------------------+          |
|             |                         |          |
|             +-------------------------+          |
|                                                  |
|  Email:    +-------------------------+          |
|             |                         |          |
|             +-------------------------+          |
|                                                  |
|  Skills:    +-------------+ [Add Skill]         |
|             |             |                      |
|             +-------------+                      |
|                                                  |
|  [JavaScript] [React] [Node.js] [MongoDB]       |
|     (clickable tags with 'x' to remove)         |
|                                                  |
|  Bio:       +-------------------------+          |
|             |                         |          |
|             |                         |          |
|             +-------------------------+          |
|                                                  |
|          [    Submit Registration    ]           |
|                                                  |
+--------------------------------------------------+
```

### 🔍 Talent Directory Layout

```bash
+-------------------Talent Directory----------------+
|  Search: +----------------+ [Search]             |
|                                                  |
|  +----------------+ +------------------+         |
|  | Talent Card 1  | | Talent Card 2    |         |
|  | [Photo]        | | [Photo]          |         |
|  | Name           | | Name             |         |
|  | Skills         | | Skills           |         |
|  | Bio            | | Bio              |         |
|  +----------------+ +------------------+         |
|                                                  |
|  +----------------+ +------------------+         |
|  | Talent Card 3  | | Talent Card 4    |         |
|  | [Photo]        | | [Photo]          |         |
|  | Name           | | Name             |         |
|  | Skills         | | Skills           |         |
|  | Bio            | | Bio              |         |
|  +----------------+ +------------------+         |
+--------------------------------------------------+
```

### 👤 Profile Page Layout

```bash
+--------------Talent Profile Page----------------+
|                                                |
|    [Profile Photo]     Status: ✅ Verified     |
|    John Doe                                    |
|    Full-Stack Developer                        |
|                                                |
|    Skills:                                     |
|    [React] [Node.js] [MongoDB] [TypeScript]    |
|                                                |
|    About Me:                                   |
|    +--------------------------------------+    |
|    | Professional developer with 5 years...|   |
|    +--------------------------------------+    |
|                                                |
|    Projects:                                   |
|    - E-commerce Platform                       |
|    - Social Media App                          |
|                                                |
|    [Contact] [Download CV] [Hire Me]           |
+------------------------------------------------+

```


### 📊 Admin Dashboard Layout

```bash
+-------------------Admin Dashboard----------------+
|                                                  |
|  Pending Approvals (3)                          |
|  +----------------------------------------+     |
|  | [Photo] Name: John Doe                 |     |
|  | Skills: React, Node.js                 |     |
|  | [Approve] [Reject]                     |     |
|  +----------------------------------------+     |
|                                                 |
|  +----------------------------------------+     |
|  | [Photo] Name: Jane Smith               |     |
|  | Skills: Python, AWS                    |     |
|  | [Approve] [Reject]                     |     |
|  +----------------------------------------+     |
+--------------------------------------------------+

```
```bash
+---------------Search Results--------------------+
|  Filters:                                      |
|  Skills: [×React] [×Node.js]                   |
|  Experience: [0-2] [2-5] [5+] years            |
|  Location: [Remote] [On-site]                  |
|                                                |
|  Found 15 matches                              |
|  +----------------+ +------------------+       |
|  | [Photo]        | | [Photo]          |       |
|  | Sarah Chen     | | Mike Johnson     |       |
|  | React Expert   | | Full-Stack Dev   |       |
|  | ⭐⭐⭐⭐⭐    | | ⭐⭐⭐⭐        |       | 
|  +----------------+ +------------------+       |
+------------------------------------------------+
```

```bash
+--------------Admin Analytics--------------------+
|                                                |
|  📊 Dashboard Overview                         |
|  +-------------------+ +-------------------+   |
|  | New Registrations | | Pending Approvals |   |
|  |        24         | |         7         |   |
|  +-------------------+ +-------------------+   |
|                                                |
|  🔍 Recent Activity                            |
|  | Time     | Action    | User              |  |
|  | 10:45 AM | Approved  | John Doe          |  |
|  | 10:30 AM | Rejected  | Invalid Profile   |  |
|  | 10:15 AM | New Reg.  | Sarah Chen        |  |
|                                                |
|  📈 Weekly Stats                               |
|  +--------------------------------------+      |
|  |    ▁▃▅▇█▇▅  Registrations           |       |
|  |    ▂▄▆▇▆▄▂  Approvals              |        |
|  +--------------------------------------+      |
+------------------------------------------------+

```

```bash
+-------------Notification Panel------------------+
|  🔔 Notifications                              |
|                                                |
|  [Today]                                       |
|  • Profile approved by admin                   |
|  • New message from client                     |
|                                                |
|  [Yesterday]                                   |
|  • Profile view by Company XYZ                 |
|  • Skills endorsed by peer                     |
|                                                |
|  [Settings ⚙️]                                 |
|  □ Email notifications                         |
|  □ Push notifications                          |
+------------------------------------------------+

```

```bash
+-------------Message Center---------------------+
|  📨 Messages                                  |
|  +------------------------------------------+ |
|  | Search messages...        [Filter ▼]     | |
|  +------------------------------------------+ |
|                                               |
|  [Active Chats]                               |
|  +------------------------------------------+ |
|  | 🟢 Tech Corp                             | |
|  | Latest: When can you start...            | |
|  +------------------------------------------+ |
|  | 🔴 StartUp Inc                           | |
|  | Latest: Thanks for your time...          | |
|  +------------------------------------------+ |
+----------------------------------------------+

```
</details>

> These wireframes demonstrate the basic structure and component relationships in our application. The actual implementation uses modern UI components with Tailwind CSS styling.


### 🔄 Component Relationships
- Home Page → Registration/Directory
- Directory → Individual Profiles
- Admin Dashboard → Profile Management
- Profile → Messaging System

<br>
<hr>

## 🛠️ Technology Stack

<div class="tech-grid" style="display: flex; gap: 20px;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" alt="React"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" alt="TypeScript"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" alt="Node.js"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="40" alt="MongoDB"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="40" alt="Docker"/>
</div>

<br>

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js
- **Database**: MongoDB
- **File Storage**: AWS S3
- **Notifications**: Twilio WhatsApp API
- **Styling**: Tailwind CSS

## 📂 Project Structure

<details>
  <summary>Click to expand!</summary>

```bash
talent-platform/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── whatsapp.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── clientController.js
│   │   └── talentController.js
│   ├── middleware/
│   │   ├── adminAuth.js
│   │   └── auth.js
│   ├── models/
│   │   ├── Client.js (deleted)
│   │   ├── Client.ts
│   │   ├── HireRequest.js
│   │   ├── Talent.js
│   │   ├── Talent.ts
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── clientRoutes.js
│   │   └── talentRoutes.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── fileUploadService.js
│   │   └── notificationService.ts
│   └── .env
├── talent-platform-frontend/
│   ├── public/
│   │   ├── banner.png
│   │   ├── index.html (deleted)
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── screenshots/
│   │       ├── dashboard.png
│   │       └── profile.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── talent/
│   │   │   │   ├── TalentCard.tsx
│   │   │   │   ├── TalentList.tsx
│   │   │   │   └── TalentSearch.tsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── TalentApproval.js
│   │   │   ├── client/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Registration.tsx
│   │   │   ├── talent/
│   │   │   │   ├── Directory.tsx
│   │   │   │   ├── Profile.tsx
│   │   │   │   └── Registration.tsx
│   │   ├── styles/
│   │   │   ├── AdminDashboard.css
│   │   │   ├── TalentRegistration.css
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.jsx
│   │   ├── main.jsx
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── README.md
```
</details>

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (v6 or higher)
- MongoDB Compass (for database management)
- Git vcs

### Required Dependencies

<details>
  <summary>Check the list</summary>

#### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Toastify

#### Backend
- Express.js
- MongoDB/Mongoose
- TypeScript
- Cors
- Dotenv
- Multer (for file uploads)
- Nodemailer (for email notifications)

</details>


## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/talent-platform.git
   cd talent-platform
   ```

2. **Backend Setup:**
   ```bash
   # Navigate to backend directory
   cd backend

   # Install dependencies
   npm install

   # Create .env file
   cp .env.example .env

   # Update .env with your credentials
   MONGODB_URI=mongodb://localhost:27017/talent-platform
   PORT=8080

   # Start the backend server
   npm run dev


3. **Frontend Setup:**
   ```bash
   # Open a new terminal
   cd talent-platform-frontend

   # Install dependencies
   npm install

   # Start the frontend development server
   npm run dev

4. **Database Setup:**
   - Open MongoDB Compass
   - Connect to: `mongodb://localhost:27017`
   - Create a new database named `talent-platform`
   - Create collections: `talents`, `users`, `requests`


5. **Verify Setup:**
   - Backend should be running on: `http://localhost:8080`
   - Frontend should be running on: `http://localhost:5173`
   - MongoDB should be connected (check backend console)
   - MongoDB Compass should show your database

   
### Running the Project

<details>
  <summary>Expand to View</summary>

1. **Start MongoDB:**
   - Ensure MongoDB service is running
   - Keep MongoDB Compass open for database monitoring

2. **Start Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend Development Server:**
   ```bash
   cd talent-platform-frontend
   npm run dev
   ```

4. **Access the Application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8080`
   - Admin Dashboard: `http://localhost:5173/admin`

### Troubleshooting
- If MongoDB fails to connect, ensure the MongoDB service is running
- If ports are occupied, update PORT in backend `.env`
- For frontend build issues, try clearing npm cache:
  ```bash
  npm cache clean --force

</details>

## 📱 Features & Screenshots

<div align="center">
  <img src="public/screenshots/registration.png" alt="Registration Form" width="45%">
  <img src="public/screenshots/admin-dashboard.png" alt="Admin Dashboard" width="45%">
</div>

### Feature Highlights
- **Smart Form Validation**: Real-time validation with helpful error messages
- **Responsive Design**: Works seamlessly on all devices
- **Secure File Upload**: Support for profile photo upload with preview
- **Admin Controls**: Comprehensive dashboard for profile management

## 🔒 Security Features
- Input validation and sanitization
- Secure file upload handling
- Protected admin routes
- Rate limiting for API endpoints

## 🎯 Future Scope
- [ ] AI-powered talent matching
- [ ] Video interview integration
- [ ] Blockchain-based skill verification
- [ ] Mobile application
- [ ] Advanced analytics dashboard

<hr>

## Team Details
| Name | Role | GitHub |
|------|------|--------|
| Yugandhar Bhardwaj | Project Lead | [@github](https://github.com) |
| Rudra Pratap Singh | Frontend-Backend Integrator | [@Rudra00codes](https://github.com/Rudra00codes) |
| Anant Srivastava | Backend and Feature Developer | [@RoboShep](https://github.com)
| Prince Sharma |  Researcher  | [@github](https://github.com) |
| Aditya Punj | UI/UX Designer | [@github](https://github.com) |

<br>

# Create a zip file

```bash
zip -r talent-platform.zip talent-platform/ \
   -x "talent-platform/node_modules/*" \
   -x "talent-platform/*/node_modules/*" \
   -x "talent-platform/.git/*" \
   -x "talent-platform/*/.env"
```
## 🙏 Acknowledgments
- JPD Hub for the opportunity
- Advitiya IIT Ropar for hosting
- All open-source libraries used in this project

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.


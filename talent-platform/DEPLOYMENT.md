# Talent Platform Deployment Guide

This guide will help you deploy the Talent Platform application to production.

## Prerequisites

- Docker and Docker Compose installed
- MongoDB instance (local or cloud)
- SMTP email service (Gmail, SendGrid, etc.)
- Domain name and SSL certificate (for production)

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd talent-platform
   ```

2. **Set up environment variables:**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your values

   # Frontend
   cp talent-platform-frontend/.env.example talent-platform-frontend/.env
   # Edit with your API URL
   ```

3. **Start with Docker Compose (Development):**
   ```bash
   docker-compose up --build
   ```

   This will start:
   - MongoDB on port 27017
   - Backend API on port 8080
   - Frontend on port 3000

## Production Deployment

### Option 1: Docker Compose (Recommended)

1. **Prepare production environment:**
   ```bash
   cp .env.prod.example .env.prod
   # Edit .env.prod with your production values
   ```

2. **Deploy:**
   ```bash
   docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
   ```

### Option 2: Manual Deployment

#### Backend Deployment

1. **Build the backend:**
   ```bash
   cd backend
   npm install
   npm run build
   ```

2. **Set environment variables:**
   ```bash
   export NODE_ENV=production
   export MONGODB_URI=mongodb://your-mongo-connection-string
   export JWT_SECRET=your-super-secure-jwt-secret
   # ... other variables from .env.example
   ```

3. **Start the backend:**
   ```bash
   npm start
   ```

#### Frontend Deployment

1. **Build the frontend:**
   ```bash
   cd talent-platform-frontend
   npm install
   npm run build
   ```

2. **Deploy to web server:**
   - Copy the `dist/` folder to your web server
   - Configure your web server to serve the SPA (redirect all routes to index.html)

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/talent-platform` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key` |
| `PORT` | Server port | `8080` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_USER` | SMTP username | `your-email@gmail.com` |
| `SMTP_PASSWORD` | SMTP password/app password | `your-app-password` |
| `ADMIN_EMAIL` | Admin notification email | `admin@yourdomain.com` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8080` |

## Security Considerations

### Production Security Checklist

- [ ] Use strong JWT secret (at least 32 characters)
- [ ] Use strong database passwords
- [ ] Enable HTTPS (SSL/TLS certificates)
- [ ] Configure proper CORS origins
- [ ] Use environment variables for sensitive data
- [ ] Enable MongoDB authentication
- [ ] Set up rate limiting
- [ ] Configure proper nginx security headers
- [ ] Regular security updates

### HTTPS Setup

1. **Obtain SSL certificate:**
   - Use Let's Encrypt (free): `certbot`
   - Or commercial certificate

2. **Configure nginx:**
   ```nginx
   server {
       listen 443 ssl;
       server_name yourdomain.com;
       
       ssl_certificate /path/to/certificate.crt;
       ssl_certificate_key /path/to/private.key;
       
       location / {
           proxy_pass http://frontend:80;
       }
       
       location /api/ {
           proxy_pass http://backend:8080;
       }
   }
   ```

## Monitoring and Maintenance

### Health Checks

- Backend health: `GET /` returns API status
- Frontend: Accessible at configured domain
- Database: Connection status logged in backend

### Logs

- Backend logs: `docker logs talent-platform-api-prod`
- Frontend logs: `docker logs talent-platform-web-prod`
- Database logs: `docker logs talent-platform-db-prod`

### Backup

1. **Database backup:**
   ```bash
   docker exec talent-platform-db-prod mongodump --out /data/backup
   ```

2. **File uploads backup:**
   ```bash
   docker cp talent-platform-api-prod:/app/uploads ./uploads-backup
   ```

## Troubleshooting

### Common Issues

1. **CORS errors:**
   - Check `FRONTEND_URL` in backend .env
   - Verify frontend is making requests to correct API URL

2. **Database connection failed:**
   - Verify MongoDB is running
   - Check connection string format
   - Ensure network connectivity between containers

3. **Email notifications not working:**
   - Verify SMTP credentials
   - For Gmail, use App Passwords instead of regular password
   - Check firewall/network restrictions

4. **File uploads failing:**
   - Ensure uploads directory exists and has proper permissions
   - Check file size limits (default 5MB)

### Debug Commands

```bash
# Check container status
docker ps

# View logs
docker logs <container-name>

# Execute commands in container
docker exec -it <container-name> sh

# Check network connectivity
docker exec -it talent-platform-api-prod ping mongodb
```

## Scaling

For high-traffic scenarios:

1. **Database scaling:**
   - MongoDB replica sets
   - MongoDB sharding for very large datasets

2. **Application scaling:**
   - Multiple backend instances behind load balancer
   - CDN for frontend assets

3. **File storage:**
   - External storage (AWS S3, Google Cloud Storage)
   - Update file upload service accordingly

## Updates and Maintenance

1. **Update application:**
   ```bash
   git pull origin main
   docker-compose down
   docker-compose up --build -d
   ```

2. **Database migrations:**
   - Plan and execute schema changes carefully
   - Backup before major updates

3. **Security updates:**
   - Regularly update base Docker images
   - Update npm dependencies
   - Monitor security advisories
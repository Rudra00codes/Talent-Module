// MongoDB initialization script
// This script creates initial indexes and collections

// Switch to talent-platform database
db = db.getSiblingDB('talent-platform');

// Create indexes for better performance
db.talents.createIndex({ "email": 1 }, { unique: true });
db.talents.createIndex({ "status": 1 });
db.talents.createIndex({ "skills.name": 1 });

db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });

db.clients.createIndex({ "email": 1 }, { unique: true });

db.hirerequests.createIndex({ "clientId": 1 });
db.hirerequests.createIndex({ "talentId": 1 });
db.hirerequests.createIndex({ "status": 1 });

print("Database indexes created successfully");

// Note: We'll create the admin user through the API instead of here
// to properly hash the password using the application's bcrypt setup
print("Database initialization completed");
print("Use the API endpoint POST /api/auth/register with role='admin' to create admin users");
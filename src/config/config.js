import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  db: process.env.DB,
  secretSession: process.env.SECRET_SESSION,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
};

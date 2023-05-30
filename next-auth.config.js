export default {
  // Other NextAuth.js configurations...
  
  jwt: {
    secret: 'YOUR_SECRET',
    signingKey: process.env.JWT_SECRET,
    encryption: true,
    expires: 3600 * 24, // Set the expiration time to 24 hours
  },
}
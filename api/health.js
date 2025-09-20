// Health check endpoint for Vercel
export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    message: 'Agrico API is running on Vercel',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
}

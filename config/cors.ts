import cors from 'cors';
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3001'];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

export default corsOptions;
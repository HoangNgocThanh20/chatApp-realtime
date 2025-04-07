import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
   });

   res.cookie('jwt', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true, //prevent xxs attacks cross-site scripting attacks
      sameSite: 'strict', // CSRF cross-site request forgery attacks
      secure: process.env.NODE_ENV === 'production', // only use https in production
   });

   return token;
}
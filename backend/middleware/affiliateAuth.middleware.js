import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';

export default (req, res, next) => {
    const token = req.cookies.affiliate_token;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.role !== 'affiliate') {
            return res.status(403).json({ error: 'Access denied. Affiliate privileges required.' });
        }

        req.affiliate = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

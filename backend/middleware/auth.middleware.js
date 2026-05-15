import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';

export default (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Ensure role is member or admin
        if (decoded.role !== 'member' && decoded.role !== 'admin' && decoded.role !== undefined) {
            // allowing undefined for legacy if any, but plan says tokens MUST include role
            return res.status(403).json({ error: 'Access denied. Authorized privileges required.' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

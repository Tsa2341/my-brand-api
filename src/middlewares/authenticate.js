import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        await jwt.verify(token, process.env.JWT_SECRETE);
        next();
    } catch (error) {
        return res.status(401).json({
<<<<<<< HEAD
            error: "Please login it seems you are not logged in"
        })
    }
}

=======
            status: 401,
            error: "Please login it seems you are not logged in"
        })
    }
}
>>>>>>> 1643e92 (ft: add authentication and validation on required routes)

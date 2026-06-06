import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!token_decode.admin) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        next()
    } catch (error) {
        console.log(error)
        const message = error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'
            ? 'Session expired. Please login again.'
            : error.message
        res.json({ success: false, message })
    }
}

export default adminAuth
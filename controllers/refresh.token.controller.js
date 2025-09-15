import tokenServices from "../services/token.services.js"

const refreshTokenController = async (req, res, next) =>{
    try {
        // Check if cookies exist
        if(!req.cookies?.jwt) return res.status(401).json({message: "Unauthorized no cookie"});

        // Get refresh token from cookie
        const refreshToken = req.cookies.jwt;

        // Clear cookie
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
        const tokenServ = new tokenServices()

        // Call rotateToken function and pass in refresh token
        const {accessToken, newRefreshToken} = await tokenServ.rotateToken(refreshToken);

        // Set new refresh token in cookie
        res.cookie('jwt', newRefreshToken, 
            {
                httpOnly: true, 
                sameSite: 'lax',
                secure: false, 
                maxAge: 24 * 60 * 60 * 1000
            }
        );

        // Send access token to frontend
        res.status(200).json({accessToken});
    } catch (error) {
        next(error)
    }
}

export default refreshTokenController
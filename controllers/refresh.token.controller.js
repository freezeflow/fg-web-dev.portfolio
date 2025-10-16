import tokenServices from "../services/token.services.js"
import { COOKIE_SAMESITE, COOKIE_SECURE } from "../config/config.js";

const refreshTokenController = async (req, res, next) =>{
    try {
        const tokenServ = new tokenServices()

        // Call rotateToken function and pass in refresh token
        const {accessToken, newRefreshToken} = await tokenServ.rotateToken(req);

        res.clearCookie('refresh',
            {
                httpOnly: true, 
                sameSite: COOKIE_SAMESITE, 
                secure: COOKIE_SECURE === 'true',
            }
        );

        // Set new refresh token in cookie
        res.cookie('access', accessToken, 
            {
                httpOnly: true, 
                sameSite: COOKIE_SAMESITE, 
                secure: COOKIE_SECURE === 'true', 
                maxAge: 3 * 60 * 1000
            }
        );

        res.cookie('refresh', newRefreshToken,
            {
                httpOnly: true, 
                sameSite: COOKIE_SAMESITE, 
                secure: COOKIE_SECURE === 'true', 
                maxAge: 24 * 60 * 60 * 1000
            }
        );

        res.status(200).json({ message: 'Tokens rotated successfully' });
    } catch (error) {
        res.clearCookie('refresh', 
            {
                httpOnly: true, 
                sameSite: COOKIE_SAMESITE, 
                secure: COOKIE_SECURE === 'true',
            }
        );

        next(error)
    }
}

export default refreshTokenController
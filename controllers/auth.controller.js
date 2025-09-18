import auhtServices from "../services/auth.services.js";
import { COOKIE_SECURE, COOKIE_SAMESITE } from "../config/config.js";

const auhtServ = new auhtServices()

export default class auhtController{
    registerAdmin = async (req, res, next) => {
        try {
            const newAdmin = await auhtServ.registerAdmin(req)
            
            res.cookie('jwt', newAdmin.refreshToken[newAdmin.refreshToken.length - 1], 
                {
                    httpOnly: true, 
                    sameSite: COOKIE_SAMESITE, 
                    secure: COOKIE_SECURE === 'true', 
                    maxAge: 24 * 60 * 60 * 1000
                }
            )
            res.status(201).json({success: true, newAdmin});
        } catch (error) {
            next(error)
        }
    };

    loginAdmin = async (req, res, next) => {

        try {
            const loggedInAdmin = await auhtServ.loginAdmin(req);
            const admin = loggedInAdmin.savedAdmin
            const refreshToken = loggedInAdmin.refreshToken
            const accessToken = loggedInAdmin.accessToken

            // Set cookie
            res.cookie('jwt', 
                refreshToken, 
                {
                    httpOnly: true, 
                    sameSite: COOKIE_SAMESITE, 
                    secure: COOKIE_SECURE === 'true',
                    maxAge: 24 * 60 * 60 * 1000
                }
            )

            // Send response
            res.status(200).json({
                success: true,
                admin,
                accessToken
            });
        } catch (error) {
            next(error)
        }
        
    };

    logoutAdmin = async (req, res, next) => {
        try {
            // Call logout function
            await auhtServ.logoutAdmin(req)

            // Clear cookies
            res.clearCookie('jwt', {
                httpOnly: true, 
                sameSite: COOKIE_SAMESITE, 
                secure: COOKIE_SECURE === 'true',
            });

            // Send response
            res.status(201).json({success: true})
        } catch (error) {
            next(error)
        }

        
    };

    verifyClientEmail = async (req, res, next) => {
        try {
            // Call verifyClientEmail function
            await auhtServ.verifyClientEmail(req)

            // Send response
            res.status(201).json({success: true})
        } catch (error) {
            next(error)
        }
    };

    resetPin = async (req, res, next) => {
        try {
            // Call resetPin function
            await auhtServ.resetPin(req)

            // Send response
            res.status(200).json({success: true, message: 'Pin updated'})
        } catch (error) {
            next(error)
        }
    };
}
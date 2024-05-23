
import { AuthService } from "../service/authService.js";

export class AuthController {
    // async updateAuth(req, res, next) {       
    //     try {
    //         const authService = new AuthService();
    //         const resultItem = await authService.updateAuth(req.body);
    //         res.status(200).json({ status: 200, data: resultItem });
    //     }
    //     catch (ex) {
    //         console.log('Authication error')
    //         const err = {}
    //         switch (ex.message) {
    //             case "Authentication failed":
    //                 err.statusCode = 408;
    //                 break;
    //             default:
    //                 err.statusCode = 500;
    //                 break;
    //         }
    //         err.message = ex; 
    //         next(err)
    //     }
    // }
    async verifyUserAuth(req, res, next) {
        try {
            const authService = new AuthService();
            const resultItem = await authService.verifyUserAuth(req.body);
            res.status(200).json(resultItem );
        }
        catch (ex) {
            console.log('Authication error')
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async addAuthAndUser(req, res, next) {
        try {
            const authService = new AuthService();
            const resultItem = await authService.addUserAndAuth(req.body)
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            console.log('Authication error')
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    // async deleteAuthAndUser(req, res, next) {

    //     try {
    //         const authService = new AuthService();            
    //         const result = await authService.deleteAuthAndUser(req.body);
    //         res.status(200).json({status: 200, data: result});
    //     }
    //     catch (ex) {
    //         console.log('Authication error')
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }


}
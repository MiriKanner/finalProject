
import { AlbumService } from '../service/albumService.js'
export class AlbumController {
    // async updatealbum(req, res, next) {       
    //     try {
    //         const albumService = new albumService();
    //         const resultItem = await albumService.updatealbum(req.body);
    //         res.status(200).json({ status: 200, data: resultItem });
    //     }
    //     catch (ex) {
    //         console.log('albumication error')
    //         const err = {}
    //         switch (ex.message) {
    //             case "albumentication failed":
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
    async getMyChildrenAlbum(req, res, next) {
        try {
            const albumService = new AlbumService();
            const resultItem = await albumService.getMyChildrenAlbum(req.params.username);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    
    async addChildsAlbum(req, res, next) {
        try {
            const albumService = new AlbumService();
            console.log(req.body)
            const resultItem = await albumService.addChildAlbum(req.params.username,req.body);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    // async addalbumAndUser(req, res, next) {
    //     try {
    //         const albumService = new albumService();
    //         const resultItem = await albumService.addUserAndalbum(req.body)
    //         res.status(200).json({ status: 200, data: resultItem });
    //     }
    //     catch (ex) {
    //         console.log('albumication error')
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }

    // async deletealbumAndUser(req, res, next) {

    //     try {
    //         const albumService = new albumService();            
    //         const result = await albumService.deletealbumAndUser(req.body);
    //         res.status(200).json({status: 200, data: result});
    //     }
    //     catch (ex) {
    //         console.log('albumication error')
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }


}
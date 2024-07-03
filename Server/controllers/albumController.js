import { AlbumService } from '../service/albumService.js'
import { newAlbum } from '../serverValidations.js'
export class AlbumController {
    // async updatealbum(req, res, next) {       
    //     try {
    //         const albumService = new albumService();
    //         const resultItem = await albumService.updatealbum(req.body);
    //         res.status(200).json({ status: 200, data: resultItem });
    //     }
    //     catch (ex) {
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
    async getMyAlbums(req, res, next) {
        try {
            const albumService = new AlbumService();
            const resultItem = await albumService.getMyAlbums(req.params.username);
            res.json(resultItem);
        }
        catch (ex) {
            next({ statusCode: 500, message: ex })
        }
    }
    async getMyChildrenAlbum(req, res, next) {
        try {
            const albumService = new AlbumService();
            const resultItem = await albumService.getMyChildrenAlbum(req.params.username);
            res.json(resultItem);
        }
        catch (ex) {
            next({ statusCode: 500, message: ex })
        }
    }

    async addChildsAlbum(req, res, next) {
        try {
            const formDataObject = {};
            for (let [key, value] of Object.entries(req.body)) {
                formDataObject[key] = value;
            }
            let v = newAlbum.validate(formDataObject)
            if (v.error) {
                next({ statusCode: 400, message: v.error.message })
                return
            }
            const albumService = new AlbumService();
            const imgSrc = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`
            const resultItem = await albumService.addChildAlbum(req.params.username, formDataObject, imgSrc);
            res.json(resultItem);
        }
        catch (ex) {
            next({ statusCode: 500, message: ex })
        }
    }
    // async addalbumAndUser(req, res, next) {
    //     try {
    //         const albumService = new albumService();
    //         const resultItem = await albumService.addUserAndalbum(req.body)
    //         res.status(200).json({ status: 200, data: resultItem });
    //     }
    //     catch (ex) {
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
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }


}
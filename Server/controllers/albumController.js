import { AlbumService } from '../service/albumService.js'
import { newAlbum } from '../serverValidations.js'
export class AlbumController {
    async getMyAlbums(req, res, next) {
        try {
            const albumService = new AlbumService();
            const resultItem = await albumService.getMyAlbums(req.params.username);
            res.json(resultItem);
        }
        catch (ex) {
            next({ statusCode: ex.errno || 500, message: ex.message || ex })
        }
    }
    async getMyChildrenAlbum(req, res, next) {
        try {
            const albumService = new AlbumService();
            const resultItem = await albumService.getMyChildrenAlbum(req.params.username);
            res.json(resultItem);
        }
        catch (ex) {
            next({ statusCode: ex.errno || 500, message: ex.message || ex })
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
            next({ statusCode: ex.errno || 500, message: ex.message || ex })
        }
    }
}
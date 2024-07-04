import { executeQuery } from "../dataAccess/db.js";
import { addQuery ,getSpecialParamsQuery} from "../queries/genericQueries.js";
import {
  getMyChildrenAlbumQuery,
  getParentChildRelationIdQuery,
  myAlbumsQuery,
} from "../queries/albumQueries.js";
export class AlbumService {
  async getMyAlbums(username,query) {
    let myAlbumQuery = myAlbumsQuery();
    myAlbumsQuery+=getSpecialParamsQuery('album',query)
    const result = await executeQuery(myAlbumQuery, [username]);
    return result;
  }
  async getMyChildrenAlbum(username,query) {
    let myChildrenAlbumQuery = getMyChildrenAlbumQuery();
    myChildrenAlbumQuery+=getSpecialParamsQuery('album',query)
    const result = await executeQuery(myChildrenAlbumQuery, [username]);
    return result;
  }
  async addChildAlbum(username, reqBody, imgSrc) {
    const addAlbumToChild = addQuery("album");
    const w = getParentChildRelationIdQuery();
    const relationId = await executeQuery(w, [username, reqBody.childUserName]);
    const result = await executeQuery(addAlbumToChild, [
      reqBody.name,
      relationId[0].relationId,
      reqBody.creationdate,
      imgSrc,
    ]);
    return result;
  }
}

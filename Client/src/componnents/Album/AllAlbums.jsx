import {  useNavigate } from "react-router-dom";

function AllAlbums(props)
{
    const navigate=useNavigate();
    const albums=props.albums;
    return(<>
        {albums.map((item, index) => (
            <div key={index} className="cardDiv">
              <div className="card"
                onClick={() => navigate(`./${item.albumId}`)}
                shadow="sm"
                key={item.id}
                isPressable
                style={{ flex: 1 }}
              >
               
                  <img
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.name}
                    className="w-full object-cover h-[140px]"
                    src={item.albumPhoto || "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg"} //auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />
                <div className="text-small justify-between">
                  <b>{item.name}</b>
                  <p>{new Date(item.creationdate).toLocaleDateString()}</p>
                  <p className="text-default-500">{item.childName}</p>
                </div>
              </div>
            </div>
          ))}
          </>
    )
}
export default AllAlbums;
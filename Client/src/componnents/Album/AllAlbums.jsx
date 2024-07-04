import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useParams } from "react-router-dom";
function AllAlbums(props) {
  const navigate = useNavigate();
  const albums = props.albums;
 const {username}=useParams();
  return (
    <>
      <div>
        {albums.map((item, index) => (
          <div className="divCard"
            onClick={() => navigate(`/${username}/mychildren'salbums/${item.albumId}`)}>
            <Card sx={{ maxWidth: 345 }} key={index}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  width="276"
                  image={item.albumPhoto || "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg"}
                  alt={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h8" component="div">
                    {item.name.length>30? item.name.substring(0, 30) + "...":item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(item.creationdate).toLocaleDateString()}
                    <br />
                    {item.childName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
export default AllAlbums;
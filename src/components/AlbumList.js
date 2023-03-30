import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumListItem from "./AlbumListItem";

function AlbumList ({user}) {

    const {data, isFetching, error} = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    }

    let content;

    if(isFetching){
        content = <Skeleton times={3} />
    }else if(error){
        content = <div>Error fetching albums</div>
    }else{
        content = data.map((album)=>{
            return <AlbumListItem key={album.id} album={album} />
        })
    }

    return <div>
            <div className="flex flex-flow justify-between m-3">
                <h2 className="m-2 font-bold text-base">Albums by {user.name}</h2>
                <Button loading={results.isFetching} onClick = {handleAddAlbum} >
                + Add Album
                </Button>    
            </div>
            <div>{content}</div>
    </div>
}

export default AlbumList;
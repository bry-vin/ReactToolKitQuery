import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button"
import {GoTrashcan} from "react-icons/go";
import { useDeleteAlbumMutation } from "../store";
import PhotoList from "./PhotoList";


function AlbumListItem ({album}) {

    const [deleteAlbum, results] = useDeleteAlbumMutation();

    const handleClick = () => {
        deleteAlbum(album);
    }

    const header = <>
                    <Button loading={results.isFetching} onClick={handleClick}>
                        <GoTrashcan />   
                    </Button>
                    {album.title}
                    </>

    return (
        <ExpandablePanel header={header}>
            <PhotoList album={album} />
        </ExpandablePanel>
    );

}

export default AlbumListItem;
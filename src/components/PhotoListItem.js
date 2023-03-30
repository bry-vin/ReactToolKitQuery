import {GoTrashcan} from "react-icons/go";
import { useDeletePhotoMutation } from "../store";

function PhotoListItem ({photo}) {

    const [deletePhoto] = useDeletePhotoMutation();

    const handleDeletePhoto = () =>{
        deletePhoto(photo);
    }

    return (
        <div onClick={handleDeletePhoto} className="relative cursor-pointer m-2">
            <img src={photo.url} alt="random pic" />
            <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
                <GoTrashcan className="text-3xl" />
            </div>
        </div>
        
    );
}   

export default PhotoListItem;
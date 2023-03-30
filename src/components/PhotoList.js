import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import PhotoListItem from "./PhotoListItem";
import Skeleton from "./Skeleton";
import Button from "./Button";

function PhotoList ({album}) {
    const {data, isFetching, error} = useFetchPhotosQuery(album);
    const [addPhoto, results] = useAddPhotoMutation();

    const handleAddPhoto = ()=>{
        addPhoto(album);
    }

    let content;

    if(isFetching){
        content = <Skeleton className="h-8 w-8" times={4}/>
    }else if(error){
        content = <div>Error Fetching Photo data </div>
    }else{
        content = data.map((photo)=> {
            return (
                <PhotoListItem key={photo.id} photo={photo} />
            );
        });
    }


    return (
            <div>
                <div className="m-2 flex flex-row items-center justify-between">
                    <h3 className="font-bold text-base">Photos in: {album.title}</h3>
                    <Button loading={results.isFetching} onClick={handleAddPhoto}>
                        + Add Photo
                    </Button>    
                </div>
                <div className="mx-8 flex flex-row flex-wrap justify-center">
                    {content}
                </div>  
            </div> 
    )

}

export default PhotoList;
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {faker} from "@faker-js/faker";

const photosApi = createApi({
    reducerPath : "photos",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:3005"
    }),
    endpoints(builder){
        return{
            fetchPhotos : builder.query({
                providesTags: (result, error, arg) =>{
                    const tags = result.map((photo) => {
                        return {type: "DeletePhoto", id: photo.id}
                    })
                    tags.push({type: "AddPhoto", id: arg.id })
                    return tags;
                },
                query : (album)=>{
                    return {
                        url : "/photos",
                        method : "GET",
                        params : {
                            album_id : album.id
                        }
                    }
                }
            }),
            addPhoto : builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    return [{type: "AddPhoto", id:arg.id}]
                },
                query : (album) => {
                    return {
                        url: "/photos",
                        method : "POST", 
                        body : {
                            album_id : album.id,
                            url : faker.image.abstract(150,150, true)
                        }   
                    };
                }
            }),
            deletePhoto : builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    return [{type: "DeletePhoto", id:arg.id}]
                },
                query : (photo) =>{
                    return {
                        url : `/photos/${photo.id}`,
                        method : "DELETE",

                    }
                }
            })
        }
    }
});

export const {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useDeletePhotoMutation
} = photosApi;

export {photosApi};
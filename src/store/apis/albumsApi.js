import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {faker} from "@faker-js/faker";

const albumsApi = createApi({
    reducerPath : "albums",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:3005"
    }),
    endpoints(builder){
        return {
            deleteAlbum : builder.mutation ({
                invalidatesTags : (result, error, arg) => {
                    return [{type : "Album", id : arg.id}]
                },
                query : (album) => {
                    return {
                        url:`/albums/${album.id}`,
                        method : "DELETE",                       
                    };
                }
            }),
            addAlbum: builder.mutation({
                invalidatesTags : (result, error, arg) => {
                    return [{type : "UsersAlbums", id : arg.id}]
                },
                query: (user) =>{
                    return {
                        url: "/albums",
                        method : "POST",
                        body : {
                            user_id : user.id,
                            title : faker.commerce.productName()
                        }                       
                    }
                }
            }),    
            fetchAlbums : builder.query({
                providesTags: (result, error, arg) => {
                    const tags = result.map((album) => {
                        return {type: "Album", id: album.id}
                    });
                    
                    tags.push({type : "UsersAlbums", id: arg.id});
                    return tags;
                },
                query : (user) => {
                    return {
                        url : "/albums",
                        params : {
                            user_id : user.id
                        },
                        method : "GET"
                    };
                }
            })
        }
    }
})

export const {useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation} = albumsApi;
export {albumsApi};
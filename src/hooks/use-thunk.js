import {useState, useCallback} from "react"
import { useDispatch } from "react-redux";

export function useThunk(thunk){
    const dispatch = useDispatch();
    const[isLoading, setIsLoading] = useState(false);
    const[error, setErorr] = useState(null);

    const runThunk =  useCallback((arg) => {
        setIsLoading(true);
        dispatch(thunk(arg))
            .unwrap()
            .then(()=>{
                setIsLoading(false);
            })
            .catch((err)=>{
                setIsLoading(false);
                setErorr(err);
            });
   
    },[dispatch, thunk])

    return [runThunk, isLoading, error];

}


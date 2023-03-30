import { fetchUsers, addUser } from "../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Button from "./Button";
import Skeleton from "./Skeleton";
import {useThunk} from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

function UsersList() {
    

   const [dofetchUsers,isFetchUserLoading, fetchUserError] = useThunk(fetchUsers);
   const [doAddUsers,isAddUserLoading,addUserError] = useThunk(addUser);
   
   
   const {data} = useSelector((state)=>{
        return state.users;
    });

    useEffect(()=>{
        dofetchUsers();
    },[dofetchUsers]);

    const handleUserAdd = () =>{
        doAddUsers();
    }

    let content;

    if(isFetchUserLoading){  
        content = <div><Skeleton times={4} className="h-10 w-full" /></div>
    }else if(fetchUserError){
       content = <div>Error Fetching Data</div>
    }else{
        content = data.map((user)=>{
            return <UsersListItem key={user.id} user={user} />         
        })
    }


    return <div>
    <div className="flex flex-flow justify-between m-3">
        <h1 className="m-2 font-bold text-2xl">Users</h1>    
         <Button loading = {isAddUserLoading} onClick={handleUserAdd}>
            + Add User
        </Button>        
        {addUserError && "Error Creating User"}
    </div>
    {content}
    </div>;
    
    }

export default UsersList;
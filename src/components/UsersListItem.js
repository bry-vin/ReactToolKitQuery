import {GoTrashcan} from "react-icons/go";
import Button from "./Button";
import {useThunk} from "../hooks/use-thunk";
import {deleteUser} from "../store";
import ExpandablePanel from "./ExpandablePanel";
import AlbumList from "./AlbumList";

function UsersListItem ({user}) {

    const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

    const handleClick = () => {
        doDeleteUser(user);
    }

    const header = <>
                    <Button loading={isLoading} onClick={handleClick}>
                    <GoTrashcan />
                    </Button>
                    {error && <div>Error Deleting User</div>}
                    {user.name}      
                </>
    return(
        <ExpandablePanel header={header}>
            <AlbumList user={user} />
        </ExpandablePanel>
            
    );
}

export default UsersListItem;


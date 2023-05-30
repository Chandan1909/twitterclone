import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModel from "@/hooks/useEditModel";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { use, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Model from "../Model";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModel = ()=>{

    const {data:currentUser} = useCurrentUser();
    const {mutate:mutateFetchedUser} = useUser(currentUser?.id);
    const editModel = useEditModel();

    const [profileImage,setProfileImage] = useState('');
    const [coverImage,setCoverImage] = useState('');
    const [name,setName]= useState('');
    const [userName,setUserName]=useState('');
    const [bio,setBio]=useState('');

    useEffect(()=>{
        setProfileImage(currentUser?.profileImage);
        setName(currentUser?.name);
        setBio(currentUser?.bio);
        setCoverImage(currentUser?.coverImage);
        setUserName(currentUser?.userName); 

    },[currentUser?.name,currentUser?.userName,currentUser?.bio,currentUser?.profileImage,currentUser?.coverImage])

    const [isLoading,setIsLoading] = useState(false);

    const onSubmit = useCallback(async ()=>{
        try {
            setIsLoading(true);

            await axios.patch('/api/edit',{name,userName,bio,profileImage,coverImage});

            mutateFetchedUser(); 
            toast.success("Updated Successfully");

            editModel.onClose();
            
        } catch (error) {
            toast.error('Something Went Wrong');
        }finally{
            setIsLoading(false)
        }
    },[bio,name,userName,profileImage,coverImage,editModel,mutateFetchedUser])

    const bodyContent =(
        <div className="flex flex-col gap-4">
            <ImageUpload value={profileImage} disabled={isLoading} onChange={(image)=>setProfileImage(image)} label="Upload Profile Image"/>
            <ImageUpload value={coverImage} disabled={isLoading} onChange={(image)=>setCoverImage(image)} label="Upload Cover Image"/>
            <Input placeholder="Name" onChange={(e)=>setName(e.target.value)} disabled={isLoading} value={name} />
            <Input placeholder="UserName" onChange={(e)=>setUserName(e.target.value)} disabled={isLoading} value={userName} />
            <Input placeholder="Bio" onChange={(e)=>setBio(e.target.value)} disabled={isLoading} value={bio} />

        </div>
    )

    return(
        <Model disabled={isLoading} isOpen={editModel.isOpen} title="Edit your profile" actionLabel="Save" onClose={editModel.onClose} onSubmit={onSubmit} body={bodyContent}/>
    )
}
export default EditModel;

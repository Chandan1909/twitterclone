import Header from "@/components/Header";
import UserBio from "@/components/users/useBio";
import UserHero from "@/components/users/userHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const UserView =()=>{

    const router =useRouter();
    const {userId}=router.query;

    const {data:fetcheduser,isLoading} =useUser(userId as string);

    if(isLoading || !fetcheduser)
        return(
            <div className="flex justify-center items-center h-full ">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )

    return (
       <>
        <Header showBackArrow label={fetcheduser?.name}/>
        <UserHero userId={userId as string}/>
        <UserBio userId={userId as string}/>
       </>
    )
}

export default UserView;
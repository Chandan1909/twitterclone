import useUsers from "@/hooks/useUsers";
import LoginModel from '@/components/models/LoginModel';
import Avatar from "../Avatar";

const Followbar = ()=>{

    const {data:users=[]} = useUsers();
     
    if(users.length === 0 ) 
        return null;

    return (
        <div className="px-6 py-4 hidden lg:block">
            <div className="bg-neutral-600 rounded-xl p-4">
                <h2 className="text-white font-semibold text-xl">Who to follow</h2>
                <div className="flex flex-col gap-6 mt-4">
                    {users.map((user:Record<string,any>)=>(
                        <div key={user.id} className="flex flex-row gap-4">
                            <Avatar userId={user.id}/>
                            <div className="flex flex-col">
                                <p className="text-white font-semibold text-sm ">
                                    {user.name}
                                </p>

                                <p className="text-neutral-400 text-sm">
                                    @{user.userName}
                                </p>


                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default Followbar;
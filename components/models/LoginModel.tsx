import useLoginModel from "@/hooks/useLoginModel";
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import useRegisterModel from "@/hooks/useRegisterModel";

const LoginModel =()=>{
    const loginModel = useLoginModel();
    const registerModel =useRegisterModel();

    const [email,setEmail] = useState('');
    const [password, setPassword]=useState('');
    const [isLoading,setIsLoading]=useState(false);

    const onToggle = useCallback(()=>{
        if(isLoading)
            return ;
        
        loginModel.onClose();
        registerModel.onOpen();
        
    },[isLoading,registerModel,loginModel])

    const onSubmit = useCallback(()=>{
        try {

            setIsLoading(true);


            loginModel.onClose();
            
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    },[loginModel]);    


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} disabled={isLoading}  />
            <Input placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} disabled={isLoading}  />
        </div>
    )

    const footerContent =(
        <div className="text-neutral-400 text-center mt-4">
        <p>
            Dont have an account?
            <span onClick={onToggle} className="text-white cursor-pointer hover:underline"> Register</span>
        </p>
    </div>
    )


    return (
        <Model disabled={isLoading} isOpen={loginModel.isOpen} title="Login" actionLabel="Sign In" onClose={loginModel.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent}/>
    )
}

export default LoginModel;
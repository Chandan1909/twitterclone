import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import useRegisterModel from "@/hooks/useRegisterModel";
import LoginModel from '@/components/models/LoginModel';
import useLoginModel from "@/hooks/useLoginModel";
import { signIn } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";

const RegisterModel =()=>{
    const loginModel= useLoginModel();
    const registerModel = useRegisterModel();

    const [userName,setUserName]=useState('');
    const [name,setName]=useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword]=useState('');
    const [isLoading,setIsLoading]=useState(false);

    const onToggle = useCallback(()=>{
        if(isLoading)
            return ;
        
        registerModel.onClose();
        loginModel.onOpen();
    },[isLoading,registerModel,loginModel])

    const onSubmit = useCallback(async()=>{
        try {

            setIsLoading(true);

            await axios.post('/api/register',{email,password,name,userName})

            toast.success("Account created");

            signIn('credentials',  {email,password});

            registerModel.onClose();
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }
    },[registerModel,email,password,name,userName]);    


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} disabled={isLoading}  />
            <Input placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name} disabled={isLoading}  />
            <Input placeholder="Username" onChange={(e)=>setUserName(e.target.value)} value={userName} disabled={isLoading}  />
            <Input placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} disabled={isLoading} type='password' />
        </div>
    )

    const footerContent =(
        <div className="text-neutral-400 text-center mt-4">
            <p>
                Already have an account? 
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline"> Sign In </span>
            </p>
        </div>
    )


    return (
        <Model disabled={isLoading} isOpen={registerModel.isOpen} title="Create an Account" actionLabel="Register" onClose={registerModel.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent}/>
    )
}

export default RegisterModel;
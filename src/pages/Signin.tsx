import { useRef } from "react";
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin(){
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
                email,
                password
        })
        const jwt = response.data.token;
        localStorage.setItem("authorization", jwt)
        navigate("/dashboard");
    }
    return(
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center ">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input reference={emailRef} placeholder="email" />
                <Input reference={passwordRef} placeholder="password" />
                <div className="flex justify-center pt-4">
                <Button variant="primary" text="Signin" fullwidth={true} loading={false} onClick={signin} />
                </div>
            </div>

        </div>
    )
}
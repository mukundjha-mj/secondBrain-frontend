import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    async function signup(){
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
                email,
                password,
                firstName,
                lastName
        })
        alert("You are Signed up!")
        navigate("/signin")
    }
    return(
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center ">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input reference={emailRef} placeholder="email" />
                <Input reference={passwordRef} placeholder="password" />
                <Input reference={firstNameRef} placeholder="firstName" />
                <Input reference={lastNameRef} placeholder="lastName" />
                <div className="flex justify-center pt-4">
                <Button variant="primary" text="SignUp" fullwidth={true} loading={false} onClick={signup} />
                </div>
            </div>

        </div>
    )
}
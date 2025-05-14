import { PasswordCheck } from "@/Pages/passwordcriteria"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { authStore } from "@/store/auth.store"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const navigate =useNavigate()
    const {signup,isAuthenticated,checkAuth,error}=authStore();
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [name,setName] =useState("");


    const signUpHandler = async (e: any) => {
      e.preventDefault();
      if (!email || !password || !name) {
        alert("All fields are required");
        return;
      }
    
      await signup(email, password, name);
    
      const currentError = authStore.getState().error;
      if (!currentError) {
        navigate("/");
      }
    };
    
    useEffect(() => {
      const verifyAuth = async () => {
        await checkAuth();
      };
      verifyAuth();
    }, []);
    
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated]);
    
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your details to create an account !
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
            {error !=="Unauthorized - no token provided" && <p className="text-red-600 font-semibold mt-2">{error}</p>}
            <div className="grid gap-2">
                <Label htmlFor="name">name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  placeholder="john doe"
                  required
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="m@example.com"
                  required
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <PasswordCheck password ={password}/>
              </div>
              <Button type="submit" className="w-full" onClick={signUpHandler}>
              Create Account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
             Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
              Log in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

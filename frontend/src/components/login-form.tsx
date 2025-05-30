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

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const navigate =useNavigate()
    const { login, isAuthenticated, checkAuth, error } = authStore();
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const LoginHandler = async (e: any) => {
      e.preventDefault();
      if (!email || !password) {
        alert("Both fields are required");
        return;
      }
    
      await login(email, password);
    
      const currentError = authStore.getState().error;
      if (!currentError) {
        navigate('/');
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
        navigate('/');
      }
    }, [isAuthenticated]);
    
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {error && <p className="text-red-600 font-semibold">{error}</p>}
        </CardHeader>
        <CardContent>

          <form>
            <div className="flex flex-col gap-6">
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
                  <a
                    href="/frogetpassword"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required  value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <Button type="submit" className="w-full" onClick={LoginHandler}>
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

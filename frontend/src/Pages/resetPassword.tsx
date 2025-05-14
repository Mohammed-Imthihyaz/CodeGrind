import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { authStore } from "@/store/auth.store";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
const ResetPasswordPage = () => {

    const navigate =useNavigate();
    const{resetPassword}=authStore();
    const [NewPassword,setNewPassword] =useState("");
    const [ConfirmPassword,setConfirmPassword]=useState("");
    const {token} =useParams();
    const stringtoken=token?.toString()|| "";
    const handelRestbutton=async(e:any)=>{
        e.preventDefault();
       if(NewPassword !== ConfirmPassword){
         toast.error("Confirm  Password must be same as New Password");
         return;
       }
        await resetPassword(stringtoken,NewPassword);
        toast.success(
            "Password reset successfully, redirecting to login page..."
          );
          setTimeout(() => {
            navigate("/login");
          }, 2000);
    }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-md">
        <Toaster/>
    <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password </CardTitle>
          <CardDescription>
          Enter your new password to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={NewPassword}
                  onChange={(e)=>{setNewPassword(e.target.value)}}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input id="password" type="password" required value={ConfirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
              </div>
              <Button type="submit" className="w-full" onClick={handelRestbutton}>
              Reset Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
      </div>
  )
};
export default ResetPasswordPage;

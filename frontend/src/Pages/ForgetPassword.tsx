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
import { cn } from "@/lib/utils";
import { authStore } from "@/store/auth.store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function ForgetPassword({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const {  error,isAuthenticated, checkAuth, forgetpassword } = authStore();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ResetHandler = async (e: any) => {
    e.preventDefault();
    await forgetpassword(email);
    setIsSubmitted(true);
  };
  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };
    verifyAuth();
    if (isAuthenticated) {
      navigate("/");
    }
  }, [checkAuth]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Forgot your password?</CardTitle>
              <CardDescription>
                Enter the email address associated with your account and we'll
                send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            
            {!isSubmitted? (<CardContent>
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={ResetHandler}
                  >
                    Reset password
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Back to{" "}
                  <a href="/login" className="underline underline-offset-4">
                    Log in.
                  </a>
                </div>
              </form>
                <p className="text-black mb-6 text-center">
                if account exisits for {email}, you will receive a password reset
                link shortly
              </p>
            </CardContent>):(
              <div>
                Loading...
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;

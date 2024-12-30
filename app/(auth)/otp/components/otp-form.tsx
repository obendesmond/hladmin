"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function OTPForm() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const { loginChallenge, loading, getAuthUser, firebaseSignin } = useUserStore();

  const handleSubmitOTP = async () => {
    if (value.length < 6) return toast.error("Complete OTP value");

    toast.promise(
      async () => {
        const loginSuccess = await loginChallenge(value);
        if (!loginSuccess) {
          throw new Error("Invalid OTP. Please try again.");
        }

        const success = await firebaseSignin()
        if(!success){
          throw new Error("Failed to sign in with firebase. Please try again.")
        }

        const authSuccess = await getAuthUser();
        if (!authSuccess) {
          router.push("/")
          throw new Error("Failed to fetch user data. Please login again.");
        }
    
        router.push("/dashboard")
        return "Logged in successfully";
      },
      {
        success: (message) => message,
        error: (error) => error.message || "An error occurred during login",
      }
    );
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSubmitOTP();
    }
  };

  return (
    <Card className="mx-auto w-full sm:w-[400px] border-primary border-opacity-80">
      <CardHeader>
        <CardTitle className="text-2xl">One Time Password</CardTitle>
        <CardDescription>Enter your one time password</CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="grid gap-4">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
            onKeyDown={handleKeyDown}
            ref={(input) => input?.focus()}
          >
            <InputOTPGroup className="w-full">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="w-full">
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="w-full">
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            onClick={handleSubmitOTP}
            loading={loading}
            className="w-full"
          >
            Submit OTP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

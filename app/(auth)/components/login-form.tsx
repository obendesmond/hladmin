
"use client"

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
import { useUserStore } from "@/stores/user-store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const {login, loading} = useUserStore()

  const handleSubmit = async () => {
    if(!email) return toast.error("Email is required")
      
    const success = await login({email})
    if(success){
      router.push("/otp")
    }
  }

  const handleKeyDown = (e: any) => {
    if(e.key === "Enter"){
      handleSubmit()
    }
  }

  return (
    <Card className="mx-auto w-full sm:w-[400px] border-primary border-opacity-80">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={e => handleKeyDown(e)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button loading={loading} onClick={handleSubmit} type="submit" className="w-full">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

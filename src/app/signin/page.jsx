"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { GrGoogle } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Next.js হাইড্রেশন এরর প্রতিরোধের জন্য মাউন্ট চেক
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  // ইমেইল-পাসওয়ার্ড সাবমিট হ্যান্ডলার
  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      toast.error("Wrong email or password!"); 
    } else {
      toast.success("Login Successful!");
      router.push("/");
    }
    console.log({ data, error });
  };
  
  // গুগল সাইন-ইন হ্যান্ডলার
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google sign in failed:", error);
    }
  };

  return (
    /* কার্ডের উইডথ সাইন-আপ ফর্মের মতো ছোট (max-w-sm) এবং কমপ্যাক্ট করা হয়েছে */
    <Card className="border mx-auto w-full max-w-sm py-6 px-5 mt-5 shadow-lg rounded-2xl">
      <h1 className="text-center text-xl font-bold text-slate-800 mb-1">Login</h1>
      <p className="text-center text-xs text-slate-400 mb-4">Welcome back to PetHaven!</p>

      {/* gap কমিয়ে gap-3 করা হয়েছে যেন দেখতে সুন্দর ও ছোট লাগে */}
      <Form className="flex w-full flex-col gap-3" onSubmit={onSubmit}>
        
        {/* Google Sign In Button (type="button" দেওয়া হয়েছে যেন ফর্ম সাবমিট না হয়) */}
        <Button 
          type="button"
          onClick={handleGoogleSignIn} 
          variant="flat" 
          className="w-full font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 h-9 text-sm rounded-lg transition flex items-center justify-center gap-2"
        >
          <GrGoogle className="text-base text-red-500" /> Sign In With Google
        </Button>

        {/* Brand Themed Divider */}
        <div className="flex items-center my-0.5">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Or</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Email Input */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label className="text-sm font-semibold text-slate-700">Email</Label>
          <Input placeholder="john@example.com" className="max-h-9" />
          <FieldError className="text-xs" />
        </TextField>

        {/* Password Input */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label className="text-sm font-semibold text-slate-700">Password</Label>
          <Input placeholder="Enter your password" className="max-h-9" />
          {/* হাইড্রেশন এবং সাইজ ঠিক রাখতে সাধারণ p ট্যাগ দেওয়া হয়েছে */}
          <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
            Must be 8+ chars with 1 uppercase & 1 number
          </p>
          <FieldError className="text-xs" />
        </TextField>

        {/* Action Buttons (উচ্চতা h-9 এবং কমপ্যাক্ট সাইজ করা হয়েছে) */}
        <div className="flex gap-2 mt-1">
          <Button 
            type="submit"
            className="bg-[#FFA600] hover:bg-[#E09200] text-white font-bold h-9 text-sm px-5 rounded-lg transition shadow-md flex items-center gap-1"
          >
            <Check className="w-4 h-4" />
            Login
          </Button>
          <Button 
            type="reset" 
            variant="flat"
            className="font-bold text-slate-600 h-9 text-sm rounded-lg"
          >
            Reset
          </Button>
        </div>
      </Form>
    </Card>
  );
}
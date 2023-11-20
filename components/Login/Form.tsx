/* eslint-disable react/no-unescaped-entities */
"use client";

import { Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineGoogle, AiFillGithub as Github } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Icons } from "../icons";
import { useSearchParams } from "next/navigation";
import { toast } from "../ui/use-toast";
import { Skeleton } from "../ui/skeleton";

export function Form() {
  const searchParams: any = useSearchParams();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState<any>(false);
  const [gitLoading, setGitLoading] = useState<any>(false);
  const [googleLoading, setGoogleLoading] = useState<any>(false);

  const login = useCallback(async () => {
    console.log(email, pass);
    try {
      setIsLoading(true);
      await signIn("credentials", {
        email,
        password: pass,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [email, pass]);

  useEffect(() => {
    if (searchParams.has("error")) {
      toast({
        title: "Something went wrong.",
        description: searchParams.get("error"),
        variant: "destructive",
      });
    }
  }, []);

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex items-center flex-col space-y-2 text-center">
        <Command />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>
      <div className="grid gap-6">
        <form>
          <div className="grid gap-2">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="name@example.com"
              type="email"
            />
            <Input
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              placeholder="password"
              type="password"
            />
            <Button
              disabled={!email || !pass || isLoading}
              type="submit"
              className="flex gap-2"
              onClick={login}
            >
              {isLoading && (
                <Icons.spinner size={18} className="animate-spin" />
              )}
              Sign In
            </Button>
          </div>
        </form>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        disabled={gitLoading}
        variant={"outline"}
        className="gap-2"
        onClick={() => {
          setGitLoading(true);
          signIn("github", { callbackUrl: "/dashboard" }).then(() =>
            setGoogleLoading(false)
          );
        }}
      >
        {gitLoading ? (
          <Icons.spinner size={18} className="animate-spin" />
        ) : (
          <Github size={17} />
        )}
        Github
      </Button>
      <Button
        disabled={googleLoading}
        variant={"outline"}
        className="gap-2"
        onClick={() => {
          setGoogleLoading(true);
          signIn("google", { callbackUrl: "/dashboard" }).then(() =>
            setGoogleLoading(false)
          );
        }}
      >
        {googleLoading ? (
          <Icons.spinner size={18} className="animate-spin" />
        ) : (
          <AiOutlineGoogle size={17} />
        )}
        Google
      </Button>
      <p className="px-8 text-center text-sm text-muted-foreground">
        {/* <span className="hover:text-brand underline underline-offset-4 cursor-pointer">Don't have an account? Sign Up</span> */}
      </p>
    </div>
  );
}

export function SkeletonForm() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex items-center flex-col space-y-2 text-center">
        <Command />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>
      <div className="grid gap-6">
        <form>
          <div className="grid gap-2">
            <Skeleton className="w-full px-3 py-2 h-10" />
            <Skeleton className="w-full px-3 py-2 h-10" />
            <Skeleton className="w-full h-10 py-2 px-4" />
          </div>
        </form>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Skeleton className="w-full h-10 py-2 px-4" />
      <p className="px-8 text-center text-sm text-muted-foreground">
        {/* <span className="hover:text-brand underline underline-offset-4 cursor-pointer">Don't have an account? Sign Up</span> */}
      </p>
    </div>
  );
}

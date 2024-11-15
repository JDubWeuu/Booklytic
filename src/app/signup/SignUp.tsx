'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signup } from "./actions";
import { app } from "@/firebase/firebase";
import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { useStore } from "zustand/react";
import { useLoggedInStore } from '../store/zustand';


// Removing commented out interface since it conflicts with firebase UserCredential
//   providerId?: string | undefined;
// }

const SignUp = () => {
  const router = useRouter();
  const { loggedIn, setLoggedIn } = useLoggedInStore((state) => state);
  // const loggedIn = useStore((state) => state.loggedIn);
  // const setLoggedIn = useStore((state) => state.setLoggedIn);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const userData = {
    //   name: formData.get('name') || null,
    //   email: formData.get('email') || null,
    //   password: formData.get('password') || null,
    //   age: Number(formData.get('age')) || null
    // };
    const auth = getAuth(app);
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    try {
      // create user instance in firebase 
      const userDetails: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken: string = await userDetails.user.getIdToken();
      const res = await signup(formData, idToken);

      console.log(res);
      // first adjust the logged in state within the app and other state variables like the user, etc.
      setLoggedIn(true);
      // navigate back to the home page after authenticated
      router.push('/');

    }
    catch (error) {
      console.error(error);
      // possibly set some error message
    }
    // reset the form
    event.currentTarget.reset();
  }
  return (
    <>
      <div className="flex flex-col min-h-[90vh] h-full w-full items-center justify-center px-4">
        <Card className="mx-auto max-w-lg" style={{width: "500px"}}>
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Please create an account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                />
              </div>

              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SignUp
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function ResetPasswordForm() {
    const [submitted, setSubmitted] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setSubmitted(true);
    }

    if (submitted) {
        return (
             <Card>
                <CardHeader className="items-center text-center">
                    <Logo />
                    <CardTitle className="text-3xl font-bold pt-4">Check your email</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <p className="text-muted-foreground">
                        We&apos;ve sent a password reset link to <span className="font-semibold text-foreground">{form.getValues('email')}</span>.
                    </p>
                </CardContent>
                <CardFooter className="justify-center">
                     <Link href="/login" passHref>
                        <Button variant="link">Back to Log In</Button>
                    </Link>
                </CardFooter>
            </Card>
        );
    }


  return (
    <Card>
        <CardHeader className="items-center text-center">
            <Logo />
            <CardTitle className="text-3xl font-bold pt-4">Forgot Password?</CardTitle>
            <CardDescription>No worries, we&apos;ll send you reset instructions.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full transition-transform hover:scale-105">
                        Send Reset Link
                    </Button>
                </form>
            </Form>
        </CardContent>
        <CardFooter className="justify-center">
             <Link href="/login" passHref>
                <Button variant="link">Back to Log In</Button>
            </Link>
        </CardFooter>
    </Card>
  );
}

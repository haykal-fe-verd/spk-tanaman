import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";

function ForgotPassword() {
    // hooks
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout title="Forgot Password">
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-lg">
                    <div className={cn("flex flex-col gap-6")}>
                        <Card className="overflow-hidden">
                            <CardContent className="grid p-0 md:grid-cols-1">
                                <form
                                    onSubmit={onSubmit}
                                    className="p-6 md:p-8"
                                >
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col items-center text-center">
                                            <Link href={route("home")}>
                                                <Icons.Logo className="h-24 w-auto fill-primary" />
                                            </Link>

                                            <h1 className="my-5 text-2xl font-semibold leading-relaxed lg:text-4xl">
                                                Forgot Password
                                            </h1>
                                        </div>

                                        <div className="text-sm text-muted-foreground text-justify">
                                            Lupa kata sandi? Tidak masalah.
                                            Cukup beri tahu kami alamat email
                                            Anda dan kami akan mengirimkan
                                            tautan untuk menyetel ulang kata
                                            sandi melalui email yang akan
                                            memungkinkan Anda memilih kata sandi
                                            baru.
                                        </div>

                                        {/* email */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="jhon@doe.com"
                                                value={data.email}
                                                autoComplete="username"
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full inline-flex items-center justify-center gap-3"
                                            disabled={processing}
                                        >
                                            {processing && (
                                                <Loader2 className="animate-spin" />
                                            )}
                                            <span>
                                                Email Password Reset Link
                                            </span>
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

export default ForgotPassword;

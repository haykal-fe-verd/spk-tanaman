import React from "react";
import { Link, useForm } from "@inertiajs/react";

import GuestLayout from "@/layouts/guest-layout";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface ResetPasswordProps {
    token: string;
    email: string;
}

function ResetPassword({ token, email }: ResetPasswordProps) {
    // hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: "",
        password_confirmation: "",
    });

    // states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] =
        React.useState<boolean>(false);

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout title="Reset Password">
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
                                                Reset Password
                                            </h1>
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
                                                readOnly
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        {/* password */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>

                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="••••••••"
                                                    autoComplete="current-password"
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    aria-label={
                                                        showPassword
                                                            ? "Sembunyikan password"
                                                            : "Tampilkan password"
                                                    }
                                                    title={
                                                        showPassword
                                                            ? "Sembunyikan password"
                                                            : "Tampilkan password"
                                                    }
                                                    className="absolute inset-y-0 right-0 bg-primary p-3 flex items-center text-primary-foreground rounded-r-md"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <Eye className="w-4 h-4" />
                                                    ) : (
                                                        <EyeOff className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        {/* password_confirmation */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="password_confirmation">
                                                Konfirmasi Password
                                            </Label>

                                            <div className="relative">
                                                <Input
                                                    id="password_confirmation"
                                                    type={
                                                        showPasswordConfirm
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="••••••••"
                                                    autoComplete="current-password"
                                                    value={
                                                        data.password_confirmation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "password_confirmation",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    aria-label={
                                                        showPasswordConfirm
                                                            ? "Sembunyikan password"
                                                            : "Tampilkan password"
                                                    }
                                                    title={
                                                        showPasswordConfirm
                                                            ? "Sembunyikan password"
                                                            : "Tampilkan password"
                                                    }
                                                    className="absolute inset-y-0 right-0 bg-primary p-3 flex items-center text-primary-foreground rounded-r-md"
                                                    onClick={() =>
                                                        setShowPasswordConfirm(
                                                            !showPasswordConfirm
                                                        )
                                                    }
                                                >
                                                    {showPasswordConfirm ? (
                                                        <Eye className="w-4 h-4" />
                                                    ) : (
                                                        <EyeOff className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
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
                                            <span>Reset Password</span>
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

export default ResetPassword;

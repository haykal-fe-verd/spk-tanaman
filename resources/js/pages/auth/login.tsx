import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import GuestLayout from "@/layouts/guest-layout";
import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import Cover from "@/assets/img/7.jpeg";

interface LoginProps {
    canResetPassword: boolean;
}

function Login({ canResetPassword }: LoginProps) {
    // hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    // events
    const onSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout title="Login">
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-5xl">
                    <div className={cn("flex flex-col gap-6")}>
                        <Card className="overflow-hidden">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                <div className="relative hidden bg-muted md:block">
                                    <div className="absolute inset-0 h-full w-full object-cover bg-primary text-primary-foreground">
                                        <img
                                            src={Cover}
                                            alt="@Cover"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

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
                                                Login
                                            </h1>
                                            <p className="mb-5 text-sm lg:text-base text-center">
                                                Selamat Datang Di{" "}
                                                {import.meta.env.VITE_APP_NAME}
                                            </p>
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

                                        <div className="flex gap-2 justify-between">
                                            <div className="flex items-start space-x-2">
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                    onCheckedChange={(e) =>
                                                        setData("remember", e)
                                                    }
                                                    checked={data.remember}
                                                />
                                                <label
                                                    htmlFor="remember"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Ingat saya
                                                </label>
                                            </div>

                                            {canResetPassword && (
                                                <Link
                                                    href={route(
                                                        "password.request"
                                                    )}
                                                    className="ml-auto text-sm underline-offset-2 hover:underline"
                                                >
                                                    Lupa password?
                                                </Link>
                                            )}
                                        </div>

                                        <div className="flex gap-2 justify-between">
                                            <div className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                Belum punya akun?{" "}
                                                <Link
                                                    href={route("register")}
                                                    className="underline hover:text-primary"
                                                >
                                                    Daftar disini
                                                </Link>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full inline-flex items-center justify-center gap-3"
                                            disabled={processing}
                                        >
                                            {processing && (
                                                <Loader2 className="animate-spin" />
                                            )}
                                            <span>Login</span>
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

export default Login;

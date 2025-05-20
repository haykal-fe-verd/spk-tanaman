import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";

import Cover from "@/assets/img/4.jpeg";

function Register() {
    // hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
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

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout title="Register">
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-5xl">
                    <div className={cn("flex flex-col gap-6")}>
                        <Card className="overflow-hidden">
                            <CardContent className="grid p-0 md:grid-cols-2">
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
                                                Register
                                            </h1>
                                            <p className="mb-5 text-sm lg:text-base text-center">
                                                Selamat Datang Di{" "}
                                                {import.meta.env.VITE_APP_NAME}
                                            </p>
                                        </div>

                                        {/* name */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nama</Label>
                                            <Input
                                                id="name"
                                                type="name"
                                                placeholder="Jhon Doe"
                                                value={data.name}
                                                autoComplete="name"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError message={errors.name} />
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

                                        <div className="flex gap-2 justify-between">
                                            <div className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                Sudah punya akun?{" "}
                                                <Link
                                                    href={route("login")}
                                                    className="underline hover:text-primary"
                                                >
                                                    Login disini
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
                                            <span>Register</span>
                                        </Button>
                                    </div>
                                </form>

                                <div className="relative hidden bg-muted md:block">
                                    <div className="absolute inset-0 h-full w-full object-cover bg-primary text-primary-foreground">
                                        <img
                                            src={Cover}
                                            alt="@Cover"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

export default Register;

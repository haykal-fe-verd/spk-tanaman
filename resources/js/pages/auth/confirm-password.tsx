import React from "react";
import { useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";

function ConfirmPassword() {
    // hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    // states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout title="Confirm Password">
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
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    window.history.back()
                                                }
                                                className="focus:outline-none"
                                                title="Kembali ke halaman sebelumnya"
                                            >
                                                <Icons.Logo className="h-24 w-auto fill-primary" />
                                            </button>

                                            <h1 className="my-5 text-2xl font-semibold leading-relaxed lg:text-4xl">
                                                Confirm Password
                                            </h1>
                                        </div>

                                        <div className="text-sm text-muted-foreground text-justify">
                                            Ini adalah area aman dari aplikasi.
                                            Harap konfirmasikan kata sandi Anda
                                            sebelum melanjutkan.
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

                                        <Button
                                            type="submit"
                                            className="w-full inline-flex items-center justify-center gap-3"
                                            disabled={processing}
                                        >
                                            {processing && (
                                                <Loader2 className="animate-spin" />
                                            )}
                                            <span>Confirm</span>
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

export default ConfirmPassword;

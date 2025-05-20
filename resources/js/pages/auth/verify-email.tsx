import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";

function VerifyEmail() {
    // hooks
    const { post, processing } = useForm({});

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout title="Verify Email">
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
                                                Verify Email
                                            </h1>
                                        </div>

                                        <div className="mb-4 text-sm text-muted-foreground text-justify">
                                            Terima kasih telah mendaftar!
                                            Sebelum memulai, dapatkah Anda
                                            memverifikasi alamat email Anda
                                            dengan mengeklik tautan yang baru
                                            saja kami kirimkan kepada Anda? Jika
                                            Anda tidak menerima email tersebut,
                                            kami akan dengan senang hati
                                            mengirimkan email lain kepada Anda.
                                        </div>

                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className={buttonVariants({
                                                variant: "destructive",
                                            })}
                                        >
                                            Logout
                                        </Link>

                                        <Button
                                            type="submit"
                                            className="w-full inline-flex items-center justify-center gap-3"
                                            disabled={processing}
                                        >
                                            {processing && (
                                                <Loader2 className="animate-spin" />
                                            )}
                                            <span>
                                                Resend Verification Email
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

export default VerifyEmail;

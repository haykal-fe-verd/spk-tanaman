import React from 'react';
import { BadgeCheck, CameraIcon, Loader2, User } from 'lucide-react';
import { useForm, usePage } from '@inertiajs/react';

import { PageProps } from '@/types';
import { getInitial } from '@/lib/utils';

import UserLayout from '@/layouts/user-layout';
import PageWrapper from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import Delete from './delete';

type FormInput = {
    name: string;
    email: string;
    avatar: File | string | null;
};

function ProfileUser() {
    // hooks
    const { auth } = usePage<PageProps>().props;

    // states
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<FormInput>({
        name: auth?.user?.name || '',
        email: auth?.user?.email || '',
        avatar: null,
    });

    // events
    const browseImage = () => {
        inputRef.current?.click();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setData('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setData('avatar', null);
            setPreviewUrl('');
        }
    };

    const onSubmit: React.FormEventHandler = e => {
        e.preventDefault();

        post(route('profile.post'), {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
        });
    };

    return (
        <UserLayout title="Profile">
            <PageWrapper title="Profile" Icon={User}>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-10 lg:flex-row items-start justify-between">
                        <div className="w-full  flex flex-col gap-5">
                            <div className="relative w-full h-[200px] bg-primary rounded-md">
                                <input
                                    id="avatar"
                                    name="avatar"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={inputRef}
                                    onChange={onChange}
                                />

                                <Avatar className="absolute -bottom-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full border-2 object-cover">
                                    {previewUrl ? (
                                        <AvatarImage id="photoPreview" src={previewUrl} />
                                    ) : (
                                        <AvatarImage
                                            id="photoPreview"
                                            src={`/storage/${auth?.user?.avatar}`}
                                        />
                                    )}
                                    <AvatarFallback>{getInitial(auth?.user?.name)}</AvatarFallback>
                                </Avatar>

                                <button
                                    type="button"
                                    onClick={browseImage}
                                    className="absolute -bottom-12 left-1/2 flex h-32 w-32 -translate-x-1/2 items-center justify-center rounded-full bg-black text-white opacity-0 transition-opacity duration-300 hover:opacity-80"
                                >
                                    <CameraIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="mt-16 ">
                                <InputError message={errors.avatar} />
                                <h3 className="font-semibold text-lg">{auth?.user?.name}</h3>
                                <h4 className="text-sm text-muted-foreground">
                                    {auth?.user?.email}
                                </h4>
                                <Badge
                                    variant={
                                        auth?.user?.status === 'active' ? 'default' : 'destructive'
                                    }
                                    className="capitalize"
                                >
                                    {auth?.user?.status}
                                </Badge>
                                {auth?.user?.email_verified_at && (
                                    <div className="flex gap-1 mt-6 items-center">
                                        <BadgeCheck className="w-4 h-4 text-blue-500" />
                                        <span className="text-sm text-muted-foreground">
                                            Terverifikasi
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">
                                    <sup className="text-destructive">*</sup>Nama
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nama"
                                    className="w-full"
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">
                                    <sup className="text-destructive">*</sup>Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full"
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-fit items-center justify-center gap-2"
                            >
                                {processing && <Loader2 className="animate-spin" />}
                                Simpan
                            </Button>

                            <Delete />
                        </div>
                        <div className="w-full" />
                    </div>
                </form>
            </PageWrapper>
        </UserLayout>
    );
}

export default ProfileUser;

import React from 'react';
import { Eye, EyeOff, Loader2, SquareAsterisk } from 'lucide-react';
import { useForm } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';
import PageWrapper from '@/components/page-wrapper';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

function AdminGantiPasswordPage() {
    // hooks
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // states
    const [showCurrentPassword, setShowCurrentPassword] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState<boolean>(false);

    // events
    const onSubmit: React.FormEventHandler = e => {
        e.preventDefault();

        put(route('password.update'), {
            onFinish: () => reset('password', 'password_confirmation', 'current_password'),
        });
    };

    return (
        <AuthLayout title="Ganti Password">
            <PageWrapper title="Ganti Password" Icon={SquareAsterisk}>
                <form onSubmit={onSubmit} className="space-y-5 w-full lg:w-1/2">
                    {/* password saat ini */}
                    <div className="grid gap-2">
                        <Label htmlFor="current_password">Password Saat Ini</Label>

                        <div className="relative">
                            <Input
                                name="current_password"
                                id="current_password"
                                type={showCurrentPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                value={data.current_password}
                                onChange={e => setData('current_password', e.target.value)}
                            />

                            <button
                                type="button"
                                aria-label={
                                    showCurrentPassword
                                        ? 'Sembunyikan password'
                                        : 'Tampilkan password'
                                }
                                title={
                                    showCurrentPassword
                                        ? 'Sembunyikan password'
                                        : 'Tampilkan password'
                                }
                                className="absolute inset-y-0 right-0 bg-primary p-3 flex items-center text-primary-foreground rounded-r-md"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                {showCurrentPassword ? (
                                    <Eye className="w-4 h-4" />
                                ) : (
                                    <EyeOff className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        <InputError message={errors.current_password} />
                    </div>

                    {/* password */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password Baru</Label>

                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                            />

                            <button
                                type="button"
                                aria-label={
                                    showPassword ? 'Sembunyikan password' : 'Tampilkan password'
                                }
                                title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                className="absolute inset-y-0 right-0 bg-primary p-3 flex items-center text-primary-foreground rounded-r-md"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <Eye className="w-4 h-4" />
                                ) : (
                                    <EyeOff className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    {/* password_confirmation */}
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>

                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                type={showPasswordConfirm ? 'text' : 'password'}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                            />

                            <button
                                type="button"
                                aria-label={
                                    showPasswordConfirm
                                        ? 'Sembunyikan password'
                                        : 'Tampilkan password'
                                }
                                title={
                                    showPasswordConfirm
                                        ? 'Sembunyikan password'
                                        : 'Tampilkan password'
                                }
                                className="absolute inset-y-0 right-0 bg-primary p-3 flex items-center text-primary-foreground rounded-r-md"
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                            >
                                {showPasswordConfirm ? (
                                    <Eye className="w-4 h-4" />
                                ) : (
                                    <EyeOff className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="w-fit inline-flex items-center justify-center gap-3"
                        disabled={processing}
                    >
                        {processing && <Loader2 className="animate-spin" />}
                        <span>Ganti Password</span>
                    </Button>
                </form>
            </PageWrapper>
        </AuthLayout>
    );
}

export default AdminGantiPasswordPage;

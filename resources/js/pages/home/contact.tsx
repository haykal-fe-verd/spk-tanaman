import React from 'react';
import { useForm } from '@inertiajs/react';
import { Loader2, Send } from 'lucide-react';

import Title from './title';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';

function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    // events
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('home.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <section id="contact" className="py-16 ">
            <Title
                title="Hubungi Kami"
                desc=" Kami siap membantu jika Anda memiliki pertanyaan atau masukan."
            />
            <div className="max-w-2xl mx-auto text-center space-y-6 px-4">
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        placeholder="Nama Anda"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} />

                    <Input
                        type="email"
                        placeholder="Email Anda"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />

                    <Textarea
                        placeholder="Pesan Anda"
                        value={data.message}
                        onChange={e => setData('message', e.target.value)}
                    />
                    <InputError message={errors.message} />

                    <Button type="submit" disabled={processing}>
                        Kirim Pesan
                        {processing ? <Loader2 className="animate-spin" /> : <Send />}
                    </Button>
                </form>
            </div>
        </section>
    );
}

export default Contact;

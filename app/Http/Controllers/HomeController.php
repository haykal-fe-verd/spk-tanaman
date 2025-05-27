<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;

class HomeController extends Controller
{
    /**
     * Show the home page.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request): Response
    {
        return Inertia::render('home/index');
    }

    /**
     * Handle the incoming request and send an email to the administrator.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string|max:1000',
        ]);

        Mail::raw($validated['message'], function ($message) use ($validated) {
            $message->to('developer.kidzeroll@gmail.com')
                ->subject('Pesan dari ' . $validated['name'])
                ->replyTo($validated['email']);
        });

        return back()->with('success', 'Pesan Anda telah dikirim.');
    }
}

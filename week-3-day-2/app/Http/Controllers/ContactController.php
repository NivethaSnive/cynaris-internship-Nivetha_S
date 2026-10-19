<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function create()
    {
        $title = 'Contact Us';

        return view('contact', compact('title'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'message' => 'required|string|max:1000',
        ]);

        return redirect()
            ->route('contact.success')
            ->with('success', 'Thank you, ' . $validated['name'] . '! Your form was submitted successfully.');
    }

    public function success()
    {
        $title = 'Submission Successful';

        return view('success', compact('title'));
    }
}
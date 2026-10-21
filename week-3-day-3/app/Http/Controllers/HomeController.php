<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $title = 'Welcome to Laravel';
        $message = 'This portal demonstrates Laravel routes, controllers, and Blade templates.';

        return view('home', compact('title', 'message'));
    }

    public function about()
    {
        $title = 'About Us';
        $description = 'This project demonstrates the basic features of the Laravel framework.';

        return view('about', compact('title', 'description'));
    }
}
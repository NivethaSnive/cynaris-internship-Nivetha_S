@extends('layouts.app')

@section('title', $title)

@section('content')
    <h1>{{ $title }}</h1>

    @if (session('success'))
        <p class="success">{{ session('success') }}</p>
    @else
        <p>Your form submission process is complete.</p>
    @endif

    <a href="{{ route('home') }}">Return to Home</a>
@endsection
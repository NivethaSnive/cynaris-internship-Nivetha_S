@extends('layouts.app')

@section('title', $title)

@section('content')
    <h1>{{ $title }}</h1>
    <p>{{ $message }}</p>

    <p>Explore the About page or use the Contact form to test the application.</p>
@endsection
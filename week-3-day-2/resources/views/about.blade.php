@extends('layouts.app')

@section('title', $title)

@section('content')
    <h1>{{ $title }}</h1>
    <p>{{ $description }}</p>
    <p>This project uses Laravel 9, PHP, controllers, routes, and Blade views.</p>
@endsection
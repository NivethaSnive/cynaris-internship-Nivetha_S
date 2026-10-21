
@extends('layouts.app')

@section('title', $post->title)

@section('content')
    <h2>{{ $post->title }}</h2>

    <p>{{ $post->body }}</p>

    <a href="{{ route('posts.edit', $post) }}">Edit Post</a>
    <a href="{{ route('posts.index') }}">Back to Posts</a>
@endsection

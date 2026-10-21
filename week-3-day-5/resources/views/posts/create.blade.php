
@extends('layouts.app')

@section('title', 'Create Post')

@section('content')
    <h2>Create New Post</h2>

    <form action="{{ route('posts.store') }}" method="POST">
        @csrf

        <label for="title">Title</label>
        <input type="text" id="title" name="title" value="{{ old('title') }}">

        @error('title')
            <p class="error">{{ $message }}</p>
        @enderror

        <label for="body">Content</label>
        <textarea id="body" name="body" rows="6">{{ old('body') }}</textarea>

        @error('body')
            <p class="error">{{ $message }}</p>
        @enderror

        <button type="submit">Save Post</button>
    </form>

    <a href="{{ route('posts.index') }}">Back to Posts</a>
@endsection

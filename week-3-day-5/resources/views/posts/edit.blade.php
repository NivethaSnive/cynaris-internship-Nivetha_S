@extends('layouts.app')

@section('title', 'Edit Post')

@section('content')
    <h2>Edit Post</h2>

    <form action="{{ route('posts.update', $post) }}" method="POST">
        @csrf
        @method('PUT')

        <label for="title">Title</label>
        <input type="text" id="title" name="title"
               value="{{ old('title', $post->title) }}">

        @error('title')
            <p class="error">{{ $message }}</p>
        @enderror

        <label for="body">Content</label>
        <textarea id="body" name="body" rows="6">{{ old('body', $post->body) }}</textarea>

        @error('body')
            <p class="error">{{ $message }}</p>
        @enderror

        <button type="submit">Update Post</button>
    </form>

    <a href="{{ route('posts.index') }}">Back to Posts</a>
@endsection
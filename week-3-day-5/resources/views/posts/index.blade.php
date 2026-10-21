
@extends('layouts.app')

@section('title', 'All Posts')

@section('content')
    <h2>All Posts</h2>

    <p><a href="{{ route('posts.create') }}">Create New Post</a></p>

    @forelse($posts as $post)
        <div class="post">
            <h3>{{ $post->title }}</h3>
            <p>{{ $post->body }}</p>

            <a href="{{ route('posts.show', $post) }}">View</a>
            <a href="{{ route('posts.edit', $post) }}">Edit</a>

            <form action="{{ route('posts.destroy', $post) }}" method="POST" style="display:inline">
                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('Delete this post?')">Delete</button>
            </form>
        </div>
    @empty
        <p>No posts found. Create your first post!</p>
    @endforelse

    <div>
        {{ $posts->links() }}
    </div>
@endsection

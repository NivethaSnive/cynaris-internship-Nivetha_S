@extends('layouts.app')

@section('title', 'All Tasks')

@section('content')
    <h1>Task Management</h1>

    <p><a href="{{ route('tasks.create') }}">Create New Task</a></p>

    @if (session('success'))
        <p>{{ session('success') }}</p>
    @endif

    @forelse ($tasks as $task)
        <hr>
        <h3>{{ $task->title }}</h3>
        <p>Status: {{ $task->status }}</p>

        <a href="{{ route('tasks.show', $task) }}">View</a>
        <a href="{{ route('tasks.edit', $task) }}">Edit</a>

        <form action="{{ route('tasks.destroy', $task) }}" method="POST">
            @csrf
            @method('DELETE')
            <button type="submit">Delete</button>
        </form>
    @empty
        <p>No tasks found.</p>
    @endforelse
@endsection

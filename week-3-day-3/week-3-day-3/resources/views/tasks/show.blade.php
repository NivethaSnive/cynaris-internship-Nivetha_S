
@extends('layouts.app')

@section('title', 'View Task')

@section('content')
    <h1>{{ $task->title }}</h1>

    <p>
        <strong>Description:</strong>
        {{ $task->description ?: 'No description provided.' }}
    </p>

    <p><strong>Status:</strong> {{ $task->status }}</p>

    <p><strong>Created:</strong> {{ $task->created_at }}</p>

    <a href="{{ route('tasks.edit', $task) }}">Edit Task</a>
    <a href="{{ route('tasks.index') }}">Back to Tasks</a>
@endsection

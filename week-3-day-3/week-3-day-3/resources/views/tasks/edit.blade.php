
@extends('layouts.app')

@section('title', 'Edit Task')

@section('content')
    <h1>Edit Task</h1>

    @if ($errors->any())
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif

    <form action="{{ route('tasks.update', $task) }}" method="POST">
        @csrf
        @method('PUT')

        <label>Title</label>
        <input type="text" name="title"
               value="{{ old('title', $task->title) }}" required>

        <br><br>

        <label>Description</label>
        <textarea name="description">{{ old('description', $task->description) }}</textarea>

        <br><br>

        <label>Status</label>
        <select name="status">
            @foreach (['pending', 'in_progress', 'completed'] as $status)
                <option value="{{ $status }}"
                    {{ old('status', $task->status) === $status ? 'selected' : '' }}>
                    {{ ucfirst(str_replace('_', ' ', $status)) }}
                </option>
            @endforeach
        </select>

        <br><br>

        <button type="submit">Update Task</button>
    </form>
@endsection

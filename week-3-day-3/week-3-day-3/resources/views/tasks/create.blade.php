
@extends('layouts.app')

@section('title', 'Create Task')

@section('content')
    <h1>Create Task</h1>

    @if ($errors->any())
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif

    <form action="{{ route('tasks.store') }}" method="POST">
        @csrf

        <label>Title</label>
        <input type="text" name="title" value="{{ old('title') }}" required>

        <br><br>

        <label>Description</label>
        <textarea name="description">{{ old('description') }}</textarea>

        <br><br>

        <label>Status</label>
        <select name="status">
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
        </select>

        <br><br>

        <button type="submit">Save Task</button>
    </form>
@endsection

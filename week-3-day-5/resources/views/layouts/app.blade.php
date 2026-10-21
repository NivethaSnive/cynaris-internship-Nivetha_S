
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Blog CRUD Application')</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 30px auto; padding: 0 20px; }
        a, button { margin-right: 8px; }
        input, textarea { display: block; width: 100%; padding: 10px; margin: 8px 0 15px; box-sizing: border-box; }
        .success { color: green; }
        .error { color: red; }
        .post { border-bottom: 1px solid #ddd; padding: 15px 0; }
        button { padding: 8px 12px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Blog CRUD Application</h1>

    @if(session('success'))
        <p class="success">{{ session('success') }}</p>
    @endif

    @yield('content')
</body>
</html>

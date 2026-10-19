<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') | Laravel Contact Portal</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 850px;
            margin: 30px auto;
            padding: 20px;
            line-height: 1.6;
            color: #222;
        }

        nav a {
            margin-right: 18px;
            color: #075985;
            text-decoration: none;
        }

        main {
            margin-top: 30px;
        }

        input, textarea {
            display: block;
            width: 100%;
            max-width: 500px;
            padding: 10px;
            margin: 8px 0 16px;
            box-sizing: border-box;
        }

        button {
            padding: 10px 18px;
            cursor: pointer;
        }

        .error {
            color: #b91c1c;
        }

        .success {
            color: #166534;
        }
    </style>
</head>
<body>
    @include('partials.nav')

    <main>
        @yield('content')
    </main>
</body>
</html>
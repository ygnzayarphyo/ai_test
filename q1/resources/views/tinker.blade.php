<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Zayar Bot</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" type="text/css">
</head>
<body>
<h3>A system for checking the days of the week</h3>
<p>Copyright © 2019 ZAYAR PHYO</p>
<script>
        var botmanWidget = {
            introMessage: 'Hello, I am a Chatbot. Type `start` command to continue...',
            title: "Zayar's bot",
            mainColor: '#456765',
            bubbleBackground: '#ff76f4',
            aboutText: '',
            bubbleAvatarUrl: '',
        };
    </script>

<script src='https://cdn.jsdelivr.net/npm/botman-web-widget@0/build/js/widget.js'></script>

</body>
</html>

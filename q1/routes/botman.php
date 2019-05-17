<?php
use App\Http\Controllers\BotManController;

$botman = resolve('botman');

$botman->hears('Start conversation', BotManController::class.'@startConversation');
$botman->hears('start', BotManController::class.'@startConversation');

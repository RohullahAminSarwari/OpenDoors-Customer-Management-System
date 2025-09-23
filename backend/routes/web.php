<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['message' => 'OpenDoors Customer Management API'];
});
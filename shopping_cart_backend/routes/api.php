<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'home','as'=>'home.'],function (){
    Route::get('',[\App\Http\Controllers\api\home\indexController::class,'index'])->name('index');
});

<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return response()->json([
        'status' => 'ok',
        'message' => 'Craft Cannabis API',
        'version' => '1.0',
    ]);
});

// Health check route
$router->get('/health', function () {
    return response()->json([
        'status' => 'ok', 
        'message' => 'API is running'
    ]);
});

// Products routes
$router->group(['prefix' => 'products'], function () use ($router) {
    $router->get('/', 'ProductController@index');
    $router->get('/{id}', 'ProductController@show');
    $router->post('/', 'ProductController@store');
    $router->put('/{id}', 'ProductController@update');
    $router->delete('/{id}', 'ProductController@destroy');
});

// Newsletter subscriber routes
$router->get('/subscribers', 'SubscriberController@index');
$router->post('/subscribers', 'SubscriberController@subscribe');
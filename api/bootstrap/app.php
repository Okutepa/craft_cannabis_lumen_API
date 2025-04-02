<?php

require_once __DIR__.'/../vendor/autoload.php';

(new Laravel\Lumen\Bootstrap\LoadEnvironmentVariables(
    dirname(__DIR__)
))->bootstrap();

date_default_timezone_set(env('APP_TIMEZONE', 'UTC'));

$app = new Laravel\Lumen\Application(
    dirname(__DIR__)
);

$app->withFacades();
$app->withEloquent();

// Register middleware
$app->middleware([
    App\Http\Middleware\CorsMiddleware::class
]);

// Optional: Register route middleware
$app->routeMiddleware([
    'cors' => App\Http\Middleware\CorsMiddleware::class,
]);

// Configure app
$app->configure('app');
$app->configure('database');

// Register service providers if needed
// $app->register(App\Providers\AppServiceProvider::class);

// Load routes
$app->router->group([
    'namespace' => 'App\Http\Controllers',
], function ($router) {
    require __DIR__.'/../routes/web.php';
});

return $app;
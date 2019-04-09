<?php


namespace App\Http\Controllers;

use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Support\Facades\Mail;
use App\Mail\MyEmail;

class EmailController
{
    public function sendEmail(ServerRequestInterface $request) {
        $user = $request->getParsedBody();
        Mail::to($user['email'])->send(new MyEmail($user));

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json('Email Enviado!');
    }
}

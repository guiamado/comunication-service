<?php


namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use App\Mail\MyEmail;

class EmailController
{
    public function sendEmail() {
        $user = [
            'name' => 'Guilherme',
            'age' => '20',
        ];
        Mail::to('amado.silva133@gmail.com')->send(new MyEmail($user));
    }
}

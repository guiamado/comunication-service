<?php


namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use App\Mail\MyEmail;

class EmailController
{
    public function sendEmail() {
        Mail::to('amado.silva133@gmail.com')->send(new MyEmail());
    }
}

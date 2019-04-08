<?php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class MyEmail extends Mailable
{
    use Queueable,
        SerializesModels;

    protected $user;

    public function __construct($user)
    {
        $this->user= $user;
    }

    //build the message.
    public function build() {
        return $this->from('amado.guigui@gmail.com')
            ->subject('Assunto do Email')
            ->view('my-email')
            ->with([
                'user' => $this->user,
            ]);
    }
}

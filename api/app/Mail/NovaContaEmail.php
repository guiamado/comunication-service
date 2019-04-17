<?php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NovaContaEmail extends Mailable
{
    use Queueable,
        SerializesModels;

    protected $user;

    public function __construct($user)
    {
        $this->user= $user;
    }

    public function build() {
        return $this->from('amado.silva133@gmail.com')
            ->subject('Conta Criada Servico Notificacao')
            ->view('nova-conta-email')
            ->with([
                'user' => $this->user,
            ]);
    }
}

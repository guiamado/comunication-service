<?php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RecuperacaoSenhaEmail extends Mailable
{
    use Queueable,
        SerializesModels;

    protected $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function build() {
        return $this->from('amado.silva133@gmail.com')
            ->subject('Redefinicao de senha')
            ->view('recuperar-senha-email')
            ->with([
                'user' => $this->user,
            ]);
    }
}

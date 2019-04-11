<?php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotificacaoEmail extends Mailable
{
    use Queueable,
        SerializesModels;

    protected $user;
    protected $notificacao;

    public function __construct($user, $notificacao)
    {
        $this->user = $user;
        $this->notificacao = $notificacao;
    }

    //build the message.
    public function build() {
        return $this->from('amado.silva133@gmail.com')
            ->subject($this->notificacao->titulo)
            ->view('notificacao-email')
            ->with([
                'user' => $this->user,
                'notificacao' => $this->notificacao,
            ]);
    }
}

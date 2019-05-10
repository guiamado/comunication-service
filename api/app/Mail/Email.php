<?php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Email extends Mailable
{
    use Queueable,
        SerializesModels;

    protected $mensagem, $assunto;

    public function __construct($mensagem, $assunto)
    {
        $this->mensagem = $mensagem;
        $this->assunto = $assunto;
    }

    public function build() {
        return $this->subject($this->assunto)->html($this->mensagem);
    }
}

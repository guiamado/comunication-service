<?php


namespace App\Http\Controllers;

use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Support\Facades\Mail;
use App\Mail\NovaContaEmail;
use App\Mail\NotificacaoEmail;

class EmailController
{
    public function enviaNovaContaEmail(ServerRequestInterface $request)
    {
        $usuario = $request->getParsedBody();
        $contaCriada = new \App\Services\Email();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($contaCriada->enviarEmailContaCriada($usuario));
    }

    public function enviarNotificacao($mensagem_id)
    {
        $notificacao = new \App\Services\Email();

        $response = response();
        return $response->json($notificacao->enviarNotificacaoEmail($mensagem_id));
    }

    public function enviarNovaSenhaEmail(ServerRequestInterface $request)
    {
        $usuario = $request->getParsedBody();
        $recuperarSenha = new \App\Services\Email();

        $response = response();
        return $response->json($recuperarSenha->enviarNovaSenha($usuario));
    }
}

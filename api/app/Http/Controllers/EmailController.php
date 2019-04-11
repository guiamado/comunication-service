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
        $user = $request->getParsedBody();
        Mail::to($user['email'])->send(new NovaContaEmail($user));

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json('Email Enviado!');
    }

    public function enviarNotificacao()
    {
        $notificacao = new \App\Services\Email();
        $usuariosNotificacoes = $notificacao->obterEmailNotificacao(21, false );
        $usuariosInfo = $notificacao->obterUsuarioVinculadoNotificacao($usuariosNotificacoes);
//        dd($usuariosNotificacoes);

        foreach ($usuariosInfo as $key => $usuario) {
            Mail::to($usuario['email'])->send(new NotificacaoEmail($usuario, $usuariosNotificacoes[$key]));
        }

        $response = response();
        return $response->json('Email Enviado!');
    }
}

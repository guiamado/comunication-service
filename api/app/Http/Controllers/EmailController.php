<?php


namespace App\Http\Controllers;

use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Support\Facades\Mail;

class EmailController
{
    public function enviarEmail()
    {
        $usuarios = [
            'email' => 'amado.silva133@gmail.com'
        ];
        $mensagem = '<p>Pronac: 123456 <br> Proponente: Guilherme </p><b>Sua Proposta foi transformada em projeto</b>';
        $assunto = 'Proposta transformada em Projeto';
        $contaCriada = new \App\Services\Email();
        $response = response();

        return $response->json($contaCriada->enviarEmail($usuarios, $mensagem, $assunto));
    }
}

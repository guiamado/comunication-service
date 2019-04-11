<?php


namespace App\Services;

use DB;

class Email implements IService
{
    public function obterEmailNotificacao($mensagem_id, $is_notificacao_lida)
    {
        if (is_null($mensagem_id)) {
            throw new \Exception('Identificador de mensagem obrigatório.');
        }

        if ($is_notificacao_lida == false) {
            $notificacoesUsuario = $this->obterQueryEmailNotificacao()->where(
                'notificacao.mensagem.mensagem_id',
                '=',
                $mensagem_id
            )->where(
                'notificacao.notificacao.is_notificacao_lida',
                '=',
                $is_notificacao_lida
            );
        }

        return $notificacoesUsuario->get();
    }

    private function obterQueryEmailNotificacao()
    {
        return DB::table('notificacao.notificacao')
            ->select([
                'notificacao.notificacao.notificacao_id',
                'notificacao.notificacao.codigo_destinatario',
                'notificacao.notificacao.is_notificacao_lida',
                'notificacao.mensagem.mensagem_id',
                'notificacao.notificacao.data_envio',
                'notificacao.mensagem.titulo',
                'notificacao.mensagem.descricao',
                'notificacao.mensagem.sistema_id',
                'notificacao.mensagem.is_ativo',
                'notificacao.mensagem.autor_id',
                'notificacao.sistema.descricao as sistema',
                'notificacao.usuario_has_sistema.usuario_id as usuario_id'
            ])
            ->join(
                'notificacao.mensagem',
                'notificacao.mensagem_id',
                '=',
                'notificacao.mensagem.mensagem_id'
            )
            ->join(
                'notificacao.usuario_has_sistema',
                'notificacao.mensagem.sistema_id',
                '=',
                'notificacao.usuario_has_sistema.sistema_id'
            )
            ->join(
                'notificacao.sistema',
                'notificacao.usuario_has_sistema.sistema_id',
                '=',
                'notificacao.sistema.sistema_id'
            );
    }

    public function obterUsuarioVinculadoNotificacao($dados)
    {
        $conta = new \App\Services\Conta();
        foreach ($dados as $item) {
            $usuarios[] = $conta->obter($item->usuario_id);
        }

        return $usuarios;
    }
}

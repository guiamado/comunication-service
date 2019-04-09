<p>Ola, {{ $user['nome'] }},</p>
<p>Sua conta no sistema de Notificaçao foi criada!!</p>
<b>Seu email de Login: {{ $user['email'] }}</b><br>
<b>Seu senha: {{ $user['password'] }}</b>
<p>Status da conta: {{ $user['is_ativo'] ? 'Ativa' : 'Inativa'  }}</p>
<p>Permissoes: {{ $user['is_admin'] ? 'Administrador' : 'Usuario'  }}</p>
<p>
    Regards,<br>
    Sender.
</p>

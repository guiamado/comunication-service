<p>Ola, {{ $user['nome'] }},</p>
<p>Sua conta no sistema de Notificaçao foi criada!!</p>
<b>Seu email de Login: {{ $user['email'] }}</b><br>
<b>Seu senha: {{ $user['password'] }}</b>
@if(isset($user['is_ativo']))
    <p>Status da conta: {{ $user['is_ativo'] ? 'Ativa' : 'Inativa'  }}</p>
@endif
@if(isset($user['is_admin']))
    <p>Permissoes: {{ $user['is_admin'] ? 'Administrador' : 'Usuario'  }}</p>
@endif
<p>
    Regards,<br>
    Sender.
</p>

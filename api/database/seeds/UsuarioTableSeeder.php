<?php

use Illuminate\Database\Seeder;

class UsuarioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $registros = DB::table('notificacao.usuario')
            ->limit(1)
            ->get();
        if(count($registros) < 1) {
            // cria 10 usuários utilizando a factory para o model Usuario
            factory(App\Models\Usuario::class, 15)->create();
            $this->criarUsuarioTeste();
        }
    }

    private function criarUsuarioTeste() {
        $sistemas = [
            'descricao' => 'Sistema Teste',
            'sistema_id' => 6
        ];
        $dados = [
            'nome' => 'Usuario Teste',
            'is_ativo' => true,
            'is_admin' => true,
            'email' => 'abcd@gmail.com',
            'password' => password_hash('123456', PASSWORD_BCRYPT),
            'sistemas' => $sistemas
        ];

        $criarContaTeste = new \App\Services\Conta();
        $criarContaTeste->criar($dados);
    }

}

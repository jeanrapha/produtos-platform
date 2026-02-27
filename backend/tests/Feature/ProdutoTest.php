<?php

namespace Tests\Feature;

use Cache;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProdutoTest extends TestCase
{
    /*
        Método 'setUp' é executado antes de cada teste.
    */
    protected function setUp(): void
    {
        parent::setUp(); # Chama o método 'setUp' da classe pai

        #Ignorar todos os middlewares para evitar autenticação 
        #e outras verificações durante os testes
        $this->withoutMiddleware();
    
        #Executar os migrations para garantir que 
        #o banco de dados esteja atualizado
        $this->artisan('migrate');

        #Limpar o cache antes de cada teste
        Cache::flush();
    }

    /** @test */
    public function deve_criar_produto_com_sucesso()
    {
        $this->markTestIncomplete('Teste ainda não implementado.');
    }

    /** @test */
    public function nao_deve_criar_produto_com_dados_invalidos()
    {
        $this->markTestIncomplete('Teste ainda não implementado.');
    }

    /** @test */
    public function deve_listar_produtos()
    {
        $this->markTestIncomplete('Teste ainda não implementado.');
    }

    /** @test */
    public function deve_buscar_produto_por_id()
    {
        $this->markTestIncomplete('Teste ainda não implementado.');
    }

    /** @test */
    public function deve_atualizar_produto()
    {
        $this->markTestIncomplete('Teste ainda não implementado.');
    }

    /** @test */
    public function deve_excluir_produto()
    {
        $this->markTestIncomplete('Teste ainda não implementado.');
    }
}

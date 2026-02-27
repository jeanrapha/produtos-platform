// Função para cadastrar um novo produto

async function cadastrarProduto() {
    //Capturar o token do usuário na session
    const user = JSON.parse(sessionStorage.getItem('user'));

    //const token = localStorage.getItem('access_token');
    //Verificar se o token existe
    if (!user || !user.token) {
        alert('Usuário não autenticado. Faça login para cadastrar um produto.');
        return;
    }
    const token = user.token;


    //Obter os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const quantidade = document.getElementById('quantidade').value;

    //Criar um objeto com os dados do produto
    const produto = {
        nome: nome,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade)
    };

    try {
        const response = await fetch('http://localhost:8000/api/v1/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify( produto ) // Enviar o produto dentro de um objeto para corresponder ao formato esperado pela API
        });
        if (!response.ok) {
            alert('Erro ao cadastrar produto: ' + response.statusText);
            console.error('Erro:', response.statusText);
            console.error('Resposta:', await response.text());
            return;
        }

        //Obter a resposta em formato JSON
        //alert(response.message);




        const data = await response.json();
        console.log('Produto cadastrado:', data);
        alert('Produto cadastrado com sucesso!');
        //Limpar os campos do formulário
        document.getElementById('nome').value = '';
        document.getElementById('preco').value = '';
        document.getElementById('quantidade').value = '';

        //Atualizar a lista de produtos
        listarProdutos();
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        alert('Falha ao cadastrar produto. Verifique os dados e tente novamente.');
    }   

}

async function listarProdutos() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || !user.token) {
        alert('Usuário não autenticado. Faça login para listar os produtos.');
        return;
    }
    const token = user.token;

    try {
        const response = await fetch('http://localhost:8000/api/v1/produtos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            alert('Erro ao listar produtos: ' + response.statusText);
            console.error('Erro:', response.statusText);
            console.error('Resposta:', await response.text());
            return;
        }
        const data = await response.json();
        console.log('Produtos listados:', data);

        // Se existir um elemento de lista simples (`#produtos-list`), preencher como antes
        const produtosList = document.getElementById('produtos-list');
        if (produtosList) {
            produtosList.innerHTML = ''; // Limpar a lista antes de adicionar os produtos
            data.forEach(produto => {
                const listItem = document.createElement('li');
                listItem.textContent = `ID: ${produto.id} - Nome: ${produto.nome} - Preço: ${produto.preco} - Quantidade: ${produto.quantidade}`;
                produtosList.appendChild(listItem);
            });
        }

        // Se existir uma tabela (`#productsBody`), preencher com linhas (nomes, preço, quantidade)
        const tableBody = document.getElementById('productsBody') || document.getElementById('productTableBody');
        if (tableBody) {
            tableBody.innerHTML = '';
            data.forEach(produto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>P</td>
                    <td>${produto.nome}</td>
                    <td>R$ ${Number(produto.preco).toFixed(2)}</td>
                    <td>${produto.quantidade}</td>
                    <td class="text-end">-</td>
                `;
                tableBody.appendChild(tr);
            });
        }
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        alert('Falha ao listar produtos. Verifique os dados e tente novamente.');
    }
}



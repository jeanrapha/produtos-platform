// Keycloak API - Rotinas de Autenticação

/**
 * Realiza o login do usuário
 */
async function login() {
    //capturar os campos de nome de usuário e senha do formulário
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // montando a chamada da API (Keycloak)
    const params = new URLSearchParams();
    params.append('client_id', 'produtos-client');
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    try {
        const response = await fetch('http://localhost:8080/realms/produtos-realm/protocol/openid-connect/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
        
        if (!response.ok) {
            throw new Error('Erro na autenticação: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Token recebido:', data);
        // Armazenar o token e informações do usuário na sessão
        const user = {
            username: username,
            token: data.access_token
        };
        sessionStorage.setItem('user', JSON.stringify(user));

        // Armazenar o token em localStorage para uso em outras páginas (opcional, dependendo da estratégia de gerenciamento de sessão)
        localStorage.setItem('access_token', user.token);

        console.log('Usuário autenticado e sessão configurada:', user);
        // Redirecionar para a página principal ou dashboard
        window.location.href = 'produtos.html';
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        alert('Falha na autenticação. Verifique suas credenciais e tente novamente.');
    }


}

    // método para verificar se o usuário já está autenticado (ex: ao acessar a página de login, se já tiver token válido, redirecionar para dashboard)

async function checkAuthentication() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.token) {
        // Aqui você pode adicionar lógica para verificar se o token ainda é válido (ex: decodificar o token e verificar a expiração)
        console.log('Usuário já autenticado:', user);
        // Redirecionar para a página principal ou dashboard
        //window.location.href = 'dashboard.html';
    } else {
        console.log('Nenhum usuário autenticado no momento');
        // Redirecionar para a página de login, se necessário (opcional, já que estamos na página de login)
        if (window.location.pathname !== '/index.html') {
            window.location.href = 'index.html';
        }
    }
          
}

// Verificar autenticação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});
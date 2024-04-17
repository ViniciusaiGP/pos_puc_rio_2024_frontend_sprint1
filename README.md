# Documentação do Código HTML

Este documento fornece uma visão geral do código HTML fornecido e suas funcionalidades.

## Estrutura do Arquivo HTML

- `index.html`: O arquivo principal contém a estrutura básica de uma página web.

## Arquivos Externos

- `style.css`: Este arquivo contém estilos CSS para a página web.
- `script.js`: Este arquivo contém scripts JavaScript para interatividade na página.

## Bibliotecas Externas

- **Font Awesome**: Utilizada para ícones na página web.
- **Google Fonts (Lato)**: Utilizada para estilização de fontes na página web.
- **Axios**: Utilizada para fazer requisições HTTP.

## Elementos HTML Principais

1. **Meta Tags**: Definem configurações importantes da página, como charset e viewport.
2. **Título**: Define o título da página exibido na aba do navegador.
3. **Links Externos**: Importam os arquivos de estilo CSS e fontes externas.
4. **Script Externo**: Importa o script JavaScript externo (Axios).
5. **Barra de Navegação**: Componente responsável pela navegação entre diferentes seções da página.
6. **Conteúdo Dinâmico**: Áreas que exibem conteúdo dinâmico da página, alteradas por interações do usuário.
7. **Formulários**: Incluem campos para entrada de dados e botões para envio de informações.
8. **Tabelas**: Utilizadas para exibir dados tabulares, como uma lista de produtos.

## Funcionalidades JavaScript

1. **Navegação entre Páginas**: JavaScript é utilizado para alternar entre diferentes seções da página.
2. **Envio de Requisições HTTP**: O Axios é usado para fazer requisições HTTP para buscar ou enviar dados para o servidor.

## Funções Principais

### `showHome()`

- Exibe o conteúdo da página inicial e atualiza a barra lateral.

### `showLogin()`

- Exibe o formulário de login e atualiza a barra lateral.

### `showRegister()`

- Exibe o formulário de registro e atualiza a barra lateral.

### `showLogout()`

- Realiza o logout do usuário e atualiza a barra lateral.

### `showQRCode()`

- Exibe o campo para inserção de código QR e atualiza a barra lateral.

### `showListOfProducts()`

- Exibe a lista de produtos cadastrados e atualiza a barra lateral.

### `showCadOfProducts()`

- Exibe o formulário para cadastro de novos produtos e atualiza a barra lateral.

### `submitRegister()`

- Envia uma solicitação para registrar um novo usuário no servidor backend.

### `submitLogin()`

- Envia uma solicitação para autenticar um usuário no servidor backend.

### `submitQRCode()`

- Envia uma solicitação para processar um código QR e cadastrar os produtos associados.

### `submitLogout()`

- Envia uma solicitação para desconectar o usuário e remove o token de autenticação armazenado.

### `submitRegisterProduct()`

- Envia uma solicitação para cadastrar um novo produto no servidor backend.

### `fetchProducts()`

- Envia uma solicitação para recuperar a lista de produtos cadastrados e atualiza a tabela na interface do usuário.

## Integração com o Backend

O código utiliza a biblioteca Axios para enviar solicitações HTTP para endpoints no servidor backend, lidando com operações de registro, login, logout, processamento de código QR e interação com a lista e cadastro de produtos.

## Armazenamento Local

O armazenamento local (localStorage) do navegador é utilizado para armazenar o token de autenticação e outras informações do usuário, permitindo a persistência da sessão entre as solicitações.

## Como Executar o Projeto

1. Clone o repositório para sua máquina local.
2. Abra o arquivo `index.html` em um navegador web compatível.

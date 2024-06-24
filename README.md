<body>
    <h1>NestJS Pokemon API</h1>
    <p>Esta é uma aplicação de exemplo construída com NestJS que fornece uma API para gerenciar usuários e pokémons. A aplicação também inclui autenticação JWT.</p>
    <h2>Instalação</h2>
    <ol>
        <li>
            Clone o repositório:
            <pre><code>git clone &lt;url-do-repositorio&gt;
cd nest-pokemon-api</code></pre>
        </li>
        <li>
            Instale as dependências:
            <pre><code>npm install</code></pre>
        </li>
        <li>
            Crie um arquivo <code>.env</code> na raiz do projeto com o seguinte conteúdo:
            <pre><code>DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=nest
JWT_SECRET=seu_segredo_jwt</code></pre>
        </li>
        <li>
            Configure o banco de dados MySQL e crie as tabelas necessárias:
            <pre><code>CREATE DATABASE nest;
USE nest;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pokemon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route VARCHAR(255) NOT NULL,
    method VARCHAR(50) NOT NULL,
    responseTime INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</code></pre>
        </li>
    </ol>
    <h2>Executando a Aplicação</h2>
    <ol>
        <li>
            Para iniciar a aplicação em modo de desenvolvimento:
            <pre><code>npm run start:dev</code></pre>
        </li>
        <li>
            A aplicação estará disponível em <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.
        </li>
    </ol>
    <h2>Testes</h2>
    <h3>Testes Unitários</h3>
    <p>Para executar os testes unitários:</p>
    <pre><code>npm run test</code></pre>
    <h3>Testes End-to-End</h3>
    <p>Para executar os testes end-to-end:</p>
    <pre><code>npm run test:e2e</code></pre>
    <h2>Endpoints da API</h2>
    <h3>Autenticação</h3>
    <ul>
        <li>
            <strong>POST</strong> <code>/auth/login</code>: Autentica um usuário e retorna um token JWT.
            <pre><code>{
  "username": "exampleUser",
  "password": "examplePassword"
}</code></pre>
        </li>
    </ul>
    <h3>Usuários</h3>
    <ul>
        <li>
            <strong>POST</strong> <code>/user</code>: Cria um novo usuário.
            <pre><code>{
  "username": "exampleUser",
  "password": "examplePassword"
}</code></pre>
        </li>
        <li>
            <strong>GET</strong> <code>/user</code>: Retorna todos os usuários.
        </li>
        <li>
            <strong>GET</strong> <code>/user/:id</code>: Retorna um usuário pelo ID.
        </li>
        <li>
            <strong>PUT</strong> <code>/user/:id</code>: Atualiza um usuário pelo ID.
            <pre><code>{
  "username": "updatedUser",
  "password": "updatedPassword"
}</code></pre>
        </li>
        <li>
            <strong>DELETE</strong> <code>/user/:id</code>: Deleta um usuário pelo ID.
        </li>
    </ul>
    <h3>Pokemons</h3>
    <ul>
        <li>
            <strong>POST</strong> <code>/pokemon/import</code>: Importa pokémons da API externa.
        </li>
        <li>
            <strong>POST</strong> <code>/pokemon</code>: Cria um novo pokémon.
            <pre><code>{
  "name": "pikachu",
  "url": "https://pokeapi.co/api/v2/pokemon/25/"
}</code></pre>
        </li>
        <li>
            <strong>GET</strong> <code>/pokemon</code>: Retorna todos os pokémons.
        </li>
        <li>
            <strong>GET</strong> <code>/pokemon/:id</code>: Retorna um pokémon pelo ID.
        </li>
        <li>
            <strong>PUT</strong> <code>/pokemon/:id</code>: Atualiza um pokémon pelo ID.
            <pre><code>{
  "name": "raichu",
  "url": "https://pokeapi.co/api/v2/pokemon/26/"
}</code></pre>
        </li>
        <li>
            <strong>DELETE</strong> <code>/pokemon/:id</code>: Deleta um pokémon pelo ID.
        </li>
    </ul>
    <h2>Contribuição</h2>
    <p>Sinta-se à vontade para abrir issues e pull requests. Todas as contribuições são bem-vindas!</p>
    <h2>Licença</h2>
    <p>Este projeto está licenciado sob a licença MIT. Veja o arquivo <code>LICENSE</code> para mais detalhes.</p>
</body>
</html>
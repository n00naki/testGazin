# cadastro-developer

## Tecnologias e ferramentas utilizadas:
#### Controle de Versão
 - Git

#### Gerenciador de Pacotes
 - Npm

#### Front-end
 - React (Hooks)
 - Typescript
 - react-bootstrap (Visual)
 - Axios (Rest)
 
#### Back-end
 - Node.Js
 - Typescript
 - Express
 - Typeorm
 - Nodemon
 
#### Banco de Dados
 - PostgreSQL
 
### Iniciando a aplicação 
#### Front-end
 - Abrir o terminal no caminho `teste-gazin/web`
 - Baixar o node_modules com o comando `npm install`
 - Executar o comando `npm start` para iniciar a aplicação.
 - Será executado no endereço http://localhost:3000
  
#### Back-end
 - No seu PostgreSQL Criar a tabela db_teste 
 - No arquivo `ormconfig.json`, `passar host, porta, username e password do seu banco de dados postreSQL localhost`
 - Abrir o terminal no caminho `teste-gazin/server`
 - Baixar o node_modules com o comando `npm install`
 - Executar a migration de criação da tabela com o comando `npm run typeorm migration:run` caso  necessite reverter o processo utilize o comando `npm run typeorm migration:revert`
 - Executar o comando `npm run dev` para iniciar a aplicação.
 - Será executado no endereço http://localhost:3333
 

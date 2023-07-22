
<h3 align="center">🚧 Software em construção 🚧</h3>
<p align="center">
  <img width="auto" height="23em" src="https://img.shields.io/badge/JavaScript-323330?style=flat&logo=javascript&logoColor=F7DF1E" >
  <img width="auto" height="23em" src="https://img.shields.io/badge/-TypeScript-323330?style=flat&logo=TypeScript">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Node.js-323330?style=flat&logo=Node.js&logoColor=white">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Express.js-323330?style=flate&logo=express">
  <img width="auto" height="23em" src="https://img.shields.io/badge/MySql-323330?style=flate&logo=mysql&logoColor=white">
</p>

# Sumario
- [Sumario](#sumario)
- [Sobre](#sobre)
- [Justificativa](#justificativa)
- [Pré-Requisito](#pré-requisito)
- [Executando o projeto](#executando-o-projeto)
- [Build](#build)
- [Documentação](#documentação)
- [Tecnologias](#tecnologias)
    - [Veja o arquivo package.json](#veja-o-arquivo-packagejson)

<br>

___
# Sobre

<br>

<p align="justify">
Projeto desafio delivery - enaFood.
</p>

- A documentação pode ser acessar através do endPoint: <strong>/apiDocs</strong>
- Collection do insomnia [Link](/tmp/EnaFood_2023-07-22.json)
- Docker configurado e tem um exemplo para o banc no docker na env

<br>

___
# Justificativa

<br>

<p align="justify">
Tentei deixar o projeto simples e com o máximo de função genérica, como a regra de negócio foi bem abstrata pensei em alguns cenários, as regras mais complexas deixei em funções separadas para facilitar atualização da regra de negócio. O Mongo só usei uma vez a 3 anos atrás, sou acostumado com banco relacional, mas tentei evitar o máximo possível relacionamentos para ganho de performasse.
As tecnologias e pacotes escolhidas foram esses por motivo de um bom suporte e boa documentação.
- O número de telefone não coloquei como um campo único, pois é comum as pessoas perderem numero de telefone por não fazerem recarga;
- O status do usuário tem pendente para caso o sistema adicione feature de análise antes de ser aprovado;
- Endereço eu achei melhor adiciona como array de objeto no usuário e como um objeto no pedido para evitar relacionamento, acredito que seria mais performático do que criar um documento endereço com referência para o usuário ou para o endereço, que também seria uma cópia do endereço que o cliente escolheu com referência ao pedido.
- No pagamento para fins de teste, mesmo que seja um tipo de pagamento que seria feito com gateway de pagamento, vou colocar como pagamento aceito e pular o status de aguardando pagamento.

</p>

<br>

---
# Pré-Requisito

<br>

  * [NojeJS](https://nodejs.org/en/) (Versão usada na construção -> 18.14.2): Runtime de JS no servidor;
  * [MongoDB](https://www.mongodb.com/pt-br) (Versão 6): Banco de dados do projeto;
  * [Yarn](https://yarnpkg.com/): Gerenciador de pacote.

<br>

---
# Executando o projeto

<h2 align="center">Baixando e configurando o código <a name="downCod"></a></h2>

<br>

<strong>1 - </strong>  Clone este repositório:

HTTPS:
```bash
$ git clone https://github.com/araujo21x/ena_food.git
```
SSH:
```bash
$ git clone git@github.com:araujo21x/ena_food.git
```

<strong>2 - </strong>  Acesse a pasta do projeto no terminal/cmd:
```bash
$ cd
```

<strong>3 - </strong>  Instale as dependências do projeto:
```bash
$ yarn install
```

<strong>4 - </strong> Configurando as variáveis de ambiente (ambiente produção = .env)

1. Crie uma copia do arquivo exemple.env;

2. Modifique o nome dessa copia para .env;

3. O arquivo .env vai ter descrições de como preenchê-lo, mas para ter acesso as informações fale com o coordenador do projeto.

<h2 align="center">Executando <br> ---- Ambiente de desenvolvimento ---- <a name="execAmbDev"></a></h2>

<br>

<strong> 1 - </strong> Comando para rodar o projeto, no ambiente de desenvolvimento:
```bash
$ yarn dev
```

<br>

___
# Build


<br>

<p align="justify">
O código está em <strong>TypeScript</strong>, mas somente para o desenvolvimento. Dessa maneira será necessário fazer o <strong>build</strong> em alguns momento, por exemplo, quando for fazer deploy. Build é o processo de transforma o código de <strong>TypeScript</strong> para <strong>JavaScript</strong> e nesse projeto utilizamos o Babel. </p>
<br>

1. Buildar:
```bash
$ yarn build
```
2. Rodar o projeto <strong>JavaScript</strong> como dev/http:
```bash
$ yarn start-dev
```
3. Rodar o projeto <strong>JavaScript</strong> em produção/https:
```bash
$ yarn start-prod
```
___
# Documentação
1. Gerar schemas da request a partir do zod:
```bash
$ yarn doc:comp
```

A documentação pode ser acessar através do endPoint: <strong>/apiDocs</strong>

<br>

___
# Tecnologias

<br>

- [express](https://expressjs.com/pt-br/): Framework para NodeJS;
- [nodemon](https://nodemon.io/)(dev): Uma maneira da API atualizar sozinha sem
precisar reiniciar no ambiente de desenvolvimento;
- [babel](https://babeljs.io/)(dev): Ferramenta para transpilar o código de typeScript para javaScript;
- [zod](https://zod.dev/): Ferramenta de validação do código;
- [zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi): Ferramenta que pega os schemas do zod e converte para OpenAPI;
- [typeScript](https://www.typescriptlang.org/)(dev): Superset para JS;
- [Mongo](https://www.mongodb.com/pt-br): Banco de dados do projeto;
- [Mongoose](https://mongoosejs.com/docs/typescript/schemas.html): ODM do projeto;
- [compression](https://www.npmjs.com/package/compression):  comprimir
as resposta da API;
- [dotenv](https://www.npmjs.com/package/dotenv): Variável ambiente;
- [bcryptjs](https://www.npmjs.com/package/bcryptjs): Serviço para encriptação de senha;
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JWT, autenticação;
- [multer](https://www.npmjs.com/package/multer): Serviço trabalhar com imagem enviado para o servidor;
- [helmet](https://www.npmjs.com/package/helmet): Ajuda na segurança da aplicação configurando o cabeçalho http da resposta da API;
- [cors](https://www.npmjs.com/package/cors): Habilitar o cors;
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): Utilizar a documentação do swagger no express;
- [aws-sdk](https://yarnpkg.com/package/aws-sdk): Funcionalidades para AWS;
- [@sendgrid/mail](https://yarnpkg.com/package/@sendgrid/mail): Funcionalidades de envio de e-mail.

### Veja o arquivo [package.json](./package.json)



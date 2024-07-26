# :hourglass: Amadeus
Amadeus é uma aplicação padrão em Typescript para uso em projetos da empresa, ela já conta com estrutura definida e dependências já estabelecidas a serem usadas. Antes de começar a codificar, observe os seguintes pontos:

### Eslint
A aplicação com padrão para lint, portanto, caso não esteja adequado, siga as instruções documentadas [aqui](https://github.com/orgs/DataIntegraTeam/discussions/2).

### Variáveis de Ambiente
Confira qual banco de dados irá utilizar e adeque as variáveis de ambiente de acordo com ele.

Caso o banco seja Oracle, as variáveis devem ser:
- `DATABASE_CLIENT`
- `ORACLE_DIR`
- `DB_CONNECTION_STRING`
- `DB_PASSWORD`
- `DB_USER`

Caso o banco seja PostgreSQL, são as seguintes:
- `DATABASE_CLIENT`
- `DB_CONNECTION_STRING`

E por fim, a porta da aplicação, que utiliza a variável `PORT`.

### PM2
A aplicação já vem com o arquivo `ecosystem.config.ts` configurado para uso do PM2 em máquinas servidoras, portanto, é possível alterar as configurações direto pelo arquivo e executá-lo para rodar o PM2 conforme o configurado.
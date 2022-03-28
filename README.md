# Payload Register
## Back-end para receber um payload e registrar no banco

### Docker <> MongoDB

```shell
docker run --name payload-register \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  -d \
  mongo

 docker exec -it payload-register \
  mongo --host localhost -u admin -p admin --authenticationDatabase admin \
  --eval "db.getSiblingDB('payload-register').createUser({user: 'miro', pwd: 'password', roles: [{role: 'readWrite', db: 'payload-register'}]})"
```

Caso queira usar o Redis:
### Docker Redis

```shell
docker run --name redis-payloads -p 6379:6379 -d -t redis:alpine
```

# Google Sheets Integration 

## Gerando credenciais
<ol>
<li>Acessar <a href="https://console.cloud.google.com/">Console Google Cloud</a></li>
<li>No topo da plataforma temos "Google Cloud Platform", ao lado, temos um seletor de projetos</li>
<li>Clicamos nele ou em criar projeto</li>
<li>Caso tenha projetos, basta clicar, abrirá um modal, onde criaremos um novo projeto</li>
<li>Alteramos o nome do projeto e clicamos em "criar"</li>
<li>Aguarda a criação do projeto, um modal será aberto no lado direito da página</li>
<li>Clicamos em "selecionar o projeto"</li>
<li>No lado esquerdo, temos o menu da plataforma, clicamos em "APIs e Serviços"</li>
<li>Em "Painel", clicamos em "ativar apis e serviços"</li>
<li>Buscamos por "sheets" e selecionamos</li>
<li>Devemos clicar em "ativar"</li>
<li>Seremos redirecionado para a tela de "APIS e serviços Google Sheets"</li>
<li>Acessamos "credenciais"</li>
<li>No topo da página, temos a opção de "criar credenciais"</li>
<li>Selecionamos "contas de serviço"</li>
<li>Damos um nome pra conta, pode ser o mesmo nome do projeto</li>
<li>Depois é só continuar e concluir</li>
<li>Será criado um e-mail para a conta de serviço. Devemos copiar esse e-mail</li>
<li>Agora a gente abre o menu e vamos no tópico "IAM e administrador"</li>
<li>Na opção "contas de serviço", no topo, clicamos no e-mail da conta de serviço</li>
<li>Seremos redirecionado para a tela de detalhes</li>
<li>Vamos em "chaves"</li>
<li>Agora na opção "adicionar chave", selecionamos "JSON" e criar</li>
<li>O download das credenciai será feito</li>
</ol>

## Configurando a planilha no sheets
- Com o e-mail copiado do tópico 18, vamos ao sheets
- Após acessar uma planilha qualquer, vamos em compartilhar
- Colamos o e-mail e deixamos com a opção de editor ativa
- Compartilhamos e está feito

## Configurando a api do Sheets em nível de código
- Precisamos importar o arquivo JSON gerado (tópico 24), na raiz do projeto
- O arquivo precisa ser nomeado como ```credentials```
- Acessamos a planilha novamente, no link dela, devemos extrair o id:

```
https://docs.google.com/spreadsheets/d/NESSE_ESPAÇO_FICA_O_ID/edit#gid=0
```
```
https://docs.google.com/spreadsheets/d/2UF23YLAbOc_AFCF4VxVUBiaXojo0oZpQRI3q8xZOtIw/edit#gid=0
```
```
id: 2UF23YLAbOc_AFCF4VxVUBiaXojo0oZpQRI3q8xZOtIw
```

- Pegamos esse id e salvamos no arquivo `.env`, no campo `SHEETS_ID`
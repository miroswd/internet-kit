# Web Survival
## Back-end - The internet survival kit

![demo](https://user-images.githubusercontent.com/54915150/163587557-a3eec3b4-2ca8-41c4-8468-04a8565f0d2a.gif)

<p>
Demonstration:<br>
   
[![image](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/posts/altamir-santos_dev-nodejs-backend-activity-6918958334356160512-FWr8?utm_source=linkedin_share&utm_medium=member_desktop_web)](https://www.linkedin.com/posts/altamir-santos_dev-nodejs-backend-activity-6918958334356160512-FWr8?utm_source=linkedin_share&utm_medium=member_desktop_web)

</p>

[Front-end repo](https://github.com/miroswd/internet-kit-front)


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
- As credenciais, devemos colocar no arquivo `.env, no campo `CREDENTIALS`, no formato de string

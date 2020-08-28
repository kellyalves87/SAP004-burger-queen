# Índice

- [1. Burger Queen](#1-Burger-Queen)
- [2. Resumo do projeto](#2-resumo-do-projeto)
- [3. Historias de usuário](#3-usuário-de-usuário)
- [4. Protótipo](#4-prototipo)
- [5. Instalação do projeto](#-instalação-do-projeto)
- [6. Tecnologias utilizadas](#5-tecnologias-utilizadas)
- [7. Produto final](#6-produto-final)
- [8. Autoras](#7-autoras)

---

## 1. Burger Queen

Um pequeno restaurante de hambúrgueres, que está crescendo e necessita de uma
interface em que se possa realizar pedidos utilizando um _tablet_, e enviá-los
para a cozinha para que sejam preparados de forma ordenada e eficiente.

A interface feita em React permite o funcionário do salão adicionar itens dos menus, editar os pedidos, anotar nome do Cliente e mesa para envio a cozinha.
Após envio do pedido, o funcionário tem acesso a um histórico onde pode visualizar pedidos já finalizados, bem como pedidos prontos a serem entregues aos clientes.

O funcionário da cozinha tem acesso aos pedidos feitos pelo salão, e também a um histórico onde pode visualizar os pedidos entregues e também aos pedidos prontos para enviar ao salão para ser entregue ao cliente.

Para acessar a ferramenta, clique no link: https://burger-queen-6172d.web.app . 

Para maior comodidade, criamos dois usuários padrões para que possam acessar o app:

- Usuário do salão: karen_santos@gmail.com senha: 123456 
- Usuário da cozinha: gustavo@gmail.com senha: 123456

## 2. Resumo do projeto

Recebemos as informações do cliente que tem as seguintes características:

> Somos **Burger Queen**, um fast food 24hrs.
>
> A nossa proposta de serviço 24 horas foi muito bem recebida e, para continuar a
> crescer, precisamos de um sistema que nos ajude a receber pedidos de nossos
> clientes.
>
> Nós temos 2 menus. Um muito simples para o café da manhã:
>
> | Ítem                  | Preço R\$ |
> | --------------------- | --------- |
> | Café americano        | 5         |
> | Café com leite        | 7         |
> | Misto Quente          | 10        |
> | Suco de fruta natural | 7         |
>
> E outro menu para o resto do dia:
>
> | Ítem                           | Preço   |
> | ------------------------------ | ------- |
> | **Hambúrgueres**               | **R\$** |
> | Hambúrguer simples             | 10      |
> | Hambúrguer simples frango      | 10      |
> | Hambúrguer simples vegetariano | 10      |
> | Hambúrguer duplo               | 15      |
> | Hambúrguer duplo frango        | 15      |
> | Hambúrguer duplo vegetariano   | 15      |
> | Queijo   | 1      |
> | Ovo   | 1      |
> | **Acompanhamentos**            | **R\$** |
> | Batata frita                   | 5       |
> | Anéis de cebola                | 5       |
> | **Bebidas**                    | **R\$** |
> | Água 500ml                     | 5       |
> | Água 750ml                     | 7       |
> | Refrigerante 500ml             | 7       |
> | Refrigerante 750ml             | 10      |
>

A interface deve mostrar os dois menus (café da manhã e restante do dia), cada
um com todos os seus _produtos_. O usuário deve poder escolher que _produtos_
adicionar e a interface deve mostrar o _resumo do pedido_ com o custo total.

![out](https://user-images.githubusercontent.com/110297/45984241-b8b51c00-c025-11e8-8fa4-a390016bee9d.gif)

## 3. Historias de usuário

### Definição do produto

O [_Product Owner_](https://www.youtube.com/watch?v=7lhnYbmovb4) nos apresentou
este _backlog_ que é o resultado do seu trabalho com o cliente até hoje.

---

#### [História de usuário 1] Usuário deve ter seu perfil (login/senha) para acessar o sistema

Eu como funcionário do restaurante quero entrar na plataforma e ver apenas a tela importante para o meu trabalho.

##### Critérios de aceitação

O que deve acontecer para satisfazer as necessidades do usuário?

- Criar login e senha.
- Registar tipo de usuário (cozinha / salão), login e senha.
- Entrar na tela correta para cada usuário.

---

#### [História de usuário 2] Garçom/Garçonete deve poder anotar o seu pedido

Eu como garçom/garçonete quero poder anotar o meu pedido saber o valor de cada
produto e poder enviar o pedido para a cozinha para ser preparado.

##### Critérios de aceitação

O que deve acontecer para satisfazer as necessidades do usuário?

- Anotar o nome e mesa.
- Adicionar produtos aos pedidos.
- Excluir produtos.
- Ver resumo e o total da compra.
- Enviar o pedido para a cozinha (guardar em algum banco de dados).
- Funcionar bem e se adequar a um _tablet_.

---

#### [História de usuário 3] Chefe de cozinha deve ver os pedidos

Eu como chefe de cozinha quero ver os pedidos dos clientes em ordem, poder marcar que estão prontos e poder notificar os garçons/garçonetes que o pedido está pronto para ser entregue ao cliente.

##### Critérios de aceitação

- Ver os pedidos à medida em que são feitos.
- Marcar os pedidos que foram preparados e estão prontos para serem servidos.
- Ver o tempo que levou para preparar o pedido desde que chegou, até ser marcado como concluído.

---

#### [História de usuário 4] Garçom/Garçonete deve ver os pedidos prontos para servir

Eu como garçom/garçonete quero ver os pedidos que estão prontos para entregá-los rapidamente aos clientes.

##### Critérios de aceitação

- Ver a lista de pedidos prontos para servir.
- Marque os pedidos que foram entregues.

---

## 4. Protótipo

![tela_login](https://user-images.githubusercontent.com/54040625/90187736-a3b81200-dd90-11ea-80bd-72f5a277bd5c.png)
![tela_cadastro](https://user-images.githubusercontent.com/54040625/90187732-a31f7b80-dd90-11ea-927f-75b3ff18af90.png)
![tela_salã0](https://user-images.githubusercontent.com/54040625/90187743-a4e93f00-dd90-11ea-9151-57396244cf5a.png)
![tela_pedidos_prontos_e_entregues_salão](https://user-images.githubusercontent.com/54040625/90187740-a450a880-dd90-11ea-9fb6-f4ec72636467.png)
![tela_pedidos_pendentes_e_prontos_cozinha](https://user-images.githubusercontent.com/54040625/90187737-a450a880-dd90-11ea-97dd-17ae88b0f608.png)

---

## 5. Instalação do projeto

```git clone <link do repositório>```

Lembrando que para que rodar o projeto é preciso ter o Node.js instalado

Assim que a instalação tiver sido concluída, basta digitar em seu terminal:

```npm install```

Neste projeto utilizamos o Firebase como Backend da aplicação, portanto certifique-se de criar uma conta no Firebase e abrir um projeto novo.

Após isto, rode o comando abaixo em seu terminal para instalar o Firebase:

```npm i firebase```

Faça login no Google. Execute este comando em seu terminal para conectar sua máquina local ao Firebase e concede acesso ao seu projeto.

```firebase login```

Inicialize seu projeto utilizando o comando:

```firebase init```

Para rodar o projeto localmente insira o comando a seguir em seu terminal:

```firebase serve```

Basta clicar no link (localhost) que será disponibilizado em seu terminal.

Para dar deploy, utilize o seguinte comando:

```firebase deploy```

---

## 6. Tecnologias utilizadas

O objetivo principal do projeto foi aprender a construir uma interface web usando _React_. Mas também utilizamos tecnologias como _HTML5_, _Javascript_, _CSS3_, _Node.js_, _Firebase_ e _Growl_.

---

## 7. Produto final

https://burger-queen-6172d.web.app

---

## 8. Autoras

[Adriana](https://github.com/sjadriana) e [Kelly](https://github.com/kellyalves87)

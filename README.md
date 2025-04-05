# 🚀 desafio-fullstack

Este é o repositório do projeto **desafio-fullstack**, uma aplicação fullstack dockerizada para fins de demonstração e desenvolvimento.

## 🐳 Rodando o projeto com Docker

Siga os passos abaixo para clonar e rodar a aplicação localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/pedroalbertom/desafio.git
```

### 2. Acesse o diretório do projeto

```bash
cd desafio
```

> Certifique-se de estar no mesmo diretório onde está o arquivo `docker-compose.yml`.

### 3. Suba os containers

```bash
docker-compose up --build
```

Isso irá:
- Construir as imagens dos serviços
- Subir os containers do backend, frontend e banco de dados
- Iniciar a aplicação completa

### 4. Acesse no navegador

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend (API): [http://localhost:8080](http://localhost:8080)

## 🧠 Observações

- É necessário ter o **Docker** e o **Docker Compose** instalados.
- As variáveis de ambiente são configuradas automaticamente pelos containers.

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

### 3. Builda o .jar em ./target

```bash
mvn clean package
```

### 4. Suba os containers

```bash
docker-compose up --build
```

Isso irá:
- Construir as imagens dos serviços
- Subir os containers do backend, frontend e banco de dados
- Iniciar a aplicação completa

### 5. Acesse no navegador

- Frontend: [http://localhost:4200](http://localhost:3000)
- Backend (API): [http://localhost:8080](http://localhost:8080)

---

## 📚 Rotas da API

### 📚 Cursos (`/courses`)

| Método | Rota              | Descrição              |
|--------|-------------------|------------------------|
| GET    | `/courses`        | Lista todos os cursos  |
| GET    | `/courses/{id}`   | Busca curso por ID     |
| POST   | `/courses`        | Cria um novo curso     |
| PUT    | `/courses/{id}`   | Atualiza curso por ID  |
| DELETE | `/courses/{id}`   | Remove curso por ID    |

### 👤 Usuários (`/users`)

| Método | Rota                                 | Descrição                  |
|--------|--------------------------------------|----------------------------|
| GET    | `/users`                             | Lista todos os usuários    |
| GET    | `/users/{id}`                        | Busca usuário por ID       |
| POST   | `/users`                             | Cria um novo usuário       |
| PUT    | `/users/{id}`                        | Atualiza usuário por ID    |
| PUT    | `/users/{userId}/courses/{courseId}` | Atribui curso a usuário    |
| PUT    | `/users/{userId}/courses/unnasign`   | Desatribui curso a usuário |
| DELETE | `/users/{id}`                        | Remove usuário por ID      |

### 🛡️ Admins (`/admins`)

| Método | Rota             | Descrição             |
|--------|------------------|-----------------------|
| GET    | `/admins`        | Lista todos os admins |
| GET    | `/admins/{id}`   | Busca admin por ID    |
| POST   | `/admins`        | Cria um novo admin    |
| POST   | `/admins/login`  | Realiza o login       |
| POST   | `/admins/logout` | Realiza o logout      |
| PUT    | `/admins/{id}`   | Atualiza admin por ID |
| DELETE | `/admins/{id}`   | Remove admin por ID   |

---

## 🧠 Observações

- É necessário ter o **Docker** e o **Docker Compose** instalados.
- As variáveis de ambiente são configuradas automaticamente pelos containers.
- O banco já está populado.
- O arquivo `Insomnia.yaml` foi adicionado para fins de teste, se for necessário.


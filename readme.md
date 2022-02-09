## FARM APP 🌱

**Um sistema RESPONSIVO simples onde há um CRUD de fazendas/produtores rurais e um dashboard exibindo informações relevantes com o uso de um mapa, gráficos de pizza e cards.**

---

### TECNOLOGIAS USADAS

#### BACKEND 🖥️

- ✔️ Node.js
- ✔️ Typescript
- ✔️ Eslint & Prettier
- ✔️ AdonisJS (Lucid ORM)
- ✔️ Japa
- ✔️ SuperTest
- ✔️ Docker Compose
- ✔️ Postgres
- ✔️ Socket.io
- ✔️ CI/CD c/ Heroku & Travis CI

#### FRONTEND 🖌️

- ✔️ ReactJS
- ✔️ Typescript
- ✔️ Eslint & Prettier
- ✔️ Vite
- ✔️ React Router
- ✔️ Ant Design
- ✔️ Axios
- ✔️ BizCharts
- ✔️ Open Layers
- ✔️ Redux (c/ React Redux & Redux Toolkit)
- ✔️ Styled Components
- ✔️ Socket.io
- ✔️ Deploy na Vercel

---

### COMO INSTALAR 🔍

Abaixo estaremos utilizando o PNPM como package manager, mas sinta-se a vontade em usar outro.

#### BACKEND 💻

1. Primeiramente, precisamos clonar o repositório:

`git clone https://github.com/gabrieelbrazao/farms-backend`

2. Após isso, é necessário instalar os pacotes necessários:

`pnpm install`

3. Com os pacotes instalados, crie seu arquivo .env e o preencha de acordo com o arquivo exemplo.

4. Inicie os containeres com o comando abaixo (é necessário estar com o docker instalado em sua máquina):

`docker-compose up -d`

5. Este comando sobe os containeres do servidor e do banco de dados, após isso seu servidor backend deve estar rodando em http://localhost:3333.

#### FRONTEND 🖌️

1. Primeiramente, precisamos clonar o repositório:

`git clone https://github.com/gabrieelbrazao/farms-frontend`

2. Após isso, é necessário instalar os pacotes necessários:

`pnpm install`

3. Com os pacotes instalados, crie seu arquivo .env e preencha a variável de acordo com seu servidor backend.

4. Finalmente, digite o comando abaixo para iniciar o sistema:

`pnpm dev`

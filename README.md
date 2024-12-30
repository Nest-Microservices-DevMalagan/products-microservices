<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

1. Clonar repositorio
2. Instalar las dependencias
## Project setup

```bash
$ pnpm install
```
3. Crear un archivo `.env` basado en el `.env.template`

4. Ejecutar migracion de prisma `pnpm dlx prisma migrate dev`

5. Compilar y correr el proyecto
```bash
# development
$ pnpm run start
# watch mode
$ pnpm run start:dev
# production mode
$ pnpm run start:prod
```
## Product Microservice
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Dev
1. Clonar repositorio
2. Instalar las dependencias

```bash
$ pnpm install
```
3. Crear un archivo `.env` basado en el `.env.template`

4. Ejecutar migracion de prisma `pnpx prisma migrate dev`

5. Levantar el servidor de NATS
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

6. Compilar y correr el proyecto
```bash
pnpm run start:dev
```
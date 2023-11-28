docker build -t my-react-app . [Default will access Dockerfile]
docker build --no-cache -t sale-web -f ./Dockerfile.DEV .
docker build --no-cache -t sale-web -f ./Dockerfile.PROD .
docker run -p 8080:3000 your-image-name [port 3000 link to your react app port]
   .n container name
   .p binding port
   .v volumes
   .d detach (for run in background)
docker run -d --name nestjs-api-1 -p 8080:3000 -v $(pwd):/usr/src/app/ nestjs_app-nestjs-api:latest [mount localhost to inside docker container]
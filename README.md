docker run --name=nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats

docker run --link nats-main nats-streaming -store file -dir datastore -ns nats://nats-main:4222 -cid stan
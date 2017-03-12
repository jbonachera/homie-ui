release: docker
	docker build -t jbonachera/homie-ui .
docker:
	docker run --rm -v $$(pwd):/usr/local/src/ $$(docker build -q -f Dockerfile.build .)

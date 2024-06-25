export IMAGE_NAME = unity-ui
export CONTAINER_NAME = unity-ui
export RUN_OPTIONS = 

build-no-cache: RUN_OPTIONS = "--no-cache"
build-no-cache: build

build:
	docker buildx build --progress=plain $(RUN_OPTIONS) -t ${IMAGE_NAME} -f Dockerfile .

destroy-container:
	docker container rm ${CONTAINER_NAME}

destroy-image:
	docker image rm ${IMAGE_NAME}

kill:
	docker kill ${CONTAINER_NAME}

run:
	docker run --env-file=./.env/.env.docker -t -i --rm -p 8080:8080 --name ${CONTAINER_NAME} ${IMAGE_NAME} 

start:
	docker start ${CONTAINER_NAME}

stop:
	docker stop ${CONTAINER_NAME}

# ----------------------------------------------------------------------------
# Self-Documented Makefile
# ref: http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
# ----------------------------------------------------------------------------
help:						## (DEFAULT) This help information
	@echo ====================================================================
	@grep -E '^## .*$$'  \
		$(MAKEFILE_LIST)  \
		| awk 'BEGIN { FS="## " }; {printf "\033[33m%-24s\033[0m \n", $$2}'
	@echo
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$'  \
		$(MAKEFILE_LIST)  \
		| awk 'BEGIN { FS=":.*?## " }; {printf "\033[36m%-24s\033[0m %s\n", $$1, $$2}'  \
#		 | sort
.PHONY: help
.DEFAULT_GOAL := help
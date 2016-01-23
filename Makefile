current_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
clean:
	@rm -rf ./node_modules
install: clean
	@npm install
status:
	@${npm_bin}/pm2 status
deploy:
	@${npm_bin}/pm2 start deploy.json
docker:
	@docker-compose up
jshint:
	@${npm_bin}/jshint .
.PHONY: test

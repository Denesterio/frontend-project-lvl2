install:
	npm ci
gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
test:
	npm test

.PHONY: test
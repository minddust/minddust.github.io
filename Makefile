gem:
	sudo gem install jekyll

npm:
	npm install

bower:
	./node_modules/.bin/bower install

gulp:
	./node_modules/.bin/gulp clean
	./node_modules/.bin/gulp

jekyll:
	jekyll build

update: gulp jekyll

full: gem npm bower gulp jekyll

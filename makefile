build:
	docker build -t tika .
	
run:
	docker run -it -p 3000:3000 --rm tika
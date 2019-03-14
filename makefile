IMAGE_NAME = "ded/tika"
BUILD_NUMBER = "N/A"

build:
	docker build -t tika .
	
run:
	docker run -it -p 3000:3000 --rm tika

release: build
	chmod +x ./scripts/push_container_image.sh && ./scripts/push_container_image.sh $(IMAGE_NAME) $(BUILD_NUMBER)
	chmod +x ./scripts/update_mainfests.sh && ./scripts/update_mainfests.sh $(IMAGE_NAME) $(BUILD_NUMBER)
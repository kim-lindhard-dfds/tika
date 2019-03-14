IMAGE_NAME=${1}
BUILD_NUMBER=${2}

git clone git@github.com:dfds/tika-manifests.git manifests

cd manifests

git config --local user.email "AzureDevOps@dfds.cloud"
git config --local user.name "Azure DevOps"

make release IMAGE_NAME=$IMAGE_NAME BUILD_NUMBER=$BUILD_NUMBER

git add -A
git commit -m "make release for build $BUILD_NUMBER"
git pull --rebase
git push
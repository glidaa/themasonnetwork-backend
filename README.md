87d20ce947664190842c86b1a342b974
git add .
git commit -m "first commit"
git push -u origin main
SAM
sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket themasonnetwork-backend --region us-east-1

sam deploy --template-file packaged.yaml --stack-name themasonnetwork-backend --capabilities CAPABILITY_IAM

sam deploy --template-file /Users/michaelcastleman/Documents/TheMasonNetwork.com/backend/packaged.yaml --stack-name TheMasonNetworkNewsApp --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM --region us-east-1

sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket themasonnetwork-backend --region us-east-1

sam deploy --template-file /Users/michaelcastleman/Documents/TheMasonNetwork.com/backend/packaged.yaml --stack-name TheMasonNetworkNewsApp --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM --region us-east-1

ap region
sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket themasonnetwork-backend --region ap-southeast-2


sam deploy --template-file packaged.yaml --stack-name TheMasonNetworkNewsApp --capabilities CAPABILITY_IAM --region ap-southeast-2

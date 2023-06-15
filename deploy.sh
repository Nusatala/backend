cp .env dockerenv
gcloud builds submit --tag asia-southeast2-docker.pkg.dev/nusatala-team-project/nusatala-backend-app/express-backend
gcloud run deploy express-backend --port=8080 --image=asia-southeast2-docker.pkg.dev/nusatala-team-project/nusatala-backend-app/express-backend 

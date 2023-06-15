# Nusatala Backend Projects
## To start a project
1. Copy .env.example file and rename it to .env  
2. Fill that env with it's value
3. Install all dependencies, type:
    ```
    npm install
    ```
4. Create google cloud service account and add cloud storage admin role
5. Generate json key file from that account
6. Put the json key file to this project and rename it to "service-key.json"
7. To run this project, type:
    ```
    npm start
    ```
8. Run a migration
    ```
    npx prisma migrate dev --name init
    ```
9. Run a seeder
    ```
    npx prisma db seed
    ```
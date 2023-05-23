# Nusatala Backend Projects
## To start a project
1. Copy .env.example file and rename it to .env  
2. Fill that env with it's value
3. Install all dependencies, type:
    ```
    npm install
    ```
4. To run this project, type:
    ```
    npm start
    ```
5. Run a migration
    ```
    npx prisma migrate dev --name init
    ```
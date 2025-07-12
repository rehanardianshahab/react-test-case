# React Test Case - Clean Code Architecture  

## Environment Information  

- **Node.js Version**: 20.13.1  
- **npm Version**: 10.5.2  
- **React Version**: 18.0.0  
- **Plugins or Library Used**:  
    - `@vitejs/plugin-react`: For enhanced React support in Vite.  
    - `ant-design`: For UI components and design system.  

## Getting Started  

### Running the Application  

1. Clone the repository:  
    ```bash  
    git clone https://github.com/your-repo/react-test-case.git  
    cd react-test-case/clean-code-arch  
    ```  

2. Install dependencies:  
    ```bash  
    npm install  
    ```  

3. Create a `.env` file based on `env.example`:  
    ```bash  
    cp env.example .env  
    ```  

4. Fill in the `.env` file with the following variables:  
    ```plaintext  
    VITE_APIKEY=<your_api_key_from_newsapi.org>  
    ```  

5. Start the application:  
    ```bash  
    npm run dev  
    ```  

### Running Tests  

1. Run all tests:  
    ```bash  
    npm test  
    ```  

2. Specific tests included:  
    - **Home Page Test**: Verifies the functionality of the home page.
    - **Login Page Test**: Tests the login functionality and form validation.

### Notes  

- Ensure all required environment variables are correctly set in `.env`.
- Tests are written using Jest and React Testing Library.

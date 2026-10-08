
```markdown
# AuthApp 🔐

> Secure Identity. Seamless Access.

AuthApp is a full-stack authentication and authorization platform built with
**Spring Boot, Spring Security, JWT, OAuth2, MySQL, React, TypeScript, and Docker**.

The project focuses on secure identity management, token-based authentication,
role-based authorization, OAuth2 integration, user management, and protected
REST APIs.

---

## 🚀 Features

### Authentication

- JWT-based authentication
- Access token and refresh token flow
- OAuth2 login integration
- Secure password hashing
- Token expiration and renewal
- Logout and session handling

### Authorization

- Role-Based Access Control (RBAC)
- Protected REST APIs
- Spring Security integration
- Authentication and authorization handling
- Secure authentication filters

### User Management

- User registration
- User login
- Profile management
- Role management
- Account verification
- Password reset
- Email verification

### Backend Engineering

- RESTful API design
- DTO-based request/response handling
- Bean Validation
- Centralized exception handling
- JPA/Hibernate persistence
- Environment-based configuration
- OpenAPI documentation
- Layered backend architecture

### Infrastructure

- Dockerized backend
- Dockerized frontend
- MySQL container
- Docker Compose orchestration
- GitHub Actions support

---

## 🏗️ Architecture

AuthApp follows a modular full-stack architecture centered around a
Spring Boot backend.

```text
                         ┌──────────────────────┐
                         │     React Client     │
                         │ TypeScript + Vite    │
                         └──────────┬───────────┘
                                    │
                              HTTP / REST
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Spring Boot API   │
                         │                      │
                         │  Spring Security     │
                         │  JWT Authentication  │
                         │  OAuth2              │
                         │  User Management     │
                         │  Validation          │
                         │  REST Controllers    │
                         └──────────┬───────────┘
                                    │
                              JPA / Hibernate
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │        MySQL         │
                         └──────────────────────┘

                              Docker Compose
```

---

## 🔐 Authentication Flow

The application uses Spring Security to protect backend resources.

A simplified authentication flow is:

```text
User
 │
 │ Login credentials
 ▼
Spring Boot API
 │
 ├── Validate credentials
 │
 ├── Authenticate user
 │
 └── Generate authentication tokens
 │
 ▼
Client
 │
 │ Access Token
 ▼
Protected REST API
 │
 ▼
Spring Security
 │
 ├── Validate token
 ├── Authenticate request
 └── Check authorization
 │
 ▼
Controller
```

OAuth2 login is also supported for external identity-provider authentication.

---

## 🛠️ Tech Stack

### Backend

- Java 25
- Spring Boot 4
- Spring Security
- Spring Data JPA
- Hibernate
- JWT / JJWT
- OAuth2 Client
- Bean Validation
- ModelMapper
- Springdoc OpenAPI
- Maven

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- Zustand
- Framer Motion
- Radix UI
- Lucide React

### Database

- MySQL 8.4

### DevOps & Infrastructure

- Docker
- Docker Compose
- GitHub Actions

---

## 📂 Project Structure

```text
auth_app/
│
├── auth-app-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   │
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── pom.xml
│   └── .env.example
│
├── auth-app-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed:

- Java 25
- Maven
- Node.js
- Docker Desktop
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/BrajeshPrajapati003/auth_app.git
cd auth_app
```

---

### 2. Configure Environment Variables

Create a `.env` file inside:

```text
auth-app-backend/.env
```

Example:

```env
SPRING_PROFILES_ACTIVE=prod

JWT_SECRET=replace-with-a-secure-random-secret
JWT_ISSUER=auth-app
JWT_EXPIRATION=86400000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

FRONTEND_URL=http://localhost:5173
```

> **Never commit real secrets or credentials to Git.**

For convenience, the repository should provide an `.env.example`
file containing placeholder values.

---

## 🐳 Running with Docker Compose

The backend Docker Compose configuration starts the application infrastructure
along with the backend and frontend.

From the backend directory:

```bash
cd auth-app-backend
```

Build and start the containers:

```bash
docker compose up --build
```

To run in detached mode:

```bash
docker compose up --build -d
```

To stop the application:

```bash
docker compose down
```

---

## 🌐 Application

Once the containers are running:

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://localhost:8080
```

### MySQL

```text
localhost:3306
```

---

## 📚 API Documentation

The backend includes OpenAPI/Swagger support through Springdoc.

When the backend is running, API documentation can be accessed through:

```text
http://localhost:8080/swagger-ui/index.html
```

The documentation provides an interactive view of the available REST APIs.

---

## 🔑 API Capabilities

### Authentication

- User registration
- User login
- Token refresh
- Logout
- OAuth2 login
- Password reset
- Email verification

### User Management

- User profile
- Profile updates
- Role management
- Session management

### Security

- JWT authentication
- OAuth2 authentication
- Role-based authorization
- Protected endpoints
- Authentication filters
- Secure password storage

---

## 🧪 Testing

The backend includes Spring Boot testing support for:

- JPA testing
- Spring Security testing
- Validation testing
- Web/MVC testing

Run the backend test suite with:

```bash
cd auth-app-backend
mvn test
```

---

## 🧠 Engineering Concepts

AuthApp demonstrates several important backend engineering concepts:

- Authentication vs Authorization
- JWT authentication lifecycle
- Refresh token flow
- OAuth2 authentication
- Role-Based Access Control
- Spring Security filter chain
- Stateless authentication
- DTO pattern
- Request validation
- Exception handling
- JPA/Hibernate persistence
- REST API design
- Secure configuration
- Dockerized application deployment
- Frontend-backend integration

---

## 🔒 Security Considerations

Authentication-related secrets should always be provided through environment
variables or a secure secret-management system.

Do not commit:

```text
.env
JWT secrets
OAuth client secrets
Database passwords
API keys
```

The repository's `.gitignore` excludes environment files from version control.

For production deployments, secrets should be managed using an appropriate
secret-management solution rather than hardcoded configuration.

---

## 📈 Future Improvements

Potential improvements include:

- Redis-based token blacklisting
- Two-Factor Authentication (2FA)
- Kubernetes deployment
- Expanded CI/CD pipeline
- Monitoring and centralized logging
- API rate limiting
- API analytics dashboard
- Distributed tracing
- Spring AI integration

---

## 🤝 Contributing

Contributions, improvements, and suggestions are welcome.

### Contribution Workflow

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Make your changes
4. Add or update tests
5. Commit your changes

```bash
git commit -m "Add your change"
```

6. Push the branch

```bash
git push origin feature/your-feature
```

7. Open a Pull Request

Please keep contributions focused and follow the existing project structure
and coding conventions.

---

## 📄 License

This project is currently intended for educational and portfolio purposes.

---

## 👨‍💻 Author

**Brajesh Prajapati**

Java Backend Developer | Spring Boot | Spring Security | Full-Stack Development

GitHub:  
https://github.com/BrajeshPrajapati003


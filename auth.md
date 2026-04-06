The Firebase Google Auth in this project is implemented as a Full-Stack solution. It is not just a "simple frontend" implementation; the backend actively validates the authentication status for every request.

Here are the specific details of how it works:

1. Frontend Implementation (frontend/src/firebase.js & api.js)
Initialization: The frontend uses the Firebase SDK to initialize the application with your project's credentials (found in firebase.js).
Authentication: It uses signInWithPopup with googleProvider to handle the Google login flow.
Token Interception: In api.js, the frontend automatically fetches a fresh ID Token from Firebase for every API request:
javascript
if (auth.currentUser) {
  token = await auth.currentUser.getIdToken();
}
// ... then added to headers
headers: { 'Authorization': `Bearer ${token}` }
2. Backend Implementation (backend/src/...)
OAuth2 Resource Server: The backend is configured using Spring Security as an OAuth2 Resource Server in SecurityConfig.java. This means it expects a valid JWT (JSON Web Token) in the Authorization header.
JWT Validation: In application.properties, the backend is configured to validate these tokens using Google's public keys. This ensures that the token is authentic and hasn't been tampered with:
properties
spring.security.oauth2.resourceserver.jwt.issuer-uri=https://securetoken.google.com/research-paper-tracking-system
User Management: The UserService.java includes a getOrCreateUser method. When a user logs in via Google, the backend can extract their email from the validated token and either find the user in the database or create a new one automatically.
Summary
Component	Responsibility
Frontend	Handles the UI for Google Login and fetches the ID Token.
Network Layer	Injects the token into every API call's headers.
Backend	Intercepts and validates the token before allowing access to any API endpoint.
This "Full-Stack" approach is highly secure because even if someone bypasses the frontend, they cannot access the backend data without a valid, Google-signed token.


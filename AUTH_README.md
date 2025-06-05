# Authentication System

This project uses Lucia for session-based authentication with the following features:

## Features

- **Session-based authentication** using secure tokens
- **Password hashing** with Argon2
- **SQLite database** with Drizzle ORM
- **User registration and login**
- **Protected routes** with automatic redirects
- **Session management** with automatic renewal

## Test User

A demo user is available for testing:

- **Username**: `joshua`
- **Password**: `password123`

## Usage

### 1. Start the development server

```bash
pnpm dev
```

### 2. Navigate to authentication pages

- Login: `/auth/lucia/login`
- Dashboard: `/auth/lucia` (requires authentication)
- Protected content: `/protected` (requires authentication)

### 3. Test the authentication flow

1. Go to `/auth/lucia/login`
2. Use the test credentials above or create a new account
3. After login, you'll be redirected to the dashboard
4. Try accessing `/protected` to see route protection in action
5. Log out from the dashboard

## Architecture

### Database Schema

- `user` table: stores user credentials and profile info
- `session` table: manages authentication sessions

### Authentication Flow

1. User submits login form
2. Server validates credentials with Argon2
3. Session token is generated and stored
4. Cookie is set with session token
5. Subsequent requests validate the session token
6. Sessions auto-renew when near expiration

### Protected Routes

Routes can be protected by checking `locals.user` in the `+page.server.ts` file:

```typescript
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/auth/lucia/login');
	}
	return { user: locals.user };
};
```

## Security Features

- Password hashing with Argon2 (industry standard)
- Secure session tokens with SHA256 hashing
- HTTP-only cookies for session storage
- Automatic session expiration and renewal
- CSRF protection through SvelteKit's built-in mechanisms

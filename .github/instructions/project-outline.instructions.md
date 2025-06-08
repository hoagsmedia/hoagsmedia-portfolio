# Project Context Instructions

## Technology Stack

- **Package Manager**: pnpm
- **Framework**: Svelte v5 (using runes syntax)
- **Component Library**: shadcn-svelte
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Database**: Drizzle ORM
- **Authentication**: Lucia
- **Serverless PostgreSQL Database**: Neon

## Project Structure

- `/src/lib/server/` - Server-side utilities and database code
- `/src/lib/server/db/` - Database schema and services
- `/src/lib/server/auth.ts` - Authentication utilities
- `/src/routes/` - SvelteKit routes and pages

## Code Conventions

- Use TypeScript for all files
- Follow Svelte 5 runes syntax (`$props()`, `$state()`, etc.)
- Use Tailwind classes for styling
- Import shadcn-svelte components when needed
- Use Drizzle ORM for database operations
- Follow server/client separation patterns

## Authentication Pattern

- Uses Lucia for session management
- UserService class for database operations
- Session tokens with SHA256 hashing
- Cookie-based authentication (`auth-session`)

## Common Patterns

- Server load functions return user data
- Form actions use `use:enhance` directive
- Database queries use Drizzle with `eq()` for filtering
- Error handling with SvelteKit's `fail()` and `redirect()`

## Dependencies to Consider

- `@node-rs/argon2` for password hashing
- `@oslojs/crypto` and `@oslojs/encoding` for session management
- `drizzle-orm` for database operations

## AI Coding Assistant Guidelines

- **Role**: The AI behaves as a senior developer and technical lead with up-to-date expertise in SvelteKit 2, Svelte 5 (Runes-based reactivity), TailwindCSS, and common ecosystem tools (e.g., Supabase, Superforms, Formsnap, Bits UI).
- **Tone**: Direct, constructive, and technically grounded. No sugarcoating, no blind affirmation.
- **Responsibility**: Provide working code samples, enforce current best practices, and avoid hallucinated features.
- **Mindset**: Acts like a reliable team lead—reviewing, refactoring, and guiding, not just generating code.

## How The AI Should Behave

- **Validate code examples** against official documentation and known behavior
- **Prioritize maintainability** and minimalist TailwindCSS design principles
- **Use Runes syntax for Svelte 5**—always. No legacy `$:` or store auto-subscriptions
- **Avoid magic**. Explain how/why code works, with brief inline comments when helpful
- **Emphasize clarity and simplicity**. If something can be done in 5 lines instead of 15, refactor it

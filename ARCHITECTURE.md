# Architecture

## Single full-stack Next.js application

The public website, administrator dashboard and backend APIs live in one App Router project. This keeps deployment simple while preserving clear boundaries:

- `src/app/(site)` public pages
- `src/app/admin` administration interface
- `src/app/api` route-handler backend
- `src/models` Mongoose schemas
- `src/lib` database, validation, authentication and data access
- `src/components` reusable public, booking and admin UI

## Data model

- `AdminUser`: hashed administrator credentials and role
- `TourPackage`: published/draft packages, pricing, content and itinerary
- `Bike`: fleet inventory, public availability, pricing and features
- `Booking`: one collection for TOUR, AIRPORT and BIKE requests, with a shared status/payment workflow

## Security boundary

- Admin UI routes are checked by `src/proxy.ts`.
- Every administrator API route independently verifies the HTTP-only JWT cookie.
- Passwords use bcrypt hashing and are never returned by APIs.
- Zod validates public and admin input before database writes.
- Public booking creation never accepts status or payment fields from the client.

# GH Tours & Bike Rental

A complete full-stack Next.js project for a Sri Lankan travel company. The same Next.js application contains:

- Animated public travel website
- Private tour package catalogue and booking requests
- Airport hire / taxi booking flow
- Motorbike and scooter rental catalogue
- Secure administrator login and dashboard
- Tour package CRUD
- Bike fleet CRUD and availability management
- Booking acceptance, workflow, payment status and internal notes
- MongoDB Atlas database using Mongoose
- Responsive Sri Lankan cultural visual system with local SVG artwork

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- MongoDB Atlas + Mongoose
- JWT session cookie with `jose`
- Password hashing with `bcryptjs`
- Zod request validation
- Custom responsive CSS and IntersectionObserver reveal animations

## 1. Install

```bash
npm install
```

## 2. Configure MongoDB Atlas

1. Create an Atlas project and cluster.
2. Create a database user.
3. Add your current IP address to Atlas Network Access. For Vercel deployment, configure access according to your security policy.
4. Copy the Node.js connection string.
5. Duplicate `.env.example` as `.env.local` and replace the placeholders.

```bash
cp .env.example .env.local
```

A connection string should include the database name:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/gh_tours?retryWrites=true&w=majority
```

If the database password contains characters such as `@`, `#`, `/`, `?` or `%`, URL-encode the password.

## 3. Create the first admin and sample data

Set strong values for these entries in `.env.local`:

```env
AUTH_SECRET=at-least-32-random-characters
ADMIN_SEED_NAME=GH Administrator
ADMIN_SEED_EMAIL=admin@ghtours.lk
ADMIN_SEED_PASSWORD=Use-A-Strong-Password
```

Run:

```bash
npm run seed
```

The seed command is safe to run again. It updates or inserts the admin, three sample tours and three sample bikes by email/slug.

## 4. Start development

```bash
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`

Without `MONGODB_URI`, public pages display built-in demo tours and bikes so the design can be previewed. Bookings and admin database operations require MongoDB.

## Main routes

### Public

- `/` Home
- `/tours` Tour catalogue
- `/tours/[slug]` Tour details and booking modal
- `/airport-hire` Airport taxi request
- `/bikes` Bike fleet and rental modal
- `/about` Company story
- `/contact` Custom journey request

### Admin

- `/admin` Dashboard metrics
- `/admin/bookings` Booking workflow
- `/admin/tours` Package management
- `/admin/bikes` Fleet management

### API

- `POST /api/bookings`
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET|POST /api/admin/tours`
- `PATCH|DELETE /api/admin/tours/[id]`
- `GET|POST /api/admin/bikes`
- `PATCH|DELETE /api/admin/bikes/[id]`
- `GET /api/admin/bookings`
- `PATCH /api/admin/bookings/[id]`

## Booking workflow

Public requests begin as `PENDING` and `UNPAID`.

Admin status options:

- `PENDING`
- `CONFIRMED`
- `IN_PROGRESS`
- `COMPLETED`
- `CANCELLED`

Payment options:

- `UNPAID`
- `PARTIAL`
- `PAID`
- `REFUNDED`

The admin can save the final confirmed USD amount and internal operational notes.

## Images

The project includes original local SVG illustrations in `public/images`, so it works without third-party image hosts. To use photography:

1. Add optimised WebP/AVIF files to `public/images`, or host images on Cloudinary/S3.
2. Enter `/images/filename.webp` or the public URL in the admin image field.
3. For direct upload from the dashboard, add a managed media service such as Cloudinary rather than storing large binary images in MongoDB documents.

## Production deployment

Recommended deployment: Vercel + MongoDB Atlas.

Add all `.env.local` variables to the Vercel project environment settings, change `NEXT_PUBLIC_SITE_URL` to the production domain, run the seed against the production database once, then deploy.

Before launch:

- Replace sample business contact details.
- Replace sample package prices and policies.
- Add final privacy/terms content.
- Use a strong unique admin password and `AUTH_SECRET`.
- Restrict MongoDB Atlas network access appropriately.
- Add backups and Atlas monitoring.
- Add transactional email/WhatsApp integration when required.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

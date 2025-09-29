# CaseCobra 📱🛒

CaseCobra is a full-stack e-commerce web application for selling custom mobile cases.  
Users can upload their own images, customize the design, and order their personalized phone case.

## 🚀Overview

### The Process

[x] Set up the DEV environment
[x] Make a beautiful Landing page with animations
[x] Add authentication system with Clerk
[x] Create a login and sign up pages with Clerk elements with shadCN
[x] Configure upload page and upload functionality with uploadthing
[x] Configure design page with React Rnd to customize the image on the phone
[x] Create our summary page with create checkout session logic
[x] Integrate payment with stripe
[x] Create Auth call back page for saving progress
[x] Create our stripe web hook
[x] Write thankyou email with react components and send it with nodemailer
[x] Admin dashboard

### Screen Shoots

[landing](./public/website-screen-shoots/hero.png)
[sign-in](./public//website-screen-shoots//sign-in.png)
[upload](./public//website-screen-shoots/upload-functionality.png)
[design](./public//website-screen-shoots//design-case.png)
[preview](./public/website-screen-shoots/phone-preview.png)
[checkout](./public//website-screen-shoots//checkout-session.png)
[thankyou](./public/website-screen-shoots/thank-you.png)
[dashboard](./public/website-screen-shoots/dashboard.png)

### Links

- Solution URL: [here](https://casecobra-abdalla.vercel.app)
- GitHub Repo: [here](https://github.com/abdallemad/casecobra-abdalla)

## My Process

### Build with

**Frontend**

- Next.js 15 (App Router)
- React
- TailwindCSS
- ShadCN/UI
- Magic UI

**Backend**

- Next.js API Routes (or separate Node/Express server)
- Mongodb (via Prisma ORM)
- Upload thing (for image upload)
- Stripe (for payments)
- Clerk (for user authentication)
- Server Actions (RPC)

**Others**

- TypeScript
- React Query (state management & API call)
- Deployment: Vercel (frontend)

### 📂 Project Structure

```md
src/
├── app/
│ ├── (auth)/ # Login / Register
│ ├── dashboard/ # admin dashboard
│ ├── configure
| | ├── upload/ # upload user case image
| | ├── design/ # Customize the image and case options
| | └── preview/ # Preview the design and create a payment session
│ ├── thank-you/
│ ├── auth-callback/
│ ├── api/
| | ├── uploadthing/ # upload backend functionality
| | └── wephook/ # stripe webhoook
│ └── layout.tsx # Root layout
│
├── components/ # Reusable UI components
│ ├── ui/ # Shadcn components
│ ├── globals/
│ ├── landing/
│ ├── magicui/
│ ├── login-dialog.tsx
│ ├── order-review-email.tsx
│ └── phone-preview.tsx
│
├── hooks/ # Frontend logic
│ ├── use-auth-callback.ts # create or check for the user in our db
│ ├── use-design-configurator.ts # customize image and case options logic
│ ├── use-get-order-status.ts # get order status for check for if its paid or not
│ ├── use-preview-case.ts # create the checkout session
│ └── use-upload-configure.ts # upload image logic
|
└── actions/ # backend (RPCs)
├── change-order-status-action.ts # for admin dashboard change the order status
├── create-checkout-session-action.ts # for create a checkout session
├── design-config-action.ts # update the configure record with new data
├── get-auth-status-action.ts # Create or find the user
└── get-payment-status-action # check for paid status in db
```

---

## ⚡ Getting Started

1. Clone the repository

```bash
git clone https://github.com/abdallemad/casecobra-abdalla.git
cd casecobra
```

2. Install dependencies

```bash
npm i -g pnpm
pnpm install
```

3. Setup Environment variables in /.env

```ini
A_EMAIL="Your admin Email"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="clerk public key"
CLERK_SECRET_KEY="Clerk secret"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/auth-callback
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/auth-callback
UPLOADTHING_TOKEN="your upload thing token"
DATABASE_URL="data base url"
STRIPE_SECRET="Strip secret"
STRIPE_KEY="stripe public key"
NEXT_PUBLIC_SERVER_URL="localhost:3000 for dev and remote domain for deployment"
STRIPE_WEBHOOK_SECRET="you stripe webhook secret"
G_SECRET="your gmail secret for sending emails"
```

4. Run the development server

```bash
yarn dev
```

## 📖 Learning Goals

- How to create features with my self like login and register
- How to handle payment and webhooks
- Learning about RPC protocol and how it works
- Clean folder structure and best practice
## Author

- Website - [abdalla-emad](https://abdallahemad.vercel.app)
- Linked in - [@abdallaemda](https://www.linkedin.com/in/abdalla-emad-618b8b317/)
- Facebook - [@abdallaemad](https://www.facebook.com/profile.php?id=61572241092337)

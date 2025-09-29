# CaseCobra 📱🛒
![hero](./public/website-screen-shoots/hero.png)
![design](./public//website-screen-shoots/design-case.png)
**CaseCobra** is a full-stack e-commerce web app for selling customizable mobile cases.  
Users can upload images, adjust their design on a phone mockup, and complete orders via Stripe.

---

## ✅ Live & Repo

- **Live demo:** https://casecobra-abdalla.vercel.app  
- **Repository:** https://github.com/abdallemad/casecobra-abdalla

---

## 💡 Key Features

- Upload custom images for phone cases (UploadThing)
- Visual design/configurator (drag, scale, rotate using React Rnd)
- Phone preview and checkout flow (Stripe)
- Authentication and user management with Clerk
- Admin dashboard for order management
- Email notifications (Nodemailer)
- Webhook to handle Stripe events
- Clean UI with TailwindCSS + ShadCN components

---

## 🛠 Tech Stack

**Frontend**
- Next.js (App Router)
- React + TypeScript
- TailwindCSS
- shadcn/ui, Magic UI

**Backend / Services**
- Next.js API routes / Server Actions (RPC-style)
- MongoDB (via Prisma)
- UploadThing (file uploads)
- Stripe (payments & webhooks)
- Clerk (authentication)
- Nodemailer (emails)

**Other**
- React Query (data fetching & cache)
- Vercel (deployment)

---

## 📁 Project Structure (summary)

```
src/
├── app/
│   ├── (auth)/                # Login / Register (Clerk)
│   ├── dashboard/             # Admin dashboard
│   ├── configure/
│   │   ├── upload/            # Upload user images
│   │   ├── design/            # Customize image & options
│   │   └── preview/           # Preview and create checkout session
│   ├── thank-you/
│   ├── auth-callback/
│   ├── api/
│   │   ├── uploadthing/       # upload backend endpoints
│   │   └── webhook/           # stripe webhook
│   └── layout.tsx
│
├── components/
│   ├── ui/                    # shared shadcn components
│   ├── landing/
│   ├── globals/
│   ├── magicui/
│   ├── login-dialog.tsx
│   ├── order-review-email.tsx
│   └── phone-preview.tsx
│
├── hooks/
│   ├── use-auth-callback.ts
│   ├── use-design-configurator.ts
│   ├── use-get-order-status.ts
│   ├── use-preview-case.ts
│   └── use-upload-configure.ts
│
└── actions/                    # server actions / RPCs
    ├── change-order-status-action.ts
    ├── create-checkout-session-action.ts
    ├── design-config-action.ts
    ├── get-auth-status-action.ts
    └── get-payment-status-action.ts
```

---

## 🚀 Quick Start (local)

1. **Clone**

```bash
git clone https://github.com/abdallemad/casecobra-abdalla.git
cd casecobra-abdalla
```

2. **Install (recommended: pnpm)**

```bash
npm i -g pnpm
pnpm install
```

3. **Environment**

Create a `.env` file in project root (or copy `.env.example`) and set these variables:

```ini
A_EMAIL="your-admin-email@example.com"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/auth-callback"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/auth-callback"
UPLOADTHING_TOKEN="uploadthing_token"
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/dbname"
STRIPE_SECRET="sk_live_..."
NEXT_PUBLIC_STRIPE_KEY="pk_live_..."
NEXT_PUBLIC_SERVER_URL="http://localhost:3000" # or deployed domain
STRIPE_WEBHOOK_SECRET="whsec_..."
G_SECRET="your_gmail_app_password_or_secret_for_nodemailer"
```

> ⚠️ **Note:** keep secrets out of source control. Use environment variables in your deployment provider (Vercel, etc).

4. **Run locally**

```bash
pnpm dev
# or
npm run dev
```

5. **Migrations / Prisma**

If you use Prisma, run:

```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
```

---

## 📸 Screenshots

- [hero](./public/website-screen-shoots/hero.png)  
- [Sign in](./public/website-screen-shoots/sign-in.png)  
- [upload](./public/website-screen-shoots/upload-functionality.png)
- [Design](./public/website-screen-shoots/design-case.png)  
- [Preview](./public/website-screen-shoots/phone-preview.png)  
- [Checkout](./public/website-screen-shoots/checkout-session.png)  
- [Thankyou](./public/website-screen-shoots/thank-you.png)
- [Dashboard](./public/website-screen-shoots/dashboard.png)

---

## ✅ What I learned / Goals

- Building auth flows with Clerk
- Handling file uploads and client-side editing (UploadThing + React Rnd)
- Implementing Stripe checkout and webhook handling
- Organizing a full-stack app with Next.js (App Router) and server actions
- Writing transactional emails with React components + Nodemailer

---

## 🤝 Contributing

If you want to contribute, open an issue or submit a PR. Please describe the change and add screenshots for UI updates.

---

## 📜 License

This project is released under the MIT License. See `LICENSE` for details.

---

## 🧑‍💻 Author

Abdalla Emad — https://abdallahemad.vercel.app  
GitHub: https://github.com/abdallemad

LinkedIn: https://www.linkedin.com/in/abdalla-emad-618b8b317/

---

## Contact / Support

If you find a bug or want a feature, please open an issue in the repo or contact me via LinkedIn.

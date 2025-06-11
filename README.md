# Xpense – AI-Powered Finance Tracker

Xpense is an intelligent, AI-driven finance tracker designed to simplify your personal financial management. It helps you stay on top of your spending with features like automated receipt scanning, real-time budget alerts, smart transaction categorization, and personalized financial insights.

##  Features

-  **AI Receipt Scanning**: Upload or snap a picture of your receipt, and let AI extract and categorize your expenses automatically.
-  **Smart Transaction Management**: Automatically track and organize your expenses across different categories with real-time updates.
-  **AI-Driven Insights**: Get personalized suggestions and trends based on your spending habits to make better financial decisions.
-  **Budget Alerts**: Set spending limits and receive email notifications when you're close to or exceed your budget.
-  **Interactive Dashboards**: Visualize your finances using responsive, user-friendly charts and graphs.

##  Tech Stack

- **Frontend**: React.js, Next.js, Tailwind CSS, Shadcn UI  
- **Backend**: Supabase, Prisma  
- **Authentication**: Clerk  
- **Event Handling**: Inngest

##  Getting Started
1. Clone the repo:
   ```bash
   git clone https://github.com/Vanshiitp/Xpense.git
   cd Xpense
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```env
   DATABASE_URL=
   DIRECT_URL=

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

   GEMINI_API_KEY=
   RESEND_API_KEY=
   ```

4. Start the dev server:
   ```bash
     npm run dev
     ```
  
Open `http://localhost:3000` to view the app.


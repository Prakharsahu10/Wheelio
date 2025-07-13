# 🚗 Wheelio

<div align="center">
  
![Wheelio Logo](./public/logo.png)

### Find Your Dream Car with Wheelio

_A modern, full-stack car marketplace platform built with Next.js 15_

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Prisma](https://img.shields.io/badge/Prisma-6.11.0-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](https://wheelio-demo.vercel.app) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started)

</div>

---

## 🌟 Features

### 🏠 **For Users**

- **🔍 Smart Car Search** - Advanced filtering by make, model, price, fuel type, and more
- **💝 Save Favorites** - Bookmark cars you love for easy access
- **📅 Test Drive Booking** - Schedule test drives with preferred dates and times
- **📱 Responsive Design** - Seamless experience across all devices
- **🔐 Secure Authentication** - Powered by Clerk for reliable user management

### 👨‍💼 **For Admins**

- **📊 Admin Dashboard** - Comprehensive management interface
- **🚗 Car Management** - Add, edit, and manage car listings
- **📋 Test Drive Management** - Track and manage test drive bookings
- **⚙️ Settings Panel** - Configure platform settings and preferences

### 🎨 **Design & UX**

- **🌙 Dark/Light Mode** - Theme switching for user preference
- **🎭 Modern UI Components** - Built with Radix UI and shadcn/ui
- **⚡ Fast Performance** - Optimized with Next.js 15 and Turbopack
- **🛡️ Security** - Protected with Arcjet security middleware

---

## 🛠️ Tech Stack

<table>
<tr>
<td>

**Frontend**

- Next.js 15.3.4
- React 19.0.0
- JavaScript (ES6+)
- Tailwind CSS
- Radix UI
- Lucide React Icons
- React Hook Form
- Zod Validation

</td>
<td>

**Backend**

- Next.js API Routes
- Prisma ORM
- PostgreSQL
- Supabase Storage
- Google Generative AI
- Server Actions

</td>
<td>

**Authentication & Security**

- Clerk Authentication
- Arcjet Security
- JWT Tokens
- Role-based Access

</td>
</tr>
</table>

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database
- **Git**

### 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Prakharsahu10/Wheelio.git
   cd Wheelio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Database
   DATABASE_URL="your_postgresql_connection_string"
   DIRECT_URL="your_direct_database_url"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
   SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"

   # Google AI
   GOOGLE_GENERATIVE_AI_API_KEY="your_google_ai_api_key"

   # Arcjet
   ARCJET_KEY="your_arcjet_key"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📁 Project Structure

```
Wheelio/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Admin routes
│   ├── (auth)/            # Authentication routes
│   ├── (main)/            # Main application routes
│   └── api/               # API routes
├── actions/               # Server actions
├── components/            # React components
│   ├── ui/                # UI components (shadcn/ui)
│   └── ...                # Feature components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── prisma/                # Database schema & migrations
├── public/                # Static assets
└── ...                    # Config files
```

---

## 🔐 Environment Setup

<details>
<summary><strong>🔑 Required Environment Variables</strong></summary>

| Variable                            | Description                  | Required |
| ----------------------------------- | ---------------------------- | -------- |
| `DATABASE_URL`                      | PostgreSQL connection string | ✅       |
| `DIRECT_URL`                        | Direct database connection   | ✅       |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key             | ✅       |
| `CLERK_SECRET_KEY`                  | Clerk secret key             | ✅       |
| `NEXT_PUBLIC_SUPABASE_URL`          | Supabase project URL         | ✅       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`     | Supabase anon key            | ✅       |
| `SUPABASE_SERVICE_ROLE_KEY`         | Supabase service role        | ✅       |
| `GOOGLE_GENERATIVE_AI_API_KEY`      | Google AI API key            | ⚠️       |
| `ARCJET_KEY`                        | Arcjet security key          | ⚠️       |

</details>

---

## 📱 Screenshots

<details>
<summary><strong>🖼️ Application Screenshots</strong></summary>

_Screenshots will be added here_

</details>

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Prakhar Sahu**

- GitHub: [@Prakharsahu10](https://github.com/Prakharsahu10)
- LinkedIn: [Prakhar Sahu](https://linkedin.com/in/prakharsahu10)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.dev/) for authentication
- [Prisma](https://prisma.io/) for database management
- [Supabase](https://supabase.io/) for storage solutions
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://radix-ui.com/) for accessible components

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

Made with ❤️ by [Prakhar Sahu](https://github.com/Prakharsahu10)

</div>

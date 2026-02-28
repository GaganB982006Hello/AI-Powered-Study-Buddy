# Deployment Guide - AI-Powered Study Buddy

Follow these steps to deploy your application to **Vercel**.

## 1. Prerequisites
- A **GitHub/GitLab/Bitbucket** repository with your code.
- A **Google Gemini API Key**.
- A cloud-hosted **SQL Server** instance (e.g., Azure SQL, AWS RDS, or a self-hosted instance with a public IP).
  - *Note: Vercel cannot connect to a `localhost` SQL Server. Your database must be accessible over the internet.*

## 2. Vercel Configuration

### Environment Variables
Add the following variables in your Vercel Project Settings:

| Key | Value |
| :--- | :--- |
| `GEMINI_API_KEY` | Your Google Gemini API Key |
| `DATABASE_URL` | `sqlserver://<server>:<port>;database=<db>;user=<user>;password=<pass>;encrypt=true;trustServerCertificate=true` |

### Build Settings
Vercel will automatically detect Next.js. The `package.json` includes a `postinstall` script to generate the Prisma Client:
`"postinstall": "prisma generate"`

## 3. Deployment Steps
1. Push your code to your Git repository.
2. Import the project into Vercel.
3. Configure the Environment Variables.
4. Click **Deploy**.

## 4. Troubleshooting SQL Server on Vercel
- **Firewall**: Ensure your SQL Server firewall allows connections from Vercel's IP ranges (or allow all IPs `0.0.0.0/0` if secure).
- **Prisma**: If you see "Prisma Client not found", ensure `prisma generate` ran during the build (check Vercel build logs).

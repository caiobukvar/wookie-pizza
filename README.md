<p align="center">
<img src="./public/wookie-logo.svg" alt="Alt Text" width="400" height="400" />

</p>
<div align="center">
  <img src="./public/chewbacca.svg" alt="Alt Text" width="100" height="100" />

**Experimente o lado delicioso da Força na Wookie Pizza!**

</div>

# Wookie Pizza

Wookie Pizza is a project that allows users to create, customize and make pizza orders. Also, contains a point system for a pizza of the day, each day being a different flavor!

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (version 18.18.0)
- npm (version 10.2.5)
- PostgreSQL

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/wookie-pizza.git
```

2. **Navigate to the project directory:**

```bash
cd wookie-pizza
```

3. **Install dependencies:**

```bash
npm install
```

4. **Set up the database:**

Create a PostgreSQL database.
Configure the database connection in the .env file

5. **Run database migrations:**

```bash
npx prisma migrate dev
```

### Development Tools

1. **To start the development server:**

```bash
npm run dev
```

2. **To run Prisma Studio:**

```bash
npm run studio
```

### Production

1. **To build and start the production server:**

```bash
npm run build
npm start
```

### Technologies Used

- Next.js
- Chakra UI
- Prisma
- Redux
- PostgreSQL

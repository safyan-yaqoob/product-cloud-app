# Product Cloud App

A modern SaaS platform for managing products and subscriptions. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern dashboard with real-time analytics
- Product management with plans and pricing
- Customer management with subscription tracking
- Beautiful UI with dark mode support
- Responsive design for all devices

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Recharts](https://recharts.org/) - Composable charting library

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/product-cloud-app.git
   cd product-cloud-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                # Next.js app directory
│   ├── modules/       # Feature modules
│   │   ├── analytics/ # Analytics pages
│   │   ├── customers/ # Customer management
│   │   ├── dashboard/ # Dashboard pages
│   │   └── products/  # Product management
│   ├── layout.tsx     # Root layout
│   └── globals.css    # Global styles
├── components/        # Reusable components
│   └── ui/           # UI components
└── lib/              # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

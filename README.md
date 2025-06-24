# Artistry

A modern Next.js project with App Router, featuring Tailwind CSS, ShadCN UI, and comprehensive form validation.

## 🚀 Features

### Frontend Technologies
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ShadCN UI** components for consistent design

### Form Handling
- **React Hook Form** for efficient form management
- **Yup** for robust validation schemas
- **@hookform/resolvers** for seamless integration
- **TypeScript** integration for type-safe forms

## 📁 Project Structure

```
artistry/
├── components/           # Reusable components
│   └── example-form.tsx  # Example form with validation
├── data/                 # Data types and constants
│   └── sample-data.ts    # Sample data definitions
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Homepage
│   ├── components/      # ShadCN UI components
│   │   └── ui/          # UI component library
│   │       └── button.tsx
│   └── lib/             # Utility functions
│       └── utils.ts     # Common utilities
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── components.json      # ShadCN configuration
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Installed Packages

### Core Dependencies
- `next` - React framework
- `react` & `react-dom` - React library
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - Utility-first CSS framework
- `@tailwindcss/postcss` - Tailwind PostCSS plugin
- `tailwindcss-animate` - Animation utilities
- `class-variance-authority` - Component variant utilities
- `clsx` - Conditional className utility
- `tailwind-merge` - Tailwind class merging
- `lucide-react` - Icon library

### Form Handling
- `react-hook-form` - Form library
- `@hookform/resolvers` - Validation resolvers
- `yup` - Schema validation

## 🎨 ShadCN UI Setup

The project is configured with ShadCN UI using:
- **Style**: New York
- **Base Color**: Stone
- **CSS Variables**: Enabled
- **RSC**: Enabled for server components

### Adding New Components

```bash
npx shadcn@latest add [component-name]
```

## 📝 Form Validation Example

Check out `components/example-form.tsx` for a complete example of:
- React Hook Form integration
- Yup schema validation
- TypeScript type inference
- ShadCN UI components
- Error handling and display

## 🔧 Configuration Files

### `tailwind.config.js`
- Configured for ShadCN UI compatibility
- Custom color scheme with CSS variables
- Animation support
- Responsive design utilities

### `postcss.config.js`
- Tailwind CSS processing
- Autoprefixer for vendor prefixes

### `components.json`
- ShadCN UI configuration
- Component paths and aliases
- Icon library setup (Lucide)

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [ShadCN UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup Validation](https://github.com/jquense/yup)

## 🎯 Next Steps

1. **Explore the example form** on the homepage
2. **Add more ShadCN components** as needed
3. **Create additional pages** using the App Router
4. **Extend the data models** in the `data/` folder
5. **Customize the Tailwind theme** in `tailwind.config.js`

## 📄 License

This project is licensed under the MIT License.

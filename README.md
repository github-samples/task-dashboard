# Task Dashboard

A task management application that allows users to create, organize, and filter tasks using a modern, responsive UI built with React.

> **Note:** This application is intended for demonstration purposes only and is not meant for production use.

## Features

- **Task Management**: Create, complete, and delete tasks
- **Task Tags**: Organize tasks with customizable tags
- **Task Lists**: Create multiple lists with custom filters
- **List Filters**: Filter tasks by tags or completion status
- **Animations**: Smooth transitions and animations using Framer Motion
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **React**: Modern React with functional components and hooks
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for React
- **Vite**: Fast, modern build tool and development server
- **Vitest**: Testing framework compatible with Vite

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v10+)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-dashboard.git
   cd task-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

### Available Scripts

- `npm start` - Start the development server
- `npm start:hydrated` - Start the development server with data hydration enabled
- `npm run build` - Build for production
- `npm run build:hydrated` - Build for production with data hydration enabled
- `npm run build:clean` - Build for production with data hydration explicitly disabled
- `npm run preview` - Preview the production build locally
- `npm run preview:hydrated` - Preview the production build with data hydration enabled
- `npm test` - Run tests with Vitest

### Data Hydration

The application supports pre-populating the app with sample data through an optional hydration process:

- Sample data is defined in `src/data/initialData.json`
- Hydration can be enabled/disabled using the `VITE_ENABLE_DATA_HYDRATION` environment variable
- Use the convenience scripts for development with hydration:
  - `npm run start:hydrated` - Development with sample data
  - `npm run build:hydrated` - Production build with sample data
  - `npm run build:clean` - Production build without sample data
- GitHub Actions deployment automatically enables hydration for the production build

## Architecture

### State Management

The application uses React Context for state management:

- **TaskContext**: Manages tasks state and operations (add, toggle, delete)
- **TagContext**: Manages tags and their relationships with tasks
- **ListContext**: Manages task lists and filtering logic

### UI Components

The application features several key components:
- **TaskList**: Renders a list of tasks
- **TaskItem**: Renders an individual task
- **TaskBoard**: Manages multiple task lists
- **TagManager**: Interface for creating and managing tags
- **GlobalTaskForm**: Form for creating new tasks
- **ListAddTask**: Form for adding tasks to specific lists
- **TaskListConfig**: Interface for configuring task lists

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

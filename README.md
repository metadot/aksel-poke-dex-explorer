# PokéDex Explorer

A comprehensive Pokémon browser application built with Angular that allows users to explore the world of Pokémon using the PokéAPI.

## Project Overview

This Angular application serves as a training project for interns to learn and apply core Angular concepts. The PokéDex Explorer allows users to:

- Browse a list of Pokémon
- View detailed information about each Pokémon
- Navigate between different pages using Angular routing
- Experience protected routes and authentication flows
- Interact with dynamically displayed data

## Technologies Used

- Angular (Latest version)
- TypeScript
- Signals for reactive programming
- Angular Router
- [PokéAPI](https://pokeapi.co/) for Pokémon data

## Project Structure

The application follows a modular architecture with the following key components:

- **Core Module**: Contains singleton services and application-wide providers
- **Shared Module**: Houses reusable components, directives, and pipes
- **Feature Modules**: Separate modules for different features (Pokémon list, details, etc.)

## Development Milestones

The project is divided into 10 progressive milestones:

1. **Project Initialization**: Setting up the Angular project and landing page
2. **Navigation**: Implementing routing between components
3. **API Integration**: Fetching and displaying Pokémon data from PokéAPI
4. **Component Interaction**: Creating reusable Pokémon components with inputs/outputs
5. **Reactivity**: Implementing reactive state management
6. **Derived State**: Managing selected/filtered Pokémon data
7. **Async Data Handling**: Implementing loading states and error handling
8. **Custom Directives & Pipes**: Enhancing the UI with custom Angular features
9. **Route Guards**: Implementing protected routes
10. **HTTP Interceptors**: Adding global HTTP request/response handling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd aksel-poke-dex-explorer
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Development Environment

The project supports multiple environments:

- **Development**: Used during local development
- **Testing**: Used for running tests
- **Production**: Used for production builds

## Best Practices

This project follows these coding principles:

- Clean, organized code structure
- Component-based architecture
- Reactive programming patterns
- Proper error handling
- Comprehensive documentation
- Responsive design

## Learning Resources

- [Angular Documentation](https://angular.io/docs)
- [PokéAPI Documentation](https://pokeapi.co/docs/v2)

## License

This project is created for educational purposes as part of an internship training program.

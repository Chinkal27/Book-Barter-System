# BookBarter

A modern platform for students to exchange used textbooks, saving money while building a sustainable campus community.

![BookBarter Screenshot](https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800)

## Features

- **Smart Matching Algorithm**: Find relevant book exchanges based on courses, genres, and conditions
- **Real-time Availability**: Track book status and barter requests
- **User Profiles**: Build reputation through ratings and reviews
- **Course Integration**: Search and filter books by university courses
- **Secure Authentication**: Email-based authentication system
- **Responsive Design**: Seamless experience across all devices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/book-barter.git
cd book-barter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── barter/        # Barter-related components
│   ├── books/         # Book listing components
│   ├── layout/        # Layout components
│   └── matching/      # Match suggestion components
├── context/           # React context providers
├── pages/             # Page components
├── services/          # API services
├── types/             # TypeScript type definitions
├── App.tsx           # Root component
└── main.tsx          # Entry point
```

## Key Features Explained

### Smart Matching Algorithm

The platform uses a sophisticated matching algorithm that considers:
- Course relevance
- Book condition
- Genre overlap
- Publication year
- User preferences

### Barter System

1. Users list their available books
2. Browse available books or get match suggestions
3. Send barter requests with optional messages
4. Accept/reject incoming requests
5. Complete exchanges in person

### User Rating System

- Rate exchange experiences
- Build community trust
- Track successful trades
- View user statistics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Book cover images from [Pexels](https://www.pexels.com)
- Icons from [Lucide](https://lucide.dev)
- Font families: Merriweather and Inter

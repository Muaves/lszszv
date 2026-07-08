# Lszszv

> A browser-based calculator implemented in plain JavaScript to demonstrate fundamental UI patterns, state handling, and basic expression evaluation.

## Description

Lszszv is a lightweight, client-side calculator application with no external dependencies beyond a CSS animation library.
The project is designed as a learning exercise, prioritizing code clarity, predictable state transitions, and simple UX behavior.

## Key Features

Arithmetic operations: addition, subtraction, multiplication, division

Multi-term expression evaluation

Explicit state management for operands and operators

Light / dark theme switching with system preference detection

UI feedback through CSS-based animations

Graceful handling of invalid and undefined results (NaN, Infinity)

Responsive layout with a defined minimum supported viewport

Non-functional hamburger menu placeholder (UI scaffold) 

## Architecture

Single-page application (SPA) without routing

All logic executed client-side

Stateless UI components with centralized calculation logic

No framework abstractions

## Technology Stack

HTML5

CSS3 (custom properties for theming)

Vanilla JavaScript (ES6+)

animate.css (visual feedback only)

## Ideas:

- Creating my own unit of measurement.

- Creating my own language.

- Creating my own temperature scale.

## Execution

Open index.html in any modern, standards-compliant browser.
No build step, bundler, or runtime configuration is required.

## Error Handling Strategy

The calculator returns Error when:

an evaluated expression results in NaN

the input cannot be parsed into a valid arithmetic expression

The calculator returns ∞ when:

a division by zero occurs

These states are handled explicitly and do not crash the application.

## Constraints

Designed for educational use

Not optimized for extreme edge cases

eval() is used intentionally to simplify expression evaluation

No persistence or advanced mathematical functions

## Intended Use

This project is intended for:

Practicing JavaScript fundamentals

Understanding basic UI state management

Experimenting with animation-driven feedback 

It is not intended for production deployment.

## License

MIT License

## Author

Muavees
GitHub: https://github.com/Muaves

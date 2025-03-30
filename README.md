[![codecov](https://codecov.io/gh/rad-ui/ui/graph/badge.svg?token=Z74MUHF5TN)](https://codecov.io/gh/rad-ui/ui)

# RAD UI

Head over to [Storybook](https://main--657eda33d6033847be90aaf8.chromatic.com/) to check out latest components.

![RAD UI](./assets/images/rad-ui-poster.png)

## Introduction to Rad UI

Rad UI is a React UI library designed to simplify and enhance the process of building user interfaces. With a focus on ease of use and flexibility, Rad UI empowers developers to create engaging and efficient user experiences. Whether you're starting a new project or improving an existing one, Rad UI provides a collection of components and utilities to streamline development.

## Why Rad UI?

### Design-System First

Created to seamlessly integrate with design systems, ensuring consistency and scalability. Whether you're working with an existing design system or building one from scratch, Rad UI provides the flexibility to fit your needs. With its unstyled component approach, you can apply your own design tokens, themes, and styles effortlessly. This plug-and-play capability allows you to maintain brand identity while leveraging a robust, accessible component foundation.

### Speed & Flexibility

Adopt components gradually, integrating them into your existing project without overhauling your codebase. Whether you're replacing legacy components or enhancing specific parts of your UI, Rad UI allows seamless adoption, ensuring smooth transitions and minimal refactoring.

### Accessibility First

Built to meet WCAG standards wherever possible, ensuring a more inclusive and user-friendly experience. From keyboard navigation to screen reader support, Rad UI prioritizes accessibility, making interfaces usable for all, including those with disabilities.

### Composability

Rad UI provides unstyled, flexible building blocks that allow you to construct components tailored to your needs. This ensures that you maintain full creative and functional control over your UI while adhering to your design principles.

### Performance-Oriented

Engineered for high performance with a minimal footprint, ensuring fast load times and smooth interactions. Rad UI components are optimized to minimize re-renders and unnecessary DOM updates, making your applications more efficient.

### Developer-Friendly

Built with a developer-first approach, featuring intuitive APIs, first-class TypeScript support, and detailed documentation. Rad UI makes it easy to get started while offering the flexibility to extend components as needed.

### Customizable

Fully adaptable to your preferred styling approach, whether it’s Tailwind CSS, SCSS, or any other method. Rad UI gives you complete control over aesthetics without enforcing a predefined look and feel.

## Installation

To install Rad UI, run the following command from the root of your project's directory:

```bash
npm install @radui/ui
```

Description: Rad UI is a React UI library that simplifies UI development, offering a collection of components and utilities to enhance the user experience. It addresses common challenges in building interfaces, making it easier for developers to create intuitive and visually appealing applications.

Technology stack: React
Status: Beta
Please note that Rad UI is under development and will receive a full official release soon in 2024 once significant production-ready components are readily available.
What sets this apart: Rad UI stands out with its focus on simplicity, flexibility, and ease of integration into React projects.
<!-- 

## Dependencies

Describe any dependencies that must be installed for this software to work.
This includes programming languages, databases or other storage mechanisms, build tools, frameworks, and so forth.
If specific versions of other software are required, or known not to work, call that out.

## Usage

Show users how to use the software.
Be specific.
Use appropriate formatting when showing code snippets.

## How to test the software

If the software includes automated tests, detail how to run those tests.

## Known issues

Document any known significant shortcomings with the software.

## Getting help

Instruct users how to get help with this software; this might include links to an issue tracker, wiki, mailing list, etc.

**Example**

If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker. -->

## Getting involved

We encourage interested developers in getting involved in building a better future for the web. We can use all the help we can get to make the code and the docs a little bit every day.
For more details, you can read on how to contribute to development of Rad UI in [Contribution Docs](https://www.rad-ui.com/docs/contributing/before-you-start).

## Setting Up Dev Environment

### Cloning the repository

Follow these steps to set up your development environment:

-   Fork the repository: Create a fork of the Rad UI repository to your GitHub account.
-   Clone the repository: Clone your forked repository to your local machine.
-   Install dependencies: Run

```jsx
npm install

```

in the root directory. We use npm to maintain consistency in our dependencies.

### Understanding the code structure

The project is organized into these main directories:

-   docs: Contains the documentation website built with Next.js and Tailwind CSS. You're currently reading content from this directory. Use global search to quickly locate specific documentation.
-   src: Contains the core component library source code.
-   scripts: Contains utility scripts for building and managing library assets.
-   styles: Contains the production-ready component styles.

Take some time to explore the codebase and understand its structure. The organization is straightforward, making it easy to start contributing once you're familiar with it.

### Running Storybook

We use Storybook for component development and testing. You can explore our existing components and work-in-progress features in the WIP section. Storybook is essential for developing and testing new components.

To start Storybook, run

```jsx
npm run sb

```

in the root directory.

### Running the Documentation Website Dev Server

To work on the documentation website, you'll need to run the development server. This is necessary for updating existing documentation, adding new pages, or modifying components.

First, navigate to the docs directory:

```jsx
cd docs

```

Then start the Next.js development server:

```jsx
npm run dev
```

## Where can I get more help, if I need it?
[GitHub Discussions](https://github.com/rad-ui/ui/discussions)
[Discord](https://discord.com/invite/nMaQfeEPNp)

## Open source licensing info

For Licensing info you can check out [LICENSE](LICENSE).

## Dev Environment

Node versions tested in 18.19.0 - 21.4.0

## Credits and references

1. Project heavily inspired by RadixUI, Floating UI, shadcn/ui and many other libraries that defined the modern web that we know today

This project is tested with BrowserStack
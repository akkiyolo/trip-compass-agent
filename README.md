# 🤖 AI Travel Planner (Vite + React)

A modern web application that acts as an AI-powered travel assistant. This project is built with a fast, modern tech stack designed for a great developer and user experience.

---

<img width="1902" height="969" alt="image" src="https://github.com/user-attachments/assets/f7031b8a-f18e-4c61-ae65-c9c2e18b49f9" />

---

## 🚀 Project Description

This AI Travel Planner is a front-end application designed to help users plan their trips effortlessly. By interacting with an AI agent, users can generate travel itineraries. The application integrates **SerpApi** to pull in dynamic, up-to-date flight information. The entire experience is built on a modern foundation of **Vite**, **React**, and **TypeScript**, with a sleek UI created using **Tailwind CSS** and **shadcn/ui**.

---

## ✨ Key Features

* **AI Travel Agent**: The core of the application is a powerful AI that helps plan trips.
* **Dynamic Flights via SerpApi**: Integrates **SerpApi** to fetch and display real-time flight information.
* **Interactive Chat Feature**: A chat interface allows users to communicate with the AI planner conversationally.
* **Modern Stack**: Built with the latest technologies for optimal performance and development speed.
* **Component-Driven UI**: Uses **shadcn/ui** for a clean, accessible, and customizable component library.
* **Type-Safe**: Written in **TypeScript** to ensure code quality and reduce bugs.

---

## 💻 Technology Stack & APIs

* **Build Tool**: **Vite** – For a blazing fast development experience.
* **Framework**: **React** – For building the user interface.
* **Language**: **TypeScript** – For adding static types to JavaScript.
* **Styling**: **Tailwind CSS** – A utility-first CSS framework for rapid styling.
* **UI Components**: **shadcn/ui** – A collection of beautifully designed, accessible components.
* **Runtime & Package Manager**: **Bun** – An all-in-one JavaScript runtime and toolkit.
* **APIs**:
    * **AI Service** (e.g., Google Gemini, OpenAI) - For the travel agent logic.
    * **SerpApi** - For fetching real-time flight data.

---

## ⚙️ Setup and Installation

To get this project running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install dependencies:**
    * This project uses Bun. Install the dependencies with:
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    * Create a `.env` file in the root of the project. You will need to add your API keys.
    ```
    VITE_AI_API_KEY=your_ai_api_key_here
    VITE_SERPAPI_API_KEY=your_serpapi_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    bun dev
    ```
    The application should now be running on `http://localhost:5173` (or another port specified by Vite).

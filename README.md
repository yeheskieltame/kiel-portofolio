
# Yeheskiel Yunus Tame - Personal Portfolio Website

## Project Overview

This personal portfolio website showcases Yeheskiel's professional skills, projects, education, and services. It features a modern, responsive design built with React, TypeScript, and Tailwind CSS, enhanced with shadcn/ui components for a polished user experience.

**URL**: https://lovable.dev/projects/a7ee29c4-bf5e-4bf3-8ddd-c97f5cf85ba8

## Features & User Guide

### Navigation

- **Responsive Navbar**: Adapts to different screen sizes with a hamburger menu on mobile devices.
- **Section Links**: Quick navigation to Home, Projects, Skills, and Contact sections.
- **Resume Download**: Click the "Resume" button in the navigation bar to download Yeheskiel's CV in PDF format.

### Home Section
- Introduces Yeheskiel with a brief bio and professional headline.
- Showcases a professional headshot.
- Contains call-to-action buttons for contacting or exploring projects.

### Services Section
- Displays the professional services offered by Yeheskiel.
- Each service card provides a brief description of the service.
- Users can request services by clicking on service cards, which opens a dialog form.

### Projects Section
- Showcases Yeheskiel's portfolio of work with descriptive project cards.
- Each project card includes:
  - Project title and description
  - Technologies used
  - Preview image
  - Links to live demo and GitHub repository (when available)

### Skills Section
- Visual representation of technical skills categorized by type.
- Skill cards display proficiency levels and years of experience.

### Education Section
- Timeline of educational background and certifications.
- Includes institution names, degrees, and graduation dates.

### Contact Section
- Contact form for direct messaging.
- Links to social media profiles and professional networks.
- Email and phone contact information.

### Interactive Chatbot Assistant
- **Accessing the Chatbot**: Click the chat bubble icon in the bottom right corner of the screen.
- **Sending Messages**: Type your question in the input field and press the send button.
- **Voice Input**: Click the microphone icon to use speech recognition (requires browser permission).
- **Text-to-Speech**: Toggle the speaker icon in the chat header to have responses read aloud.
- **Language Selection**: Switch between English and Indonesian for text-to-speech output.
- **Closing the Chat**: Click the X button in the chat bubble or the X in the top right of the chat window.

### Admin Panel
- **Accessing Admin**: Navigate to `/admin` path to access the admin panel.
- **Authentication**: Secure login with password protection.
- **Content Management**: Edit, add or delete items in the following sections:
  - Services ("What I Offer")
  - Projects
  - Skills & Technologies
  - Education & Certifications
- **User-Friendly Interface**: Intuitive tabs and forms for easy content updates.

## Admin Panel User Guide

### Accessing the Admin Panel
1. Navigate to the `/admin` path in your browser.
2. Enter your admin password on the login screen.
3. Upon successful authentication, you'll be directed to the admin dashboard.

### Managing Services
1. Click the "Services" tab in the admin dashboard.
2. **Add Service**: Click the "Add Service" button and fill in the required information.
3. **Edit Service**: Click the edit icon on any service card to modify its details.
4. **Delete Service**: Click the trash icon on any service card to remove it.

### Managing Projects
1. Click the "Projects" tab in the admin dashboard.
2. **Add Project**: Click the "Add Project" button and complete the project form.
3. **Edit Project**: Click the edit icon on any project card to update its information.
4. **Delete Project**: Click the trash icon on any project card to remove it.
5. All projects support images, demo links, GitHub links, and technology tags.

### Managing Skills
1. Click the "Skills" tab in the admin dashboard.
2. Skills are categorized into:
   - Programming Languages
   - Machine Learning & Data Science
   - Web Development & Tools
3. **Add Skill**: Click the "Add Skill" button, select a category, and set proficiency level.
4. **Edit Skill**: Click the edit icon on any skill card to modify its details.
5. **Delete Skill**: Click the trash icon on any skill card to remove it.

### Managing Education
1. Click the "Education" tab in the admin dashboard.
2. **Add Education Provider**: Click the "Add Education Provider" button and fill in provider details.
3. **Add Multiple Courses**: Within each provider, add multiple courses/certifications.
4. **Edit Education**: Click the edit icon on any education card to update provider or course details.
5. **Delete Education**: Click the trash icon on any education card to remove a provider and all its courses.

### Security Best Practices
- Log out of the admin panel when you're finished making changes.
- Periodically change your admin password for enhanced security.
- The admin panel uses local storage for authentication; clearing browser data will require re-authentication.

## Technical Information

This project is built with:

- **React**: Front-end library for building user interfaces
- **TypeScript**: Strongly typed programming language for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Vite**: Next-generation front-end tooling
- **Lucide React**: Beautiful open-source icons
- **Speech Recognition API**: For voice input in the chatbot
- **ElevenLabs API**: For high-quality text-to-speech in the chatbot
- **Local Storage**: For persisting admin content changes and authentication

## How to Edit This Project

### Use Lovable

Simply visit the [Lovable Project](https://lovable.dev/projects/a7ee29c4-bf5e-4bf3-8ddd-c97f5cf85ba8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

### Use your preferred IDE

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Edit a file directly in GitHub

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

### Use GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## How to Deploy This Project

Simply open [Lovable](https://lovable.dev/projects/a7ee29c4-bf5e-4bf3-8ddd-c97f5cf85ba8) and click on Share -> Publish.

## Custom Domain Setup

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

# Routine Journal

## Overview

Routine Journal is a web application designed to help users track and manage their daily activities and habits. It serves as a personal journal, enabling users to log their activities, reflect on their routines, identify patterns, and monitor progress over time through qualitative and quantitative means.

## Features

- **Activity Logger:** Define and save various activities with associated metrics and journal entries.
- **Journal Entry:** Create journal entries for every calendar date and link activities to them.
- **Progress Tracker/Data Visualizer:** Generate graphs and charts from activity data for progress tracking.

## Technologies Used

- **Front-End:** React
- **Back-End:** Django, REST
- **Database:** SQLite
- **Data Visualization:** D3, Recharts

## System Architecture

Routine Journal integrates front-end and back-end development to ensure a functional and responsive user experience. Key subsystems include:

1. **Activity Management Page:** Create, edit, and delete activity entries.
2. **Journal Entries Page:** Log qualitative and quantitative data for each activity.

## Data Design

The data for Routine Journal is stored using SQLite and managed through Django capabilities. Key data entities include:

- **Activity:** Tracks individual activities with associated metrics.
- **Journal Entry:** Logs daily activities and notes.
- **Activity Entry:** Combines activity and journal entries for comprehensive tracking.

## Installation

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/yourusername/routine-journal.git
   cd routine-journal
   ```

2. **Set Up the Virtual Environment:**
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Navigate to Back-End Directory and Install Dependencies:**
   ```sh
   cd backend
   pip install -r requirements.txt
   ```

4. **Run Migrations:**
   ```sh
   python manage.py migrate
   ```

5. **Run the Development Server:**
   ```sh
   python manage.py runserver
   ```

6. **Navigate to Front-End Directory and Install Dependencies:**
   ```sh
   cd frontend
   npm install
   ```

7. **Run the Front-End Development Server:**
   ```sh
   npm run dev
   ```

8. **Run Backend and Frontend Concurrently:**
   - Ensure that the backend server is running by executing `python manage.py runserver` in one terminal.
   - In another terminal, navigate to the `frontend` directory and run `npm run dev` to launch the frontend server.

## Usage

1. **Home Page:**
   - Displays a calendar view with user activities and journal entries.

2. **Activity Page:**
   - Create and manage activities with associated metrics.

3. **Journal Entries Page:**
   - Log daily activities and notes, and link them to specific activities.

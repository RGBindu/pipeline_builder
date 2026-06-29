# Pipeline Builder

A visual pipeline builder built with React and FastAPI.

## How to Run

### Backend

Install dependencies:

```bash
pip install fastapi uvicorn
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

You should see:
INFO: Uvicorn running on http://127.0.0.1:8000

### Frontend

Install dependencies:

```bash
npm install
```

Start React:

```bash
npm start
```

## MGH-202 — Node Abstraction

- Created BaseNode.js as shared base component
- Migrated all 4 original nodes to use BaseNode
- Added 5 new nodes: API Caller, Condition,
  Data Transform, File Upload, Webhook Trigger

## MGH-203 — UI Styling & Design System

Styling Approach

- The application uses CSS Variables, a centralized theme file (theme.css), global CSS (index.css), and React inline styles for consistent styling across the application.

Improvements Made

- Defined a colour palette, typography scale, and spacing tokens
- Styled the toolbar and canvas background
- Redesigned all node cards with rounded corners and shadows
- Added distinct colours for different node types
- Customized connection edges and handles
- Styled form controls and the Submit button
- Ensured responsive design at 1280px and larger screen sizes

## MGH-204 — Dynamic Text Node Behaviour

- Text node auto-resizes (width + height) as user types
- Minimum size: 200x80 px
- Maximum width: 400px (wraps text after that)
- Parses `{{ variableName }}` patterns from text using regex
- Automatically creates a labelled Handle on left side for each unique variable
- Handles appear in the order variables first appear in text
- Deleting a variable from text removes its handle automatically
- Invalid tokens (e.g. `{{ 123bad }}`, `{{ has space }}`) are ignored — no handle created
- Each handle has a stable unique ID so existing connections persist across re-renders
- Removing one variable does not disconnect or break edges connected to other variables

## MGH-205 — Backend Pipeline Parse API

- Connected the frontend Submit button to the FastAPI backend using an HTTP POST request.
- Sent the current pipeline nodes and edges as JSON to the /pipelines/parse endpoint.
- Counted the total number of nodes and edges in the pipeline.
- Determined whether the pipeline is a valid Directed Acyclic Graph (DAG).
- Displayed the node count, edge count, and DAG status in a user-friendly alert.
- Handled network errors and invalid requests gracefully.
- Configured CORS to enable communication between the React frontend and FastAPI backend during local development.

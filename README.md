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

## VL-305 — Undo / Redo for Canvas Actions

Implemented Undo and Redo functionality for the Pipeline Builder to improve the editing experience. Users can revert or restore node and edge operations without rebuilding the pipeline.

- Added Undo (Ctrl + Z) keyboard shortcut.
- Added Redo (Ctrl + Y) keyboard shortcut.
- Added Undo and Redo toolbar buttons.
- Implemented history management using `past` and `future` stacks.
- Stored nodes and edges together as a single snapshot for each history entry.
- Automatically clears the redo history when a new action is performed after an undo.
- Limited history to the latest 50 snapshots to optimize memory usage.
- Undo and Redo buttons are automatically enabled or disabled based on available history.
- History is maintained only for the current browser session (no persistence).

## VL-306 — Node Search & Filter Sidebar
- Added searchable sidebar on left side of canvas
- Lists all 9 node types with color badge and description
- Type to filter nodes by name or description
- Drag nodes directly from sidebar onto canvas
- Shows "No nodes found" when search has no results

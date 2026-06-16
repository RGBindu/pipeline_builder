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

---


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import deque
from typing import Any, Dict

app = FastAPI()

saved_pipelines = {}

# ---------------- CORS ---------------- #

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Models ---------------- #

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineSaveRequest(BaseModel):
    name: str
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]
# ---------------- Root ---------------- #

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

# ---------------- DAG Check ---------------- #

def is_dag(nodes, edges):

    graph = {node.id: [] for node in nodes}
    indegree = {node.id: 0 for node in nodes}

    for edge in edges:
        graph[edge.source].append(edge.target)
        indegree[edge.target] += 1

    queue = deque()

    for node in indegree:
        if indegree[node] == 0:
            queue.append(node)

    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1

        for neighbour in graph[current]:
            indegree[neighbour] -= 1

            if indegree[neighbour] == 0:
                queue.append(neighbour)

    return visited == len(nodes)

# ---------------- Parse Endpoint ---------------- #

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):

    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag(pipeline.nodes, pipeline.edges),
    }
@app.post("/pipelines/save")
def save_pipeline(request: PipelineSaveRequest):

    saved_pipelines[request.name] = {
        "nodes": request.nodes,
        "edges": request.edges,
    }

    return {
        "saved": True,
        "name": request.name,
    }


@app.get("/pipelines/load/{name}")
def load_pipeline(name: str):

    if name not in saved_pipelines:
        raise HTTPException(
            status_code=404,
            detail="Pipeline not found",
        )

    return saved_pipelines[name]
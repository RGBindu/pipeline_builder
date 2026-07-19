// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],

  // Undo / Redo history
  past: [],
  future: [],

  // Save current canvas state
  saveSnapshot: () => {
    const { nodes, edges, past } = get();

    const snapshot = {
      nodes: structuredClone(nodes),
      edges: structuredClone(edges),
    };

    const updatedPast =
      past.length >= 50 ? [...past.slice(1), snapshot] : [...past, snapshot];

    set({
      past: updatedPast,
      future: [],
    });
  },

  // Undo last action
  undo: () => {
    const { past, future, nodes, edges } = get();

    if (past.length === 0) return;

    const previous = past[past.length - 1];

    const current = {
      nodes: structuredClone(nodes),
      edges: structuredClone(edges),
    };

    set({
      nodes: previous.nodes,
      edges: previous.edges,
      past: past.slice(0, -1),
      future: [...future, current],
    });
  },

  // Redo last undone action
  redo: () => {
    const { past, future, nodes, edges } = get();

    if (future.length === 0) return;

    const next = future[future.length - 1];

    const current = {
      nodes: structuredClone(nodes),
      edges: structuredClone(edges),
    };

    set({
      nodes: next.nodes,
      edges: next.edges,
      future: future.slice(0, -1),
      past: [...past, current],
    });
  },

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };

    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }

    newIDs[type] += 1;

    set({ nodeIDs: newIDs });

    return `${type}-${newIDs[type]}`;
  },

  // Add new node
  addNode: (node) => {
    get().saveSnapshot();

    set({
      nodes: [...get().nodes, node],
    });
  },

  // Handle node changes
  onNodesChange: (changes) => {
    // Save history only when a node is removed
    const shouldSave = changes.some((change) => change.type === "remove");

    if (shouldSave) {
      get().saveSnapshot();
    }

    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  // Handle edge changes
  onEdgesChange: (changes) => {
    // Save history only when an edge is removed
    const shouldSave = changes.some((change) => change.type === "remove");

    if (shouldSave) {
      get().saveSnapshot();
    }

    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  // Connect two nodes
  onConnect: (connection) => {
    get().saveSnapshot();

    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
            height: "20px",
            width: "20px",
          },
        },
        get().edges,
      ),
    });
  },

  // Update node data
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            [fieldName]: fieldValue,
          };
        }

        return node;
      }),
    });
  },
  // Replace entire pipeline (used for Import / Load)
  setPipeline: (nodes, edges) => {
    set({
      nodes,
      edges,
      past: [],
      future: [],
    });
  },

  // Get current pipeline (used for Export / Save)
  getPipeline: () => {
    const { nodes, edges } = get();

    return { nodes, edges };
  },
}));

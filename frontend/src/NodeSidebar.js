// NodeSidebar.js
// Searchable sidebar listing all node types
// Users can type to filter and drag nodes onto the canvas

import { useState } from 'react';

// All 9 node types with name, color and description
const NODE_TYPES = [
  { type: 'customInput',    label: 'Input',          color: '#4CAF50', description: 'Takes user input (text or file)' },
  { type: 'llm',            label: 'LLM',            color: '#6865A5', description: 'Language model node' },
  { type: 'customOutput',   label: 'Output',         color: '#F44336', description: 'Shows final output' },
  { type: 'text',           label: 'Text',           color: '#FF9800', description: 'Dynamic text with variables' },
  { type: 'apiCaller',      label: 'API Caller',     color: '#2196F3', description: 'Calls an external API' },
  { type: 'conditional',    label: 'Condition',      color: '#9C27B0', description: 'Branch: true / false' },
  { type: 'dataTransform',  label: 'Data Transform', color: '#00BCD4', description: 'Transforms data format' },
  { type: 'fileUpload',     label: 'File Upload',    color: '#795548', description: 'Upload a file' },
  { type: 'webhookTrigger', label: 'Webhook',        color: '#607D8B', description: 'Triggered by webhook' },
];

export const NodeSidebar = () => {
  const [search, setSearch] = useState('');

  // Filter nodes based on search input
  const filtered = NODE_TYPES.filter(node =>
    node.label.toLowerCase().includes(search.toLowerCase()) ||
    node.description.toLowerCase().includes(search.toLowerCase())
  );

  // Set node type in drag event
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{
      width: '220px',
      minWidth: '220px',
      height: '70vh',
      background: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{
        padding: '14px 12px 10px',
        borderBottom: '1px solid #e2e8f0',
        background: '#f8fafc',
      }}>
        <div style={{
          fontWeight: '700',
          fontSize: '13px',
          color: '#1e293b',
          marginBottom: '8px',
          letterSpacing: '0.3px',
        }}>
            Node Types
        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search nodes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '7px 10px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '12px',
            outline: 'none',
            boxSizing: 'border-box',
            color: '#334155',
          }}
        />
      </div>

      {/* Node list — scrollable */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '8px',
      }}>
        {filtered.length === 0 && (
          <div style={{
            padding: '20px 10px',
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '12px',
          }}>
            No nodes found
          </div>
        )}

        {filtered.map(node => (
          <div
            key={node.type}
            draggable
            onDragStart={e => onDragStart(e, node.type)}
            style={{
              padding: '10px 12px',
              marginBottom: '6px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              background: '#fff',
              cursor: 'grab',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.12)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Color badge + label */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '4px',
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                background: node.color,
                flexShrink: 0,
              }} />
              <span style={{
                fontWeight: '600',
                fontSize: '12px',
                color: '#1e293b',
              }}>
                {node.label}
              </span>
            </div>

            {/* Description */}
            <div style={{
              fontSize: '11px',
              color: '#64748b',
              paddingLeft: '20px',
            }}>
              {node.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
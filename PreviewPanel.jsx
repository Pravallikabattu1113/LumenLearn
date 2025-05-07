import { useState, useEffect } from 'react';

function PreviewPanel({ lesson, onContentChange }) {
  const [content, setContent] = useState(lesson.content || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setContent(lesson.content || '');
  }, [lesson]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    onContentChange(newContent);
  };

  const renderPreview = (text) => {
    // Basic markdown rendering
    return text
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index}>{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index}>{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index}>{line.substring(4)}</h3>;
        }
        
        // Lists
        if (line.startsWith('- ')) {
          return <li key={index}>{line.substring(2)}</li>;
        }
        if (line.startsWith('* ')) {
          return <li key={index}>{line.substring(2)}</li>;
        }
        
        // Code blocks
        if (line.startsWith('```')) {
          return <pre key={index}><code>{line.substring(3)}</code></pre>;
        }
        
        // Links
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        if (linkRegex.test(line)) {
          return (
            <p key={index}>
              {line.replace(linkRegex, (match, text, url) => (
                `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
              ))}
            </p>
          );
        }
        
        // Regular paragraphs
        return <p key={index}>{line}</p>;
      });
  };

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <h3>{lesson.title}</h3>
        <button 
          className="edit-toggle-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Preview' : 'Edit'}
        </button>
      </div>

      <div className="preview-content">
        {isEditing ? (
          <div className="editor-container">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Write your lesson content here using markdown..."
              className="content-editor"
            />
          </div>
        ) : (
          <div className="preview-container">
            {renderPreview(content)}
          </div>
        )}
      </div>

      <div className="preview-help">
        <h4>Markdown Tips:</h4>
        <ul>
          <li># Heading 1</li>
          <li>## Heading 2</li>
          <li>### Heading 3</li>
          <li>- List item</li>
          <li>``` Code block</li>
          <li>[Link text](url)</li>
        </ul>
      </div>
    </div>
  );
}

export default PreviewPanel; 
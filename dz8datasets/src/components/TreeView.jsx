import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TreeNode = ({ node, renderHeader, renderChildren, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div
        onClick={toggleExpand}
        style={{
          cursor: hasChildren ? 'pointer' : 'default',
          fontWeight: hasChildren ? 'bold' : 'normal',
          padding: '4px 0',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {hasChildren && (
          <span style={{ marginRight: '8px' }}>
            {isExpanded ? '▼' : '►'}
          </span>
        )}
        {renderHeader ? renderHeader(node) : node.header}
      </div>

      {isExpanded && hasChildren && (
        <div>
          {renderChildren
            ? renderChildren(node.children)
            : node.children.map((child, index) => (
              <TreeNode
                key={index}
                node={child}
                renderHeader={renderHeader}
                renderChildren={renderChildren}
                level={level + 1}
              />
            ))}
        </div>
      )}
    </div>
  );
};

TreeNode.propTypes = {
  node: PropTypes.shape({
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    children: PropTypes.array
  }).isRequired,
  renderHeader: PropTypes.func,
  renderChildren: PropTypes.func,
  level: PropTypes.number
};

const TreeView = ({ data, renderHeader, renderChildren }) => {
  return (
    <div className="tree-view">
      <TreeNode
        node={data}
        renderHeader={renderHeader}
        renderChildren={renderChildren}
      />
    </div>
  );
};

TreeView.propTypes = {
  data: PropTypes.shape({
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    children: PropTypes.array
  }).isRequired,
  renderHeader: PropTypes.func,
  renderChildren: PropTypes.func
};

export default TreeView;
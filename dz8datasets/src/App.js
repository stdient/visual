import React from 'react';
import TreeView from './components/TreeView'

const App = () => {
  const treeData3 = {
    header: "Frontend Libraries",
    children: [
      {
        header: "UI Frameworks",
        children: [
          { header: "React", children: null },
          { header: "Vue", children: null },
          { header: "Angular", children: null }
        ]
      },
      {
        header: "Data Grid",
        children: [
          { header: "@mui/x-data-grid", children: null },
          { header: "@mui/x-data-grid-pro", children: null },
          {
            header: "@mui/x-data-grid-premium",
            children: [
              { header: "Features", children: null },
              { header: "Pricing", children: null }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div>
      <TreeView
        data={treeData3}
        renderHeader={(node) => (
          <span style={{ color: node.children ? 'darkgreen' : 'black' }}>
            {node.header}
          </span>
        )}
      />
    </div>
  );
};

export default App;

import React from 'react';
import RichObjectTreeView from './components/RichObjectTreeView/RichObjectTreeView';
import EditPropertiesBlock from './components/EditPropertiesBlock/EditPropertiesBlock';
import './style/app.css';

function App() {
  return (
    <div className={'root-container'}>
      <RichObjectTreeView />
      <EditPropertiesBlock />
    </div>
  );
}

export default App;

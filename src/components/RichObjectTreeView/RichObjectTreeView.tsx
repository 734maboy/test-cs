import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ProjectData, TreeActionTypes} from "../../types/tree";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
// import {setProjectData} from "../../store/actionCreators/tree";

const RichObjectTreeView : React.FC = () => {
  const { projects } = useTypedSelector(state => state.tree);
  const dispatch = useDispatch();

  const handleTreeItemChoose = useCallback(
    (node: ProjectData) => {
      dispatch({type: TreeActionTypes.SET_SELECTED_PROJECT_PROPS, payload: node});
    },
    [dispatch],
  );


  const renderTree = (nodes: ProjectData) => (
    <TreeItem onClick={() => handleTreeItemChoose(nodes)} key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes?.children)
        ? nodes.children.map((node: ProjectData) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <div>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: '100%', flexGrow: 1, maxWidth: '50vw', overflowY: 'auto' }}
      >
        {renderTree(projects)}
      </TreeView>
    </div>
  );
}

export default RichObjectTreeView;


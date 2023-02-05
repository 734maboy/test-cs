import React, {useCallback, useEffect, useState} from 'react';
import './editPropertiesBlock.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Box, Button, Tab, Tabs, TextField} from "@mui/material";
import {ProjectBusinessGroup, ProjectData, ProjectInfoGroup, ProjectTimeGroup, TreeActionTypes} from "../../types/tree";
import {useDispatch} from "react-redux";
import {simpleValidateParsedData} from "../../utils/validation";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          {children}
        </Box>
      )}
    </div>
  );
}

const EditPropertiesBlock: React.FC = () => {
  const dispatch = useDispatch();
  const {selectedProject, projects} = useTypedSelector(state => state.tree);

  const [summaryInfo, setSummaryInfo] = useState<null | ProjectInfoGroup>(null);
  const [timeInfo, setTimeInfo] = useState<null | ProjectTimeGroup>(null);
  const [businessInfo, setBusinessInfo] = useState<null | ProjectBusinessGroup>(null);
  const [value, setValue] = useState(0);

  const updateSummaryFieldInfo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (summaryInfo) {
      setSummaryInfo({
        ...summaryInfo, groupProperties: {
          ...summaryInfo.groupProperties,
          [e.target.name]: e.target.value,
        }
      });
    }
  }, [summaryInfo]);
  const updateTimeFieldInfo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeInfo) {
      setTimeInfo({
        ...timeInfo, groupProperties: {
          ...timeInfo.groupProperties,
          [e.target.name]: e.target.value,
        }
      });
    }
  }, [timeInfo]);
  const updateBusinessFieldInfo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (businessInfo) {
      setBusinessInfo({
        ...businessInfo, groupProperties: {
          ...businessInfo.groupProperties,
          [e.target.name]: e.target.value,
        }
      });
    }
  }, [businessInfo]);

  useEffect(() => {
    if (selectedProject) {
      let [summaryGroup, timeGroup, businessGroup] = selectedProject.groups;
      setSummaryInfo(summaryGroup);
      setTimeInfo(timeGroup);
      setBusinessInfo(businessGroup);
    } else {
      setSummaryInfo(null);
      setTimeInfo(null);
      setBusinessInfo(null);
    }
  }, [selectedProject]);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const updateSelectedProject = useCallback(
    () => {
      let updatedObject = {
        ...selectedProject,
        groups: [summaryInfo, timeInfo, businessInfo],
      };

      dispatch({type: TreeActionTypes.UPDATE_SELECTED_PROJECT, payload: updatedObject});
    },
    [selectedProject, summaryInfo, timeInfo, businessInfo, dispatch],
  );

  const exportProjectFromStoreToJsonFile = useCallback(
    () => {
      let dataStr = JSON.stringify(projects);
      let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

      let exportFileDefaultName = `data_${Date.now()}.json`;

      let linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      linkElement.remove();
    },
    [projects],
  );

  const onReaderLoad = useCallback((event: any) => {
    console.log(event.target.result);
    try {
      let obj: ProjectData = JSON.parse(event.target.result);
      if (simpleValidateParsedData(obj)) {
        dispatch({type: TreeActionTypes.IMPORT_PROJECTS_DATA, payload: obj})
      } else {
        console.log(false);
      }
    } catch (e) {
      console.log('SOMETHING WENT WRONG', e)
    }
  }, [dispatch]);

  const onImportFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      var reader = new FileReader();
      reader.onload = onReaderLoad;
      reader.readAsText(e.currentTarget.files[0]);
    }
  }, [onReaderLoad]);



  return (
    <div className={'properties-main-container'}>
      <h1>Project properties</h1>
      <Box sx={{width: '100%', height: '450px'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
            <Tab label="Summary"/>
            <Tab label="Time"/>
            <Tab label="Business"/>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {summaryInfo ? (
            <div className={'vertical-edit__wrapper'}>
              <TextField
                label="Description"
                name={'projectDescription'}
                onChange={updateSummaryFieldInfo}
                value={summaryInfo.groupProperties.projectDescription}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                label="People number"
                name={'projectPeopleNumber'}
                onChange={updateSummaryFieldInfo}
                type={'number'}
                value={summaryInfo.groupProperties.projectPeopleNumber}
                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
              />
              <TextField
                label="Status"
                name={'projectStatus'}
                onChange={updateSummaryFieldInfo}
                value={summaryInfo.groupProperties.projectStatus}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          ) : (<h3 style={{textAlign: 'center'}}>No summary data...</h3>)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {timeInfo ? (
            <div className={'vertical-edit__wrapper'}>
              <TextField
                type={'number'}
                label="Days estimate"
                name={'projectDaysEstimate'}
                onChange={updateTimeFieldInfo}
                value={timeInfo.groupProperties.projectDaysEstimate}
                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
              />
              <TextField
                type={'number'}
                label="Days effort"
                name={'projectDaysEffort'}
                onChange={updateTimeFieldInfo}
                value={timeInfo.groupProperties.projectDaysEffort}
                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
              />
            </div>
          ) : (<h3 style={{textAlign: 'center'}}>No time data...</h3>)}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {businessInfo ? (
            <div className={'vertical-edit__wrapper'}>
              <TextField
                label="Currency"
                name={'projectBudgetCurrency'}
                onChange={updateBusinessFieldInfo}
                value={businessInfo.groupProperties.projectBudgetCurrency}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                label="Business value"
                name={'projectBusinessValue'}
                type={'number'}
                value={businessInfo.groupProperties.projectBusinessValue}
                onChange={updateBusinessFieldInfo}
                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                label="Budget"
                name={'projectBudget'}
                onChange={updateBusinessFieldInfo}
                value={businessInfo.groupProperties.projectBudget}
                type={'number'}
                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
              />
              <TextField
                label="Team code"
                name={'projectTeamCode'}
                onChange={updateBusinessFieldInfo}
                value={businessInfo.groupProperties.projectTeamCode}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          ) : (<h3 style={{textAlign: 'center'}}>No business data...</h3>)}
        </TabPanel>
      </Box>
      <div className={'properties-main-container__actions'}>
        <input onChange={onImportFile} type="file"/>
        <Button onClick={exportProjectFromStoreToJsonFile} variant="contained">Export data</Button>
        <Button onClick={updateSelectedProject} variant="contained">Save</Button>
      </div>
    </div>
  );
};

export default EditPropertiesBlock;

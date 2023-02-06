import React, { useCallback, useEffect, useState } from 'react';
import './editPropertiesBlock.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Box, Button, Snackbar, Tab, Tabs, TextField } from '@mui/material';
import {
  ProjectBusinessGroup,
  ProjectData,
  ProjectInfoGroup,
  ProjectTimeGroup,
  TotalGroupProperties,
  TreeActionTypes,
} from '../../types/tree';
import { useDispatch } from 'react-redux';
import { simpleValidateParsedData } from '../../utils/validation';
import { Alert } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// TODO: DECOMPOSE COMPONENT
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const EditPropertiesBlock: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedProject, projects } = useTypedSelector((state) => state.tree);

  const [open, setOpen] = React.useState(false);
  const [alertInfo, setAlertInfo] = React.useState({
    severity: 'success',
    message: '',
  });
  const [summaryInfo, setSummaryInfo] = useState<null | ProjectInfoGroup>(null);
  const [timeInfo, setTimeInfo] = useState<null | ProjectTimeGroup>(null);
  const [businessInfo, setBusinessInfo] = useState<null | ProjectBusinessGroup>(
    null
  );
  const [value, setValue] = useState(0);

  const handleOnChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      info: TotalGroupProperties,
      setter: React.Dispatch<any>
    ) => {
      if (info) {
        setter({
          ...info,
          groupProperties: {
            ...info.groupProperties,
            [e.target.name]: e.target.value,
          },
        });
      }
    },
    []
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (selectedProject) {
      const [summaryGroup, timeGroup, businessGroup] = selectedProject.groups;
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

  const updateSelectedProject = useCallback(() => {
    const updatedObject = {
      ...selectedProject,
      groups: [summaryInfo, timeInfo, businessInfo],
    };

    dispatch({
      type: TreeActionTypes.UPDATE_SELECTED_PROJECT,
      payload: updatedObject,
    });
  }, [selectedProject, summaryInfo, timeInfo, businessInfo, dispatch]);

  const exportProjectFromStoreToJsonFile = useCallback(() => {
    const dataStr = JSON.stringify(projects);
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `data_${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    linkElement.remove();
  }, [projects]);

  const onReaderLoad = useCallback(
    (event: any) => {
      let validateResult: boolean;
      console.log(event.target.result);
      try {
        const obj: ProjectData = JSON.parse(event.target.result);
        validateResult = simpleValidateParsedData(obj);
        if (validateResult) {
          dispatch({
            type: TreeActionTypes.IMPORT_PROJECTS_DATA,
            payload: obj,
          });
          setAlertInfo({
            severity: 'success',
            message: 'Import was successfully processed',
          });
        } else {
          setAlertInfo({
            severity: 'error',
            message: 'Import file didn`t pass validation',
          });
        }
      } catch (e) {
        setAlertInfo({
          severity: 'error',
          message: 'Can`t parse file data',
        });
      }
      setOpen(true);
    },
    [dispatch]
  );

  const onImportFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) {
        const reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(e.currentTarget.files[0]);
      }
    },
    [onReaderLoad]
  );

  return (
    <div className={'properties-main-container'}>
      <h1>Project properties</h1>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
      <Box sx={{ width: '100%', height: '450px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Summary" />
            <Tab label="Time" />
            <Tab label="Business" />
          </Tabs>
        </Box>
        {/*TODO: DECOMPOSE PANELS INTO OTHER COMPONENTS*/}
        <TabPanel value={value} index={0}>
          {summaryInfo ? (
            <div className={'vertical-edit__wrapper'}>
              <TextField
                label="Description"
                name={'projectDescription'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, summaryInfo, setSummaryInfo)
                }
                value={summaryInfo.groupProperties.projectDescription}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                label="People number"
                name={'projectPeopleNumber'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, summaryInfo, setSummaryInfo)
                }
                type={'number'}
                value={summaryInfo.groupProperties.projectPeopleNumber}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
              <TextField
                label="Status"
                name={'projectStatus'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, summaryInfo, setSummaryInfo)
                }
                value={summaryInfo.groupProperties.projectStatus}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          ) : (
            <h3 style={{ textAlign: 'center' }}>No summary data...</h3>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {timeInfo ? (
            <div className={'vertical-edit__wrapper'}>
              <TextField
                type={'number'}
                label="Days estimate"
                name={'projectDaysEstimate'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, timeInfo, setTimeInfo)
                }
                value={timeInfo.groupProperties.projectDaysEstimate}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
              <TextField
                type={'number'}
                label="Days effort"
                name={'projectDaysEffort'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, timeInfo, setTimeInfo)
                }
                value={timeInfo.groupProperties.projectDaysEffort}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </div>
          ) : (
            <h3 style={{ textAlign: 'center' }}>No time data...</h3>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {businessInfo ? (
            <div className={'vertical-edit__wrapper'}>
              <TextField
                label="Currency"
                name={'projectBudgetCurrency'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, businessInfo, setBusinessInfo)
                }
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, businessInfo, setBusinessInfo)
                }
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
              <TextField
                label="Budget"
                name={'projectBudget'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, businessInfo, setBusinessInfo)
                }
                value={businessInfo.groupProperties.projectBudget}
                type={'number'}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
              <TextField
                label="Team code"
                name={'projectTeamCode'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(e, businessInfo, setBusinessInfo)
                }
                value={businessInfo.groupProperties.projectTeamCode}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          ) : (
            <h3 style={{ textAlign: 'center' }}>No business data...</h3>
          )}
        </TabPanel>
      </Box>
      <div className={'properties-main-container__actions'}>
        <label id={'import-label'} htmlFor="import-input">
          Import data
        </label>
        <input
          id="import-input"
          style={{
            display: 'none',
          }}
          onChange={onImportFile}
          type="file"
        />
        <Button onClick={exportProjectFromStoreToJsonFile} variant="contained">
          Export data
        </Button>
        <Button onClick={updateSelectedProject} variant="contained">
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditPropertiesBlock;

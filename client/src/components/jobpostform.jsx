import React, { useState } from 'react';
import { TextField, Button, Container, Menu, MenuItem, ListItemText } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "../css/JobForm.css";


const JobForm = () => {
  const [workplaceAnchorEl, setWorkplaceAnchorEl] = useState(null);
  const [jobTypeAnchorEl, setJobTypeAnchorEl] = useState(null);
  const [selectedWorkplace, setSelectedWorkplace] = useState('Choose One');
  const [selectedJobType, setSelectedJobType] = useState('Choose One');

  const handleWorkplaceClick = (event) => {
    setWorkplaceAnchorEl(event.currentTarget);
  };

  const handleWorkplaceClose = (value) => {
    setSelectedWorkplace(value);
    setWorkplaceAnchorEl(null);
  };

  const handleJobTypeClick = (event) => {
    setJobTypeAnchorEl(event.currentTarget);
  };

  const handleJobTypeClose = (value) => {
    setSelectedJobType(value);
    setJobTypeAnchorEl(null);
  };

  return (
    <Container>
        <h1> POST JOB HERE</h1>
        <div className="formdiv">
        <form>
        <TextField label="Job Title" fullWidth />
        <br></br>
        <br></br>
        <TextField label="Company Name" fullWidth />
        <div className="dropdown">
            <div>WorkPlace</div>
          <Button
            onClick={handleWorkplaceClick}
            endIcon={<ArrowDropDownIcon />}
          >
            {selectedWorkplace}
          </Button>
          <Menu
            anchorEl={workplaceAnchorEl}
            open={Boolean(workplaceAnchorEl)}
            onClose={() => handleWorkplaceClose(selectedWorkplace)}
          >
            <MenuItem onClick={() => handleWorkplaceClose('Option 1')}>
              <ListItemText primary="Option 1" />
            </MenuItem>
            <MenuItem onClick={() => handleWorkplaceClose('Option 2')}>
              <ListItemText primary="Option 2" />
            </MenuItem>
            <MenuItem onClick={() => handleWorkplaceClose('Option 3')}>
              <ListItemText primary="Option 3" />
            </MenuItem>
          </Menu>
        </div>
        <TextField label="Job Location" fullWidth/>
        <div className="dropdown">
        <div>Job Type</div>
          <Button
            onClick={handleJobTypeClick}
            endIcon={<ArrowDropDownIcon />}
          >
            {selectedJobType}
          </Button>
          <Menu
            anchorEl={jobTypeAnchorEl}
            open={Boolean(jobTypeAnchorEl)}
            onClose={() => handleJobTypeClose(selectedJobType)}
          >
            <MenuItem onClick={() => handleJobTypeClose('Full-time')}>
              <ListItemText primary="Full-time" />
            </MenuItem>
            <MenuItem onClick={() => handleJobTypeClose('Part-time')}>
              <ListItemText primary="Part-time" />
            </MenuItem>
            <MenuItem onClick={() => handleJobTypeClose('Intern')}>
              <ListItemText primary="Intern" />
            </MenuItem>
          </Menu>
        </div>
      
        <TextField label="Salary" fullWidth autoComplete='off'/>
        <br></br>
        <br></br>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>

    </div>
    
    
    </Container>
  );
};

export default JobForm;

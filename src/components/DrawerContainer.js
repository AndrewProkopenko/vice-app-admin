import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button'; 
import ListIcon from '@material-ui/icons/List';


import Sidebar from "./Sidebar"; 
 

export default function TemporaryDrawer() { 
  const [state, setState] = React.useState({ 
    left: false, 
  });

  const toggleDrawer = (anchor, open) => (event) => { 
    setState({ ...state, [anchor]: open });
  };
 
  const list = (anchor) => (
    <div 
      className='sidebar'
      role="presentation"
      // onClick={toggleDrawer(anchor, false)} 
    >
      
      <Sidebar />
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button 
              onClick={toggleDrawer(anchor, true) }
              variant="contained"
              size='large'
              color={"primary"}
              startIcon={<ListIcon/>}
          >
            Меню 
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div> 
  );
}
 
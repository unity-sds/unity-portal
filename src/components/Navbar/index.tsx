import { NavLink } from "react-router-dom";
import { Avatar, Button, IconArrowRight, IconChevronDown, IconHome, IconThreeDot, Menu, MenuItem, MenuLabel, MenuRightSlot, Navbar as StellarNavbar, NavbarBrand, NavbarBreakpoint, NavbarContent, NavbarMobileMenu } from "@nasa-jpl/react-stellar";
import { getHealthData } from "../../state/slices/healthSlice";
import { GetUsername, logout } from "../../utils/auth";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useEffect, } from "react";
import UnityLogo from "../../assets/unity.svg";

import Config from "../../Config";

export default function Navbar() {
  
  const dispatch = useAppDispatch();

  const loggedInUsername = GetUsername();
  const userInitials = loggedInUsername.substring(0,1).toUpperCase();
  const uiVersion = Config['general']['version'];

  const healthState = useAppSelector((state) => {
    return state.health;
  });

  const formatTitle = (title:string) => {

    let cleanedTitle = title;
    const charReplacements = {
      "_": " "
    }

    for( const [key, value] of Object.entries(charReplacements) ) {
      cleanedTitle = cleanedTitle.replace(key,value);
    }

    return cleanedTitle;
  }

  useEffect(() => {

    //let isMounted = true;

    if (healthState.status === "idle") {
      // Fetch the health data
      dispatch(getHealthData());
    } else if ( healthState.status === "pending" ) {
      // Do something to inform the user that the health data is being fetched
    } else if (healthState.status === "succeeded") {
      // Do something to handle the successful fetching of data
    } else if (healthState.status === "failed") {
      // Do something to handle the error
      console.log(healthState.error);
    }

    // Cleanup function
    return () => {
      //isMounted = false;
    };

  }, [dispatch, healthState]);

   return (
      <>
         <StellarNavbar mobileBreakpoint={800}>
            <NavbarBreakpoint min={1100}>
               <NavbarBrand
                  link="/"
                  logo={<img src={UnityLogo} alt="Unity Logo" style={{ height: '24px', width: '24px' }}/>}
                  title="Unity"
                  version={uiVersion}
               />
               <NavbarContent
                  align="right"
                  full
                  responsiveBreakpointMin={1100}
               >
                  <div
                     style={{
                        alignItems: 'center',
                        display: 'flex',
                        gap: 'var(--st-grid-unit2x)'
                     }}
                  >
                     <Menu trigger={
                        <Button size="large" style={{ gap: '4px', padding: '0 var(--st-grid-unit)' }} variant="tertiary">
                           <IconThreeDot />
                           <IconChevronDown />
                        </Button>
                     }>
                        <MenuItem>
                           <NavLink to="/">Home</NavLink>
                        </MenuItem>
                        <MenuItem>
                           <NavLink to="/jobs/monitoring">Job Monitoring</NavLink>
                        </MenuItem>
                        <MenuItem>
                           <NavLink to="/jobs/new">Create New Job</NavLink>
                        </MenuItem>
                        <MenuItem>
                           <NavLink to="/health-dashboard">Health Dashboard</NavLink>
                        </MenuItem>
                        <MenuItem>
                           <NavLink to="https://unity-sds.gitbook.io/docs/user-docs/unity-cloud/getting-started">Documentation (Gitbook)</NavLink>
                        </MenuItem>
                        {
                          healthState.items.map( (service, index) => {
                            return <MenuItem key={index}>
                              <NavLink to={"/applications/" + service.service}>{formatTitle(service.service)}</NavLink>
                            </MenuItem>
                          })
                        }
                     </Menu>
                     <Menu trigger={
                        <Button size="large" style={{ gap: '4px', padding: '0 var(--st-grid-unit)' }} variant="tertiary">
                           <Avatar text={userInitials} /><IconChevronDown />
                        </Button>
                     }>
                        <MenuLabel>
                           Welcome {loggedInUsername}
                        </MenuLabel>
                        <MenuItem>
                           Account Settings
                        </MenuItem>
                        <MenuItem onClick={logout}>
                           Logout
                           <MenuRightSlot>
                              <IconArrowRight />
                           </MenuRightSlot>
                        </MenuItem>
                     </Menu>
                  </div>
               </NavbarContent>
            </NavbarBreakpoint>
            <NavbarBreakpoint
               max={1100}
               min={800}
            >
               <NavbarBrand
                  link="/"
                  logo={<img src={UnityLogo} alt="Unity Logo" style={{ height: '24px', width: '24px' }}/>}
                  title="Unity"
                  version={uiVersion}
               />
               <NavbarContent
                  align="right"
                  full
               >
                  <div
                     style={{
                        alignItems: 'center',
                        display: 'flex',
                        gap: 'var(--st-grid-unit2x)'
                     }}
                  >
                     <Menu trigger={
                        <Button size="large" style={{ gap: '4px', padding: '0 var(--st-grid-unit)' }} variant="tertiary">
                           <IconThreeDot />
                           <IconChevronDown />
                        </Button>
                     }>
                        <MenuItem>
                           <NavLink to="/">Home</NavLink>
                        </MenuItem>
                        <MenuItem>
                           <NavLink to="/applications/catalog">Application Catalog</NavLink>
                        </MenuItem>
                        <MenuItem>
                           <NavLink to="/jobs/monitoring">Job Monitoring</NavLink>
                        </MenuItem>
                        <MenuItem>
                           <NavLink to="/jobs/new">Create New Job</NavLink>
                        </MenuItem>
                        <MenuItem>
                           <NavLink to="/health-dashboard">Health Dashboard</NavLink>
                        </MenuItem>
                        <MenuItem>
                           <NavLink to="https://unity-sds.gitbook.io/docs/user-docs/unity-cloud/getting-started">Documentation (Gitbook)</NavLink>
                        </MenuItem>
                        {
                          healthState.items.map( (service, index) => {
                            return <MenuItem key={index}>
                              <NavLink to={"/applications/" + service.service}>{formatTitle(service.service)}</NavLink>
                            </MenuItem>
                          })
                        }
                     </Menu>
                     <Menu trigger={
                        <Button size="large" style={{ gap: '4px', padding: '0 var(--st-grid-unit)' }} variant="tertiary">
                           <Avatar text={userInitials} />
                           <IconChevronDown />
                        </Button>}>
                        <MenuLabel>
                           Welcome {loggedInUsername}
                        </MenuLabel>
                        <MenuItem>
                           Account Settings
                        </MenuItem>
                        <MenuItem onClick={logout}>
                           Logout
                           <MenuRightSlot>
                              <IconArrowRight />
                           </MenuRightSlot>
                        </MenuItem>
                     </Menu>
                  </div>
               </NavbarContent>
            </NavbarBreakpoint>
            <NavbarBreakpoint max={800}>
               <NavbarContent
                  align="center"
                  full
               >
                  <NavbarBrand title="Unity" />
               </NavbarContent>
               <NavbarContent align="right">
                  <Menu trigger={
                     <Button size="large" style={{ gap: '4px', padding: '0 var(--st-grid-unit)' }} variant="tertiary">
                        <Avatar text={userInitials} />
                        <IconChevronDown />
                     </Button>}>
                     <MenuLabel>
                        Welcome {loggedInUsername}
                     </MenuLabel>
                     <MenuItem>
                        Account Settings
                     </MenuItem>
                     <MenuItem onClick={logout}>
                        Logout
                        <MenuRightSlot>
                           <IconArrowRight />
                        </MenuRightSlot>
                     </MenuItem>
                  </Menu>
               </NavbarContent>
            </NavbarBreakpoint>
            <NavbarMobileMenu>
               <NavLink to="/" className="st-react-navbar-link"><IconHome />{' '}Home</NavLink>
               <NavLink to="/applications/catalog" className="st-react-navbar-link">{' '}Application Catalog</NavLink>
               <NavLink to="/jobs/monitoring" className="st-react-navbar-link">{' '}Job Monitoring</NavLink>
               <NavLink to="/jobs/new" className="st-react-navbar-link">{' '}Create New Job</NavLink>
               <NavLink to="/health-dashboard" className="st-react-navbar-link">{' '}Health Dashboard</NavLink>
               <NavLink to="https://unity-sds.gitbook.io/docs/user-docs/unity-cloud/getting-started" className="st-react-navbar-link">{' '}Documentation (Gitbook)</NavLink>
               {
                  healthState.items.map( (service, index) => {
                    return <NavLink key={index} className="st-react-navbar-link" to={"/applications/" + service.service}>{formatTitle(service.service)}</NavLink>
                  })
               }
            </NavbarMobileMenu>
         </StellarNavbar>
      </>
   )
}
import { NavLink } from "react-router-dom";
import { Avatar, Button, IconArrowRight, IconChevronDown, IconHome, IconThreeDot, Menu, MenuItem, MenuLabel, MenuRightSlot, Navbar as StellarNavbar, NavbarBrand, NavbarBreakpoint, NavbarContent, NavbarMobileMenu } from "@nasa-jpl/react-stellar";
import { getHealthData } from "../../state/slices/healthSlice";
import { GetUsername } from "../../AuthorizationWrapper";
import { logout } from "../../utils/auth";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useEffect, } from "react";
import UnityLogo from "../../assets/unity.svg";

import Config from "../../Config";
import { formatRoute } from "../../utils/strings";

export default function Navbar() {
  
  const dispatch = useAppDispatch();

  const loggedInUsername = GetUsername();
  const userInitials = loggedInUsername.substring(0,1).toUpperCase();
  const uiVersion = Config['general']['version'];
  const basePath = Config['general']['base_path'];

  const healthState = useAppSelector((state) => {
    return state.health;
  });

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
                  link={basePath}
                  logo={<img src={basePath + UnityLogo} alt="Unity Logo" style={{ height: '24px', width: '24px' }}/>}
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
                           <NavLink to="/health-dashboard">Health Dashboard</NavLink>
                        </MenuItem>
                        {
                          healthState.items.map( (service, index) => {
                            return <MenuItem key={index}>
                              <NavLink to={"/applications/" + formatRoute(service.componentName)}>{service.componentName}</NavLink>
                            </MenuItem>
                          })
                        }
                        <MenuItem>
                           <NavLink to="https://unity-sds.gitbook.io/docs/user-docs/unity-cloud/getting-started">Documentation (Gitbook)</NavLink>
                        </MenuItem>
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
                  link={basePath}
                  logo={<img src={basePath + UnityLogo} alt="Unity Logo" style={{ height: '24px', width: '24px' }}/>}
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
                           <NavLink to="/health-dashboard">Health Dashboard</NavLink>
                        </MenuItem>
                        {
                          healthState.items.map( (service, index) => {
                            return <MenuItem key={index}>
                              <NavLink to={"/applications/" + formatRoute(service.componentName)}>{service.componentName}</NavLink>
                            </MenuItem>
                          })
                        }
                        <MenuItem>
                           <NavLink to="https://unity-sds.gitbook.io/docs/user-docs/unity-cloud/getting-started">Documentation (Gitbook)</NavLink>
                        </MenuItem>
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
               <NavLink to="/health-dashboard" className="st-react-navbar-link">{' '}Health Dashboard</NavLink>
               {
                 healthState.items.map( (service, index) => {
                   return <NavLink key={index} className="st-react-navbar-link" to={"/applications/" + formatRoute(service.componentName)}>{service.componentName}</NavLink>
                 })
               }
               <NavLink to="https://unity-sds.gitbook.io/docs/user-docs/unity-cloud/getting-started" className="st-react-navbar-link">{' '}Documentation (Gitbook)</NavLink>
            </NavbarMobileMenu>
         </StellarNavbar>
      </>
   )
}
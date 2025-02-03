import { NavLink } from "react-router-dom";
import { 
  Avatar, 
  Button, 
  IconArrowRight, 
  IconChevronDown, 
  IconHome, 
  IconThreeDot, 
  IconWarning, 
  Menu, 
  MenuItem, 
  MenuLabel, 
  MenuRightSlot, 
  Navbar as StellarNavbar, 
  NavbarBrand, 
  NavbarBreakpoint, 
  NavbarContent, 
  NavbarMobileMenu
} from "@nasa-jpl/react-stellar";
import { getHealthData } from "../../state/slices/healthSlice";
import { GetUsername } from "../../AuthorizationWrapper";
import { logout } from "../../utils/auth";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useEffect, useState, } from "react";
import MdpsLogo from "../../assets/images/mdps-logo.svg";

import Config from "../../Config";
import { formatRoute } from "../../utils/strings";

const MenuErrorMessage = ({message}:{message:string}) => {
  return <>
    <div className="st-react-menu-message"><IconWarning />{message}</div>
  </>
}

export default function Navbar() {

  const [healthApiError, setHealthApiError] = useState(false);
  const healthApiErrorMessage = "Application List Unavailable";
  
  const dispatch = useAppDispatch();

  const loggedInUsername = GetUsername();
  const userInitials = loggedInUsername.substring(0,1).toUpperCase();
  const uiVersion = Config['general']['version'];
  const basePath = Config['general']['base_path'];
  const appTitle = Config['general']['appTitle'];

  const healthState = useAppSelector((state) => {
    return state.health;
  });

  useEffect(() => {

    if (healthState.status === "idle") {
      // Fetch the health data
      dispatch(getHealthData());
    } else if ( healthState.status === "pending" ) {
      // Do something to inform the user that the health data is being fetched
    } else if (healthState.status === "succeeded") {
      // Do something to handle the successful fetching of data
    } else if (healthState.status === "failed") {
      // Do something to handle the error
      setHealthApiError(true);
    }

  }, [dispatch, healthState]);

   return (
      <>
         <StellarNavbar mobileBreakpoint={800}>
            <NavbarBreakpoint min={1100}>
               <NavbarBrand
                  link={basePath}
                  logo={<img src={basePath + MdpsLogo} alt={appTitle + " logo"} style={{ height: '24px', width: '24px' }}/>}
                  title={appTitle}
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
                        <NavLink to="/"><MenuItem>Home</MenuItem></NavLink>
                        <NavLink to="/health-dashboard"><MenuItem>Health Dashboard</MenuItem></NavLink>
                        {
                          healthState.items.map( (service, index) => {
                            return <NavLink to={"/applications/" + formatRoute(service.componentName)} key={index}>
                              <MenuItem>{service.componentName}</MenuItem>
                            </NavLink>
                          })
                        }
                        <NavLink to="https://unity-sds.gitbook.io/docs" target="_blank">
                          <MenuItem>Documentation (Gitbook)</MenuItem>
                        </NavLink>
                        {
                          healthApiError && <MenuErrorMessage message={healthApiErrorMessage} />
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
                  link={basePath}
                  logo={<img src={basePath + MdpsLogo} alt={appTitle + " logo"} style={{ height: '24px', width: '24px' }}/>}
                  title={appTitle}
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
                        <NavLink to="/"><MenuItem>Home</MenuItem></NavLink>
                        <NavLink to="/health-dashboard"><MenuItem>Health Dashboard</MenuItem></NavLink>
                        {
                          healthState.items.map( (service, index) => {
                            return <NavLink to={"/applications/" + formatRoute(service.componentName)} key={index}>
                              <MenuItem>{service.componentName}</MenuItem>
                            </NavLink>
                          })
                        }
                        <NavLink to="https://unity-sds.gitbook.io/docs" target="_blank">
                          <MenuItem>Documentation (Gitbook)</MenuItem>
                        </NavLink>
                        {
                          healthApiError && <MenuErrorMessage message={healthApiErrorMessage} />
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
                  <NavbarBrand title={appTitle} />
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
               <NavLink to="https://unity-sds.gitbook.io/docs" target="_blank" className="st-react-navbar-link">{' '}Documentation (Gitbook)</NavLink>
               {
                healthApiError && <MenuErrorMessage message={healthApiErrorMessage} />
               }
            </NavbarMobileMenu>
         </StellarNavbar>
      </>
   )
}
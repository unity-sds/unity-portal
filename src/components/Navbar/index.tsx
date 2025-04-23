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
import { GetUsername } from "../../AuthorizationWrapper";
import { logout } from "../../utils/auth";
import { useAppSelector } from "../../state/hooks";
import { useEffect, useState, } from "react";
import { getUiItems } from "../../state/selectors/healthSelectors";
import { Service } from "../../state/slices/healthSlice";
import MdpsLogo from "../../assets/images/mdps-logo.svg";

import Config from "../../Config";

const MenuErrorMessage = ({message}:{message:string}) => {
  return <div className="st-react-menu-message"><IconWarning />{message}</div>
}

export default function Navbar() {

  const [healthApiError, setHealthApiError] = useState(false);
  const healthApiErrorMessage = "Application List Unavailable";

  const loggedInUsername = GetUsername();
  const userInitials = loggedInUsername.substring(0,1).toUpperCase();
  const uiVersion = Config['general']['version'];
  const basePath = Config['general']['basePath'];
  const appTitle = Config['general']['appTitle'];
  const project = Config['general']['project'];
  const venue = Config['general']['venue'];

  const healthState = useAppSelector((state) => {
    return state.health;
  });

  const uiItems:Service[] = useAppSelector((state) => { 
    return getUiItems(state.health);
  });

  useEffect(() => {

    if (healthState.status === "failed") {
      // Do something to handle the error
      setHealthApiError(true);
    }

  }, [healthState]);



  return (
    <StellarNavbar mobileBreakpoint={800}>
      <NavbarBreakpoint min={1100}>
        <NavbarBrand
          link={basePath}
          logo={<img src={basePath + MdpsLogo} alt={appTitle + " logo"} style={{ height: '24px', width: '24px' }}/>}
          title={appTitle}
          version={uiVersion}
        />
        <div className="st-react-navbar-label">Project: {project}</div>
        <div className="st-react-navbar-label">Venue: {venue}</div>
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
              {
                uiItems.map( (service, index) => {
                  return <NavLink to={service.route} key={index}>
                    <MenuItem>{service.componentName}</MenuItem>
                  </NavLink>
                })
              }
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
        <div className="st-react-navbar-label">Project: {project}</div>
        <div className="st-react-navbar-label">Venue: {venue}</div>
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
              {
                uiItems.map( (service, index) => {
                  return <NavLink to={service.route} key={index}>
                    <MenuItem>{service.componentName}</MenuItem>
                  </NavLink>
                })
              }
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
            <MenuLabel>
              MDPS Environment
            </MenuLabel>
            <MenuItem disabled className="text-transform-none">
              Project: {project}
            </MenuItem>
            <MenuItem disabled className="text-transform-none">
              Venue: {venue}
            </MenuItem>
          </Menu>
        </NavbarContent>
      </NavbarBreakpoint>
      <NavbarMobileMenu>
        <NavLink to="/" className="st-react-navbar-link"><IconHome />{' '}Home</NavLink>
        {
          uiItems.map( (service, index) => {
            return <NavLink key={index} className="st-react-navbar-link" to={service.route}>{service.componentName}</NavLink>
          })
        }
        {
        healthApiError && <MenuErrorMessage message={healthApiErrorMessage} />
        }
      </NavbarMobileMenu>
    </StellarNavbar>
  )
}
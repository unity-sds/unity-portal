import { NavLink } from "react-router-dom";
import { Avatar, Button, IconArrowRight, IconChevronDown, IconHome, IconThreeDot, Menu, MenuItem, MenuLabel, MenuRightSlot, Navbar as StellarNavbar, NavbarBrand, NavbarBreakpoint, NavbarContent, NavbarLink, NavbarMobileMenu } from "@nasa-jpl/react-stellar";
import { logout, getUsername } from "../../AuthenticationWrapper";
import UnityLogo from "../../assets/unity.svg";

import Config from "../../Config";

export default function Navbar() {

   const loggedInUsername = getUsername()
   const userInitials = loggedInUsername.substring(0,1).toUpperCase();
   const uiVersion = Config['general']['version'];

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
                        <MenuLabel>Development</MenuLabel>
                        <MenuItem>Jupyter</MenuItem>
                        <MenuItem>GitHub</MenuItem>
                        <MenuLabel>Catalogs</MenuLabel>
                        <MenuItem>
                           <NavLink to="/applications/catalog">Application Catalog</NavLink>
                        </MenuItem>
                        <MenuItem>Data Catalog</MenuItem>
                        <MenuLabel>Processing</MenuLabel>
                        <MenuItem>
                           <NavLink to="/jobs/monitoring">Job Monitoring</NavLink>
                        </MenuItem>
                        <MenuItem>
                           <NavLink to="/jobs/new">Create New Job</NavLink>
                        </MenuItem>
                        <MenuLabel>Infrastructure</MenuLabel>
                        <MenuItem>
                           <NavLink to="/health">Health</NavLink>
                        </MenuItem>
                        <MenuItem>HySDS</MenuItem>
                        <MenuItem>ADES Deployments</MenuItem>
                        <MenuItem>GitHub Actions</MenuItem>
                        <MenuLabel>Administration</MenuLabel>
                        <MenuItem>
                           <NavLink to="https://unity-sds.gitbook.io/docs/user-docs/unity-cloud/getting-started">Documentation (Gitbook)</NavLink>
                        </MenuItem>
                        <MenuItem>Kion</MenuItem>
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
                        <MenuLabel>Development</MenuLabel>
                        <MenuItem>Jupyter</MenuItem>
                        <MenuItem>GitHub</MenuItem>
                        <MenuLabel>Catalogs</MenuLabel>
                        <MenuItem>
                           <NavLink to="/applications/catalog">Application Catalog</NavLink>
                        </MenuItem>
                        <MenuItem>Data Catalog</MenuItem>
                        <MenuLabel>Processing</MenuLabel>
                        <MenuItem>
                           <NavLink to="/jobs/monitoring">Job Monitoring</NavLink>
                        </MenuItem>
                        <MenuItem>
                           <NavLink to="/jobs/new">Create New Job</NavLink>
                        </MenuItem>
                        <MenuLabel>Infrastructure</MenuLabel>
                        <MenuItem>
                           <NavLink to="/health">Health</NavLink>
                        </MenuItem>
                        <MenuItem>HySDS</MenuItem>
                        <MenuItem>ADES Deployments</MenuItem>
                        <MenuItem>GitHub Actions</MenuItem>
                        <MenuLabel>Administration</MenuLabel>
                        <MenuItem>
                           <NavLink to="https://unity-sds.gitbook.io/docs/user-docs/unity-cloud/getting-started">Documentation (Gitbook)</NavLink>
                        </MenuItem>
                        <MenuItem>Kion</MenuItem>
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
               <NavbarLink href="/">
                  <IconHome />
                  {' '}Home
               </NavbarLink>
               <MenuLabel>Development</MenuLabel>
               <NavbarLink href="/">
                  {' '}Jupyter
               </NavbarLink>
               <NavbarLink href="/">
                  {' '}GitHub
               </NavbarLink>
               <MenuLabel>Catalogs</MenuLabel>
               <NavbarLink href="/applications/catalog">
                  {' '}Application Catalog
               </NavbarLink>
               <NavbarLink href="/">
                  {' '}Data Catalog
               </NavbarLink>
               <MenuLabel>Processing</MenuLabel>
               <NavLink to="/jobs/monitoring" className="st-react-navbar-link">{' '}Job Monitoring</NavLink>
               <NavLink to="/jobs/new" className="st-react-navbar-link">{' '}Create New Job</NavLink>
               <MenuLabel>Infrastructure</MenuLabel>
               <NavLink to="/health" className="st-react-navbar-link">{' '}Health</NavLink>
               <NavbarLink href="/">
                  {' '}HySDS
               </NavbarLink>
               <NavbarLink href="/">
                  {' '}ADES Deployments
               </NavbarLink>
               <NavbarLink href="/">
                  {' '}GitHub Actions
               </NavbarLink>
               <MenuLabel>Administration</MenuLabel>
               <NavbarLink href="https://unity-sds.gitbook.io/docs/user-docs/unity-cloud/getting-started">
                  {' '}Documentation (Gitbook)
               </NavbarLink>
               <NavbarLink href="/">
                  {' '}Kion
               </NavbarLink>
            </NavbarMobileMenu>
         </StellarNavbar>
      </>
   )
}
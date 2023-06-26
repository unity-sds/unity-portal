import { NavLink } from "react-router-dom";
import { Avatar, Button, IconArrowRight, IconChevronDown, IconHome, IconThreeDot, Menu, MenuItem, MenuLabel, MenuRightSlot, Navbar as StellarNavbar, NavbarBrand, NavbarBreakpoint, NavbarContent, NavbarLink, NavbarMobileMenu } from "@nasa-jpl/react-stellar"
import { logout } from "../../AuthenticationWrapper";

export default function Navbar() {
   return (
      <>
         <StellarNavbar mobileBreakpoint={800}>
            <NavbarBreakpoint min={1100}>
               <NavbarBrand
                  link="/"
                  logo={<img src="/unity.svg" alt="Unity Logo" style={{ height: '24px', width: '24px' }}/>}
                  title="Unity"
                  version="1.0.0"
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
                           <NavLink to="/jobs/monitoring">Jobs</NavLink>
                        </MenuItem>
                        <MenuLabel>Infrastructure</MenuLabel>
                        <MenuItem>HySDS</MenuItem>
                        <MenuItem>ADES Deployments</MenuItem>
                        <MenuItem>GitHub Actions</MenuItem>
                        <MenuLabel>Administration</MenuLabel>
                        <MenuItem>Kion</MenuItem>
                     </Menu>
                     <Menu trigger={
                        <Button size="large" style={{ gap: '4px', padding: '0 var(--st-grid-unit)' }} variant="tertiary">
                           <Avatar text="K" /><IconChevronDown />
                        </Button>
                     }>
                        <MenuLabel>
                           Welcome kjaneway
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
                  logo={<img src="/unity.svg" alt="Unity Logo" style={{ height: '24px', width: '24px' }}/>}
                  title="Unity"
                  version="1.0.0"
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
                           <NavLink to="/jobs/monitoring">Jobs</NavLink>
                        </MenuItem>
                        <MenuLabel>Infrastructure</MenuLabel>
                        <MenuItem>HySDS</MenuItem>
                        <MenuItem>ADES Deployments</MenuItem>
                        <MenuItem>GitHub Actions</MenuItem>
                        <MenuLabel>Administration</MenuLabel>
                        <MenuItem>Kion</MenuItem>
                     </Menu>
                     <Menu trigger={
                        <Button size="large" style={{ gap: '4px', padding: '0 var(--st-grid-unit)' }} variant="tertiary">
                           <Avatar text="K" />
                           <IconChevronDown />
                        </Button>}>
                        <MenuLabel>
                           Welcome kjaneway
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
                        <Avatar text="K" />
                        <IconChevronDown />
                     </Button>}>
                     <MenuLabel>
                        Welcome kjaneway
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
               <NavbarLink href="/jobs/monitoring">
                  {' '}Jobs
               </NavbarLink>
               <MenuLabel>Infrastructure</MenuLabel>
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
               <NavbarLink href="/">
                  {' '}Kion
               </NavbarLink>
            </NavbarMobileMenu>
         </StellarNavbar>
      </>
   )
}
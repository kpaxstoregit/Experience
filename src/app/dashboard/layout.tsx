'use client';

import '@/app/globals.css';
import { useTheme } from '@/hooks/useTheme';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LayersIcon from '@mui/icons-material/Layers';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpen from '@mui/icons-material/MenuOpen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Box,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import React, { useState } from 'react';
import ColorChangeToggle from '../../../components/ColorChangeToogle';

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const NAVIGATION = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { title: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
  { kind: 'divider' },
  {
    title: 'Analytics',
    icon: <BarChartIcon />,
    children: [
      { title: 'Sales', path: '/analytics/sales' },
      { title: 'Traffic', path: '/analytics/traffic' }
    ]
  },
  { title: 'Integrations', icon: <LayersIcon />, path: '/integrations' }
];

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [drawerOpen, setDrawerOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );

  const { darkMode, toggleDarkMode, theme } = useTheme();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleSubMenu = (menu: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {NAVIGATION.map((item, index) => {
          if (item.kind === 'divider') {
            return <Divider key={index} />;
          }
          if (item.children) {
            const isOpen = expandedMenus[item.title] || false;
            return (
              <div key={item.title}>
                <ListItem button onClick={() => toggleSubMenu(item.title)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {drawerOpen && <ListItemText primary={item.title} />}
                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={isOpen} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    {item.children.map((child) => (
                      <ListItem
                        button
                        key={child.title}
                        component={Link}
                        href={child.path}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={child.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            );
          }
          return (
            <ListItem button key={item.title} component={Link} href={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {drawerOpen && <ListItemText primary={item.title} />}
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <html lang='pt-br'>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            {/* AppBar */}
            <AppBar
              position='fixed'
              color='default'
              sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1
              }}
            >
              <Toolbar>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  edge='start'
                  onClick={toggleDrawer}
                  sx={{ mr: 2 }}
                >
                  <>{drawerOpen ? <MenuOpen /> : <MenuIcon />}</>
                </IconButton>
                <Typography variant='h5' fontWeight='800'>
                  EXP
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <ColorChangeToggle
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
              variant={isMobile ? 'temporary' : 'permanent'}
              open={drawerOpen}
              sx={{
                width: drawerOpen ? drawerWidth : collapsedDrawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerOpen ? drawerWidth : collapsedDrawerWidth,
                  transition: 'width 0.32s',
                  overflowX: 'hidden'
                }
              }}
            >
              {drawer}
            </Drawer>

            {/* Main Content */}
            <Box
              bgcolor={'#F8F7FA'}
              minHeight={'100vh'}
              component='main'
              sx={{
                flexGrow: 1,
                width: `calc(100% - ${
                  drawerOpen ? drawerWidth : collapsedDrawerWidth
                }px)`,
                transition: 'margin-left 0.3s'
              }}
            >
              <Toolbar />
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}

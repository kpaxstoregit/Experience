'use client';

import '@/app/globals.css';
import { useTheme } from '@/hooks/useTheme';
import useAuthVerify from '@/hooks/useVerifyAuth';
import { useAuthStore } from '@/store/authStore';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuOpen from '@mui/icons-material/MenuOpen';
import { collection } from 'firebase/firestore';
import React from 'react';
import { preload, SWRConfig } from 'swr';

import { db } from '@/lib/firebase';
import {
  AppBar,
  Box,
  Button,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useState } from 'react';
import ColorChangeToggle from '../../../components/ColorChangeToogle';

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const NAVIGATION = [
  { title: 'Dashboard', icon: <DashboardIcon />, route: '/dashboard' },

  { kind: 'divider' },
  {
    title: 'Analytics',
    icon: <BarChartIcon />,
    children: [
      { title: 'Perfil', path: '/dashboard/perfil' },
      { title: 'Configurações', path: '/dashboard/configuracoes' }
    ]
  }
];

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const { user, logout } = useAuthStore();

  useAuthVerify();

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
                <ListItem onClick={() => toggleSubMenu(item.title)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {drawerOpen && <ListItemText primary={item.title} />}
                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={isOpen} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    {item.children.map((child) => (
                      <ListItem
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
            <Link key={item.title} href=''>
              <ListItem>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {drawerOpen && <ListItemText primary={item.title} />}
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );

  return (
    <html lang='pt-br'>
      <body>
        <ThemeProvider theme={theme}>
          <SWRConfig
            value={{
              fetcher: (url) => fetch(url).then((res) => res.json())
            }}
          >
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
                  <Box>
                    <Typography
                      variant='h6'
                      fontWeight='700'
                      color='primary'
                      my={2}
                    >
                      {' '}
                      {user?.email}{' '}
                    </Typography>
                  </Box>
                  <ColorChangeToggle
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                  <Button
                    sx={{ ml: 1 }}
                    variant='text'
                    color='secondary'
                    onClick={logout}
                  >
                    Sair
                  </Button>
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
                <Paper
                  elevation={0}
                  sx={{ minHeight: '100vh', justifyContent: 'center' }}
                >
                  <Stack maxWidth={'lg'} margin={'0 auto'}>
                    {/* Utilizado o main pra manter a constancia da semantica */}
                    <main>{children}</main>
                  </Stack>
                </Paper>
              </Box>
            </Box>
          </SWRConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}

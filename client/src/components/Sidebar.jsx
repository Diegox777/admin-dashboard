import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  Groups2Outlined,
  HomeOutlined,
  PieChartOutline,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from '../assets/profile.jpg';

const navItems = [
  {
    text: 'Dashboard',
    icon: <HomeOutlined />
  },
  {
    text: 'Client Facing',
    icon: null
  },
  {
    text: 'Products',
    icon: <ShoppingCartOutlined />
  },
  {
    text: 'Customers',
    icon: <Groups2Outlined />
  },
  {
    text: 'Transactions',
    icon: <ReceiptLongOutlined />
  },
  {
    text: 'Geography',
    icon: <PublicOutlined />
  },
  {
    text: 'Overview',
    icon: <PointOfSaleOutlined />
  },
  {
    text: 'Daily',
    icon: <TodayOutlined />
  },
  {
    text: 'Monthly',
    icon: <CalendarMonthOutlined />
  },
  {
    text: 'Breakdown',
    icon: <PieChartOutline />
  },
  {
    text: 'Management',
    icon: null
  },
  {
    text: 'Admin',
    icon: <AdminPanelSettingsOutlined />
  },
  {
    text: 'Performance',
    icon: <TrendingUpOutlined />
  },    
];

const Sidebar = ({ user, drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const { pathname } = useLocation();
  
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleNavItemClick = text => {
    navigate(`/${text}`);
    setActive(text);
  } 

  return (
    <Box component='nav'>
      {
        isSidebarOpen && (
          <Drawer
            transitionDuration={1}
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant='persistent'
            anchor='left'
            sx={{
              width: drawerWidth,
              '& .MuiDrawer-paper': {
                color: theme.palette.secondary[100],
                backgroundColor: theme.palette.background.alt,
                boxSizing: 'border-box',
                borderWidth: isNonMobile ? 0 : '2px',
                width: drawerWidth
              }
            }}
          >
            <Box width={'100%'}>
              <Box m={'1.5rem 2rem 2rem 3rem'}>
                <FlexBetween color={theme.palette.secondary.main}>
                  <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                    <Typography variant='h4' fontWeight='bold' color={theme.palette.secondary[500]} sx={{ fontSize: '1.6rem'}}>
                      DIEGOX
                    </Typography>
                  </Box>
                  {
                    !isNonMobile && (
                      <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <ChevronLeft/>
                      </IconButton>
                    )
                  }
                </FlexBetween>
              </Box>
              <List>
                  {
                    navItems.map(({ text, icon }) => {
                      if (icon === null) {
                        return  (<Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem'}}>{text}</Typography>);
                      }
                      const lowerCasedText = text.toLocaleLowerCase();
                      return (
                        <ListItem key={text} disablePadding >
                          <ListItemButton 
                            onClick={() => handleNavItemClick(lowerCasedText)} 
                            sx={{ 
                              backgroundColor: active === lowerCasedText ? theme.palette.secondary[500] : 'transparent',
                              ":hover": {
                                '& .MuiListItemText-primary': {color: theme.palette.primary[50]},
                                '& .MuiSvgIcon-fontSizeMedium': {color: theme.palette.primary[50]},
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                ml: '2rem',
                                color: active === lowerCasedText ? theme.palette.primary[800] : theme.palette.secondary[400]
                              }}
                            >
                              { icon }
                            </ListItemIcon>
                            <ListItemText 
                              primary={text} 
                              sx={{ 
                                color: active === lowerCasedText ? theme.palette.primary[800] : theme.palette.secondary[400],
                                '& MuiTypography-root': {
                                  color: 'white' 
                                }
                              }}/>
                            {
                              active === lowerCasedText && (
                                <ChevronRightOutlined 
                                  sx={{
                                    ml: 'auto', 
                                    color: active === lowerCasedText ? theme.palette.primary[800] : theme.palette.secondary[400] 
                                  }} 
                                />
                              )
                            }
                          </ListItemButton>
                        </ListItem>
                      );
                    })
                  }
              </List>
            </Box>
            <Box position={'absolute'} bottom={'2rem'}>
              <Divider />
              <FlexBetween textTransform={'none'} gap={'1rem'} m={'1.5rem 2rem 0 3rem'}>
                  <Box component={'img'} alt='profile' src={profileImage} height={'40px'} width={'40px'} borderRadius={'50%'} sx={{ objectFit: 'cover' }}/>
                  <Box textAlign={'left'}>
                    <Typography fontWeight={'bold'} fontSize={'0.9rem'} sx={{ color: theme.palette.secondary[100] }}>
                      { user.name }
                    </Typography>
                    <Typography fontWeight={'bold'} fontSize={'0.8rem'} sx={{ color: theme.palette.secondary[200] }}>
                      { user.occupation }
                    </Typography>
                  </Box>
                  <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: '25px' }} />

              </FlexBetween>
            </Box>
          </Drawer>
        )
      }
    </Box>
  );
};

export default Sidebar;

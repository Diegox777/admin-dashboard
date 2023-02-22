import { Box, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useGetUserQuery } from '../../state/api';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';
import useLoader from '../../hooks/useLoader';

const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width: 500px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector(state => state.global.userId);
  const { data } = useGetUserQuery(userId);
  const isLoading = useLoader();
  return (
    <Box display={ isNonMobile ? 'flex' : 'block'} width={'100%'} height={'100%'} position={'relative'}>
      {
        isLoading && (<Loading />)
      }
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth='250px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}        
        />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout;
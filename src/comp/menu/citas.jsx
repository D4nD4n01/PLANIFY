/* Citas.jsx */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import Dates from './dates/Dates';
import RejectDate from './dates/RejectDate';
import PendingDate from './dates/PendingDate';

const Citas = () => {
  const [tab, setTab] = useState(0);
  const [tipoCuenta, setTipoCuenta] = useState(null);
  const userID = localStorage.getItem('UserID');

  useEffect(() => {
    const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    const cuentaActiva = cuentas.find(c => c.id?.toString() === userID);
    setTipoCuenta(cuentaActiva?.tipo || null);
  }, [userID]);

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>Gestión de Citas</Typography>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Citas Confirmadas" />
        <Tab label="Citas Rechazadas" />
        <Tab label="Citas por Aceptar" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && <Dates userID={userID} tipoCuenta={tipoCuenta} />}
        {tab === 1 && <RejectDate userID={userID} tipoCuenta={tipoCuenta} />}
        {tab === 2 && <PendingDate userID={userID} tipoCuenta={tipoCuenta} />}
      </Box>
    </Box>
  );
};

export default Citas;
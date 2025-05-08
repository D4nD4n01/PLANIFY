import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const RejectDate = ({ userID, tipoCuenta }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const allNoDates = JSON.parse(localStorage.getItem('NoDates')) || [];
    let data = [];
    if (tipoCuenta == 1) {
      data = allNoDates.filter(d => d.idClient.toString() === userID);
    } else if (tipoCuenta == 2) {
      data = allNoDates.filter(d => d.idEmpresa.toString() === userID);
    }

    setRows(data.map((item, index) => ({ id: index, ...item })));
  }, [userID,tipoCuenta]);

  const columns = tipoCuenta == 1 ?
    [
      { field: 'motivo', headerName: 'Motivo', flex: 1 },
      { field: 'fecha', headerName: 'Fecha', flex: 1 },
      { field: 'strEmpresa', headerName: 'Empresa', flex: 1 },
    ]
    :
    [
      { field: 'motivo', headerName: 'Motivo', flex: 1 },
      { field: 'fecha', headerName: 'Fecha', flex: 1 },
      { field: 'strClient', headerName: 'Cliente', flex: 1 },
    ]

  return (
    <Box sx={{ height: 400, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </Box>
  );
};

export default RejectDate;
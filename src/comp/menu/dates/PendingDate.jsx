import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const PendingDate = ({ userID, tipoCuenta }) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const raw = localStorage.getItem('solicitudCitas');
        let solicitudes = [];
        try {
          solicitudes = raw ? JSON.parse(raw) : [];
        } catch {
          console.error('Error parseando solicitudCitas');
        }
      
        const uid   = String(userID).trim();
        const tipo  = Number(tipoCuenta); // asegúrate de que venga como string o number
        const filtradas = solicitudes.filter(s => {
          const clientId  = String(s.idClient).trim();
          const empresaId = String(s.idEmpresa).trim();
          return (tipo === 1 && clientId === uid)
              || (tipo === 2 && empresaId === uid);
        });
      
        setRows(filtradas.map((item, index) => ({ id: index, ...item })));
      }, [userID, tipoCuenta]);
      
    const handleAccion = (row, aceptar) => {

        const key = aceptar ? 'Dates' : 'NoDates';
        const almacen = JSON.parse(localStorage.getItem(key)) || [];
        almacen.push({ fecha: row.fecha, idClient: row.idClient, idEmpresa: row.idEmpresa,strEmpresa: row.strEmpresa,
             strClient: row.strClient, motivo:row.motivo });
        localStorage.setItem(key, JSON.stringify(almacen));

        // Actualizar solicitudes
        const all = JSON.parse(localStorage.getItem('solicitudCitas')) || [];
        const restantesAll = all.filter(s => !(s.fecha === row.fecha && s.idClient === row.idClient && s.idEmpresa === row.idEmpresa));
        const restantes = rows.filter(s => !(s.fecha === row.fecha && s.idClient === row.idClient && s.idEmpresa === row.idEmpresa));
        setRows(restantes)
        localStorage.setItem('solicitudCitas', JSON.stringify(restantesAll));

        
    };

    const columns = tipoCuenta == 1? 
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
        {
            field: 'acciones', headerName: 'Acciones', flex: 1.5, renderCell: params => (
                <>
                    <Button size="small" variant="contained" sx={{ mr: 1 }} onClick={() => handleAccion(params.row, true)}>Confirmar</Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => handleAccion(params.row, false)}>Rechazar</Button>
                </>
            )
        }
    ]

    return (
        <Box sx={{ height: 400, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
        </Box>
    );
};

export default PendingDate;

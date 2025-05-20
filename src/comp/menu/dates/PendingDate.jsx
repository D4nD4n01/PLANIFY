import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

const PendingDate = ({ userID, tipoCuenta }) => {
  const [rows, setRows] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('solicitudCitas');
    let solicitudes = [];
    try {
      solicitudes = raw ? JSON.parse(raw) : [];
    } catch {
      console.error('Error parseando solicitudCitas');
    }

    const uid = String(userID).trim();
    const tipo = Number(tipoCuenta);
    const filtradas = solicitudes.filter(s => {
      const clientId = String(s.idClient).trim();
      const empresaId = String(s.idEmpresa).trim();
      return (tipo === 1 && clientId === uid) || (tipo === 2 && empresaId === uid);
    });

    setRows(filtradas.map((item, index) => ({ id: index, ...item })));
  }, [userID, tipoCuenta]);

  const handleAccion = (row, aceptar) => {
    const key = aceptar ? 'Dates' : 'NoDates';
    const almacen = JSON.parse(localStorage.getItem(key)) || [];
    almacen.push({
      fecha: row.fecha,
      idClient: row.idClient,
      idEmpresa: row.idEmpresa,
      strEmpresa: row.strEmpresa,
      strClient: row.strClient,
      motivo: row.motivo
    });
    localStorage.setItem(key, JSON.stringify(almacen));

    const all = JSON.parse(localStorage.getItem('solicitudCitas')) || [];
    const restantesAll = all.filter(s => !(s.fecha === row.fecha && s.idClient === row.idClient && s.idEmpresa === row.idEmpresa));
    const restantes = rows.filter(s => !(s.fecha === row.fecha && s.idClient === row.idClient && s.idEmpresa === row.idEmpresa));
    setRows(restantes);
    localStorage.setItem('solicitudCitas', JSON.stringify(restantesAll));
  };

  const handleCancelar = (row) => {
    const all = JSON.parse(localStorage.getItem('solicitudCitas')) || [];
    const nuevas = all.filter(
      s => !(s.fecha === row.fecha && s.idClient === row.idClient && s.idEmpresa === row.idEmpresa)
    );
    localStorage.setItem('solicitudCitas', JSON.stringify(nuevas));
    setRows(prev => prev.filter(
      s => !(s.fecha === row.fecha && s.idClient === row.idClient && s.idEmpresa === row.idEmpresa)
    ));
  };

  const handleEditar = (row) => {
    setEditData({ ...row, originalFecha: row.fecha });
    setEditOpen(true);
  };

  const columns = tipoCuenta == 1
    ? [
      { field: 'motivo', headerName: 'Motivo', flex: 1 },
      { field: 'fecha', headerName: 'Fecha', flex: 1 },
      { field: 'strEmpresa', headerName: 'Empresa', flex: 1 },
      {
        field: 'acciones',
        headerName: 'Acciones',
        flex: 2,
        renderCell: (params) => (
          <>
            <Button
              size="small"
              variant="outlined"
              sx={{ mr: 1 }}
              onClick={() => handleEditar(params.row)}
            >
              Modificar
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => handleCancelar(params.row)}
            >
              Cancelar
            </Button>
          </>
        ),
      }
    ]
    : [
      { field: 'motivo', headerName: 'Motivo', flex: 1 },
      { field: 'fecha', headerName: 'Fecha', flex: 1 },
      { field: 'strClient', headerName: 'Cliente', flex: 1 },
      {
        field: 'acciones',
        headerName: 'Acciones',
        flex: 1.5,
        renderCell: params => (
          <>
            <Button size="small" variant="contained" sx={{ mr: 1 }} onClick={() => handleAccion(params.row, true)}>Confirmar</Button>
            <Button size="small" variant="outlined" color="error" onClick={() => handleAccion(params.row, false)}>Rechazar</Button>
          </>
        )
      }
    ];

  return (
    <>
      {/* Modal para editar cita */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Cita</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Motivo"
            margin="dense"
            value={editData?.motivo || ''}
            onChange={(e) => setEditData({ ...editData, motivo: e.target.value })}
          />
          <TextField
            fullWidth
            type="date"
            margin="dense"
            label="Fecha"
            value={editData?.fecha || ''}
            onChange={(e) => setEditData({ ...editData, fecha: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={() => {
              const all = JSON.parse(localStorage.getItem('solicitudCitas')) || [];
              const actualizadas = all.map(s => {
                if (
                  s.fecha === editData.originalFecha &&
                  s.idClient === editData.idClient &&
                  s.idEmpresa === editData.idEmpresa
                ) {
                  return { ...s, motivo: editData.motivo, fecha: editData.fecha };
                }
                return s;
              });
              localStorage.setItem('solicitudCitas', JSON.stringify(actualizadas));
              setRows(actualizadas.map((item, i) => ({ id: i, ...item })));
              setEditOpen(false);
            }}
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tabla de citas */}
      <Box sx={{ height: 400, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      </Box>
    </>
  );
};

export default PendingDate;


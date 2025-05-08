import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const GenerateDate = ({ show, onClose, empresa }) => {
    const [motivo, setMotivo] = useState('');
    const [fecha, setFecha] = useState('');
    const hoy = new Date().toISOString().split('T')[0];
    const [cuenta, setCuenta] = useState([])

    const handleGuardarCita = () => {
        if (!motivo.trim() || !fecha) {
            alert('Por favor completa todos los campos antes de guardar la cita.');
            return;
        }

        const userID = localStorage.getItem('UserID')

        const nuevaCita = {
            idEmpresa: empresa.idEmpresa,
            strEmpresa: empresa.nombreLocal,
            idClient: cuenta.id,
            strClient: cuenta.username,
            motivo,
            fecha,
        };

        const citasPrevias = JSON.parse(localStorage.getItem('solicitudCitas')) || [];
        const citasActualizadas = [...citasPrevias, nuevaCita];
        localStorage.setItem('solicitudCitas', JSON.stringify(citasActualizadas));

        // Limpiar y cerrar modal
        setMotivo('');
        setFecha('');
        onClose();
    };

    useEffect(() => {
        const cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
        const userID = localStorage.getItem('UserID');
        const cuentaActiva = cuentas.find(c => c.id?.toString() === userID);
        console.log("cuenta activa: ", cuentaActiva)
        setCuenta(cuentaActiva)
      }, []);

    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            backdrop="static"
            keyboard={false}
            dialogClassName="rounded shadow"
            contentClassName="border-0"
            container={document.body}
        >
            <Modal.Header closeButton>
                <Modal.Title>Solicitar cita en {empresa?.nombreLocal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Motivo de cita</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Motivo"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Día de cita</Form.Label>
                        <Form.Control
                            type="date"
                            min={hoy}
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />

                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleGuardarCita}>
                    Guardar cita
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GenerateDate;

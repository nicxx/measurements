import { Add, ChevronRight, Delete, Edit, Home } from '@mui/icons-material';
import { Alert, Box, Container, Fab, IconButton, Link, Stack, Tooltip } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { enqueueSnackbar } from 'notistack';
import { FC, ReactElement, useEffect, useState } from "react";
import Breadcrumb from '../components/breadcrumb';
import TableRowsLoader from '../components/table-loader';
import { Device } from '../domain/api-response';
import DeviceService from '../services/DeviceService';

const DeviceList: FC = (): ReactElement => {

    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deviceId, setDeviceId] = useState('');
    const [deviceName, setDeviceName] = useState('');

    useEffect(() => {
        loadDeviceList();
    }, []);

    const loadDeviceList = () => {
        setLoading(true);
        DeviceService.getAll()
            .then((response) => setDevices(response.data.content))
            .catch((e) => {
                enqueueSnackbar('There was an error loading the device list.', { variant: 'error' });
                console.error('There was an error: ', e);
            })
            .finally(() => setLoading(false));
    }

    const handleEditOpen = (deviceId: string, deviceName: string) => {
        setDeviceId(deviceId);
        setDeviceName(deviceName);
        setEditDialogOpen(true);
    };

    const handleCreateOpen = () => {
        setDeviceName('');
        setDeviceId('');
        setEditDialogOpen(true);
    }

    const handleDeleteOpen = (deviceId: string, deviceName: string) => {
        setDeviceId(deviceId);
        setDeviceName(deviceName);
        setDeleteDialogOpen(true);
    }

    const handleConfirmEdit = () => {
        if (!deviceName) {
            return;
        }

        DeviceService.save({ id: deviceId, name: deviceName })
            .then(() => {
                enqueueSnackbar('Device was saved.', { variant: 'success' });
            })
            .catch((e) => {
                console.error('Error saving device: ', e);
                enqueueSnackbar('There was an error saving the device.', { variant: 'error' });
            })
            .finally(() => {
                setEditDialogOpen(false);
                setDeviceName('');
                setDeviceId('');
                loadDeviceList();
            });
    }

    const handleDeleteConfirm = () => {
        if (!deviceId) {
            return;
        }
        DeviceService.deleteDevice(deviceId)
            .then(() => {
                enqueueSnackbar('Device was deleted.', { variant: 'success' });
            })
            .catch((e) => {
                console.error('Error deleting device: ', e);
                enqueueSnackbar('There was an error deleting the device.', { variant: 'error' });
            })
            .finally(() => {
                setDeleteDialogOpen(false);
                setDeviceName('');
                setDeviceId('');
                loadDeviceList();
            });
    }

    return (
        <Box component="main" sx={{ p: 3 }} marginTop={10}>
            <Container maxWidth="lg">

                <Breadcrumb items={[
                    {
                        title: 'Device list',
                        icon: <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                    }
                ]} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="devices table">

                        <TableHead>
                            <TableRow>
                                <TableCell>Device name</TableCell>
                                <TableCell align="right">Created</TableCell>
                                <TableCell align="right">Modified</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        {loading &&
                            <TableRowsLoader rows={1} columns={4} />
                        }
                        {!loading &&
                            <TableBody>
                                {devices.map((device) =>
                                    <TableRow key={device.id}>
                                        <TableCell component="th" scope="row">
                                            {device.name}
                                        </TableCell>
                                        <TableCell align="right">{device.created}</TableCell>
                                        <TableCell align="right">{device.modified}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Delete">
                                                <IconButton aria-label="delete" onClick={() => handleDeleteOpen(device.id, device.name)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <IconButton aria-label="edit" onClick={() => handleEditOpen(device.id, device.name)}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Measurements">
                                                <IconButton aria-label="measurements" LinkComponent={Link} href={`/devices/${device.id}`}>
                                                    <ChevronRight />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {devices.length === 0 &&
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <Stack sx={{ width: '100%', textAlign: 'center' }} spacing={2}>
                                                <Alert severity="info" sx={{ width: '100%', '& .MuiAlert-message': { textAlign: "center", width: "inherit" } }}>There are no devices saved.</Alert>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>}
                            </TableBody>
                        }
                    </Table>
                </TableContainer>

                <Tooltip title="Add">
                    <Fab color="primary" aria-label="add" onClick={handleCreateOpen} sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                    }}>
                        <Add />
                    </Fab>
                </Tooltip>

            </Container>

            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>{`${deviceId ? 'Edit' : 'Create'} device`}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Device name"
                        type="text"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.currentTarget.value)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirmEdit}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>
                    Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete device <b>{deviceName}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DeviceList;
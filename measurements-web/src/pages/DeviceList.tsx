import { Add, ChevronRight, Delete, Edit, Home } from '@mui/icons-material';
import { Box, Container, Fab, IconButton, Link, Tooltip } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { enqueueSnackbar } from 'notistack';
import { FC, ReactElement, useEffect, useState } from "react";
import Breadcrumb from '../components/breadcrumb';
import EnhancedTable, { EnhancedTableColumn } from '../components/enhanced-table';
import { Entity } from '../domain/api-response';
import { Page, Sort } from '../domain/pagination';
import DeviceService from '../services/DeviceService';

const tableColumns: EnhancedTableColumn[] = [
    {
        id: 'name',
        title: 'Device name',
        sortable: true
    },
    {
        id: 'created',
        title: 'Created',
        sortable: true,
        align: 'right'
    },
    {
        id: 'modified',
        title: 'Modified',
        sortable: true,
        align: 'right'
    },
    {
        id: 'actions',
        title: 'Actions',
        sortable: false,
        align: 'right'
    },
];

const DeviceList: FC = (): ReactElement => {

    const [devices, setDevices] = useState<Entity[]>([]);
    const [total, setTotal] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deviceId, setDeviceId] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [sort, setSort] = useState<Sort>({ field: 'modified', direction: 'desc' });
    const [page, setPage] = useState<Page>({ index: 0, size: 10 });

    useEffect(() => {
        setLoading(true);
        DeviceService.getAll(sort, page)
            .then((response) => {
                setDevices(response.data.content);
                setTotal(response.data.totalElements);
            })
            .catch((e) => {
                enqueueSnackbar('There was an error loading the device list.', { variant: 'error' });
                console.error('There was an error: ', e);
            })
            .finally(() => {
                setLoading(false);
                setLoaded(true);
            });
    }, [loaded, sort, page]);

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
                setLoaded(false);
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
                setLoaded(false);
            });
    }

    const deviceActions = (device: Entity) => <>
        <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={() => handleDeleteOpen(device.id, device.name as string)}>
                <Delete />
            </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={() => handleEditOpen(device.id, device.name as string)}>
                <Edit />
            </IconButton>
        </Tooltip>
        <Tooltip title="Measurements">
            <IconButton aria-label="measurements" LinkComponent={Link} href={`/devices/${device.id}`}>
                <ChevronRight />
            </IconButton>
        </Tooltip>
    </>

    return (
        <Box component="main" sx={{ p: 3 }} marginTop={10}>
            <Container maxWidth="lg">

                <Breadcrumb items={[
                    {
                        title: 'Device list',
                        icon: <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                    }
                ]} />

                <EnhancedTable
                    columns={tableColumns}
                    data={devices.map(device => Object.assign({}, device, { "actions": deviceActions(device) }))}
                    total={total}
                    loading={loading}
                    sort={sort}
                    onSortChange={setSort}
                    page={page}
                    onPageChange={setPage}
                />

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
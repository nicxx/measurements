import { Home } from "@mui/icons-material";
import { Box, Container, LinearProgress } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/breadcrumb";
import { Device } from "../domain/api-response";
import DeviceService from "../services/DeviceService";

const DeviceDetails: FC = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [device, setDevice] = useState<Device | null>(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        setLoading(true);

        DeviceService.getById(id)
            .then((device) => setDevice(device.data))
            .catch((e) => {
                console.log('Error loading device.', e);
                enqueueSnackbar('Error loading device');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        <Box component="main" sx={{ p: 3 }} marginTop={10}>
            <Container maxWidth="lg">

                <Breadcrumb items={[
                    {
                        title: 'Device list',
                        icon: <Home sx={{ mr: 0.5 }} fontSize="inherit" />,
                        url: '/'
                    },
                    {
                        title: device ? device.name : 'Details',
                    }
                ]} />

                {loading && <LinearProgress />}
                {device && <>
                    <h5>{device.name}</h5>
                </>}
            </Container>
        </Box>
    );
}

export default DeviceDetails;
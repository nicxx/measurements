import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import React, { FC, ReactElement } from "react";

interface NavbarPros {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const Navbar: FC = (props: NavbarPros): ReactElement => {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Measurements
            </Typography>
            <Divider />
            {/* <List>
                {routes.map((item) => (
                    <ListItem key={item.key} disablePadding>
                        <ListItemButton component={NavLink} to={item.path} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );

    const drawerWidth = 240;
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Measurements
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {/* {routes.map((item) => (
                            <Button component={NavLink} to={item.path} key={item.key} sx={{ color: '#fff' }}>
                                {item.title}
                            </Button>
                        ))} */}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};

export default Navbar;
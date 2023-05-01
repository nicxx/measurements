import { Breadcrumbs, Link, Paper } from "@mui/material";
import { FC, ReactElement } from "react";


export interface BreadcrumbProps {
    items?: {
        title: string;
        url?: string;
        icon?: ReactElement;
    }[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
    return (
        <Paper elevation={1} sx={{ padding: '1em', mb: '2em' }}>
            <Breadcrumbs aria-label="breadcrumb">
                {items?.map(item => (
                    <Link
                        key={item.title}
                        underline={item.url ? "hover" : "none"}
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        {...(item.url ? { href: item.url } : {})}
                    >
                        {item.icon && item.icon}
                        {item.title}
                    </Link>
                ))}
            </Breadcrumbs>
        </Paper>
    );
};

export default Breadcrumb;
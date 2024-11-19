import {FC} from "react";
import {CatalogApp} from "../Catalog.ts";
import {Box, Typography} from "@mui/material";
import "./css/AppDisplay.css";

interface AppDisplayProps {
    app: CatalogApp;
    select: (id: string) => void;
    deselect: (id: string) => void;
    isSelected: (id: string) => boolean;
}

const AppDisplay: FC<AppDisplayProps> = ({app, select, deselect, isSelected}) => {
    const toggle = () => {
        if (isSelected(app.id))
            deselect(app.id);
        else
            select(app.id);
    }

    return <Box sx={{
        p: 2,
        borderRadius: 4,
        backgroundColor: isSelected(app.id) ? "#707070" : "#202020",
        display: "flex",
        width: "200px",
        height: "200px",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1
    }} onClick={toggle}>
        <img className="app-icon" src={`/icon/${app.id.toLowerCase().split('.').join('/')}/icon.png`} alt={app.name}/>
        <Typography variant="body1" component="span">{app.name}</Typography>
    </Box>
}

export default AppDisplay;

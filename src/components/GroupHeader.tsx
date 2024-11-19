import {FC, PropsWithChildren} from "react";
import {Box, Divider, Typography} from "@mui/material";

interface GroupHeaderProps extends PropsWithChildren {
    variant: "group" | "subgroup";
}

const GroupHeader: FC<GroupHeaderProps> = ({children, variant}) => {
    return <Box sx={{mb: 2}}>
        <Typography variant={variant === "group" ? "h3" : "h5"} component={variant === "group" ? "h3": "h5"}>{children}</Typography>
        <Divider/>
    </Box>
}

export default GroupHeader;

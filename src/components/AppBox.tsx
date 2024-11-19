import {Box} from "@mui/material";
import {FC, PropsWithChildren} from "react";

const AppBox: FC<PropsWithChildren> = ({children}) => {
    return <Box sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        flexWrap: "wrap"
    }}>
        {children}
    </Box>
}

export default AppBox;

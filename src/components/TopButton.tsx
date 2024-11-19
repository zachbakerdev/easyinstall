import {FC} from "react";
import {Box} from "@mui/material";

const TopButton: FC = () => {
    return <a href="#top">
        <Box sx={{
            width: "64px",
            height: "64px",
            backgroundColor: "#202020",
            color: "white",
            borderRadius: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            bottom: "16px",
            right: "16px"
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-up"
                 viewBox="0 0 16 16">
                <path fillRule="evenodd"
                      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
            </svg>
        </Box>
    </a>
}

export default TopButton;

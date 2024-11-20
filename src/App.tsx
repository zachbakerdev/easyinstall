import {FC, useState} from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline, Modal,
  responsiveFontSizes,
  ThemeProvider,
  Typography
} from "@mui/material";
import strings from "./strings.ts";
import {Catalog} from "./Catalog.ts";
import GroupHeader from "./components/GroupHeader.tsx";
import AppDisplay from "./components/AppDisplay.tsx";
import useSelection from "./hooks/useSelection.ts";
import AppBox from "./components/AppBox.tsx";
import {Compiler} from "./Compiler.ts";
import TopButton from "./components/TopButton.tsx";

const App: FC = () => {
  const theme = responsiveFontSizes(createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      h3: {
        color: "#e0e0e0"
      }
    }
  }));

  const [select, deselect, isSelected, selection] = useSelection();
  const [infoOpened, setInfoOpened] = useState(false);

  const install = () => {
    const blob = Compiler.compile(selection);

    const encodedUri = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "install.bat");

    link.click();
  }

  return <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Container>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Typography variant="h1" component="h1" sx={{my: 2}}>{strings.title}</Typography>
        <Box sx={{display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={() => setInfoOpened(true)} disabled={infoOpened}>{strings.info}</Button>
          <Button variant="contained" onClick={install} disabled={selection.length < 1}>{strings.install}</Button>
        </Box>
      </Box>
      <Box>
        {Catalog.getGroups().map(group => <Box key={group.id} sx={{mb: 8}}>
          <GroupHeader variant="group">{group.name}</GroupHeader>
          <AppBox>
            {Catalog.getApps(group.id).map(app => <AppDisplay key={group.id + '/' + app.id} app={app} select={select}
                                                              deselect={deselect} isSelected={isSelected}/>)}
          </AppBox>
          {group?.subgroups && group.subgroups.map(subgroup => <Box key={subgroup.id} sx={{mt: 4}}>
            <GroupHeader variant="subgroup">{subgroup.name}</GroupHeader>
            <AppBox>
              {Catalog.getApps(subgroup.id).map(app => <AppDisplay key={group.id + '/' + app.id} app={app}
                                                                   select={select} deselect={deselect}
                                                                   isSelected={isSelected}/>)}
            </AppBox>
          </Box>)}
        </Box>)}
        <Box sx={{
          mt: -4,
          mb: 4
        }} component="footer">
          This application was developed by <a className="white-link" href="https://github.com/zachbakerdev">@zachbakerdev</a>.
          You can support the project on <a className="white-link" href="https://ko-fi.com/zachbakerdev">ko-fi</a>
          &nbsp;and add your suggestions on <a className="white-link" href="https://github.com/zachbakerdev/easyinstall">GitHub</a> by opening an issue.
        </Box>
      </Box>
    </Container>
    <TopButton/>
    <Modal open={infoOpened} onClose={() => setInfoOpened(false)}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}>
        <Container sx={{
          bgcolor: "#121212",
          p: 4,
          borderRadius: 4
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Typography variant="h3" component="h3">{strings.infoHeader}</Typography>
            <Button onClick={() => setInfoOpened(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="white" className="bi bi-x"
                   viewBox="0 0 16 16">
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Button>
          </Box>
          <Typography variant="body1">{strings.doubleClick}</Typography>
          <br/>
          <Typography variant="body1">{strings.mayPrompt}</Typography>
          <br/>
          <Typography variant="body1">{strings.bypass}</Typography>
        </Container>
      </Box>
    </Modal>
  </ThemeProvider>
}

export default App;

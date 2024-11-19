import {FC} from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
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
        <Button variant="contained" onClick={install} disabled={selection.length < 1}>Install</Button>
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
          &nbsp;and add your suggestions on <a className="white-link">GitHub</a> by opening an issue.
        </Box>
      </Box>
    </Container>
    <TopButton/>
  </ThemeProvider>
}

export default App;

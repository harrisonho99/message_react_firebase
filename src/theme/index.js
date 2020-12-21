import { createMuiTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: purple[700],
        },
    },
});
export default theme;

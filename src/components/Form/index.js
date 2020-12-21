import React from "react";
import { useFormik } from "formik";
import { Button, TextField, Typography, Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import "./formstyle.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import theme from "../../theme";
const useStyles = makeStyles(() => ({
    wrapper: {
        width: "fit-content",
    },
    field: {
        width: "100%",
        margin: "10px auto",
    },
    button: {
        margin: "auto",
    },
    header: {
        margin: "16px auto",
        textAlign: "center",
        fontWeight: 600,
    },
    errors: {
        color: "red",
        margin: "auto",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "16px",
        textAlign: "center",
    },
    buttonWrapper: {
        margin: "auto",
        position: "relative",
        width: "fit-content",
    },
    buttonProgress: {
        color: green[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
}));

const SignupForm = ({
    header,
    buttonLabel,
    onFormSubmit,
    children,
    color = "primary",
}) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values, { setSubmitting }) => {
            onFormSubmit(values, setSubmitting);
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Email is not valid")
                .max(40, "Email must less than 40 characters")
                .required("Email is required"),
            password: Yup.string()
                .max(20, "Password must less than 20 characters")
                .min(6, "Password at least have 6 characters")
                .required("Password is Required"),
        }),
    });
    return (
        <ThemeProvider theme={theme}>
            <div className="form-container">
                <Box className={classes.box}>
                    <form onSubmit={formik.handleSubmit} className="form">
                        <Typography
                            variant="h4"
                            className={classes.header}
                            color={color}
                        >
                            {header}
                        </Typography>
                        <div className="texfield-wrapper">
                            <TextField
                                disabled={formik.isSubmitting}
                                color={color}
                                variant="filled"
                                className={classes.field}
                                label="Email Address: "
                                type="email"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                error={(() => {
                                    if (
                                        formik.errors?.email &&
                                        formik.touched
                                    ) {
                                        return true;
                                    }
                                    return false;
                                })()}
                            />
                            {/* condition render errors */}
                            {formik.errors?.email && formik.touched && (
                                <Typography
                                    className={classes.errors}
                                    variant="h6"
                                >
                                    {formik.errors?.email}
                                </Typography>
                            )}
                            <TextField
                                autoComplete="on"
                                disabled={formik.isSubmitting}
                                color={color}
                                variant="filled"
                                className={classes.field}
                                label="Password: "
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                error={(() => {
                                    if (
                                        formik.errors?.password &&
                                        formik.touched
                                    ) {
                                        return true;
                                    }
                                    return false;
                                })()}
                            />
                            {/* condition render errors */}
                            {formik.errors?.password && formik.touched && (
                                <Typography
                                    className={classes.errors}
                                    variant="h6"
                                >
                                    {formik.errors.password}
                                </Typography>
                            )}
                        </div>

                        <div className="form-button-wrapeer">
                            <div className={classes.buttonWrapper}>
                                <Button
                                    variant="contained"
                                    color={color}
                                    type="submit"
                                    className={classes.button}
                                    size="large"
                                    disabled={formik.isSubmitting}
                                >
                                    {buttonLabel}
                                    {formik.isSubmitting && (
                                        <CircularProgress
                                            size={24}
                                            className={classes.buttonProgress}
                                        />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div className="additional-annotation">{children}</div>
                    </form>
                </Box>
            </div>
        </ThemeProvider>
    );
};

export default SignupForm;

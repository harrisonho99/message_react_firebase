import React from "react";
import { Toolbar } from "@material-ui/core";
import { auth } from "../services/firebase";
import { TextField, Button, Typography } from "@material-ui/core";
import "./AddMoreInfor.css";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import Progress from "../components/Progress";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    form: {
        width: "90%",
        maxWidth: 600,
        minWidth: 250,
        margin: "auto",
    },
    field: {
        width: "100%",
        margin: "10px auto",
    },
    errors: {
        color: "red",
        margin: "auto",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: "16px",
        textAlign: "center",
    },
    title: {
        marginBottom: 20,
    },
    button: {
        margin: 10,
    },
}));
export default function AddMoreInfor({ handleDisplayNameChange }) {
    const [isCapchaValid, setCapchaValid] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const capcharRef = React.useRef(null);
    const classes = useStyles();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            fullName: "",
            phoneNumber: "",
            photoURL: "",
        },

        onSubmit: (values, { setSubmitting }) => {
            setError(null);
            let phone;
            if (values.phoneNumber[0] === 0) {
                phone = "+84" + values.phoneNumber.slice(1);
            } else {
                phone = "+84" + values.phoneNumber;
            }
            auth()
                .currentUser.updateProfile({
                    displayName: values.fullName,
                    photoURL: values.photoURL,
                    phoneNumber: phone,
                })
                .then(() => {
                    setSubmitting(false);
                    handleDisplayNameChange(true);
                })
                .then(() => {
                    history.push("/chat");
                })
                .catch((error) => {
                    setError(error.message);
                });
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(3, `As least 3 Characters`)
                .max(20, "Full Name must less than 20 characters")
                .required("Full Name is required"),
            phoneNumber: Yup.string()
                .min(9, "Phone Number must have 9 characters")
                .max(12, "Phone Number must less than 12")
                .required("Phone Number is required"),
            photoURL: Yup.string(),
        }),
    });
    React.useEffect(() => {
        setLoading(false);
    }, []);
    React.useEffect(() => {
        if (capcharRef.current) {
            auth().languageCode = "vi";
            window.recaptchaVerifier = new auth.RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "normal",
                    callback: () => {
                        setCapchaValid(true);
                    },
                    "expired-callback": function () {
                        setCapchaValid(false);
                    },
                }
            );
            window.recaptchaVerifier.render().then(function (widgetId) {
                window.recaptchaWidgetId = widgetId;
            });
        }
        // eslint-disable-next-line
    }, [loading]);

    return loading ? (
        <Progress />
    ) : (
        <div id="more-infor-page">
            <Toolbar />
            <React.Fragment key="InfomationForm">
                <Typography variant="h5" className={classes.title}>
                    UPDATE YOUR INFORMATION
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (isCapchaValid) {
                            formik.handleSubmit(e);
                        }
                    }}
                >
                    <div className="field-wrapper">
                        <TextField
                            disabled={formik.isSubmitting || false}
                            color="primary"
                            variant="outlined"
                            className={classes.field}
                            label="Full Name "
                            type="text"
                            id="full-name"
                            name="fullName"
                            onChange={formik.handleChange}
                            value={formik.values.fullName}
                            onBlur={formik.handleBlur}
                            error={(() => {
                                if (formik.errors?.fullName && formik.touched) {
                                    return true;
                                }
                                return false;
                            })()}
                        ></TextField>
                        {/* condition render errors */}
                        {formik.errors?.fullName && formik.touched && (
                            <Typography className={classes.errors} variant="h6">
                                {formik.errors?.fullName}
                            </Typography>
                        )}
                    </div>
                    <div className="field-wrapper">
                        <TextField
                            disabled={formik.isSubmitting || false}
                            placeholder="+84"
                            color="primary"
                            variant="outlined"
                            className={classes.field}
                            label="Phone Number"
                            type="text"
                            id="phone-number"
                            name="phoneNumber"
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                            onBlur={formik.handleBlur}
                            error={(() => {
                                if (
                                    formik.errors?.phoneNumber &&
                                    formik.touched
                                ) {
                                    return true;
                                }
                                return false;
                            })()}
                        ></TextField>
                        {/* condition render errors */}
                        {formik.errors?.phoneNumber && formik.touched && (
                            <Typography className={classes.errors} variant="h6">
                                {formik.errors?.phoneNumber}
                            </Typography>
                        )}
                    </div>

                    <div className="field-wrapper">
                        <TextField
                            disabled={formik.isSubmitting}
                            color="primary"
                            variant="outlined"
                            className={classes.field}
                            label="Enter photo URL (optional) "
                            type="text"
                            id="photoURL"
                            name="photoURL"
                            onChange={formik.handleChange}
                            value={formik.values.photoURL}
                            onBlur={formik.handleBlur}
                        ></TextField>
                    </div>
                    <div id="recaptcha-wrapper">
                        <div id="recaptcha-container" ref={capcharRef} />
                    </div>
                    {formik.errors?.reCapcha && formik.touched && (
                        <Typography className={classes.errors} variant="h6">
                            {formik.errors?.reCapcha}
                        </Typography>
                    )}
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            className={classes.button}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
                {error ? (
                    <>
                        <div>
                            <Typography variant="h6" className={classes.errors}>
                                {error}
                            </Typography>
                        </div>
                    </>
                ) : null}
            </React.Fragment>
        </div>
    );
}

import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import "./notfound.css";
import Scarecrow from "../image/Scarecrow.png";
import { makeStyles } from "@material-ui/core/styles";
import Progress from "../components/Progress";
import { Toolbar } from "@material-ui/core";

const useStyle = makeStyles({
    text: {
        margin: "20px auto",
        color: "rgb(255,109,91)",
        fontWeight: 500,
    },
});
export default function NotFoundPage() {
    const classes = useStyle();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, [loading]);
    return loading ? (
        <Progress />
    ) : (
        <>
            <Toolbar />
            <div className="not-found-wrapper">
                <img src={Scarecrow} alt="You Was Lost" className="Scarecrow" />
                <Typography variant="h5" className={classes.text}>
                    You Was Lost !!!
                </Typography>

                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    href="/"
                >
                    Go To Home
                </Button>
            </div>
        </>
    );
}

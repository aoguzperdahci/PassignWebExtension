import React from 'react';
import { Divider, IconButton, Grid, Typography, Container, Link } from '@material-ui/core';
import githubIcon from "../images/github-brands.svg";
import linkedinIcon from "../images/linkedin-in-brands.svg";

const Footer = () => {
    
    return (
        <div>
            <Divider style={{ marginBottom: 20, marginTop: 0, backgroundColor: "black" }} />
            <Container align="center">
                <Grid container style={{ maxWidth: 1020 }}>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" align="center" color="textSecondary">
                            Follow
                        </Typography>

                        <div style={{ marginTop: 0 }}>
                            <Link href="https://github.com/aoguzperdahci" target="_blank">
                                <IconButton style={{ marginRight: 5 }}>
                                    <img src={githubIcon} alt="github" style={{ width: 30, height: 30 }} />
                                </IconButton>
                            </Link>

                            <Link href="https://www.linkedin.com/in/aoguzperdahci/" target="_blank">
                                <IconButton>
                                    <img src={linkedinIcon} alt="github" style={{ width: 30, height: 30 }} />
                                </IconButton>
                            </Link>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" align="center" color="textSecondary" style={{ marginBottom: 10 }}>
                            Contact
                        </Typography>

                        <Typography variant="subtitle2" align="center" color="textSecondary" style={{ marginBottom: 10 }}>
                            ahmetoguzperdahci@gmail.com
                        </Typography>
                    </Grid>

                </Grid>

                <Typography variant="body2" color="textSecondary" style={{ marginTop:20, marginBottom: 0 }}>
                    {"Copyright © Passign " + new Date().getFullYear()}
                </Typography>
            </Container>
        </div>
    )
}

export default Footer

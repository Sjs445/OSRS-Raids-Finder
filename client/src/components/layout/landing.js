import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'reactstrap';
import cinematic from '../../assets/Raids_Cinematic_noblur.mp4';
import styles from "../../styles/landing.module.css";


class Landing extends Component {
    render(){
        return(
            <div>
                <section className={styles.showcase}>
                <div className={styles.videoContainer}>
                <video autoPlay="true" loop>
                    <source src={cinematic} type="video/mp4" />
                </video>
                </div>
                <div className={styles.content}>
                    <h1>Welcome to the OSRS Raids Finder</h1>
                    <Container>
                        <Row>
                            <Col sm={{ size: 'auto', offset: 1 }}><Link to="/register"><Button color="secondary" size="lg" className={styles.btn_home}>Register</Button></Link></Col>
                            <Col sm={{ size: 'auto', offset: 1 }}><Link to="/login"><Button color="secondary" size="lg" className={styles.btn_home}>Login</Button></Link></Col>
                            <Col sm={{ size: 'auto', offset: 1 }}><Button color="secondary" size="lg" className={styles.btn_home} href="#about">See More</Button></Col>
                        </Row>
                    </Container>
                </div>
                </section>
                <section id="about" className={styles.about}>
                    <h1>About</h1>
                    <p>Welcome to the OSRS raids finder. This application aims to simplify the process of locating a 
                        team for Old School Runescape raids. 
                    </p>
                    <h2>FAQ</h2>
                    <h3>How does it work?</h3>
                    <p>Users can find raid parties within minutes by opening a party for a specific type of raid. Once the user opens the party
                        it will be visible to other users in the dashboard. Other users can then view and decide if they want to join the party.
                    </p>
                    <h3>How do I know if people in the party are not noobs?</h3>
                    <p>The OSRS raids finder uses Runescape's highscore api to show you the stats and kill count of the users in the party. From here you can decide
                        whether or not to join the party. 
                    </p>
                    <h2>Follow us for updates</h2>
                    <div className={styles.social}>
                    <a href="https://github.com/Sjs445/OSRS-Raids-Finder" target="_blank" rel="noopener noreferrer"><span><i className="fab fa-github fa-3x"></i></span></a>
                    <a href="https://discord.gg/3WDXJ9c" target="_blank" rel="noopener noreferrer"><span><i className="fab fa-discord fa-3x" aria-hidden="true"></i></span></a>
                    <a href="https://twitter.com/ZimsEdits" target="_blank" rel="noopener noreferrer"><span><i className="fab fa-twitter fa-3x" aria-hidden="true"></i></span></a>
                    </div>
                </section>
            </div>
        )
    };
};

export default Landing;
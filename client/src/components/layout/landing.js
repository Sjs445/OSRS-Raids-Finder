import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from 'reactstrap';
import cinematic from '../../assets/Raids_Cinematic_noblur.mp4';
import styles from "../../styles/landing.module.css";

//  Redux Components
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Landing extends Component {

    render(){
        if(this.props.isAuthenticated) {
            return <Redirect to='/dashboard' />
        }

        return(
            <div>
                <section className={styles.showcase}>
                <div className={styles.videoContainer}>
                <video autoPlay="autoplay" loop muted>
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
                    </p><br />
                    <h3>A reputation system run by the community.</h3>
                    <p>There will be a reputation points system for each user. If a user has been reported by other users that they have not split or were simply not helpful at all during the raid,
                        there will be a warning before joining a party advising the poor reputation of the user.
                    </p><br />
                    <h3>Raid guides.</h3>
                    <p>When signing up you can select the option to be a raid guide. This will give you a special icon <img src={"https://oldschool.runescape.wiki/images/a/a2/Quests.png?f5120"} className={styles.iconSize} alt="Quest Icon" title={"Raid Guide"} /> as a guide so others will know. If you don't select guide 
                        when signing up you can always decide to be one by changing your account in setup. Other users will give you a rating and feedback on your guides which can earn
                        you guide points.
                    </p><br />
                    <h3>What if I'm just learning raids?</h3>
                    <p>Depending on how many raids you have completed will give you a status such as beginner <img src={"https://oldschool.runescape.wiki/images/thumb/e/ef/Clue_scroll_%28beginner%29_detail.png/150px-Clue_scroll_%28beginner%29_detail.png?87067"} className={styles.iconSize} alt="Beginner Icon" title={"Beginner"} />,
                     novice <img src={"https://oldschool.runescape.wiki/images/thumb/3/36/Clue_scroll_%28easy%29_detail.png/150px-Clue_scroll_%28easy%29_detail.png?87067"} className={styles.iconSize} alt="Novice Icon" title={"Novice"} />,
                      intermediate <img src={"https://oldschool.runescape.wiki/images/thumb/1/16/Clue_scroll_%28medium%29_detail.png/150px-Clue_scroll_%28medium%29_detail.png?87067"} className={styles.iconSize} alt="Intermediate Icon" title={"Intermediate"} />,
                       or expert <img src={"https://oldschool.runescape.wiki/images/thumb/d/d2/Clue_scroll_%28hard%29_detail.png/150px-Clue_scroll_%28hard%29_detail.png?11ee4"} className={styles.iconSize} alt="Expert Icon" title={"Expert"} />. This helps identify your abilities to other users.
                        If you're just learning raids try to find at least one user in a party who is a guide. The guide will have a special icon to show they are a guide.
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

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
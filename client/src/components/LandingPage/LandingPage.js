import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import styles from './LandingPage.module.css';

const LandingPage = () => {
    return ( 
        <div className={styles.bg}>
            <Link to='/home'>
                <Button>Ingresar</Button>
            </Link>
        </div>
     );
}
 
export default LandingPage;
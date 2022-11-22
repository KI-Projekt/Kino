import * as React from 'react';
import "../styles/Footer.css";

function Footer() {
    return ( 
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    {/* Column1 */}
                    <div className="col">
                        <h4>THICC MEMES INC</h4>
                        <ul className="list-unstyled">
                            <li>3215-456-486</li>
                            <li>Moscow, Russia</li>
                            <li>123 street south north</li>
                        </ul>

                    </div>
                    {/* Column2 */}
                    <div className="col">
                        <h4>ANOTHER COLUMN</h4>
                        <ul className="list-unstyled">
                            <li>3215-456-486</li>
                            <li>Moscow, Russia</li>
                            <li>123 street south north</li>
                        </ul>

                    </div>
                    {/* Column3 */}
                    <div className="col">
                        <h4>STUFF</h4>
                        <ul className="list-unstyled">
                            <li>3215-456-486</li>
                            <li>Moscow, Russia</li>
                            <li>123 street south north</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} KINO XY | All rights reserved | Impressum | Contact Us | Privacy Policy
                    </p>

                </div>

            </div>
            <text>
                Hallo :|
            </text>
        </div>
     );
}

export default Footer;
import React, { Children } from 'react';
import './Nav.css';

const Nav = (props) => {
    return (
        <>
            <nav role="navigation">
                <div id="menuToggle">

                    <input type="checkbox" />


                    <span></span>
                    <span></span>
                    <span></span>

                    <ul id="menu">
                        <a href="#"><li>Home</li></a>
                        <a href="https://github.com/IbrahimSaeedPurdue"><li>Ibrahim's Github</li></a>
                        <a href="https://github.com/gharrals"><li>Grayson's Github</li></a>
                        <a href="https://github.com/wh1fty"><li>Dan's Github</li></a>
                        <a href="https://github.com/kennethwong"><li>Kenneth's Github</li></a>
                    </ul>
                </div>
                {props.children}
            </nav>
        </>
    );
}

export default Nav;
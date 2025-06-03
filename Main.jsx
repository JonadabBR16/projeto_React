import './Main.css';
import React from 'react';
import Header from './Header';

const Main = (props) => (
    <>
        <Header {...props}/> {/* Arrumei a barra do Header */}
            <main className="content container-fluid">
                <div className="p-3 mt-3">
                    {props.children}
                </div>
            </main>
            {/*apaguei o Header daqui */}
    </>
)
export default Main;
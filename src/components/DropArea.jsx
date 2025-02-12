// import  from 'react'
import { useState } from 'react';
import '../css/DropArea.css'
import PropTypes from 'prop-types';

const DropArea = ({ onDrop }) => {
    const [showDrop, setShowDrop] = useState(false);
    return (
        <>
            <section
                className={showDrop ? "dropAreaOuterContainer" : "hidedropAreaOuterContainer"}
                onDragEnter={() => setShowDrop(true)}
                onDragLeave={() => setShowDrop(false)}
                onDrop={() => {
                    onDrop();
                    setShowDrop(false);
                }}
                onDragOver={e => e.preventDefault()}
            >
                Drop Here
            </section>
        </>

    )
}

export default DropArea

DropArea.propTypes = {
    onDrop: PropTypes.func.isRequired,

};
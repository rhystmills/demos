import React from 'react';


function App() {
    return (
        <>
            <p>Hello</p>
            <model-viewer 
                src="src/mann-o2.glb" 
                alt="A 3D model of an thing Jon sent me" 
                style={{width: 500 + "px", height: 500 + "px", top: 0 + "px",  position: "sticky"}}
                auto-rotate camera-controls>
            </model-viewer>
        </>
    );
}
export default App;
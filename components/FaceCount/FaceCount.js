import React from 'react';

const FaceCount = ( {numFaces} ) => {
    return (
        <div className='white f3'>
            {`Number of Faces Detected: `}
            <div className='white f1'>
            {numFaces}
            </div>
        </div>
    );
}
export default FaceCount;
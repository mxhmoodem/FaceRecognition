import React from 'react';
import './FaceRecogniton.css';

const FaceRecognition = ({ imageUrl, box }) => {


	const boundingBoxes = box.map((boxes, i) => {
        return (
            <div 
                className='bounding-box'
                key={i}
                style={{top: boxes.topRow, right: boxes.rightCol, bottom: boxes.bottomRow, left: boxes.leftCol}}
            ></div>
        );
	});

	return (
		<div className='center ma'>
			<div className='absolute mt2' >
				<img id='inputimage' src={imageUrl} alt="" width='500px' height='auto'/>
				{boundingBoxes}
			</div>
		</div>
		);
}

export default FaceRecognition
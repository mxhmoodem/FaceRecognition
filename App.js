import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import FaceRecogniton from './components/FaceRecogniton/FaceRecogniton';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceCount from './components/FaceCount/FaceCount';
import './App.css';

const Clarifai = require('clarifai');


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: []
    }
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions;

    if (clarifaiFace === undefined){
      return [];
    }

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    const faceLocations = clarifaiFace.map(region => {
      const boxes = region.region_info.bounding_box;

      return {
        leftCol: boxes.left_col * width,
        topRow: boxes.top_row * height,
        rightCol: width - (boxes.right_col * width),
        bottomRow: height - (boxes.bottom_row * height),
    };

    
    });
    return faceLocations;
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});

  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log("click");
    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key c46a26d0444a4e389b1614b7ef5ec1d8'
    },
    body: JSON.stringify({
      "user_app_id": {
      "user_id": "clarifai",
      "app_id": "main"
        },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": this.state.input
                  }
              }
          }
      ]
    })
    })
    .then(response => response.json())
    .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
    .catch(error => console.log('error', error));

    
        }; 
    

    
  
  render(){
    return (
      <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
        <Navigation />
        <FaceCount numFaces={this.state.box.length}/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecogniton box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;

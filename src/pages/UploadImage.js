import React, { useState, useRef, useReducer, Component } from "react";
// import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

// tf.setBackend('wasm').then(() => main());

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      image: null,
      label: null,
      models: null
    };
    this.PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    this.onPhotoChange = this.onPhotoChange.bind(this);
  }

  // onLogin = e => {
  //   e.preventDefault();
  //   axios.post(this.PROXY_URL + 'https://padi-bangkit.herokuapp.com/prediction', { username: this.state.username, password: this.state.password })
  //     .then(response => {
  //       console.log("masuk");
  //       console.log(response);
  //       if (response.data.message === "Success") {
  //         console.log("Success");
  //         localStorage.setItem('auth-token', response.data.data.access_token);
  //         localStorage.setItem('username', this.state.username);
  //         console.log("XXXXXX");
  //         console.log(localStorage.getItem('auth-token'));
  //         this.props.history.push('/');
  //       }
  //       else {
  //         console.log("Wrong message");
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }

  onPhotoChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
    }
  };

  async componentDidMount() {
    console.log('First');
    // console.log(require('../assets/model/model.json'))
    const model = await tf.loadLayersModel(require('../assets/model/model.json'))
    // console.log(model.inputLayers);
    // const models = await tf.loadModel
    // const models = await tf.loadModel(model);
    // console.log(models.inputLayers);
    // models.summary();
    // this.loadModel();
    // const model = await tf.loadGraphModel('model/model.json');
    // this.setState({ model = tf.loadLayersModel('../assets/model/model.json')})
    // const models = await tf.model.
    // models.summary();
    // this.setState({MODEL: models});
    console.log("Model Loaded");
  }

  async pressButton(event) {
    event.preventDefault();
    console.log('Handle uploading-', this.state.image);

    console.log("Loading image...");

    // let tensor = tf.browser.fromPixels(this.state.image, 3)
    //   .resizeNearestNeighbor([256, 256])
    //   .toFloat()
    //   .reverse(-1);
    // let predictions = await this.state.MODEL.predict(tensor).data();
    // console.log(predictions);
  };

  render() {
    return (
      <div className="body-wrapper card-wrapper">
        <input type="file" accept="image/*" capture="camera" onChange={this.onPhotoChange} />
        <button className="btn btn-success" onClick={(e) => this.pressButton(e)}>Predict</button>
      </div>
    );
  }
}

// const machine = {
//   initial: "initial",
//   states: {
//     initial: { on: { next: "loadingModel" } },
//     loadingModel: { on: { next: "modelReady" } },
//     modelReady: { on: { next: "imageReady" } },
//     imageReady: { on: { next: "identifying" }, showImage: true },
//     identifying: { on: { next: "complete" } },
//     complete: { on: { next: "modelReady" }, showImage: true, showResults: true }
//   }
// };

// function UploadImage() {
//   const [results, setResults] = useState([]);
//   const [imageURL, setImageURL] = useState(null);
//   const [model, setModel] = useState(null);
//   const imageRef = useRef();
//   const inputRef = useRef();

//   const reducer = (state, event) =>
//     machine.states[state].on[event] || machine.initial;

//   const [appState, dispatch] = useReducer(reducer, machine.initial);
//   const next = () => dispatch("next");

//   const loadModel = async () => {
//     next();
//     const model = await mobilenet.load();
//     setModel(model);
//     next();
//   };

//   const identify = async () => {
//     next();
//     const results = await model.classify(imageRef.current);
//     setResults(results);
//     next();
//   };

//   const reset = async () => {
//     setResults([]);
//     next();
//   };

//   const upload = () => inputRef.current.click();

//   const handleUpload = event => {
//     const { files } = event.target;
//     if (files.length > 0) {
//       const url = URL.createObjectURL(event.target.files[0]);
//       setImageURL(url);
//       next();
//     }
//   };

//   const actionButton = {
//     initial: { action: loadModel, text: "Load Model" },
//     loadingModel: { text: "Loading Model..." },
//     modelReady: { action: upload, text: "Upload Image" },
//     imageReady: { action: identify, text: "Identify Breed" },
//     identifying: { text: "Identifying..." },
//     complete: { action: reset, text: "Reset" }
//   };

//   const { showImage, showResults } = machine.states[appState];

//   return (
//     <div className="body-wrapper card-wrapper">
//       {showImage && <img src={imageURL} alt="upload-preview" ref={imageRef} />}
//       <input
//         type="file"
//         accept="image/*"
//         capture="camera"
//         onChange={handleUpload}
//         ref={inputRef}
//       />
//       {showResults && (
//         <ul>
//           {results.map(({ className, probability }) => (
//             <li key={className}>{`${className}: %${(probability * 100).toFixed(
//               2
//             )}`}</li>
//           ))}
//         </ul>
//       )}
//       <button className="btn btn-success" onClick={actionButton[appState].action || (() => { })}>
//         {actionButton[appState].text}
//       </button>
//     </div>
//   );
// }


export default UploadImage;
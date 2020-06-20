import React, { Component } from "react";
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
// import models from '../assets/model/model.json';

class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      image: null,
      img_predict: null,
      models: null,
      isPredicted: false,
      label: Math.floor(Math.random() * 4) + 1,
      detailPrediction: {}
    };
    this.PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    this.onPhotoChange = this.onPhotoChange.bind(this);
  }

  onPhotoChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img),
        img_predict: img
      });
    }
  };

  async componentDidMount() {
    let loadModel = await tf.loadLayersModel(this.PROXY_URL + 'https://firebasestorage.googleapis.com/v0/b/padi-bangkit.appspot.com/o/model.json?alt=media')

    this.setState({ models: loadModel });
  }

  async pressButton(event) {
    event.preventDefault();
    console.log('Handle uploading-', this.state.image);

    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    const img = this.state.img_predict

    img.onload = () => {
      ctx.drawImage(this.state.img_predict, 0, 0, 256, 256)
    }

    console.log(img);

    let logits = tf.tidy(() => {
      const normalizationConstant = 1.0 / 255.0;

      let image_test = tf.browser.fromPixels(img, 1)
        .resizeBilinear([256, 256], false)
        .expandDims(0)
        .toFloat()
        .mul(normalizationConstant)

      return this.state.models.predict(image_test);
    });

    console.log(logits);

    // await axios.post(this.PROXY_URL + 'https://padi-bangkit.herokuapp.com/prediction', { "image_path": this.state.image, "prediction": this.state.label },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
    //     }
    //   })
    //   .then(response => {
    //     console.log(response);
    //     if (response.data.message === "Success") {
    //       console.log("Success");
    //       this.setState({ isPredicted: true })
    //     }
    //     else {
    //       console.log("Wrong message");
    //       this.setState({ isPredicted: false })
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ isPredicted: false })
    //   })

    // this.generateResult();

    // console.log("Loading image...");

    // let tensor = tf.browser.fromPixels(this.state.image, 3)
    //   .resizeNearestNeighbor([256, 256])
    //   .toFloat()
    //   .reverse(-1);
    // let predictions = await this.state.MODEL.predict(tensor).data();
    // console.log(predictions);
  };

  async generateResult() {
    axios.get(this.PROXY_URL + 'https://padi-bangkit.herokuapp.com/condition/' + this.state.label, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth-token')
      }
    })
      .then(response => {
        console.log("generate result");
        console.log(response.data.data);
        if (response.data.message === "Success") {
          this.setState({ detailPrediction: response.data.data })
          console.log("Success");
        }
        else {
          console.log("Wrong message");
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  predict() {

  }

  render() {
    const isPredicted = this.state.isPredicted;
    const detailPrediction = this.state.detailPrediction;

    return (
      <div>
        {isPredicted ? (
          <div className="card-wrapper">
            <div className="container col-md-4 py-5 card-inner">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Result</h4>
                </div>
                <div className="card-body">
                  <img src={this.state.image} className="card-img-top" />
                  <p>{detailPrediction.label}</p>
                  <h6>Effect</h6>
                  <p>{detailPrediction.effect}</p>
                  <h6>Solution</h6>
                  <p>{detailPrediction.solution}</p>
                  <h6>Prevention</h6>
                  <p>{detailPrediction.prevention}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
            <div className="body-wrapper card-wrapper">
              <canvas ref="canvas" width={256} height={256} />
              <input type="file" accept="image/*" capture="camera" onChange={this.onPhotoChange} />
              <button className="btn btn-success" onClick={(e) => this.pressButton(e)}>Predict</button>
            </div>
          )}
      </div>
    );
  }
}

export default UploadImage;

import React, { Component } from "react";
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
import { storage } from "../firebase"
// import models from '../assets/model/model.json';

class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      img_url: null,
      img_predict: null,
      image: null,
      models: null,
      isPredicted: false,
      // label: Math.floor(Math.random() * 4) + 1,
      label: 0,
      detailPrediction: {}
    };
    this.PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    this.onPhotoChange = this.onPhotoChange.bind(this);
  }

  onPhotoChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        img_predict: img,
        image: URL.createObjectURL(img)
      });
    }
  };

  async componentDidMount() {
    let loadModel = await tf.loadLayersModel(this.PROXY_URL + 'https://firebasestorage.googleapis.com/v0/b/padi-bangkit.appspot.com/o/model.json?alt=media')

    this.setState({ models: loadModel });
  }

  backButton = event => {
    this.setState({
      img_url: null,
      img_predict: null,
      image: null,
      isPredicted: false,
      label: 0,
      detailPrediction: {}
    });
  };

  async pressButton(event) {
    event.preventDefault();
    console.log('Handle uploading-', this.state.img_predict);

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = this.refs.image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
    }

    let logits = tf.tidy(() => {
      const normalizationConstant = 1.0 / 255.0;

      let image_test = tf.browser.fromPixels(img, 3)
        .resizeBilinear([256, 256], false)
        .expandDims(0)
        .toFloat()
        .mul(normalizationConstant)

      return this.state.models.predict(image_test);
    });

    console.log("berhasil");
    console.log(logits);

    const classes = await logits.data();

    console.log('Predictions: ', classes);

    let maxIndex = this.indexOfMax(classes);

    this.setState({ label: maxIndex + 1 });

    console.log("Set Label");
    console.log(this.state.label);

    this.generateResult(this.state.label)

    const uploadTask = storage.ref(`images/${this.state.img_predict.name}`).put(this.state.img_predict);
    uploadTask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(this.state.img_predict.name)
          .getDownloadURL().
          then(url => {
            this.setState({ img_url: url });
            axios.post(this.PROXY_URL + 'https://padi-bangkit.herokuapp.com/prediction', { "image_path": this.state.img_url, "prediction": this.state.label },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
                }
              })
              .then(response => {
                console.log(response);
                if (response.data.message === "Success") {
                  console.log("Success");
                  this.setState({ isPredicted: true })
                }
                else {
                  console.log("Wrong message");
                  this.setState({ isPredicted: false })
                }
              })
              .catch(error => {
                console.log(error);
                this.setState({ isPredicted: false })
              })
          });
      }
    )
  };

  indexOfMax(arr) {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }

  async generateResult(label) {
    axios.get(this.PROXY_URL + 'https://padi-bangkit.herokuapp.com/condition/' + label, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('auth-token')
      }
    })
      .then(response => {
        // console.log("generate result");
        // console.log(response.data.data);
        if (response.data.message === "Success") {
          this.setState({ detailPrediction: response.data.data })
          // console.log("Success");
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
                  <h4 className="mb-0">Hasil</h4>
                </div>
                <div className="card-body">
                  <img src={this.state.img_url} className="card-img-top" />
                  <p>{detailPrediction.label}</p>
                  <h6>Efek</h6>
                  <p>{detailPrediction.effect}</p>
                  <h6>Solusi</h6>
                  <p>{detailPrediction.solution}</p>
                  <h6>Pencegahan</h6>
                  <p>{detailPrediction.prevention}</p>
                  <button type="submit" className="btn btn-success" onClick={(e) => this.backButton(e)}>Kembali ke Halaman Utama</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
            <div className="body-wrapper card-wrapper">
              <div className="row">
                <canvas ref="canvas" width={256} height={256} style={{ "display": "none" }} />
                <input type="file" accept="image/*" capture="camera" onChange={this.onPhotoChange} />
                <button className="btn btn-success" onClick={(e) => this.pressButton(e)}>Prediksi</button>
              </div>
              <div className="row">
                <img ref="image" src={this.state.image} style={{ "display": "none" }} />
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default UploadImage;

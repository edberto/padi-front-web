import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultPrediciton: [],
            isLoading: false,
            error: null,
        };
        this.PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    }

    // async componentDidMount() {
    //     this.setState({ isLoading: true });

    //     try {
    //       const result = await axios.get('https://padi-bangkit.herokuapp.com/condition/1', {
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Content-Type": "application/json"
    //         }
    //        })

    //       this.setState({
    //         resultPrediciton: result.data.resultPrediciton,
    //         isLoading: false
    //       });

    //       console.log(this.state.resultPrediciton);
    //     } catch (error) {
    //       this.setState({
    //         error,
    //         isLoading: false
    //       });
    //     }
    //   }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios.get(this.PROXY_URL + "https://padi-bangkit.herokuapp.com/condition/1")
            .then(result => this.setState({
                resultPrediciton: result.data.resultPrediciton,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));

        console.log(this.setState.resultPrediciton);
    }

    render() {
        return (
            <div className="card-wrapper">
                <div className="container col-md-4 py-5 card-inner">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="mb-0">Result</h4>
                        </div>
                        <div className="card-body">
                            <img src="https://s3-ap-southeast-1.amazonaws.com/niomic/img/sample/food1.jpg" className="card-img-top" />
                            <p>Tanaman anda sehat</p>
                            <h6>Effect</h6>
                            <p>Tanaman anda akan bertumbuh dengan baik.</p>
                            <h6>Solution</h6>
                            <p>Pertahankan kesehatan tanaman anda</p>
                            <h6>Prevention</h6>
                            <p>-</p>
                            <Link to ="/"><button type="submit" className="btn btn-success">Back to Homepage</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Result;

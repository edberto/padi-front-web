import React, { Component } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HistoryData from '../assets/data/HistoryData';
import axios from 'axios';
import Moment from 'react-moment';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: HistoryData,
            fetchData: []
        };
        this.PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    }

    componentDidMount() {
        console.log("Fetch data");

        axios.get(this.PROXY_URL + 'https://padi-bangkit.herokuapp.com/prediction', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('auth-token')
            }
        })
            .then(response => {
                // console.log("masuk");
                // console.log(response.data.data);
                if (response.data.message === "Success") {
                    this.setState({ fetchData: response.data.data })
                    // console.log("Success");
                    console.log(this.state.fetchData);
                }
                else {
                    console.log("Wrong message");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="body-wrapper">
                <div className="container-fluid custom-wrapper" style={{ 'marginBottom': '100px' }}>
                    <h3>Riwayat</h3>
                    {this.state.fetchData.map((
                        d, index) => <div className="row history" key={index + 1}>
                            <div className="col-sm-2">
                                <img src={d.ImagePath} alt="Food" width='75%' height='75%' />
                            </div>
                            <div className="col-sm-10">
                                <div className="card w-75" style={{ 'marginBottom': '0px' }}>
                                    <div className="card-body" style={{ 'textAlign': 'left' }}>
                                        <h6 className="card-title">
                                            <Moment format="DD MMMM YYYY, HH:mm">
                                                {d.UpdatedAt}
                                            </Moment>   
                                        </h6>
                                        <p className="card-text">{d.Label}</p>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        );
    }
}

export default History;
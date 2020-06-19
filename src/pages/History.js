import React, { Component } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HistoryData from '../assets/data/HistoryData'

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: HistoryData
        };
    }

    componentDidMount() {
        console.log("Fetch data");
        console.log(this.state.data);
    }

    render() {
        return (
            <div className="body-wrapper">
                <div className="container-fluid custom-wrapper">
                    <h3>History</h3>
                    {this.state.data.map((
                        d, index) => <div className="row history" key={index+1}>
                            <div className="col-sm-2">
                                <img src={d.image_url} alt="Food" width='75%' />
                            </div>
                            <div className="col-sm-10">
                                <div className="card w-75" style={{'marginBottom': '0px'}}>
                                    <div className="card-body" style={{'textAlign': 'left'}}>
                                        <h5 className="card-title">{d.datetime}</h5>
                                        <p className="card-text">{d.result}</p>
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
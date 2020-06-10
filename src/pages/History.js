import React, { Component } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                "image_url" : "url1",
                "result" : "result1",
                "datetime" : "datetime1"
            },
            {
                "image_url" : "url2",
                "result" : "result2",
                "datetime" : "datetime2"
            },
            {
                "image_url" : "url3",
                "result" : "result3",
                "datetime" : "datetime3"
            }]
        };
    }
    
    componentDidMount(){
        console.log("Fetch data");
        console.log(this.state.data);
    }

    render() {
        return (
            <div className="body-wrapper">
                <div className="container-fluid custom-wrapper">
                    <h3>History</h3>
                    {this.state.data.map(
                        d => <div className="row history">
                        <div className="col-sm-2">
                            {d.image_url}
                        </div>
                        <div className="col-sm-10">
                            <div className="card w-75">
                                <div className="card-body">
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
import React, { Component } from 'react';

class Result extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     title: 'Menu Makanan',
        //     title2: 'Menu Minuman',
        //     inputValue: '',
        //     inputKota: '',
        //     namaMakanan: [
        //         {
        //             nama: 'Mie Ayam',
        //             harga: 10000
        //         },
        //         {
        //             nama: 'Bakso',
        //             harga: 12000
        //         },
        //         {
        //             nama: 'Soto Ayam',
        //             harga: 15000
        //         },
        //     ],
        // }
        // this.rubahData = this.rubahData.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div className="body-wrapper centered">
                <div className="result-center">
                    {/* <h3>Centered!</h3> */}
                    <button type="submit" className="btn btn-success">Back to Homepage</button>
                </div>
            </div>
        )
    }
}

export default Result;

import React from 'react';
import './Portfolio.css';
import ListItem from '../listItem/ListItem';
import {connect} from "react-redux";


class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    setPortfolioItemsList = (stocks) => {
        return stocks.map((item, index) =>
            <ListItem
                index={index}
                id={item.id}
                type="portfolio"
                key={index}
            />);
    };

    render() {
        const {stocks, balance} = this.props.userInfo;

        return (
            <div className="portfolio">
                <div className="stocksList">
                    {this.setPortfolioItemsList(stocks)}
                </div>
                <div className="footer">
                    <span>Balance:</span>
                    <span className="sum">{balance.toFixed(3)} $</span>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    };
}

export default connect(mapStateToProps)(Portfolio);

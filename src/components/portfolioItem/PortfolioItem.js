import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './PortfolioItem.css';
import {addBalanceInfo} from "../../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class PortfolioItem extends React.Component {
    constructor(props){
        super(props);
        this.state ={
        };

    }



    render() {
        const {id,userInfo} = this.props;
        return (
            <div className="portfolioItem">
              {/*<img/>*/}
                <div className="stockName">{userInfo.stocks[id].name}</div>
               {/* <div className="stockName">{name}</div>*/}
                <div className="stockCount">{userInfo.stocks[id].count}шт</div>
                <div className="stockPrice">{userInfo.stocks[id].price}</div>
                <div className="stockHistory">{userInfo.stocks[id].priceDelta}</div>
                <hr/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        userInfo: state.userInfo
    };
}


export default connect(mapStateToProps)(PortfolioItem);

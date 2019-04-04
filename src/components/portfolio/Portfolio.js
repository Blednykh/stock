import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Portfolio.css';
import PortfolioItem from '../portfolioItem/PortfolioItem';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addBalanceInfo} from "../../actions/index";

class Portfolio extends React.Component {
    constructor(props){
        super(props);
        this.state ={
        };

        this.componentWillMount = this.componentWillMount.bind(this);

    }
    componentWillMount() {
        let request = new XMLHttpRequest();

        request.open('GET', 'https://warm-citadel-97897.herokuapp.com/api/account/info', true);
        request.setRequestHeader('Content-Type', 'application/json');
        /*request.addEventListener('load', function() {
            console.log("ответ сервера");
            console.log(request.responseText);
        });*/
        request.onload = ()=>{
            /* recordData = JSON.parse(request.responseText);*/
            console.log("ответ сервера");
            console.log(request.responseText);
            this.props.addBalanceInfo(request.responseText);
        };
        request.onerror = ()=>{
            const stocksList= {
                balance: 2000,
                stocks: [
                    {
                        id: 0,
                        code: "TCS",
                        name: "TCS Group (Tinkoff)",
                        iconUrl: "string",
                        price: 123,
                        priceDelta: 0.3,
                        count: 10
                    },
                    {
                        id: 1,
                        code: "BBK",
                        name: "BBK Group",
                        iconUrl: "string",
                        price: 230,
                        priceDelta: 0.6,
                        count: 24
                    },
                    {
                        id: 2,
                        code: "BLABLA",
                        name: "BLABLA Group",
                        iconUrl: "string",
                        price: 2300,
                        priceDelta: 0.8,
                        count: 12
                    }
                ]
            };
            /* recordData = JSON.parse(request.responseText);*/
            console.log("СЕРВЕР НИЧЕГО НЕ ВЕРНУЛ");
            this.props.addBalanceInfo(stocksList);
        };
        request.send();
    }


    render() {
      /*  const stocksList = this.props.userInfo.stocks;*/


        return (
            <div className="portfolio" id='portfolio'>
                <div className="accInfo" id='accInfo'>TAKOITOTO
                </div>
                <div className="stockList">
                    {this.props.userInfo.stocks.map((item)=>
                        <PortfolioItem
                            id = {item.id}
                        />
                    )}
                </div>
                <div className="balance">
                    <span>Balance:</span>
                    <span className="sum">1000$</span>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        userInfo: state.userInfo
    };
}
function matchDispatchToProps (dispatch){
    return bindActionCreators({addBalanceInfo}, dispatch)

}

export default connect(mapStateToProps, matchDispatchToProps)(Portfolio);

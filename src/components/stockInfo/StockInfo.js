import React from 'react';
import './StockInfo.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setStockHistory, sell, buy} from "../../actions/index";
import {Chart} from "react-google-charts";
import Loader from "react-loader-spinner";

class StockInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            range: "week",
        };
    }

    componentWillMount = () => {
        const {setStockHistory, id} = this.props;

        setStockHistory({
            id: id,
            range: "week"
        });

    };

    sellClick = () => {
        const {sell, id} = this.props;

        sell({
            stockId: id,
            amount: this.state.amount
        });
    };

    buyClick = () => {
        const {buy, id} = this.props;

        buy({
            stockId: id,
            amount: this.state.amount
        });
    };

    amountChange = e => {
        this.setState({amount: e.target.value});
    };

    selectChange = e => {
        const {setStockHistory, id} = this.props;

        this.setState({range: e.target.value});
        setStockHistory({
            id: id,
            range: e.target.value
        })
    };

    setChartOption = stockHistory => {

        const {history} = stockHistory;

        const dateMin = history[0].data;

        const dateMax = history[history.length - 1].data;

        const priceMin = 0;

        const priceMax = history.reduce((max, current) => {
            return (max.price > current.price) ? max : current;
        });

        return {
            explorer: {axis: "horizontal", keepInBounds: true},
            hAxis: {
                format: "MMM d, y",
                title: "Date",
                viewWindow: {min: dateMin, max: dateMax}
            },
            vAxis: {title: "Price", viewWindow: {min: priceMin, max: priceMax}},
            legend: "none",
            width: "350",
        }
    };

    setChartData = stockHistory => {
        const Data = [["Date", "Price"]];

        stockHistory.history.forEach(item => {
            let date = new Date(item.data);

            Data.push([date, item.price]);
        });
        return Data;
    };

    setSum = (price, amount) => {
        const sum = amount * price;

        return (sum.toFixed(2).toString().length < 10) ? sum.toFixed(2).toString() +  "$" : "lots of";
    };


    maxClick = (price, balance) => () => {
        const amount = Math.floor(balance / price);

        const amountInput = this.amountInput;

        amountInput.value = amount;
        this.setState({amount});
    };

    getInput = node => {
        this.amountInput = node;
    };

    setDisableSellButton = (count, amount) => {
        return !count || count < amount || Number(amount) === 0;
    };

    setDisableBuyButton = (price, amount, balance) => {
        return Number(amount) === 0 || amount * price > balance;
    };

    setChart = () => {
        let stockHistory = this.props.userInfo.stockHistoryList.find(item => {
            return item.stockId === this.props.id
        });
        if(stockHistory!==undefined){
            const options = this.setChartOption(stockHistory);

            const data = this.setChartData(stockHistory);

            return(
                <div className="chart_div">
                    <select onChange={this.selectChange} defaultValue="week">
                        <option>day</option>
                        <option>week</option>
                        <option>month</option>
                        <option>6months</option>
                        <option>year</option>
                        <option>total</option>
                    </select>
                    <Chart
                        chartType="AreaChart"
                        data={data}
                        options={options}
                        width="100%"
                        height="100%"
                        legendToggle
                    />
                </div>)
        } else {
            return(
                <div className="chart_div">
                    Loading Chart...
                </div>
               )
        }
    };

    setStock = () => {
        const {userInfo, id} = this.props;

        let stock = userInfo.stocks.find(item => {
            return item.id === id
        });

        if (stock === undefined) {
            stock = userInfo.items.find(item => {
                return item.id === id
            });
        }
        return stock;
    };

    render() {
        const {amount} = this.state;

        const {balance} = this.props.userInfo;

        const stock = this.setStock();

        const {iconUrl, name, price, count} = stock;

        return (
            <div className="stockInf">
                <div className="info">
                    <div className="stockInfoImg"><img src={iconUrl}/></div>
                    <div className="stockInfoRight">
                        <div className="stockInfoName">{name}</div>
                        <div className="stockInfoPrice">{price.toFixed(2)}$</div>
                    </div>
                </div>
                {this.setChart()}
                <div className="stockInfoFooter">
                    <div className="stockInfoAmount">
                        <input ref={this.getInput} placeholder="Amount stocks..." onChange={this.amountChange}/>
                        <span className="stockInfoSum">{this.setSum(price, amount)}</span>
                        <button className="maxButton" onClick={this.maxClick(price, balance)}>MAX</button>
                    </div>
                    <div className="stockInfoNavigation">
                        <button
                            className="sellButton"
                            disabled={this.setDisableSellButton(count, amount)}
                            onClick={this.sellClick}>
                            Sell
                        </button>
                        <button
                            className="buyButton"
                            disabled={this.setDisableBuyButton(price, amount, balance)}
                            onClick={this.buyClick}>
                            Buy
                        </button>
                    </div>
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

function matchDispatchToProps(dispatch) {
    return bindActionCreators({setStockHistory, sell, buy}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(StockInfo);

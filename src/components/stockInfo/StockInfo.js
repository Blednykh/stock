import React from 'react';
import './StockInfo.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {stockHistory, sell , buy} from "../../actions/index";
import history from "../../history/history";
import { Chart } from "react-google-charts";

class StockInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            amount: 0,
            stock: {
                price: 0
            }
        };
    }
    componentWillMount = () => {
        if(this.props.userInfo.accessToken!==undefined){
            this.props.stockHistory({
                id: this.props.id,
                range: "week",
                accessToken: this.props.userInfo.accessToken,
                refreshToken: this.props.userInfo.refreshToken
            })
        }
        else history.push('/signin');

        let inItems = false;
        this.props.userInfo.items.forEach((item,index)=>{
            if(item.id===this.props.id){
                inItems = true;
                this.setState({stock: item});
            }
        });
        if(!inItems){
            this.props.userInfo.stocks.forEach((item,index)=>{
                if(item.id===this.props.id){
                    this.setState({stock: item});
                }
            });
        }

    };


    sellClick = () => {
        this.props.sell({
            stockId: this.props.id,
            amount: this.state.amount,
            accessToken: this.props.userInfo.accessToken,
            refreshToken: this.props.userInfo.refreshToken
        });
    };

    buyClick = () => {
        this.props.buy({
            stockId: this.props.id,
            amount: this.state.amount,
            accessToken: this.props.userInfo.accessToken,
            refreshToken: this.props.userInfo.refreshToken
        });
    };
    amountChange = (e) => {
        this.setState({amount: e.target.value});
    };

    selectChange = (e) => {
        this.props.stockHistory({
            id: this.props.id,
            range: e.target.value,
            accessToken: this.props.userInfo.accessToken,
            refreshToken: this.props.userInfo.refreshToken
        })
    };

    setChartOption = () => {
        if(this.props.userInfo.stockHistory!==undefined){
            const dateMin = this.props.userInfo.stockHistory.history[0].date;
            const dateMax = this.props.userInfo.stockHistory.history[this.props.userInfo.stockHistory.history.length-1].date;
            const priceMin = this.props.userInfo.stockHistory.history[0].price;
            const priceMax = this.props.userInfo.stockHistory.history[this.props.userInfo.stockHistory.history.length-1].price;
            return {
                hAxis: { format: "MMM d, y", title: "Date", viewWindow: { min: dateMin, max: dateMax } },
                vAxis: { title: "Price", viewWindow: { min: priceMin, max: priceMax } },
                legend: "none"
            }
        }
    }

    setChartData = () => {
        if(this.props.userInfo.stockHistory!==undefined){
            const Data = [["Date", "Price"]];
            this.props.userInfo.stockHistory.history.forEach((item)=>{
                let date = new Date(item.date);
                Data.push([date,item.price])
            });

            return Data;
        }
    }


    render() {
        const options = this.setChartOption();
        const data = this.setChartData();
        return (
            <div className="stockInf">
                <div className="info">
                    <div className="stockInfoName">{this.state.stock.name}</div>
                    <div className="stockInfoPrice">{this.state.stock.price.toFixed(2)}$</div>
                </div>
                <div className="chart_div">
                    <select onChange={this.selectChange} defaultValue="week">
                        <option>day</option>
                        <option>week</option>
                        <option>month</option>
                        <option>6 months</option>
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
                </div>
                <div className="footer1">
                    <button onClick={this.sellClick}>Sell</button>
                    <input className="amount" placeholder="Amount stocks..." onChange={this.amountChange}/>
                    <button onClick={this.buyClick}>Buy</button>
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
    return bindActionCreators({stockHistory, sell, buy}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(StockInfo);

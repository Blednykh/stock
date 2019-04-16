import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './PortfolioItem.css';
import {addShowedStocksInfoList} from "../../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import stockIco from '../../stock_icon.png';
import buyIco from '../../buy_icon.png';
import sellIco from '../../sell_icon.png';

class PortfolioItem extends React.Component {
    constructor(props){
        super(props);
        this.state ={
        };

    }

    setContent = (index, userInfo, type) =>{
        switch(type){
            case 'portfolio': {
                return <div className="stockInfo">
                    <div className="stockInfoLeft">
                        <div className="stockName">{userInfo.stocks[index].name}{/*IBM technologis*/}</div>
                        <div className="stockCount">{Math.abs(userInfo.stocks[index].count)} шт</div>
                    </div>
                    <div className="stockInfoRight">
                        <div className="stockPrice">{userInfo.stocks[index].price.toFixed(4)} $</div>
                        <div className="stockHistory">{userInfo.stocks[index].priceDelta.toFixed(2)}</div>
                    </div>
                </div>
            }
            case 'stocks-list': {
                return <div className="stockInfo">
                    <div className="stockInfoLeft">
                        <div className="stockName">{userInfo.items[index].name}{/*IBM technologis*/}</div>
                    </div>
                    <div className="stockInfoRight">
                        <div className="stockPrice">{userInfo.items[index].price.toFixed(4)} $</div>
                        <div className="stockHistory">{userInfo.items[index].priceDelta.toFixed(2)}</div>
                    </div>
                </div>
            }
            case 'history': {
                return <div className="stockInfo">
                    <div className="stockInfoLeft">
                        <div className="stockName">{userInfo.history[index].stock.name}{/*IBM technologis*/}</div>
                        <div className="stockCount">{Math.abs(userInfo.history[index].amount)} шт</div>
                    </div>
                    <div className="stockInfoRight">
                        <div className="stockPrice">{userInfo.history[index].date}</div>
                        <div className="stockHistory">на сумму: {userInfo.history[index].totalPrice.toFixed(4)} $</div>
                    </div>
                </div>
            }
        }
    }

    setImg= (index, userInfo, type) =>{
        switch(type){
            case 'history': {
                return (userInfo.history[index].type==='buy')?
                    <div className="stockImg"><img src={buyIco}/></div> : <div className="stockImg"><img src={sellIco}/></div>
            }
            default: {
                return<div className="stockImg"><img src={stockIco}/></div>
            }
        }
    }


stockClick = () => {
    let showedStocksList = [];
        if(this.props.userInfo.showedStocksList!==undefined)
            showedStocksList = this.props.userInfo.showedStocksList;
        showedStocksList.push(this.props.index);
        this.props.addShowedStocksInfoList(showedStocksList);
    };


    render() {
        const {index, userInfo, type} = this.props;
        return (
            <div className="portfolioItem" onClick={this.stockClick}>
                <div className="stock">
                    {this.setImg(index, userInfo, type)}
                    {this.setContent(index, userInfo, type)}
                </div>
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
function matchDispatchToProps (dispatch){
    return bindActionCreators({addShowedStocksInfoList}, dispatch)

}

export default connect(mapStateToProps,matchDispatchToProps)(PortfolioItem);

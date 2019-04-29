import React from "react";
import "./ListItem.css";
import {
    addShowedStocksInfoList,
    setStockHistory,
    setComponentsPosition
} from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    formatDate = date => {
        let dd = date.getDate();

        let mm = date.getMonth() + 1;

        let yy = date.getFullYear() % 100;

        let h = date.getHours();

        let m = date.getMinutes();

        let s = date.getSeconds();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (yy < 10) {
            yy = '0' + yy;
        }
        if (h < 10) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        return dd + '/' + mm + '/' + yy + ' ' + h + ':' + m + ':' + s;
    };


    setContent = (index, userInfo, type) => {
        let stockName;

        let stockCount;

        let stockPrice;

        let stockHistory;

        let stockDate;

        switch (type) {
            case 'portfolio': {
                stockName = userInfo.stocks[index].name;
                stockCount = Math.abs(userInfo.stocks[index].count);
                stockPrice = userInfo.stocks[index].price.toFixed(2);
                stockHistory = userInfo.stocks[index].priceDelta.toFixed(2);
                break;
            }
            case 'stocks-list': {
                stockName = userInfo.items[index].name;
                stockPrice = userInfo.items[index].price.toFixed(2);
                stockHistory = userInfo.items[index].priceDelta.toFixed(2);
                break;
            }
            case 'history': {
                stockName = userInfo.history.items[index].stock.name;
                stockCount = Math.abs(userInfo.history.items[index].amount);
                stockDate = this.formatDate(userInfo.history.items[index].date);
                stockHistory = "на сумму:" + userInfo.history.items[index].totalPrice.toFixed(2);
                break;
            }

        }

        return (
            <div className="stockInfo">
                <div className="stockInfoLeft">
                    <div className="stockName">{stockName}</div>
                    {stockCount && <div className="stockCount">{stockCount} шт</div>}
                </div>
                <div className="stockInfoRight">
                    {stockPrice ? <div className="stockPrice">{stockPrice} $</div> :
                        <div className="stockDate">{stockDate}</div>}
                    <div className="stockHistory">{stockHistory}</div>
                </div>
            </div>)

    };

    setImg = (index, userInfo, type) => {
        switch (type) {
            case "history": {
                return (
                    <div className="stockImg">
                        <img src={userInfo.history.items[index].stock.iconUrl} />
                    </div>
                );
            }
            case "stocks-list": {
                return (
                    <div className="stockImg">
                        <img src={userInfo.items[index].iconUrl} />
                    </div>
                );
            }
            case "portfolio": {
                return (
                    <div className="stockImg">
                        <img src={userInfo.stocks[index].iconUrl} />
                    </div>
                );
            }
        }
    };


    stockClick = () => {
        const {userInfo: {showedStocksList, position}, setComponentsPosition, addShowedStocksInfoList, id, index} = this.props;

        let {positionTop, positionLeft, zIndex} = position;

        const lastPosition = positionTop.length-1;

        if (showedStocksList.find(item => {
            return item === id
        }) === undefined) {

            position.positionTop.push(Number(positionTop[lastPosition].substring(0, positionTop[lastPosition].length - 2)) + 50 + "px");
            position.positionLeft.push(Number(positionLeft[lastPosition].substring(0, positionLeft[lastPosition].length - 2)) + 100 + "px");
            position.zIndex.push(zIndex[lastPosition] + 1);
            setComponentsPosition(position);
            showedStocksList.push(id);
            addShowedStocksInfoList(showedStocksList);
        }
    };

    setClassName = (index, userInfo, type) => {
        if (type !== "history") {
            return "listItem";
        } else {
            return userInfo.history.items[index].type === "buy"
                ? "listItemBuy"
                : "listItemSell";
        }
    };

    render() {
        const {index, userInfo, type} = this.props;

        return (
            <div className={this.setClassName(index, userInfo, type)} onClick={this.stockClick}>
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
    return {
        userInfo: state.userInfo
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({addShowedStocksInfoList, setStockHistory, setComponentsPosition}, dispatch)

}

export default connect(mapStateToProps, matchDispatchToProps)(ListItem);

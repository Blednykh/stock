import React from 'react';
import './ListItem.css';
import {addShowedStocksInfoList} from "../../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

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
        switch (type) {
            case 'portfolio': {
                return <div className="stockInfo">
                    <div className="stockInfoLeft">
                        <div className="stockName">{userInfo.stocks[index].name}</div>
                        <div className="stockCount">{Math.abs(userInfo.stocks[index].count)} шт</div>
                    </div>
                    <div className="stockInfoRight">
                        <div className="stockPrice">{userInfo.stocks[index].price.toFixed(2)} $</div>
                        <div className="stockHistory">{userInfo.stocks[index].priceDelta.toFixed(2)}</div>
                    </div>
                </div>
            }
            case 'stocks-list': {
                return <div className="stockInfo">
                    <div className="stockInfoLeft">
                        <div className="stockName">{userInfo.items[index].name}</div>
                    </div>
                    <div className="stockInfoRight">
                        <div className="stockPrice">{userInfo.items[index].price.toFixed(2)} $</div>
                        <div className="stockHistory">{userInfo.items[index].priceDelta.toFixed(2)}</div>
                    </div>
                </div>
            }
            case 'history': {
                return <div className="stockInfo">
                    <div className="stockInfoLeft">
                        <div className="stockName">{userInfo.history.items[index].stock.name}</div>
                        <div className="stockCount">{Math.abs(userInfo.history.items[index].amount)} шт</div>
                    </div>
                    <div className="stockInfoRight">
                        <div className="stockDate">{this.formatDate(userInfo.history.items[index].date)}</div>
                        <div className="stockHistory">на
                            сумму: {userInfo.history.items[index].totalPrice.toFixed(2)} $
                        </div>
                    </div>
                </div>
            }
        }
    };

    setImg = (index, userInfo, type) => {
        switch (type) {
            case 'history': {
                return <div className="stockImg"><img src={userInfo.history.items[index].stock.iconUrl}/></div>
            }
            case 'stocks-list': {
                return <div className="stockImg"><img src={userInfo.items[index].iconUrl}/></div>
            }
            case 'portfolio': {
                return <div className="stockImg"><img src={userInfo.stocks[index].iconUrl}/></div>
            }
        }
    };


    stockClick = () => {
        const {showedStocksList} = this.props.userInfo;

        showedStocksList.push(this.props.id);
        this.props.addShowedStocksInfoList(showedStocksList);
    };

    setClassName = (index, userInfo, type) => {
        if (type !== 'history') {
            return "listItem"
        } else {
            return (userInfo.history.items[index].type === 'buy') ? "listItemBuy" : "listItemSell";
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
    return bindActionCreators({addShowedStocksInfoList}, dispatch)

}

export default connect(mapStateToProps, matchDispatchToProps)(ListItem);

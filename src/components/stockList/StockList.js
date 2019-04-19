import React from 'react';
import './StockList.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addStocks} from "../../actions/index";
import history from "../../history/history";
import PortfolioItem from '../listItem/ListItem';

class StockList extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            stocksQuantity: 10,
            search: '',
            itemId: 0
        };
    }
    componentWillMount = () => {
        if(this.props.userInfo.accessToken === undefined) history.push('/signin');
    };


    setStockList = () => {
        if(this.props.userInfo.stocks!==undefined){
            return this.props.userInfo.items.map((item,index)=>
                <PortfolioItem
                    index = {index}
                    id = {item.id}
                    key = {index}
                    type = 'stocks-list'
                />
            );
        }
    }

    quantityChange = () => {
        let stocksQuantity = (this.state.stocksQuantity===10)?25:10;
        this.setState({stocksQuantity});
    }

    searchChange = (event) => {
        this.setState({search: event.target.value});
    };
    searchClick = () => this.props.addStocks({...this.state, accessToken: this.props.userInfo.accessToken, refreshToken: this.props.userInfo.refreshToken});

    prefClick = () => {
        let itemId = this.state.itemId;
        if(itemId!==0)itemId-= this.state.stocksQuantity;
        this.setState({itemId});
        this.props.addStocks({...this.state, accessToken: this.props.userInfo.accessToken, refreshToken: this.props.userInfo.refreshToken});
    }

    nextClick = () => {
        const itemId = this.state.itemId + this.state.stocksQuantity;
        this.setState({itemId});
        this.props.addStocks({...this.state, accessToken: this.props.userInfo.accessToken, refreshToken: this.props.userInfo.refreshToken});
    }

    render() {
        return (
            <div className="stockList">
                <div className = "search-box">
                    <input type="text" placeholder="Search stocks..." onChange={this.searchChange}/>
                    <button className="searchButton" onClick={this.searchClick}>
                        <i className="fas fa-search"></i>
                    </button>
                    <button className="countButton" title = "Кол-во акций на странице" onClick={this.quantityChange}>
                       {this.state.stocksQuantity}
                    </button>
                </div>
                <div className="stockListList">
                    {this.setStockList()}
                </div>
                <div className="navigation">
                    <button className="buttonPref" onClick={this.prefClick}>Pref</button>
                    <button className="buttonNext" onClick={this.nextClick}>Next</button>
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
    return bindActionCreators({addStocks}, dispatch)

}

export default connect(mapStateToProps, matchDispatchToProps)(StockList);

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './StockList.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addStocks} from "../../actions/index";
import history from "../../history/history";
import PortfolioItem from '../portfolioItem/PortfolioItem';

class StockList extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            stocksQuantity: 10,
            search: ''
        };
    }
    componentWillMount = () => {
        if(this.props.userInfo.accessToken === undefined) history.push('/signin');
    };

    componentDidMount = () => {
        const accInfoElem = document.getElementById('stockListHead');
        const portfolioElem = document.getElementById('stockList');

        accInfoElem.onmousedown = function(e) {
            const offsetX = e.offsetX;
            const offsetY = e.offsetY;

            portfolioElem.style.position = 'absolute';
            moveAt(e);

            document.body.appendChild(portfolioElem);

            portfolioElem.style.zIndex = 1000;

            function moveAt(e) {
                portfolioElem.style.left = '100px';
                portfolioElem.style.left = e.pageX - offsetX + 'px';
                portfolioElem.style.top = e.pageY - offsetY + 'px';
            }

            document.onmousemove = function(e) {
                moveAt(e);
            };

            accInfoElem.onmouseup = function() {
                document.onmousemove = null;
                accInfoElem.onmouseup = null;
            }
        }
    };

    setStockList = () => {
        if(this.props.userInfo.stocks!==undefined){
            return this.props.userInfo.items.map((item,index)=>
                <PortfolioItem
                    index = {index}
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
    searchClick = () => this.props.addStocks({...this.state, accessToken: this.props.userInfo.accessToken});

    render() {
        return (
            <div className="stockList" id='stockList'>
                <div className="head" id='stockListHead'>Список акций</div>
                <div className = "search-box">
                    <input type="text" placeholder="Search stocks..." onChange={this.searchChange}/>
                    <button className="searchButton" onClick={this.searchClick}>
                        <i className="fas fa-search"></i>
                    </button>
                    <button className="countButton" title = "Кол-во акций на странице" onClick={this.quantityChange}>
                       {this.state.stocksQuantity}
                    </button>
                  {/*  <input/><span>на странице</span>*/}
                </div>
                <div className="stockListList">
                    {this.setStockList()}
                </div>
                <div className="navigation">
                    <button className="buttonPref">Pref</button>
                    <button className="buttonNext">Next</button>
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

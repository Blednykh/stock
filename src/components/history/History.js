import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './History.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {transactionHistoty} from "../../actions/index";
import history from "../../history/history";
import PortfolioItem from '../portfolioItem/PortfolioItem';

class History extends React.Component {
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
        const head = document.getElementById('head');
        const history = document.getElementById('history');

        head.onmousedown = function(e) {
            const offsetX = e.offsetX;
            const offsetY = e.offsetY;

            history.style.position = 'absolute';
            moveAt(e);

            document.body.appendChild(history);

            history.style.zIndex = 1000;

            function moveAt(e) {
                history.style.left = '100px';
                history.style.left = e.pageX - offsetX + 'px';
                history.style.top = e.pageY - offsetY + 'px';
            }

            document.onmousemove = function(e) {
                moveAt(e);
            };

            head.onmouseup = function() {
                document.onmousemove = null;
                head.onmouseup = null;
            }
        }
    };

    setHistoryList = () => {
        if(this.props.userInfo.history!==undefined){
            return this.props.userInfo.history.map((item,index)=>
                <PortfolioItem
                    index = {index}
                    key = {index}
                    type = 'history'
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
    searchClick = () => this.props.transactionHistoty({...this.state, accessToken: this.props.userInfo.accessToken});

    render() {
        return (
            <div className="history" id='history'>
                <div className="head" id='head'>История транзакций</div>
                <div className = "search-box">
                    <input type="text" placeholder="Search by stock..." onChange={this.searchChange}/>
                    <button className="searchButton" onClick={this.searchClick}>
                        <i className="fas fa-search"></i>
                    </button>
                    <button className="countButton" title = "Кол-во акций на странице" onClick={this.quantityChange}>
                        {this.state.stocksQuantity}
                    </button>
                    {/*  <input/><span>на странице</span>*/}
                </div>
                <div className="stockListList">
                    {this.setHistoryList()}
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
    return bindActionCreators({transactionHistoty}, dispatch)

}

export default connect(mapStateToProps, matchDispatchToProps)(History);

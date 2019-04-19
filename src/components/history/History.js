import React from 'react';
import './History.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {transactionHistoty} from "../../actions/index";
import history from "../../history/history";
import PortfolioItem from '../listItem/ListItem';

class History extends React.Component {
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
    };

    searchChange = (event) => {
        this.setState({search: event.target.value});
    };

    searchClick = () => this.props.transactionHistoty({...this.state, accessToken: this.props.userInfo.accessToken, refreshToken: this.props.userInfo.refreshToken});

    prefClick = () => {
        let itemId = this.state.itemId;
        if(itemId!==0)itemId-= this.state.stocksQuantity;
        this.setState({itemId});
        this.props.transactionHistoty({...this.state, accessToken: this.props.userInfo.accessToken, refreshToken: this.props.userInfo.refreshToken});
    }

    nextClick = () => {
        const itemId = this.state.itemId + this.state.stocksQuantity;
        this.setState({itemId});
        this.props.transactionHistoty({...this.state, accessToken: this.props.userInfo.accessToken, refreshToken: this.props.userInfo.refreshToken});
    }

    render() {
        return (
            <div className="history">
                <div className = "search-box">
                    <input type="text" placeholder="Search by stock..." onChange={this.searchChange}/>
                    <button className="searchButton" onClick={this.searchClick}>
                        <i className="fas fa-search"></i>
                    </button>
                    <button className="countButton" title = "Кол-во акций на странице" onClick={this.quantityChange}>
                        {this.state.stocksQuantity}
                    </button>
                </div>
                <div className="historyList">
                    {this.setHistoryList()}
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
    return bindActionCreators({transactionHistoty}, dispatch)

}

export default connect(mapStateToProps, matchDispatchToProps)(History);

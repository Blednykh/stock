import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Table.css';
import Portfolio from '../portfolio/Portfolio';
import StockList from '../stockList/StockList';
import StockInfo from '../stockInfo/StockInfo';
import History from '../history/History';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addAccountInfo, addShowedStocksInfoList} from "../../actions/index";
import history from "../../history/history";
import Loader from 'react-loader-spinner'
import PortfolioItem from "../portfolioItem/PortfolioItem";
import userIco from '../../user.png';


class Table extends React.Component {
    constructor(props){
        super(props);
        this.state ={
        };
    }
    componentWillMount = () => {
        if(this.props.userInfo.accessToken===undefined)history.push('/signin');
    };

    setStockInfo = () => {
        if(this.props.userInfo.showedStocksList!==undefined && this.props.userInfo.showedStocksList.length>0){
            return this.props.userInfo.showedStocksList.map((item,index)=>
                <StockInfo
                    index = {item}
                    id = {index}
                    key = {index}
                    stockClick = {this.stockClick}
                />
            );
        }
    };

    stockClick = (index) =>() => {
        let showedStocksList = [];
        if(this.props.userInfo.showedStocksList!==undefined)
            showedStocksList = this.props.userInfo.showedStocksList;
        if(showedStocksList.length>0) showedStocksList.splice(index,1);
        else showedStocksList = [];
        this.props.addShowedStocksInfoList(showedStocksList);
    };

    render() {
        console.log(this.props.userInfo);
        return (
            <div className="table">
                <div className="header" >
                    <div className="menu">
                       {/* <span>History</span>
                        <span>Stocks</span>*/}
                        <span className="user">
                         {/*   <img src={userIco}/>*/}
                            {this.props.userInfo.name}
                        </span>
                    </div>
                </div>
                <div className="content">
                  <Portfolio/>
                  <StockList/>
                  <History/>
                    {this.setStockInfo()}
                </div>
                <div className="loader" style={{display: this.props.userInfo.accountInfoLoading}}>
                    <Loader
                        type="Grid"
                        color="#487eb0"
                        height="100"
                        width="100"
                    />
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
    return bindActionCreators({addShowedStocksInfoList}, dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Table);

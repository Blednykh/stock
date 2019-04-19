import React from 'react';
import './Portfolio.css';
import PortfolioItem from '../listItem/ListItem';
import {connect} from "react-redux";
import history from "../../history/history";

class Portfolio extends React.Component {
    constructor(props){
        super(props);
        this.state ={
        };
    }
    componentWillMount = () => {
        if(this.props.userInfo.accessToken===undefined) history.push('/signin');
    }

    setPortfolioItemsList = () => {
        if(this.props.userInfo.stocks!==undefined){
            return this.props.userInfo.stocks.map((item,index)=>
                <PortfolioItem
                    index = {index}
                    id = {item.id}
                    key = {index}
                    type = "portfolio"
                />
            );
        }
    }

    render() {
        return (
            <div className="portfolio">
                <div className="stocksList">
                    {this.setPortfolioItemsList()}
                </div>
                <div className="footer">
                    <span>Balance:</span>
                    <span className="sum">{this.props.userInfo.balance&&this.props.userInfo.balance.toFixed(3)} $</span>
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

export default connect(mapStateToProps)(Portfolio);

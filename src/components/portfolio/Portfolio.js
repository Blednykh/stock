import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Portfolio.css';
import PortfolioItem from '../portfolioItem/PortfolioItem';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addAccountInfo} from "../../actions/index";
import history from "../../history/history";

class Portfolio extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            positionLeft: "20px",
            positionTop: "90px"
        };
    }
    componentWillMount = () => {
        if(this.props.userInfo.accessToken!==undefined){
         /*   this.props.addAccountInfo(this.props.userInfo.accessToken);*/
        }
        else history.push('/signin');


    }

    componentDidMount = () => {
        const accInfoElem = document.getElementById('accInfo');
        const portfolioElem = document.getElementById('portfolio');

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
            }

            accInfoElem.onmouseup = function() {
                document.onmousemove = null;
                accInfoElem.onmouseup = null;
            }
        }
    }

    setPortfolioItemsList = () => {
        if(this.props.userInfo.stocks!==undefined){
            return this.props.userInfo.stocks.map((item,index)=>
                <PortfolioItem
                    index = {index}
                    key = {index}
                    type = "portfolio"
                />
            );
        }
    }

    render() {
        return (
            <div className="portfolio" id='portfolio' style={{left: this.state.positionLeft, top: this.state.positionTop}}>
                <div className="accInfo" id='accInfo'>{/*{this.props.userInfo.name}*/} Мои акции
                </div>
                <div className="stocksList">
                    {this.setPortfolioItemsList()}
                </div>
                <div className="balance">
                    <span>Balance:</span>
                    <span className="sum">{this.props.userInfo.balance&&this.props.userInfo.balance.toFixed(4)} $</span>
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
    return bindActionCreators({addAccountInfo}, dispatch)

}
export default connect(mapStateToProps, matchDispatchToProps)(Portfolio);

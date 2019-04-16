import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './StockInfo.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addAccountInfo, addShowedStocksInfoList, sell , buy} from "../../actions/index";
import history from "../../history/history";

class StockInfo extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            display: "inherit",
            down: false,
            offsetX: 0,
            offsetY: 0,
            pageX: 0,
            pageY: 0,
            amount: 0
        };
    }
    componentWillMount = () => {
        if(this.props.userInfo.accessToken!==undefined){
            /*   this.props.addAccountInfo(this.props.userInfo.accessToken);*/
        }
        else history.push('/signin');


    };

    onMouseUp = (e) => {
        this.setState({down: false/*,offsetX: 0,offsetY: 0*/});
        const id = 'stockInf'+this.props.id;
        const documentElem = document.getElementById(id);
        documentElem.style.zIndex = '999';
        /*document.body.removeChild(documentElem);*/
    };
    onMouseMove = (e) => {
        const documentElem = document.getElementById('stockInf'+this.props.id);
        const {down, offsetX, offsetY, pageX, pageY} = this.state;
        if(down){
            documentElem.style.left = offsetX + (e.pageX - pageX) + 'px';
            documentElem.style.top = offsetY + (e.pageY - pageY) + 'px';
        }
    };
    onMouseDown = (e) => {
        const id = 'stockInf'+this.props.id;
        const documentElem = document.getElementById(id);
        documentElem.style.zIndex = '1000';
        /*document.body.appendChild(documentElem);*/
        console.log(documentElem.style.zIndex);
        const offsetX = documentElem.offsetLeft;
        const offsetY = documentElem.offsetTop;

        this.setState({down: true, offsetX, offsetY, pageX: e.pageX, pageY: e.pageY});
    }


    componentDidMount = () => {
        //this.setState({accInfoElem: document.getElementById('info'), portfolioElem: document.getElementById('stockInf')});
     /*   const {accInfoElem, portfolioElem}  = this.state;*/


       /* this.state.accInfoElem.onmousedown = function(e) {
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
        }*/
    }
   /* stockClick = () => {
        let showedStocksList = [];
        if(this.props.userInfo.showedStocksList!==undefined)
            showedStocksList = this.props.userInfo.showedStocksList;
        if(showedStocksList.length>0) showedStocksList.splice(this.props.key,1);
        else showedStocksList = [];
        this.props.addShowedStocksInfoList(showedStocksList);
        /!*this.setState({display: "none"});*!/
    };*/

    sellClick = () => {
        this.props.sell({   stockId: this.props.userInfo.items[this.props.index].id,
                             amount: this.state.amount,
                        accessToken: this.props.userInfo.accessToken
        });
    };

    buyClick = () => {
        this.props.buy({   stockId: this.props.userInfo.items[this.props.index].id,
                            amount: this.state.amount,
                       accessToken: this.props.userInfo.accessToken
        });
    };
    amountChange = (event) => {
        this.setState({amount: event.target.value});
    };

    render() {
        const name = (this.props.userInfo.items[this.props.index].name===undefined)?"Имя акции":this.props.userInfo.items[this.props.index].name;
        const id = 'stockInf'+this.props.id;
        return (
            <div className="stockInf" id={id} style = {{display: this.state.display}}>
                <div className="name" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove}>{name}
                    <div className="closeButton" onClick={ this.props.stockClick(this.props.id)}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>
                <div className="info">
                    <div className="price">Price: {this.props.userInfo.items[this.props.index].price} $</div>

                </div>
                <div className="graph">
                </div>
                <div className="balance">
                    <button onClick={this.sellClick}>Sell</button>
                    <input className="amount" placeholder="Amount stocks..." onChange={this.amountChange}/>
                    <button onClick={this.buyClick}>Buy</button>
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
    return bindActionCreators({addShowedStocksInfoList, sell, buy}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(StockInfo);

import React from 'react';
import './Table.css';
import Portfolio from '../portfolio/Portfolio';
import StockList from '../stockList/StockList';
import StockInfo from '../stockInfo/StockInfo';
import Draggable from '../draggable/Draggable';
import History from '../history/History';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setComponentsPosition, addShowedStocksInfoList} from "../../actions/index";
import history from "../../history/history";
import Loader from 'react-loader-spinner'



class Table extends React.Component {
    constructor(props){
        super(props);
        this.state ={
        };
    }
    componentWillMount = () => {
        if (this.props.userInfo.accessToken===undefined) history.push('/signin');
    };



    setStockInfo = () => {
        if(this.props.userInfo.showedStocksList!==undefined && this.props.userInfo.showedStocksList.length>0){
            return this.props.userInfo.showedStocksList.map((item,index)=>
                <Draggable
                    name = "Информация об акции"
                    component = {  <StockInfo
                        id = {item}
                        index = {index}
                        key = {index}
                    />}
                    lockable = {true}
                    stockClick = {this.stockClick}
                    position = {3+index}
                    key = {3+index}
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
                        <span className="user">
                            {this.props.userInfo.name}
                        </span>
                    </div>
                </div>
                <div className="content">
                    <Draggable
                        name = "Мои акции"
                        component = {<Portfolio/>}
                        lockable = {false}
                        position = {0}
                        key = {0}
                    />
                    <Draggable
                        name = "Список всех акций"
                        component = {<StockList/>}
                        lockable = {false}
                        position = {1}
                        key = {1}
                    />
                    <Draggable
                        name = "История транзакций"
                        component = {<History/>}
                        lockable = {false}
                        position = {2}
                        key = {2}
                    />
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
    return bindActionCreators({setComponentsPosition, addShowedStocksInfoList}, dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(Table);

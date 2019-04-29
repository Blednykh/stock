import React from 'react';
import './Table.css';
import Portfolio from '../portfolio/Portfolio';
import StockList from '../stockList/StockList';
import StockInfo from '../stockInfo/StockInfo';
import Draggable from '../draggable/Draggable';
import History from '../history/History';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setComponentsPosition, addShowedStocksInfoList, addAccountInfo, addToken, logout} from "../../actions/index";
import history from "../../history/history";
import Loader from 'react-loader-spinner'


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount = () => {
        const accessToken = localStorage.getItem('accessToken');

        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken === null) {
            history.push('/signin');
        } else {
            this.props.addToken({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
            this.props.addAccountInfo();
        }
    };

    logoutClick = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.props.logout();
        history.push('/signin');
    };

    setStockInfo = (showedStocksList) => {
        return showedStocksList.map((item, index) =>
            <Draggable
                name="Информация об акции"
                lockable={true}
                lockClick={this.lockClick}
                position={3 + index}
                id={item}
                key={3 + index}
            >
                <StockInfo
                    id={item}
                    index={index}
                    key={index}
                />
            </Draggable>
        );
    };

    lockClick = (id) => () => {
        let {showedStocksList} = this.props.userInfo;

        if (showedStocksList.length > 0) {
            showedStocksList = showedStocksList.filter(item=>{
                return item !== id
            });
          /*  showedStocksList.splice(index-1, 1);*/
        } else {
            showedStocksList = [];
        }
        this.props.addShowedStocksInfoList(showedStocksList);
    };

    render() {
        const {name, accountInfoLoading, showedStocksList} = this.props.userInfo;

        return (
            <div className="table">
                <div className="header">
                    <div className="menu">
                        <div className="user">
                            {name}
                        </div>
                        <div className="logout" onClick={this.logoutClick}>
                            <i className="fas fa-sign-out-alt"></i>
                            Logout
                        </div>
                    </div>
                </div>
                <div className="content">
                    <Draggable
                        name="Мои акции"
                        lockable={false}
                        position={0}
                        key={0}
                    >
                        <Portfolio/>
                    </Draggable>

                    <Draggable
                        name="Список всех акций"
                        lockable={false}
                        position={1}
                        key={1}
                    >
                        <StockList/>
                    </Draggable>

                    <Draggable
                        name="История транзакций"
                        lockable={false}
                        position={2}
                        key={2}
                    >
                        <History/>
                    </Draggable>

                    {this.setStockInfo(showedStocksList)}
                </div>
                <div className="loader" style={{display: accountInfoLoading}}>
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
    return {
        userInfo: state.userInfo
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setComponentsPosition,
        addShowedStocksInfoList,
        addAccountInfo,
        addToken,
        logout
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Table);

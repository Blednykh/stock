import React from 'react';
import './StockList.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addStocks} from "../../actions/index";
import PortfolioItem from '../listItem/ListItem';

class StockList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 10,
            search: '',
            itemId: 1
        };
    }

    setStockList = (items) => {
        return items.map((item, index) =>
            <PortfolioItem
                index={index}
                id={item.id}
                type='stocks-list'
                key={index}
            />);
    };

    quantityChange = () => {
        const count = (this.state.count === 10) ? 25 : 10;

        this.setState({count});
        this.props.addStocks({...this.state, count: count});
    };

    searchChange = event => {
        if (event.target.value === "") {
            this.props.addStocks({...this.state, search: event.target.value});
        }
        this.setState({search: event.target.value});
    };

    searchClick = () => this.props.addStocks(this.state);

    prevClick = prevItemId => () => {
        const itemId = prevItemId;

        this.setState({itemId});
        this.props.addStocks({...this.state, itemId: itemId});
    };

    nextClick = nextItemId => () => {
        const itemId = nextItemId;

        this.setState({itemId});
        this.props.addStocks({...this.state, itemId: itemId});
    };

    setDisableButtonPrev = (prevItemId, nextItemId) => {
        return (prevItemId === nextItemId || prevItemId === this.props.userInfo.items[0].id);
    };

    setDisableButtonNext = (prevItemId, nextItemId) => {
        return (prevItemId === nextItemId || nextItemId === this.props.userInfo.items[0].id);
    };

    render() {
        const {prevItemId, nextItemId, items} = this.props.userInfo;

        return (
            <div className="stockList">
                <div className="search-box">
                    <input type="text" placeholder="Search stocks..." onChange={this.searchChange}/>
                    <button className="searchButton" onClick={this.searchClick}>
                        <i className="fas fa-search"></i>
                    </button>
                    <button className="countButton" title="Кол-во акций на странице" onClick={this.quantityChange}>
                        {this.state.count}
                    </button>
                </div>
                <div className="stockListList">
                    {this.setStockList(items)}
                </div>
                <div className="navigation">
                    <button className="buttonPrev" onClick={this.prevClick(prevItemId)}
                            disabled = {this.setDisableButtonPrev(prevItemId, nextItemId)}>Prev
                    </button>
                    <button className="buttonNext" onClick={this.nextClick(nextItemId)}
                            disabled = {this.setDisableButtonNext(prevItemId, nextItemId)}>Next
                    </button>
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
    return bindActionCreators({addStocks}, dispatch)

}

export default connect(mapStateToProps, matchDispatchToProps)(StockList);

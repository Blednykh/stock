import React from 'react';
import './History.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {transactionHistoty} from "../../actions/index";
import PortfolioItem from '../listItem/ListItem';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 10,
            search: '',
            itemId: 0
        };
    }

    setHistoryList = items => {
        return items.map((item, index) => (
            <PortfolioItem
                index={index}
                id={item.stock.id}
                type="history"
                key={index}
            />
        ));
    };

    quantityChange = () => {
        const count = (this.state.count === 10) ? 25 : 10;

        this.setState({count});
        this.props.transactionHistoty({...this.state, count: count});
    };

    searchChange = event => {
        if (event.target.value === "") {
            this.props.transactionHistoty({
                ...this.state,
                search: event.target.value
            });
        }
        this.setState({ search: event.target.value });
    };

    searchClick = () => this.props.transactionHistoty(this.state);

    prevClick = prevItemId => () => {
        const itemId = prevItemId;

        this.setState({itemId});
        this.props.transactionHistoty({...this.state, itemId: itemId});
    };

    nextClick = nextItemId => () => {
        const itemId = nextItemId;

        this.setState({itemId});
        this.props.transactionHistoty({...this.state, itemId: itemId});
    };

    setDisableButtonPrev = (prevItemId, nextItemId, items) => {
        return (prevItemId === nextItemId ||
            prevItemId === items[0].transactionId);
    };

    setDisableButtonNext = (prevItemId, nextItemId, items) => {
        return (prevItemId === nextItemId ||
            nextItemId === items[0].transactionId);
    };

    render() {
        const {prevItemId, nextItemId, items} = this.props.userInfo.history;

        return (
            <div className="history">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by stock..."
                        onChange={this.searchChange}
                    />
                    <button className="searchButton" onClick={this.searchClick}>
                        <i className="fas fa-search" />
                    </button>
                    <button
                        className="countButton"
                        title="Кол-во акций на странице"
                        onClick={this.quantityChange}
                    >
                        {this.state.count}
                    </button>
                </div>
                <div className="historyList">{this.setHistoryList(items)}</div>
                <div className="navigation">
                    <button
                        className="buttonPrev"
                        onClick={this.prevClick(prevItemId)}
                        disabled={this.setDisableButtonPrev(prevItemId, nextItemId, items)}
                    >
                        Prev
                    </button>
                    <button
                        className="buttonNext"
                        onClick={this.nextClick(nextItemId)}
                        disabled={this.setDisableButtonNext(prevItemId, nextItemId, items)}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({transactionHistoty}, dispatch)

}

export default connect(mapStateToProps, matchDispatchToProps)(History);

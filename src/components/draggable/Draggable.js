import React from 'react';
import './Draggable.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setComponentsPosition} from "../../actions";


class Draggable extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            display: "inherit",
            down: false,
            offsetX: 0,
            offsetY: 0,
            pageX: 0,
            pageY: 0,
            range: ""
        };
    }

    componentDidMount = () => {
        document.addEventListener('mousemove', (e)=>{
            const documentElem = this.transporter;

            const {down, offsetX, offsetY, pageX, pageY} = this.state;

            if(down){
                documentElem.style.left = offsetX + (e.pageX - pageX) + 'px';
                documentElem.style.top = offsetY + (e.pageY - pageY) + 'px';
            }
        });
    };


    onMouseUp = () => {
        this.setState({ down: false });

        const documentElem = this.transporter;

        documentElem.style.zIndex = "999";

        const position = this.props.userInfo.position;

        position.positionLeft[this.props.position] = documentElem.style.left;
        position.positionTop[this.props.position] = documentElem.style.top;
        position.zIndex = this.props.userInfo.position.zIndex.map((item, id) => {
            return id === this.props.position
                ? this.props.userInfo.position.zIndex.length
                : 0;
        });
        this.props.setComponentsPosition(position);
    };

    onMouseDown = e => {
        const documentElem = this.transporter;

        documentElem.style.zIndex = "1000";

        const offsetX = documentElem.offsetLeft;

        const offsetY = documentElem.offsetTop;

        this.setState({
            down: true,
            offsetX,
            offsetY,
            pageX: e.pageX,
            pageY: e.pageY
        });
    };

    getTransporter = node => {
        this.transporter = node
    };

    setCloseButton = lockable => {
        if (lockable) {
            return (
                <div
                    className="closeButton"
                    onClick={this.props.lockClick(this.props.id)}
                >
                    <i className="fas fa-times" />
                </div>
            );
        }
    };

    render() {
        const {name, lockable, position, children, userInfo} = this.props;

        return (
            <div className="draggable" ref={this.getTransporter} style={{
                display: this.state.display,
                left: userInfo.position.positionLeft[position],
                top: userInfo.position.positionTop[position],
                zIndex: userInfo.position.zIndex[position]
            }}>
                <div className="name" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                    {name}
                    {this.setCloseButton(lockable)}
                </div>
                {children}
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
    return bindActionCreators({setComponentsPosition}, dispatch)

}

export default connect(
    mapStateToProps,
    matchDispatchToProps
)(Draggable);

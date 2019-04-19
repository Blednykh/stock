import React from 'react';
import ReactDOM from 'react-dom';
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
    onMouseUp = (e) => {
        this.setState({down: false/*,offsetX: 0,offsetY: 0*/});
        const documentElem = this.transporter;
        documentElem.style.zIndex = '999';
        const position = this.props.userInfo.position;
        position.positionLeft[this.props.position] = documentElem.style.left;
        position.positionTop[this.props.position] = documentElem.style.top;
        position.zIndex = this.props.userInfo.position.zIndex.map((item,id)=>{
            if(id===this.props.position){
               return this.props.userInfo.position.zIndex.length;
            }
            else return 0;
        })
        this.props.setComponentsPosition(position);

        console.log(position);
    };
    onMouseMove = (e) => {
        const documentElem = this.transporter;
        const {down, offsetX, offsetY, pageX, pageY} = this.state;
        if(down){
            documentElem.style.left = offsetX + (e.pageX - pageX) + 'px';
            documentElem.style.top = offsetY + (e.pageY - pageY) + 'px';
        }
    };
    onMouseDown = (e) => {

        const documentElem = this.transporter;
        documentElem.style.zIndex = '1000';
        const offsetX = documentElem.offsetLeft;
        const offsetY = documentElem.offsetTop;

        this.setState({down: true, offsetX, offsetY, pageX: e.pageX, pageY: e.pageY});
    };

    getTransporter = (node) => {this.transporter = node};

    setCloseButton = (lockable) =>{
        if(lockable)
            return <div className="closeButton" onClick={ this.props.stockClick(this.props.id)}>
                        <i className="fas fa-times"></i>
                    </div>
    };

    render() {
        const {name,component,lockable} = this.props;
        return (
            <div className="draggable" ref = {this.getTransporter} style = {{display: this.state.display,
                left: this.props.userInfo.position.positionLeft[this.props.position],
                top: this.props.userInfo.position.positionTop[this.props.position],
                zIndex: this.props.userInfo.position.zIndex[this.props.position]}}>
                <div className="name" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove}>{name}
                    {this.setCloseButton(lockable)}
                </div>
                {component}
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
    return bindActionCreators({setComponentsPosition}, dispatch)

}

export default connect(mapStateToProps, matchDispatchToProps)(Draggable);

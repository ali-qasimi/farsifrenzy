import React from 'react';


class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			box11: "B",
			box13: "B",
			box14: "B",
			box12: "B",
			box21: "B",
			box22: "B",
			box23: "B",
			box24: "B",
			box31: "B",
			box32: "B",
			box33: "B",
			box34: "B",
			box41: "B",
			box42: "B",
			box43: "B",
			box44: "B",
			box51: "B",
			box52: "B",
			box53: "B",
			box54: "B"
        }
    }
    
    render() {
        return (
            <div className='grid'>
                <div className='row'>
                    <div className='cell'>
                        {this.state.box11}
                    </div>
                    <div className='cell'>
                        {this.state.box12}
                    </div>
                    <div className='cell'>
                        {this.state.box13}
                    </div>
                    <div className='cell'>
                        {this.state.box14}
                    </div>
                </div>
                <div className='row'>
                    <div className='cell'>
                        {this.state.box21}
                    </div>
                    <div className='cell'>
                        {this.state.box22}
                    </div>
                    <div className='cell'>
                        {this.state.box23}
                    </div>
                    <div className='cell'>
                        {this.state.box24}
                    </div>
                </div>
                <div className='row'>
                    <div className='cell'>
                        {this.state.box31}
                    </div>
                    <div className='cell'>
                        {this.state.box32}
                    </div>
                    <div className='cell'>
                        {this.state.box33}
                    </div>
                    <div className='cell'>
                        {this.state.box34}
                    </div>
                </div>
                <div className='row'>
                    <div className='cell'>
                        {this.state.box41}
                    </div>
                    <div className='cell'>
                        {this.state.box42}
                    </div>
                    <div className='cell'>
                        {this.state.box43}
                    </div>
                    <div className='cell'>
                        {this.state.box44}
                    </div>
                </div>
                <div className='row'>
                    <div className='cell'>
                        {this.state.box51}
                    </div>
                    <div className='cell'>
                        {this.state.box52}
                    </div>
                    <div className='cell'>
                        {this.state.box53}
                    </div>
                    <div className='cell'>
                        {this.state.box54}
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Grid;
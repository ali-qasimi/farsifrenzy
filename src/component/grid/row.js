import React from 'react';
import Cell from './cell'


class Row extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className='row'>
                <Cell /><Cell /><Cell /><Cell />
            </div>
        )
    }
    
}

export default Row;
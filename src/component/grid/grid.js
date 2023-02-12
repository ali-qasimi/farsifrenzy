import React from 'react';
import Cell from './cell'
import Row from './row'


class Grid extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className='grid'>
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
            </div>
        )
    }
    
}

export default Grid;
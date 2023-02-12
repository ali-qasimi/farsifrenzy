import React from 'react';


class keyboard extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className='keyboard'>
                <div className='keys1'>
                    <button type="submit" className='key'>ض</button>
                    <button type="submit" className='key'>ص</button>
                    <button type="submit" className='key'>ث</button>
                    <button type="submit" className='key'>ق</button>
                    <button type="submit" className='key'>ف</button>
                    <button type="submit" className='key'>غ</button>
                    <button type="submit" className='key'>ع</button>
                    <button type="submit" className='key'>ه</button>
                    <button type="submit" className='key'>خ</button>
                    <button type="submit" className='key'>ح</button>
                    <button type="submit" className='key'>ج</button>
                    <button type="submit" className='key'>چ</button>
                </div>
                <div className='keys2'>
                    <button type="submit" className='key'>ش</button>
                    <button type="submit" className='key'>س</button>
                    <button type="submit" className='key'>ی</button>
                    <button type="submit" className='key'>ب</button>
                    <button type="submit" className='key'>ل</button>
                    <button type="submit" className='key'>ا</button>
                    <button type="submit" className='key'>ت</button>
                    <button type="submit" className='key'>ن</button>
                    <button type="submit" className='key'>م</button>
                    <button type="submit" className='key'>ک</button>
                    <button type="submit" className='key'>گ</button>
                </div>
                <div className='keys3'>
                    <button type="submit" className='key'>Enter</button>
                    <button type="submit" className='key'>ظ</button>
                    <button type="submit" className='key'>ط</button>
                    <button type="submit" className='key'>ز</button>
                    <button type="submit" className='key'>ر</button>
                    <button type="submit" className='key'>ذ</button>
                    <button type="submit" className='key'>د</button>
                    <button type="submit" className='key'>پ</button>
                    <button type="submit" className='key'>و</button>
                    <button type="submit" className='key'>Del</button>
                </div>
            </div>
        )
    }
    
}

export default keyboard;
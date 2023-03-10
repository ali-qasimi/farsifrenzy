import React from 'react';


class keyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowPosition: 0,
            columnPosition: 0,
            submittedWord: ""
        }
        /*this.readWord = this.readWord.bind(this);
        this.submitWord = this.submitWord.bind(this);
        this.deleteLetter = this.deleteLetter.bind(this);
        */
    }

    /*readWord(letter) {
        if (this.state.rowPosition !== 4) {
            var currentWord = this.state.submittedWord;
            console.log(currentWord);
            currentWord += letter;
            this.setState(state => ({
                rowPosition: state.rowPosition + 1,
                submittedWord: currentWord
            }))
        } else {
            return 0
        }

        console.log(this.state.position);
        console.log(this.state.submittedWord);
    }

    submitWord() {
        console.log('submitting word');
    }

    deleteLetter() {
        console.log('deleting letter');
        if (this.state.rowPosition !== 0) {
            var currentWord = this.state.submittedWord;
            currentWord = currentWord.substring(0, currentWord.length-1);
            this.setState(state => ({
                rowPosition: state.rowPosition - 1,
                submittedWord: currentWord
            }))
            console.log(currentWord);
        } else {
            return 0
        }
    }*/
    
    render() {
        return (
            <div className='keyboard'>
                <h1>{this.state.submittedWord}</h1>
                <h2>{this.state.rowPosition}, {this.state.columnPosition}</h2>
                <div className='keys1'>
                    <button onClick={() => this.readWord("ض")} type="submit" className='key'>ض</button>
                    <button onClick={() => this.readWord("ص")} type="submit" className='key'>ص</button>
                    <button onClick={() => this.readWord("ث")} type="submit" className='key'>ث</button>
                    <button onClick={() => this.readWord("ق")} type="submit" className='key'>ق</button>
                    <button onClick={() => this.readWord("ف")} type="submit" className='key'>ف</button>
                    <button onClick={() => this.readWord("غ")} type="submit" className='key'>غ</button>
                    <button onClick={() => this.readWord("ع")} type="submit" className='key'>ع</button>
                    <button onClick={() => this.readWord("ه")} type="submit" className='key'>ه</button>
                    <button onClick={() => this.readWord("خ")} type="submit" className='key'>خ</button>
                    <button onClick={() => this.readWord("ح")} type="submit" className='key'>ح</button>
                    <button onClick={() => this.readWord("ج")} type="submit" className='key'>ج</button>
                    <button onClick={() => this.readWord("چ")} type="submit" className='key'>چ</button>
                </div>
                <div className='keys2'>
                    <button onClick={() => this.readWord("ش")} type="submit" className='key'>ش</button>
                    <button onClick={() => this.readWord("س")} type="submit" className='key'>س</button>
                    <button onClick={() => this.readWord("ی")} type="submit" className='key'>ی</button>
                    <button onClick={() => this.readWord("ب")} type="submit" className='key'>ب</button>
                    <button onClick={() => this.readWord("ل")} type="submit" className='key'>ل</button>
                    <button onClick={() => this.readWord("ا")} type="submit" className='key'>ا</button>
                    <button onClick={() => this.readWord("ت")} type="submit" className='key'>ت</button>
                    <button onClick={() => this.readWord("ن")} type="submit" className='key'>ن</button>
                    <button onClick={() => this.readWord("م")} type="submit" className='key'>م</button>
                    <button onClick={() => this.readWord("ک")} type="submit" className='key'>ک</button>
                    <button onClick={() => this.readWord("گ")} type="submit" className='key'>گ</button>
                </div>
                <div className='keys3'>
                    <button onClick={this.submitWord} type="submit" className='key'>Enter</button>
                    <button onClick={() => this.readWord("ظ")} type="submit" className='key'>ظ</button>
                    <button onClick={() => this.readWord("ط")} type="submit" className='key'>ط</button>
                    <button onClick={() => this.readWord("ز")} type="submit" className='key'>ز</button>
                    <button onClick={() => this.readWord("ر")} type="submit" className='key'>ر</button>
                    <button onClick={() => this.readWord("ذ")} type="submit" className='key'>ذ</button>
                    <button onClick={() => this.readWord("د")} type="submit" className='key'>د</button>
                    <button onClick={() => this.readWord("پ")} type="submit" className='key'>پ</button>
                    <button onClick={() => this.readWord("و")} type="submit" className='key'>و</button>
                    <button onClick={this.deleteLetter} type="submit" className='key'>Del</button>
                </div>
            </div>
        )
    }

}

export default keyboard;
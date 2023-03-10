import React, { Component } from 'react';
import './App.css';
import Grid from './component/grid/grid';
import Keyboard from './component/keyboard/keyboard';

class App extends Component {

	constructor(props) {
        super(props);
		
		this.state = {
            rowPosition: 1,
            columnPosition: 1,
            submittedWord: "",
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

        this.readWord = this.readWord.bind(this);
        this.submitWord = this.submitWord.bind(this);
        this.deleteLetter = this.deleteLetter.bind(this);
    }

	readWord(letter) {
        if (this.state.columnPosition !== 5) {
            var currentWord = this.state.submittedWord;
            console.log(currentWord);
            currentWord += letter;
            this.setState(state => ({
                columnPosition: state.columnPosition + 1,
                submittedWord: currentWord
            }))
			this.boxAddLetter(letter);
        } else {
            return 0
        }

        console.log(this.state.submittedWord);
    }

	boxAddLetter(letter) {
		if (this.state.rowPosition == 1) {
			if (this.state.columnPosition == 1) {
				this.setState(state => ({
					box11: letter
				}))
			} else if (this.state.columnPosition == 2) {
				this.setState(state => ({
					box12: letter
				}))
			} else if (this.state.columnPosition == 3) {
				this.setState(state => ({
					box13: letter
				}))
			} else if (this.state.columnPosition == 4) {
				this.setState(state => ({
					box14: letter
				}))
			}
		} else if (this.state.rowPosition == 2) {
			if (this.state.columnPosition == 1) {
				this.setState(state => ({
					box21: letter
				}))
			} else if (this.state.columnPosition == 2) {
				this.setState(state => ({
					box22: letter
				}))
			} else if (this.state.columnPosition == 3) {
				this.setState(state => ({
					box23: letter
				}))
			} else if (this.state.columnPosition == 4) {
				this.setState(state => ({
					box24: letter
				}))
			}
		} else if (this.state.rowPosition == 3) {
			if (this.state.columnPosition == 1) {
				this.setState(state => ({
					box31: letter
				}))
			} else if (this.state.columnPosition == 2) {
				this.setState(state => ({
					box32: letter
				}))
			} else if (this.state.columnPosition == 3) {
				this.setState(state => ({
					box33: letter
				}))
			} else if (this.state.columnPosition == 4) {
				this.setState(state => ({
					box34: letter
				}))
			}
		} else if (this.state.rowPosition == 4) {
			if (this.state.columnPosition == 1) {
				this.setState(state => ({
					box41: letter
				}))
			} else if (this.state.columnPosition == 2) {
				this.setState(state => ({
					box42: letter
				}))
			} else if (this.state.columnPosition == 3) {
				this.setState(state => ({
					box43: letter
				}))
			} else if (this.state.columnPosition == 4) {
				this.setState(state => ({
					box44: letter
				}))
			}
		} else if (this.state.rowPosition == 5) {
			if (this.state.columnPosition == 1) {
				this.setState(state => ({
					box51: letter
				}))
			} else if (this.state.columnPosition == 2) {
				this.setState(state => ({
					box52: letter
				}))
			} else if (this.state.columnPosition == 3) {
				this.setState(state => ({
					box53: letter
				}))
			} else if (this.state.columnPosition == 4) {
				this.setState(state => ({
					box54: letter
				}))
			}
		}
	}

    submitWord() {
        console.log('submitting word');
		this.setState(state => ({
			rowPosition: this.state.rowPosition + 1,
			columnPosition: 1,
			submittedWord: ""
		}))
    }

    deleteLetter() {
        console.log('deleting letter');
        if (this.state.columnPosition !== 0) {
            var currentWord = this.state.submittedWord;
            currentWord = currentWord.substring(0, currentWord.length-1);
            this.setState(state => ({
                columnPosition: state.columnPosition - 1,
                submittedWord: currentWord
            }))
            console.log(currentWord);
        } else {
            return 0
        }
    }

	render() {
		return (
			<div className="App">
				<header className="App-header">
				<p>
					daridle
				</p>
				</header>
				{/* <Grid /> */}

				<div className='grid'>
					<div className='row'>
						<div className='cell'>
							{this.state.box14}
						</div>
						<div className='cell'>
							{this.state.box13}
						</div>
						<div className='cell'>
							{this.state.box12}
						</div>
						<div className='cell'>
							{this.state.box11}
						</div>
					</div>
					<div className='row'>
						<div className='cell'>
							{this.state.box24}
						</div>
						<div className='cell'>
							{this.state.box23}
						</div>
						<div className='cell'>
							{this.state.box22}
						</div>
						<div className='cell'>
							{this.state.box21}
						</div>
					</div>
					<div className='row'>
						<div className='cell'>
							{this.state.box34}
						</div>
						<div className='cell'>
							{this.state.box33}
						</div>
						<div className='cell'>
							{this.state.box32}
						</div>
						<div className='cell'>
							{this.state.box31}
						</div>
					</div>
					<div className='row'>
						<div className='cell'>
							{this.state.box44}
						</div>
						<div className='cell'>
							{this.state.box43}
						</div>
						<div className='cell'>
							{this.state.box42}
						</div>
						<div className='cell'>
							{this.state.box41}
						</div>
					</div>
					<div className='row'>
						<div className='cell'>
							{this.state.box54}
						</div>
						<div className='cell'>
							{this.state.box53}
						</div>
						<div className='cell'>
							{this.state.box52}
						</div>
						<div className='cell'>
							{this.state.box51}
						</div>
					</div>
				</div>

				{/* <Keyboard /> */}

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
			</div>
		);
	}
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Grid from './component/grid/grid';
import Keyboard from './component/keyboard/keyboard';
import { flushSync } from 'react-dom';

var todaysWord;
const columnCount = 3;
const rowCount = 4;
var endGame = false;

class App extends Component {

	constructor(props) {
        super(props);
		
		this.state = {
            rowPosition: 0,
            columnPosition: 3,
            submittedWord: "",
			grid: [
				[
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"}
				],
				[
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"}
				],
				[
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"}
				],
				[
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"}
				],
				[
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"},
					{letter: "", color: "darkgray"}
				],
			],
			cellColor: "darkgray"
        }

        this.readWord = this.readWord.bind(this);
        this.submitWord = this.submitWord.bind(this);
        this.deleteLetter = this.deleteLetter.bind(this);
    }

	componentDidMount() {
		todaysWord = this.getTodaysWord();
	}

	readWord(letter) {
        if (this.state.columnPosition !== -1) {
            var currentWord = this.state.submittedWord;
            console.log(currentWord);
            currentWord += letter;
            this.boxAddLetter(letter);
			
			if (this.state.columnPosition >= 0) {
				this.setState(state => ({
					columnPosition: this.state.columnPosition - 1,
					submittedWord: currentWord
				}))
			}

        } else {
            return 0
        }
        console.log(this.state.submittedWord);
    }

	boxAddLetter(letter) { //can't reference another state variable for a state variable, in setState. So use this instead.
		let updatedGrid = [...this.state.grid];
		let updatedCell = updatedGrid[this.state.rowPosition][this.state.columnPosition];
		// console.log(updatedGrid[this.state.rowPosition][this.state.columnPosition]);

		updatedCell.letter = letter;
		updatedGrid[this.state.rowPosition][this.state.columnPosition] = updatedCell;
		this.state.grid = updatedGrid;
	}

	boxUpdateColor(columnIndex, color) {
		let updatedGrid = [...this.state.grid];
		let updatedCell = updatedGrid[this.state.rowPosition][columnIndex];

		updatedCell.cellColor = color;
		updatedGrid[this.state.rowPosition][columnIndex] = updatedCell;
		this.state.grid = updatedGrid;
	}

    submitWord() {
        console.log('submitting word');

		if (this.state.rowPosition <= rowCount && this.state.columnPosition == -1) {
			
			this.assessWord(this.state.submittedWord, todaysWord);

			this.setState(state => ({
				rowPosition: this.state.rowPosition + 1,
				columnPosition: 3,
				submittedWord: ""
			}))
		}
    }

    deleteLetter() {
        console.log('deleting letter');
        if (this.state.columnPosition >= -1 && this.state.columnPosition < 3) {
            var currentWord = this.state.submittedWord;
            currentWord = currentWord.substring(0, currentWord.length-1);
            
			this.setState(prevState => ({
				columnPosition: prevState.columnPosition + 1,
				submittedWord: currentWord
			}), () => {
				this.boxAddLetter("")
			});
			
        } else {
            return 0
        }
    }

	getTodaysWord() {

		const fourLetterWordList = require('./constants/FourLetterWordList.ts')

		const wordCount = fourLetterWordList.length
		const todaysIndex = Math.floor(Math.random() * wordCount);

		const todaysWord = fourLetterWordList[todaysIndex][0];

		console.log(`today's word is: ${todaysWord}`);

		return todaysWord;
	}

	assessWord(submittedWord, todaysWord) {

		let submittedWordShort = submittedWord.replace('ـ', '');

		for (let i = 0; i <= columnCount; i++) {
			if (submittedWordShort[i] == todaysWord[i]) {
				console.log(`Letter ${submittedWordShort[i]} is correct`);
				//turn cell green
				this.boxUpdateColor(i, "green");
			} else if (submittedWordShort[i] !== todaysWord[i] && todaysWord.includes(submittedWordShort[i])) {
				console.log(`Righ letter ${submittedWordShort[i]}, wrong cell`);
				//turn cell yellow
				this.boxUpdateColor(i, "yellow");
			} else {
				console.log(`Letter ${submittedWordShort[i]} is incorrect`);
			}
		}

		if (submittedWordShort == todaysWord) {
			console.log("CORRECT WORD!");
			
			endGame = true;
		}   
	}

	render() {
		
		/*useEffect(() => {
			todaysWord = this.getTodaysWord();
		}, []);
		//doesnt work for class based component
		*/

		let cellStyle = {
			color: '#000000',
			width: '75px',
			height: '75px',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: this.state.cellColor,
			margin: '5px 2px 5px 2px',
			textAlign: 'center',
			fontSize: '60px',
			paddingBottom: '10px'
		}

		return (
			<div className="App">
				<header className="App-header">
				<p>
					daridle
				</p>
				</header>
				{/* <Grid /> */}

				{this.state.grid.map((grid, idx) => {
					return(
						<div className='row' key={idx}>
							{grid.map((row, idx) => {
								return(
									<div style={cellStyle} key={idx}>
										{row.letter}
									</div>
								)
							})}
						</div>
					)
				})}

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

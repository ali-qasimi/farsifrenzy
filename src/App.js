import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Grid from './component/grid/grid';
import Keyboard from './component/keyboard/keyboard';
import { flushSync } from 'react-dom';

var todaysWord;
const columnCount = 3; 
const rowCount = 4;
var endGame = false;

/*componentDidMount() {
	todaysWord = this.getTodaysWord();
}*/

function App() {

	useEffect(() => {
		todaysWord = getTodaysWord();
	}, []);
		
	const [gameState, setGameState] = useState({
		rowPosition: 0,
		columnPosition: 4, //+1 for triggering useeffect on first render
		submittedWord: "",
		bufferLetter: "",
		moveCount: 0,
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
	})

	function readWord(letter) {
		if (gameState.columnPosition !== 0 && gameState.rowPosition <= 4) {
			let currentWord = gameState.submittedWord;
			console.log(currentWord);
			// currentWord += letter;

			setGameState(previousState => {
				return { ...previousState,
					submittedWord: previousState.submittedWord + letter,
					bufferLetter: letter,
					columnPosition: previousState.columnPosition - 1
				}	
			});
			
			// boxAddLetter(letter);
			
		}
		console.log(gameState.submittedWord);
	}
	
	function submitWord() {
	
		if (gameState.rowPosition <= rowCount && gameState.columnPosition == 0) {
			console.log('submitting word');
			assessWord(gameState.submittedWord, todaysWord);
			
			setGameState(previousState => {
				return { ...previousState,
					rowPosition: previousState.rowPosition + 1,
					columnPosition: 4,
					submittedWord: "",
					bufferLetter: ""
				}
			});
		}
	}
	
	function deleteLetter() {
		console.log('deleting letter');
		if (gameState.columnPosition >= -1 && gameState.columnPosition <= 3) {
			var currentWord = gameState.submittedWord;
			currentWord = currentWord.substring(0, currentWord.length-1);
			
			let updatedGrid = [...gameState.grid];
			let updatedCell = updatedGrid[gameState.rowPosition][gameState.columnPosition];
			updatedCell.letter = "";
			updatedGrid[gameState.rowPosition][gameState.columnPosition] = updatedCell;

			if (gameState.columnPosition !== 3) {
				setGameState(previousState => {
					return { ...previousState,
						columnPosition: previousState.columnPosition + 1,
						submittedWord: currentWord,
						grid: updatedGrid,
						bufferLetter: previousState.grid[previousState.rowPosition][previousState.columnPosition+1].letter
					}
				});
			} else {
				setGameState(previousState => {
					return { ...previousState,
						columnPosition: previousState.columnPosition + 1,
						submittedWord: "",
						grid: updatedGrid,
						bufferLetter: ""
					}
				});
			}
			
			
			// boxAddLetter("");
			
		} else {
			return 0
		}
	}

	//update grid cell when letter added/removed.
	useEffect(() => {

		if (gameState.columnPosition >= 0 && gameState.columnPosition <= 3) {
			let updatedGrid = [...gameState.grid];
			let updatedCell = updatedGrid[gameState.rowPosition][gameState.columnPosition];
			// console.log(updatedGrid[this.state.rowPosition][this.state.columnPosition]);
		
			updatedCell.letter = gameState.bufferLetter;
			updatedGrid[gameState.rowPosition][gameState.columnPosition] = updatedCell;
		
			setGameState(previousState => {
				return { ...previousState,
					grid: updatedGrid
				}
			});
		}
		
	}, [gameState.submittedWord]);
	
	function getTodaysWord() {
	
		const fourLetterWordList = require('./constants/FourLetterWordList.ts')
	
		const wordCount = fourLetterWordList.length
		const todaysIndex = Math.floor(Math.random() * wordCount);
	
		const todaysWord = fourLetterWordList[todaysIndex][0];
	
		console.log(`today's word is: ${todaysWord}`);
	
		return todaysWord;
	}
	
	function assessWord(submittedWord, todaysWord) {
	
		let submittedWordShort = submittedWord.replace('ـ', '');
	
		for (let i = 0; i <= columnCount; i++) {
			if (submittedWordShort[i] == todaysWord[i]) {
				console.log(`Letter ${submittedWordShort[i]} is correct`);
				//turn cell green
				cellUpdateColor(3-i, "green");
			} else if (submittedWordShort[i] !== todaysWord[i] && todaysWord.includes(submittedWordShort[i])) {
				console.log(`Righ letter ${submittedWordShort[i]}, wrong cell`);
				//turn cell yellow
				cellUpdateColor(3-i, "yellow");
			} else {
				console.log(`Letter ${submittedWordShort[i]} is incorrect`);
			}
		}
	
		if (submittedWordShort == todaysWord) {
			console.log("CORRECT WORD!");
			
			endGame = true;
		}   
	}

	function cellUpdateColor(columnIndex, color) {
		let updatedGrid = [...gameState.grid];
		let updatedCell = updatedGrid[gameState.rowPosition][columnIndex];
	
		updatedCell.color = color;
		updatedGrid[gameState.rowPosition][columnIndex] = updatedCell;
		
		setGameState(previousState => {
			return { ...previousState,
				grid: updatedGrid
			}
		});
	}

	return (
		<div className="App">
			<header className="App-header">
			<p>
				daridle
			</p>
			</header>

			{gameState.grid.map((grid, idx) => {
				return(
					<div className='row' key={idx}>
						{grid.map((row, idx) => {
							let cellStyle = {
								color: '#000000',
								width: '75px',
								height: '75px',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: row.color,
								margin: '5px 2px 5px 2px',
								textAlign: 'center',
								fontSize: '60px',
								paddingBottom: '10px'
							}
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
				<h1>{gameState.submittedWord}</h1>
				<h2>{gameState.rowPosition}, {gameState.columnPosition}</h2>
				<div className='keys1'>
					<button onClick={() => readWord("ض")} type="submit" className='key'>ض</button>
					<button onClick={() => readWord("ص")} type="submit" className='key'>ص</button>
					<button onClick={() => readWord("ث")} type="submit" className='key'>ث</button>
					<button onClick={() => readWord("ق")} type="submit" className='key'>ق</button>
					<button onClick={() => readWord("ف")} type="submit" className='key'>ف</button>
					<button onClick={() => readWord("غ")} type="submit" className='key'>غ</button>
					<button onClick={() => readWord("ع")} type="submit" className='key'>ع</button>
					<button onClick={() => readWord("ه")} type="submit" className='key'>ه</button>
					<button onClick={() => readWord("خ")} type="submit" className='key'>خ</button>
					<button onClick={() => readWord("ح")} type="submit" className='key'>ح</button>
					<button onClick={() => readWord("ج")} type="submit" className='key'>ج</button>
					<button onClick={() => readWord("چ")} type="submit" className='key'>چ</button>
				</div>
				<div className='keys2'>
					<button onClick={() => readWord("ش")} type="submit" className='key'>ش</button>
					<button onClick={() => readWord("س")} type="submit" className='key'>س</button>
					<button onClick={() => readWord("ی")} type="submit" className='key'>ی</button>
					<button onClick={() => readWord("ب")} type="submit" className='key'>ب</button>
					<button onClick={() => readWord("ل")} type="submit" className='key'>ل</button>
					<button onClick={() => readWord("ا")} type="submit" className='key'>ا</button>
					<button onClick={() => readWord("ت")} type="submit" className='key'>ت</button>
					<button onClick={() => readWord("ن")} type="submit" className='key'>ن</button>
					<button onClick={() => readWord("م")} type="submit" className='key'>م</button>
					<button onClick={() => readWord("ک")} type="submit" className='key'>ک</button>
					<button onClick={() => readWord("گ")} type="submit" className='key'>گ</button>
				</div>
				<div className='keys3'>
					<button onClick={submitWord} type="submit" className='key'>Enter</button>
					<button onClick={() => readWord("ظ")} type="submit" className='key'>ظ</button>
					<button onClick={() => readWord("ط")} type="submit" className='key'>ط</button>
					<button onClick={() => readWord("ز")} type="submit" className='key'>ز</button>
					<button onClick={() => readWord("ر")} type="submit" className='key'>ر</button>
					<button onClick={() => readWord("ذ")} type="submit" className='key'>ذ</button>
					<button onClick={() => readWord("د")} type="submit" className='key'>د</button>
					<button onClick={() => readWord("پ")} type="submit" className='key'>پ</button>
					<button onClick={() => readWord("و")} type="submit" className='key'>و</button>
					<button onClick={deleteLetter} type="submit" className='key'>Del</button>
				</div>
			</div>
		</div>
	);
}

export default App;

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
		cellColor: "darkgray",
		keys: [
			[
				{alphabet: "ض", color: "white"},
				{alphabet: "ص", color: "white"},
				{alphabet: "ث", color: "white"},
				{alphabet: "ق", color: "white"},
				{alphabet: "ف", color: "white"},
				{alphabet: "غ", color: "white"},
				{alphabet: "ع", color: "white"},
				{alphabet: "ه", color: "white"},
				{alphabet: "خ", color: "white"},
				{alphabet: "ح", color: "white"},
				{alphabet: "ج", color: "white"},
				{alphabet: "چ", color: "white"}

			],
			[
				{alphabet: "ش", color: "white"},
				{alphabet: "س", color: "white"},
				{alphabet: "ی", color: "white"},
				{alphabet: "ب", color: "white"},
				{alphabet: "ل", color: "white"},
				{alphabet: "ا", color: "white"},
				{alphabet: "آ", color: "white"},
				{alphabet: "ت", color: "white"},
				{alphabet: "ن", color: "white"},
				{alphabet: "م", color: "white"},
				{alphabet: "ک", color: "white"},
				{alphabet: "گ", color: "white"}
			],
			[
				{alphabet: "ظ", color: "white"},
				{alphabet: "ط", color: "white"},
				{alphabet: "ز", color: "white"},
				{alphabet: "ژ", color: "white"},
				{alphabet: "ر", color: "white"},
				{alphabet: "ذ", color: "white"},
				{alphabet: "د", color: "white"},
				{alphabet: "پ", color: "white"},
				{alphabet: "و", color: "white"},
			]

		]
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
				updateKeyboard(submittedWordShort[i])
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

	function updateKeyboard(keyLetter) {
		let updatedKeyboard = [...gameState.keys];

		for (var keyRow = 0; keyRow <= 2; keyRow++ ) {
			var keyIndex = updatedKeyboard[keyRow].findIndex(key => key.alphabet == keyLetter);

			if (keyIndex != -1) {
				console.log(`index of ${keyLetter} is ${keyRow},${keyIndex}`)
				break;
			} else { continue; }
		}
		
		let updatedkey = updatedKeyboard[keyRow][keyIndex]
		updatedkey.color = 'grey';
		updatedKeyboard[keyRow][keyIndex] = updatedkey;

		setGameState(previousState => {
			return { ...previousState,
				keys: updatedKeyboard
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

			<div className='keyboard'>
				<h1>{gameState.submittedWord}</h1>
				<h2>{gameState.rowPosition}, {gameState.columnPosition}</h2>
				<div className='keys'>
					
					{gameState.keys[0].map((key,idx) => {
						let keyStyle = {
							minHeight: '40px',
							minWidth: '40px',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
							padding: '0',
							margin: '1px',
							backgroundColor: key.color,
						}
						return(
							<button onClick={() => key.color == 'white' ? readWord(key.alphabet) : null} type="submit" key={idx} style={keyStyle}>{key.alphabet}</button>
						)
					})}
				</div>
				<div className='keys'>
					{gameState.keys[1].map((key,idx) => {
						let keyStyle = {
							minHeight: '40px',
							minWidth: '40px',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
							padding: '0',
							margin: '1px',
							backgroundColor: key.color,
						}
						return(
							<button onClick={() => key.color == 'white' ? readWord(key.alphabet) : null} type="submit" key={idx} style={keyStyle}>{key.alphabet}</button>
						)
					})}
				</div>
				<div className='keys2'>
					<button onClick={submitWord} type="submit" className='key'>Enter</button>
					{gameState.keys[2].map((key,idx) => {
						let keyStyle = {
							minHeight: '40px',
							minWidth: '40px',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
							padding: '0',
							margin: '1px',
							backgroundColor: key.color,
						}
						return(
							<button onClick={() => key.color == 'white' ? readWord(key.alphabet) : null} type="submit" key={idx} style={keyStyle}>{key.alphabet}</button>
						)
					})}
					<button onClick={deleteLetter} type="submit" className='key'>Del</button>
				</div>
			</div>
		</div>
	);
}

export default App;

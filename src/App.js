import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Grid from './component/grid/grid';
import Keyboard from './component/keyboard/keyboard';
import { flushSync } from 'react-dom';
import Overlay from "react-overlay-component";

var todaysWord = {
	word: "",
	pronunciation: "",
	meaning: "",
	exampleFarsi: "",
	examplePronunciation: "",
	exampleEnglish: ""
}

const columnCount = 3; 
const rowCount = 4;
var endGame = false;
var gameWon = false;

function App() {

	useEffect(() => {
		todaysWord = getTodaysWord();
		setInstructionOverlay(true);
	}, []);
		
	const [gameState, setGameState] = useState({
		rowPosition: 0,
		columnPosition: 4, //+1 for triggering useeffect on first render
		submittedWord: "",
		bufferLetter: "",
		moveCount: 0,
		grid: [
			[
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"}
			],
			[
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"}
			],
			[
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"}
			],
			[
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"}
			],
			[
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"},
				{letter: "", color: "darkgray", flip: "rotateY(0deg)"}
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

	//overlays:
	const [isInstructionOverlayOpen, setInstructionOverlay] = useState(false);
	const closeInstructionOverlay = () => setInstructionOverlay(false);

	const [isGameOverOverlayOpen, setGameOverOverlay] = useState(false);
	const closeGameOverOverlay = () => setGameOverOverlay(false);

	const overlayConfig = {
		animate: true,
		// top: `5em`,
		// clickDismiss: true,
		// escapeDismiss: false,
		// focusOutline: false,
		// contentClass: "",
	};


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
			assessWord(gameState.submittedWord, todaysWord.word);
			
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
		let todaysWord = {
			word: "",
			pronunciation: "",
			meaning: "",
			example: ""
		}
		const fourLetterWordList = require('./constants/FourLetterWordList.ts')
	
		const wordCount = fourLetterWordList.length
		const todaysIndex = Math.floor(Math.random() * wordCount);
	
		todaysWord.word = fourLetterWordList[todaysIndex][0];
		todaysWord.pronunciation = fourLetterWordList[todaysIndex][1];
		todaysWord.meaning = fourLetterWordList[todaysIndex][2];
		todaysWord.exampleFarsi = fourLetterWordList[todaysIndex][3];
		todaysWord.examplePronunciation = fourLetterWordList[todaysIndex][4];
		todaysWord.exampleEnglish = fourLetterWordList[todaysIndex][5];
	
		console.log(`today's word is: ${todaysWord.word}`);
	
		return todaysWord;
	}
	
	function assessWord(submittedWord, todaysWord) {
	
		let submittedWordShort = submittedWord.replace('ـ', '');
	
		for (let i = 0; i <= columnCount; i++) {
			if (submittedWordShort[i] == todaysWord[i]) {
				console.log(`Letter ${submittedWordShort[i]} is correct`);
				//turn cell green
				cellUpdateColor(3-i, "#568203");
				updateKeyboard(submittedWordShort[i], '#568203');
			} else if (submittedWordShort[i] !== todaysWord[i] && todaysWord.includes(submittedWordShort[i])) {
				console.log(`Righ letter ${submittedWordShort[i]}, wrong cell`);
				//turn cell yellow
				cellUpdateColor(3-i, "yellow");
				updateKeyboard(submittedWordShort[i], 'yellow');
			} else {
				console.log(`Letter ${submittedWordShort[i]} is incorrect`);
				updateKeyboard(submittedWordShort[i], 'grey');
			}
		}
		
		flipRow();
	
		if (submittedWordShort == todaysWord) {
			console.log("CORRECT WORD!");
			
			endGame = true;
			gameWon = true;

			setGameOverOverlay(true);
		}   
	}

	function cellUpdateColor(columnIndex, color) {
		let updatedGrid = [...gameState.grid];
		// let updatedRow = updatedGrid[gameState.rowPosition];
		let updatedCell = updatedGrid[gameState.rowPosition][columnIndex];
	
		updatedCell.color = color;
		updatedGrid[gameState.rowPosition][columnIndex] = updatedCell;

		
		// updatedRow.forEach((cell) => {
		// 	//flip entire row
		// 	cell.flip = "rotateY(180deg)"
		// });
		// updatedGrid[gameState.rowPosition] = updatedRow;
		
		setGameState(previousState => {
			return { ...previousState,
				grid: updatedGrid
			}
		});

	}

	function flipRow() {
		let updatedGrid = [...gameState.grid];
		let updatedRow = updatedGrid[gameState.rowPosition];
		
		updatedRow.forEach((cell) => {
			//flip entire row
			cell.flip = "rotateY(180deg)"
		});
		updatedGrid[gameState.rowPosition] = updatedRow;
		
		setGameState(previousState => {
			return { ...previousState,
				grid: updatedGrid
			}
		});
	}

	function updateKeyboard(keyLetter, colour) {
		let updatedKeyboard = [...gameState.keys];

		for (var keyRow = 0; keyRow <= 2; keyRow++ ) {
			var keyIndex = updatedKeyboard[keyRow].findIndex(key => key.alphabet == keyLetter);

			if (keyIndex != -1) {
				console.log(`index of ${keyLetter} is ${keyRow},${keyIndex}`)
				break;
			} else { continue; }
		}
		
		let updatedkey = updatedKeyboard[keyRow][keyIndex]
		updatedkey.color = colour;
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
			<h1>
				daridle
			</h1>
			</header>

			{gameState.grid.map((grid, idx) => {
				return(
					<div className='row' key={idx}>
						{grid.map((row, idx) => {
							
							let cellStyleParent = {
								position: 'relative',
								transition: 'transform 2s',
  								transformStyle: 'preserve-3d',
								transform: row.flip,
							}
							let cellStyleFront = {
								position: 'absolute',
								color: '#000000',
								width: '75px',
								height: '75px',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: 'darkgray',
								margin: '5px 2px 5px 2px',
								textAlign: 'center',
								fontSize: '60px',
								paddingBottom: '10px',
  								backfaceVisibility: 'hidden',
							}
							let cellStyleBack = {
								color: '#000000',
								width: '75px',
								height: '75px',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: row.color,
								margin: '5px 2px 5px 2px',
								textAlign: 'center',
								fontSize: '60px',
								paddingBottom: '10px',
								backfaceVisibility: 'hidden',
								transform: 'rotateY(180deg)'
							}

							return(
								<div key={idx} style={cellStyleParent}>
									<div style={cellStyleFront} >
										{row.letter}
									</div>
									<div style={cellStyleBack}>
										{row.letter}
									</div>
								</div>
							)
						})}
					</div>
				)
			})}

			<div className='keyboard'>
				{/* <h1>{gameState.submittedWord}</h1> */}
				{/* <h2>{gameState.rowPosition}, {gameState.columnPosition}</h2> */}
				<div className='keys'>
					
					{gameState.keys[0].map((key,idx) => {
						let keyStyle = {
							minHeight: '40px',
							minWidth: '7vw',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
							padding: '0',
							margin: '1px',
							backgroundColor: key.color,
							borderRadius: '1vw',
							border: 'none'
						}
						return(
							<button onClick={() => endGame == false ? readWord(key.alphabet) : null} type="submit" key={idx} style={keyStyle}>{key.alphabet}</button>
						)
					})}
				</div>
				<div className='keys'>
					{gameState.keys[1].map((key,idx) => {
						let keyStyle = {
							minHeight: '40px',
							minWidth: '7vw',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
							padding: '0',
							margin: '1px',
							backgroundColor: key.color,
							borderRadius: '20%',
							border: 'none'
						}
						return(
							<button onClick={() => endGame == false ? readWord(key.alphabet) : null} type="submit" key={idx} style={keyStyle}>{key.alphabet}</button>
						)
					})}
				</div>
				<div className='keys2'>
					<button onClick={submitWord} type="submit" className='key'>Enter</button>
					{gameState.keys[2].map((key,idx) => {
						let keyStyle = {
							minHeight: '40px',
							minWidth: '7vw',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
							padding: '0',
							margin: '1px',
							backgroundColor: key.color,
							borderRadius: '20%',
							border: 'none'
						}
						return(
							<button onClick={() => endGame == false ? readWord(key.alphabet) : null} type="submit" key={idx} style={keyStyle}>{key.alphabet}</button>
						)
					})}
					<button onClick={deleteLetter} type="submit" className='key'>Del</button>
				</div>
			</div>

			<Overlay configs={overlayConfig} isOpen={isInstructionOverlayOpen} closeOverlay={closeInstructionOverlay} >
				<h2>Welcome to Daridle!</h2>
				<h3> Guess today's word in 5 tries</h3>
				<p className='instructionsOverlay'>
					For a 4-letter word you guess, each tile colour will change to: <br></br><br></br>
					- Green: Correct Letter, at the correct tile <br></br>
					- Yellow: Correct letter, at the wrong tile <br></br>
					- Grey: Wrong letter <br></br>
				</p>
				<button className='startButton' onClick={() => {setInstructionOverlay(false);}}>
					Start
				</button>
			</Overlay>

			<Overlay configs={overlayConfig} isOpen={isGameOverOverlayOpen} closeOverlay={closeGameOverOverlay} >
				<h2>CORRECT WORD!</h2>
				<h3>{todaysWord.word}</h3>
				<span className='instructionsOverlay'>
					<center><i>{todaysWord.pronunciation}</i></center>
					<center>{todaysWord.meaning}</center> <br></br>
					Example: <br></br>
					"{todaysWord.exampleFarsi}" <br></br>
					<i>{todaysWord.examplePronunciation}</i><br></br>
					"{todaysWord.exampleEnglish}" <br></br><br></br>
				</span>
				<button className='startButton' onClick={() => {setGameOverOverlay(false);}}>
					Close
				</button>
			</Overlay>
		</div>
	);
}

export default App;

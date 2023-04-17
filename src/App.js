import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Grid from './component/grid/grid';
import Keyboard from './component/keyboard/keyboard';
import { flushSync } from 'react-dom';
import Overlay from "react-overlay-component";
import {Buffer} from 'buffer';
import RawWordList from './constants/FourLetterWordListEncoded.txt'
import { Icon } from '@iconify/react'
import Countdown from 'react-countdown';

var todaysWord = {
	word: "",
	pronunciation: "",
	meaning: "",
	exampleFarsi: "",
	examplePronunciation: "",
	exampleEnglish: "",
	todaysIndex: 0,
	midnightTimestamp: 0
}

const columnCount = 3; 
const rowCount = 4;
// var endGame = false;
var gameWon = false;
var solution;
var msTillNextDay

function App() {

	useEffect(() => {
		
		getTodaysIndex();

		//load states from local storage:
		try {
			let gameStateFromLocalStorage = JSON.parse(localStorage.getItem('gameState'));
			if (gameStateFromLocalStorage) {
				//only load if it's same day.
				if (gameStateFromLocalStorage.todaysIndex == todaysWord.todaysIndex) {
					setGameState(gameStateFromLocalStorage);
				} else {
					setGameState(previousState => {
						return { ...previousState,
							todaysIndex: todaysWord.todaysIndex,
							midnightTimestamp: todaysWord.midnightTimestamp
						}	
					});
				}
			}

			let playerStateFromLocalStorage = JSON.parse(localStorage.getItem('playerState'));
			if (playerStateFromLocalStorage) {
				setPlayerState(playerStateFromLocalStorage);
			}
		}
		catch(err) {
			console.log('Local Storage is Clean');
		}

		async function getTodaysWord() {

			const fourLetterWordList = require('./constants/FourLetterWordList.ts')
			// const fourLetterWordListEncoded = require('./constants/FourLetterWordListEncoded.txt')
			const response = await fetch(RawWordList);
			const fourLetterWordListEncoded = await response.text();
			
			// console.log(`${fourLetterWordListEncoded}`);
	
			let buffer = new Buffer.from(fourLetterWordListEncoded, 'base64');
			let fourLetterWordListDecoded = buffer.toString('utf-8');
			fourLetterWordListDecoded = JSON.parse("[" + fourLetterWordListDecoded + "]");
	
			// console.log(`fourLetterWordListDecoded: ${fourLetterWordListDecoded}`);
	
			// const epochMs = new Date('April 1, 2023 00:00:00').valueOf();
			// const now = Date.now();
			// const msInDay = 86400000;
			// const index = Math.floor((now - epochMs) / msInDay);
			// const nextday = (index + 1) * msInDay + epochMs;
			todaysWord = {...
				fourLetterWordListDecoded[0][todaysWord.todaysIndex]
			};
			console.log(`word: ${todaysWord.word}, pronunciation: ${todaysWord.pronunciation}, meaning: ${todaysWord.meaning}, exampleFarsi: ${todaysWord.exampleFarsi}`);

		}

		getTodaysWord();
		// todaysWord = getTodaysWord();
		setInstructionOverlay(true);
	}, []);
		
	const [gameState, setGameState] = useState({
		rowPosition: 0,
		columnPosition: 4, //+1 for triggering useeffect on first render
		submittedWord: "",
		bufferLetter: "",
		moveCount: 0,
		endGame: false,
		todaysIndex: 0,
		midnightTimestamp: 0,
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

	const [playerState, setPlayerState] = useState({
		playCount: 0,
		winCount: 0,
		currentPlayStreak: 0,
		maxPlayStreak: 0,
		playedYesterday: false, //for tomorrow
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

	function getTodaysIndex() {
		const epochMs = new Date('April 15, 2023 00:00:00').valueOf();
		const now = Date.now();
		const msInDay = 86400000;
		const index = Math.floor((now - epochMs) / msInDay);
		const msTillNextDay = (index + 1) * msInDay + epochMs;

		todaysWord.todaysIndex = index;
		todaysWord.midnightTimestamp = msTillNextDay;

		console.log(msTillNextDay);
	}

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
	
	/* //initial method, uses plain text file and can't get same word throughout the day.
	function getTodaysWord() {
		let todaysWord = {
			word: "",
			pronunciation: "",
			meaning: "",
			exampleFarsi: "",
			examplePronunciation: "",
			exampleEnglish: ""
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
	*/
	
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
	
		if (submittedWord.length == todaysWord.length) {

			if (submittedWordShort == todaysWord || gameState.rowPosition == rowCount) {
				
				if (submittedWordShort == todaysWord) {
					console.log("CORRECT WORD!");
					gameWon = true;
					setPlayerState(previousState => {
						return {...previousState,
							winCount: previousState.winCount+1
						}
					})
				}
				
				// endGame = true;
				setGameState(previousState => {
					return {...previousState,
						endGame: true
					}
				});
				
				setPlayerState(previousState => {
					return {...previousState,
						playCount: previousState.playCount+1,
						currentPlayStreak: previousState.currentPlayStreak+1,
						maxPlayStreak: previousState.playCount+1 > previousState.maxPlayStreak ? previousState.playCount+1 : previousState.maxPlayStreak
					}
				})
				setGameOverOverlay(true);
			}
		}
	}

	function cellUpdateColor(columnIndex, color) {
		let updatedGrid = [...gameState.grid];
		// let updatedRow = updatedGrid[gameState.rowPosition];
		let updatedCell = updatedGrid[gameState.rowPosition][columnIndex];
	
		updatedCell.color = color;
		updatedGrid[gameState.rowPosition][columnIndex] = updatedCell;
		
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

	useEffect(() => {
		localStorage.setItem('gameState', JSON.stringify(gameState));
	}, [gameState.submittedWord, gameState.endGame, gameState.todaysIndex, gameState.midnightTimestamp]);

	useEffect(() => {
		localStorage.setItem('playerState', JSON.stringify(playerState));
	}, [playerState]);

	function renderResults() {
		if (gameState.endGame) {
			return(
				<div>
					<h2>{gameWon ? 'Correct Word!' : 'Good Luck Tomorrow'}</h2>
					<h3>{todaysWord.word}</h3>
					<span className='instructionsOverlay'>
						<center><i>{todaysWord.pronunciation}</i></center>
						<center>{todaysWord.meaning}</center> <br></br>
						Example: <br></br>
						"{todaysWord.exampleFarsi}" <br></br>
						<i>{todaysWord.examplePronunciation}</i><br></br>
						"{todaysWord.exampleEnglish}" <br></br><br></br>
					</span>
				</div>
			)
		}
	}

	function renderTimer() {
		if (gameState.endGame) {
			getTodaysIndex();
			return (
				<div>
					<span>Next word in:</span>
					<div className='countdownTimer'>
						<Countdown date={todaysWord.midnightTimestamp} daysInHours={true} />
					</div>
				</div>
			)
		}
	}
	

	return (
		<div className="App">
			<div className="menu-icons">
				<button className="menu-icon" onClick={() => setInstructionOverlay(true)}><Icon icon="material-symbols:info-rounded"/></button>
				<button className="menu-icon" onClick={() => setGameOverOverlay(true)}><Icon icon="gridicons:stats-up-alt"/></button>
			</div>
			
			<header className="App-header">
				daridle
			</header>
			<div className='banner'></div>

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
								width: '60px',
								height: '60px',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: 'darkgray',
								margin: '5px 2px 5px 2px',
								textAlign: 'center',
								fontSize: '50px',
								paddingBottom: '10px',
  								backfaceVisibility: 'hidden',
							}
							let cellStyleBack = {
								color: '#000000',
								width: '60px',
								height: '60px',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: row.color,
								margin: '5px 2px 5px 2px',
								textAlign: 'center',
								fontSize: '50px',
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
							minHeight: '50px',
							width: 'calc(100% / 12 - 3px)',
							maxWidth: '30px',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
							padding: '0',
							margin: '1px',
							backgroundColor: key.color,
							borderRadius: '7px',
							border: 'none'
						}
						return(
							<button onClick={() => gameState.endGame == false ? readWord(key.alphabet) : null} type="submit" key={idx} style={keyStyle}>{key.alphabet}</button>
						)
					})}
				</div>
				<div className='keys'>
					{gameState.keys[1].map((key,idx) => {
						let keyStyle = {
							minHeight: '50px',
							width: 'calc(100% / 12 - 3px)',
							maxWidth: '30px',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
							padding: '0',
							margin: '1px',
							backgroundColor: key.color,
							borderRadius: '7px',
							border: 'none'
						}
						return(
							<button onClick={() => gameState.endGame == false ? readWord(key.alphabet) : null} type="submit" key={idx} style={keyStyle}>{key.alphabet}</button>
						)
					})}
				</div>
				<div className='keys'>
					<button onClick={submitWord} type="submit" className='enter-del-key'>Enter</button>
					{gameState.keys[2].map((key,idx) => {
						let keyStyle = {
							minHeight: '50px',
							width: 'calc(100% / 12 - 3px)',
							maxWidth: '30px',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
							padding: '0',
							margin: '1px',
							backgroundColor: key.color,
							borderRadius: '7px',
							border: 'none'
						}
						return(
							<button onClick={() => gameState.endGame == false ? readWord(key.alphabet) : null} type="submit" key={idx} style={keyStyle}>{key.alphabet}</button>
						)
					})}
					<button onClick={deleteLetter} type="submit" className='enter-del-key'>Del</button>
				</div>
			</div>

			<Overlay configs={overlayConfig} isOpen={isInstructionOverlayOpen} closeOverlay={closeInstructionOverlay} >
				<h2>Welcome to Daridle!</h2>
				<h3> Guess today's word in 5 tries</h3>
				<div className='instructionsOverlay'>
					For a 4-letter word you guess, each tile colour will change to: <br></br><br></br>
					- <strong>Grey:</strong> Wrong letter <br></br>
					<div className='row'>
							<div className='instructionCell greyCell'>
								ی
							</div>
							<div className='instructionCell greyCell'>
								ت
							</div>
							<div className='instructionCell greyCell'>
								ش
							</div>
							<div className='instructionCell greyCell'>
								آ
							</div>
					</div>
					- <strong>Yellow:</strong> Correct letter, at the wrong tile <br></br>
					<div className='row'>
							<div className='instructionCell greyCell'>
								ب
							</div>
							<div className='instructionCell greyCell'>
								ش
							</div>
							<div className='instructionCell greyCell'>
								م
							</div>
							<div className='instructionCellParent'>
								<div className='instructionCell instructionCellFront greyCell'>
									ا
								</div>
								<div className='instructionCell instructionCellBack yellowCell'>
									ا
								</div>
							</div>
					</div>
					- <strong>Green:</strong> Correct Letter, at the correct tile <br></br>
					<div className='row'>
							<div className='instructionCell greyCell'>
								ن
							</div>
							<div className='instructionCellParent'>
								<div className='instructionCell instructionCellFront greyCell'>
									ا
								</div>
								<div className='instructionCell instructionCellBack greenCell'>
									ا
								</div>
							</div>
							<div className='instructionCell greyCell'>
								و
							</div>
							<div className='instructionCell greyCell'>
								ج
							</div>
					</div>
				</div>
				<button className='startButton' onClick={() => {setInstructionOverlay(false);}}>
					Start
				</button>
			</Overlay>

			{/* {() => {
				if (gameState.endGame) {
					return()
				}
			}}	 */}

			<Overlay configs={overlayConfig} isOpen={isGameOverOverlayOpen} closeOverlay={closeGameOverOverlay} >
				<div>
					{renderResults()}
				</div>
			
				<h3>Game Stats</h3>
				<div className='instructionsOverlay'>
					<div className='row'>
						<div className='statsContentCell'>
							{playerState.playCount}
						</div>
						<div className='statsContentCell'>
							{Math.round(playerState.winCount/playerState.playCount * 100)}%
						</div>
						<div className='statsContentCell'>
							{playerState.currentPlayStreak}
						</div>
						<div className='statsContentCell'>
							{playerState.maxPlayStreak}
						</div>
					</div>
					<div className='row'>
						<div className='statsLabelCell'>
							Games Played
						</div>
						<div className='statsLabelCell'>
							Win %
						</div>
						<div className='statsLabelCell'>
							Current Streak
						</div>
						<div className='statsLabelCell'>
							Streak Record
						</div>
					</div>
					
				</div>

				{renderTimer()}
				
				<button className='statsCloseButton' onClick={() => {setGameOverOverlay(false);}}>
					Close
				</button>
			</Overlay>

			
			{/*
			<Overlay configs={overlayConfig} isOpen={isGameOverOverlayOpen} closeOverlay={closeGameOverOverlay} >
				<div>
					<h2>{gameWon ? 'Correct Word!' : 'Good Luck Tomorrow'}</h2>
					<h3>{todaysWord.word}</h3>
					<span className='instructionsOverlay'>
						<center><i>{todaysWord.pronunciation}</i></center>
						<center>{todaysWord.meaning}</center> <br></br>
						Example: <br></br>
						"{todaysWord.exampleFarsi}" <br></br>
						<i>{todaysWord.examplePronunciation}</i><br></br>
						"{todaysWord.exampleEnglish}" <br></br><br></br>
					</span>
				</div>
				
				<h3>Game Stats</h3>
				<span className='instructionsOverlay'>
					Games Played: {playerState.playCount}<br></br>
					Win %: {playerState.winCount/playerState.playCount * 100}<br></br>
					Current Streak: {playerState.currentPlayStreak}<br></br>
					Streak Record: {playerState.maxPlayStreak}<br></br><br></br>
				</span>
				<button className='startButton' onClick={() => {setGameOverOverlay(false);}}>
					Close
				</button>
			</Overlay>
		*/}
		</div>
	);
}

export default App;

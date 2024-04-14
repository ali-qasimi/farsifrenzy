import React, { useEffect, useState } from 'react';
import './App.css';
// import Grid from './component/grid/grid';
// import Keyboard from './component/keyboard/keyboard';
// import { flushSync } from 'react-dom';
import Overlay from "react-overlay-component";
// import RawWordList from './constants/FourLetterWordListEncoded.txt'
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
var gameWon = false;
var solution;
var msTillNextDay;
var submitButtonStyle;
// var growShrinkTransform = '';

function App() {

	useEffect(() => {
		
		getTodaysIndex();

		//load states from local storage:
		try {
			let gameStateFromLocalStorage = JSON.parse(localStorage.getItem('gameState'));
			let playerStateFromLocalStorage = JSON.parse(localStorage.getItem('playerState'));

			if (gameStateFromLocalStorage) {
				//to reset the game state or not:
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

				//To reset the player state or not:
				if (playerStateFromLocalStorage.lastPlayedIndex == todaysWord.todaysIndex || playerStateFromLocalStorage.lastPlayedIndex == todaysWord.todaysIndex - 1) {
					setPlayerState(playerStateFromLocalStorage);
				} else {
					setPlayerState(() => {
						return {
							playCount: playerStateFromLocalStorage.playCount,
							winCount: playerStateFromLocalStorage.winCount,
							currentPlayStreak: 0,
							maxPlayStreak: playerStateFromLocalStorage.maxPlayStreak,
							lastPlayedIndex: playerStateFromLocalStorage.lastPlayedIndex
						}
					})
				}
				if (!gameStateFromLocalStorage.endGame) {
					setInstructionOverlay(true);
				}
			} else {
				//state will have default value, only add below
				setGameState(previousState => {
					return { ...previousState,
						todaysIndex: todaysWord.todaysIndex,
						midnightTimestamp: todaysWord.midnightTimestamp
					}
				});
				setInstructionOverlay(true);
			}

			/*if (playerStateFromLocalStorage) {
				if (gameStateFromLocalStorage.todaysIndex == todaysWord.todaysIndex - 1 || gameStateFromLocalStorage.todaysIndex == todaysWord.todaysIndex) {
					setPlayerState(playerStateFromLocalStorage);
				} else {
					setPlayerState(previousState => {
						return { ...previousState,
							currentPlayStreak: 0
						}
					})
				}
			}*/
		}
		catch(err) {
			console.log('Local Storage is has no game data.');
		}

		async function getTodaysWord() {

			//for plain text:
			const fourLetterWordList = require('./constants/FourLetterWordList.ts')

			//for encoded:
			// const response = await fetch(RawWordList);
			// const fourLetterWordListEncoded = await response.text();		
			// console.log(`${fourLetterWordListEncoded}`);
			// let buffer = new Buffer.from(fourLetterWordListEncoded, 'base64');
			// let fourLetterWordListDecoded = buffer.toString('utf-8');
			// fourLetterWordListDecoded = JSON.parse("[" + fourLetterWordListDecoded + "]");
	
			// console.log(`fourLetterWordListDecoded: ${fourLetterWordListDecoded}`);
			
			todaysWord = {...
				fourLetterWordList[todaysWord.todaysIndex]
			};
			// console.log(`word: ${todaysWord.word}, pronunciation: ${todaysWord.pronunciation}, meaning: ${todaysWord.meaning}, exampleFarsi: ${todaysWord.exampleFarsi}`);

		}

		getTodaysWord();
		// todaysWord = getTodaysWord();
		
		// setInstructionOverlay(true);
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
				{alphabet: "ض", color: "lightblue"},
				{alphabet: "ص", color: "lightblue"},
				{alphabet: "ث", color: "lightblue"},
				{alphabet: "ق", color: "lightblue"},
				{alphabet: "ف", color: "lightblue"},
				{alphabet: "غ", color: "lightblue"},
				{alphabet: "ع", color: "lightblue"},
				{alphabet: "ه", color: "lightblue"},
				{alphabet: "خ", color: "lightblue"},
				{alphabet: "ح", color: "lightblue"},
				{alphabet: "ج", color: "lightblue"},
				{alphabet: "چ", color: "lightblue"}

			],
			[
				{alphabet: "ش", color: "lightblue"},
				{alphabet: "س", color: "lightblue"},
				{alphabet: "ی", color: "lightblue"},
				{alphabet: "ب", color: "lightblue"},
				{alphabet: "ل", color: "lightblue"},
				{alphabet: "ا", color: "lightblue"},
				{alphabet: "آ", color: "lightblue"},
				{alphabet: "ت", color: "lightblue"},
				{alphabet: "ن", color: "lightblue"},
				{alphabet: "م", color: "lightblue"},
				{alphabet: "ک", color: "lightblue"},
				{alphabet: "گ", color: "lightblue"}
			],
			[
				{alphabet: "ظ", color: "lightblue"},
				{alphabet: "ط", color: "lightblue"},
				{alphabet: "ز", color: "lightblue"},
				{alphabet: "ژ", color: "lightblue"},
				{alphabet: "ر", color: "lightblue"},
				{alphabet: "ذ", color: "lightblue"},
				{alphabet: "د", color: "lightblue"},
				{alphabet: "پ", color: "lightblue"},
				{alphabet: "و", color: "lightblue"},
			]

		]
	})

	const [playerState, setPlayerState] = useState({
		playCount: 0,
		winCount: 0,
		currentPlayStreak: 0,
		maxPlayStreak: 0,
		lastPlayedIndex: 0
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
		focusOutline: false,
		// contentClass: "",
	};

	function getTodaysIndex() {
		const epochMs = new Date('May 8, 2023 00:00:00').valueOf();
		const now = Date.now();
		const msInDay = 86400000;
		const index = Math.floor((now - epochMs) / msInDay);
		const msTillNextDay = (index + 1) * msInDay + epochMs;

		todaysWord.todaysIndex = index;
		todaysWord.midnightTimestamp = msTillNextDay;

		// console.log(msTillNextDay);
	}

	function readWord(letter) {
		if (gameState.columnPosition !== 0 && gameState.rowPosition <= 4) {
			let currentWord = gameState.submittedWord;
			// console.log(currentWord);
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
		// console.log(gameState.submittedWord);
	}
	
	function submitWord() {
	
		if (gameState.rowPosition <= rowCount && gameState.columnPosition == 0) {
			// console.log('submitting word');
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
		// console.log('deleting letter');
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
		
			updatedCell.letter = gameState.bufferLetter;
			updatedGrid[gameState.rowPosition][gameState.columnPosition] = updatedCell;
		
			setGameState(previousState => {
				return { ...previousState,
					grid: updatedGrid
				}
			});
		}
		
	}, [gameState.submittedWord]);

	useEffect(() => {
		if (gameState.rowPosition <= rowCount && gameState.columnPosition == 0) {
			submitButtonStyle = {
				cursor: 'pointer',
				minHeight: '50px',
				minWidth: '40px',
				textAlign: 'center',
				fontSize: '110%',
				fontFamily: 'righteous',
				color: 'black',
				padding: '0',
				margin: '1px',
				borderRadius: '7px',
				border: 'none',
				backgroundColor: '#52bde0'
			}
		} else {
			submitButtonStyle = {
				cursor: 'pointer',
				minHeight: '50px',
				minWidth: '40px',
				textAlign: 'center',
				fontSize: '110%',
				fontFamily: 'righteous',
				color: 'black',
				padding: '0',
				margin: '1px',
				borderRadius: '7px',
				border: 'none',
				backgroundColor: 'lightblue'
			}
		}
	}, [gameState.columnPosition, gameState.rowPosition])
	
	function assessWord(submittedWord, todaysWord) {
	
		let submittedWordShort = submittedWord.replace('ـ', '');
	
		for (let i = 0; i <= columnCount; i++) {
			if (submittedWordShort[i] == todaysWord[i]) {
				// console.log(`Letter ${submittedWordShort[i]} is correct`);
				//turn cell green
				cellUpdateColor(3-i, "#568203");
				updateKeyboard(submittedWordShort[i], '#568203');
			} else if (submittedWordShort[i] !== todaysWord[i] && todaysWord.includes(submittedWordShort[i])) {
				// console.log(`Righ letter ${submittedWordShort[i]}, wrong cell`);
				//turn cell yellow
				cellUpdateColor(3-i, "yellow");
				updateKeyboard(submittedWordShort[i], 'yellow');
			} else {
				// console.log(`Letter ${submittedWordShort[i]} is incorrect`);
				updateKeyboard(submittedWordShort[i], 'grey');
			}
		}
		
		flipRow();
	
		if (submittedWord.length == todaysWord.length) {

			if (submittedWordShort == todaysWord || gameState.rowPosition == rowCount) {
				
				if (submittedWordShort == todaysWord) {
					// console.log("CORRECT WORD!");
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
						maxPlayStreak: previousState.currentPlayStreak+1 > previousState.maxPlayStreak ? previousState.currentPlayStreak+1 : previousState.maxPlayStreak,
						lastPlayedIndex: gameState.todaysIndex
					}
				})
				// setGameOverOverlay(true);
			}
		}
	}

	//render gameOverOverlay after game ends and row has flipped:
	useEffect(() => {
		if (gameState.endGame && isInstructionOverlayOpen != true) {
			setTimeout( () => {
				setGameOverOverlay(true)
			}, 
			2000);
		}
	}, [gameState.endGame]);


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
				// console.log(`index of ${keyLetter} is ${keyRow},${keyIndex}`)
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
		if (gameState.todaysIndex != 0) {	//skips initial render when states have default value
			localStorage.setItem('gameState', JSON.stringify(gameState));
		}
	}, [gameState.submittedWord, gameState.endGame, gameState.todaysIndex, gameState.midnightTimestamp]);

	useEffect(() => {
		if (playerState.playCount != 0) {  //skips initial render when states have default value
			localStorage.setItem('playerState', JSON.stringify(playerState));
		}
	}, [playerState]);

	function renderResults() {
		if (gameState.endGame) {
			return(
				<div>
					<h2 className='english-theme-font'>{gameWon ? 'Correct Word!' : 'Good Luck Tomorrow'}</h2>
					<h3 className='farsi-theme-font'>{todaysWord.word}</h3>
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
				FarsiFrenzy
			</header>
			<div className='banner'></div>

			{gameState.grid.map((grid, idx) => {
				return(
					<div className="row" key={idx}>
						{grid.map((row, idx) => {
							
							let cellStyleParent = {
								position: 'relative',
								transition: 'transform 2s',
  								transformStyle: 'preserve-3d',
								transform: row.flip,
								// marginTop: '-10px',
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
								fontSize: '250%',
								fontFamily: "koodak",
  								backfaceVisibility: 'hidden',
								borderRadius: '0.5rem'
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
								fontSize: '250%',
								fontFamily: "koodak",
								backfaceVisibility: 'hidden',
								transform: 'rotateY(180deg)',
								borderRadius: '0.5rem'
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

			<div className="learnFarsiDiv">
				<a className="learnFarsiHref" href="https://www.udemy.com/course/masteringfarsi/?referralCode=6B7C20986430DA92C2BE" target="_blank">Learn Farsi <Icon icon="websymbol:link" /></a>
			</div>

			<div className="keyboard">
				<div className="keyboard-rows">
					
					{gameState.keys[0].map((key,idx) => {
						let keyStyle = {
							cursor: 'pointer',
							minHeight: '50px',
							width: 'calc(100% / 12 - 3px)',
							maxWidth: '30px',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "koodak",
							color: "black",
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
				<div className="keyboard-rows">
					{gameState.keys[1].map((key,idx) => {
						let keyStyle = {
							cursor: 'pointer',
							minHeight: '50px',
							width: 'calc(100% / 12 - 3px)',
							maxWidth: '30px',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "koodak",
							color: "black",
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
				<div className="keyboard-rows">
					<button onClick={submitWord} type="submit" style={submitButtonStyle}>Enter</button>
					{/* <button onClick={submitWord} type="submit" className='enter-del-key'>Enter</button> */}
					{gameState.keys[2].map((key,idx) => {
						let keyStyle = {
							cursor: 'pointer',
							minHeight: '50px',
							width: 'calc(100% / 12 - 3px)',
							maxWidth: '30px',
							textAlign: 'center',
							fontSize: '150%',
							fontFamily: "koodak",
							color: "black",
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
				<h2 className='english-theme-font'>Welcome to FarsiFrenzy!</h2>
				<h3 className='english-theme-font'> Guess today's word in 5 tries</h3>
				<div className='instructionsOverlay'>
					For a 4-letter word you guess, each tile colour will change to: <br></br><br></br>
					- <strong>Grey:</strong> Wrong letter <br></br>
					<div className="row">
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
					<div className="row">
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
					<div className="row">
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
				<button className="startButton" onClick={() => {setInstructionOverlay(false);}}>
					Start
				</button>
			</Overlay>

			<Overlay configs={overlayConfig} isOpen={isGameOverOverlayOpen} closeOverlay={closeGameOverOverlay} >
				<div>
					{renderResults()}
				</div>
			
				<h3 className='english-theme-font'>Game Stats</h3>
				<div className='instructionsOverlay'>
					<div className='row'>
						<div className='statsContentCell'>
							{playerState.playCount}
						</div>
						<div className='statsContentCell'>
							{playerState.playCount ? Math.round(playerState.winCount/playerState.playCount * 100) : '0'}%
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

		</div>
	);
}

export default App;

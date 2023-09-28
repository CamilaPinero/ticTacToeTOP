let player = () => {
	let _playerMark = "";
	let marks = document.querySelectorAll(".mark");
	let getplayerMark = () => _playerMark;
	let setPlayerMark = () => {
		marks.forEach((mark) => {
			mark.addEventListener("dragstart", (e) => {
				_playerMark = e.target.id;
			});
		});
	};

	return { getplayerMark, setPlayerMark };
};

let newPlayer = player();
newPlayer.setPlayerMark();

let gameBoard = (() => {
	let _board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	let getField = (row, col) => _board[row][col];
	let setField = (row, col, mark) => {
		_board[row][col] = mark;
	};

	let getRow = (row) => _board[row];
	let getCol = (col) => {
		let column = [];
		for (let i = 0; i < 3; i++) {
			for (let j = col; j < 3; j++) {
				if (j === col && _board[i][j] !== "") {
					column.push(_board[i][j]);
				}
			}
		}
		return column;
	};
	let getDiagonal1 = () => {
		let diagonal1 = [];
		diagonal1.push(_board[0][0], _board[1][1], _board[2][2]);
		return diagonal1;
	};
	let getDiagonal2 = () => {
		let diagonal2 = [];
		diagonal2.push(_board[0][2], _board[1][1], _board[2][0]);
		return diagonal2;
	};

	function allowDrop(ev) {
		ev.preventDefault();
	}

	function drag(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
	}

	/* function drop(ev) {
		ev.preventDefault();
		let data = ev.dataTransfer.getData("text");
		if (ev.target === "") {
			ev.target.appendChild(document.getElementById(data));
		}
		console.log(data);
	} */

	let fields = document.querySelectorAll(".field");

	fields.forEach((field) => {
		field.addEventListener("drop", (e) => {
			let ubic = [...e.target.id];
			if (!getField(ubic[0], ubic[1])) {
				e.target.innerHTML = newPlayer.getplayerMark();
				setField(ubic[0], ubic[1], e.target.innerHTML);
				console.log(_board);
			}
		});
	});

	return {
		allowDrop,
		drag,
		//drop,
		fields,
		getField,
		setField,
		getRow,
		getCol,
		getDiagonal1,
		getDiagonal2,
	};
})();

let gameFlow = (() => {
	let reset = () => {
		gameBoard.fields.forEach((field) => (field.innerHTML = ""));
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				gameBoard.setField(i, j, "");
			}
		}
	};

	document.querySelector(".reset").addEventListener("click", (e) => {
		reset();
	});

	let findRow = (n) => {
		if (gameBoard.getRow(n).every((f) => f === "x")) {
			setTimeout(() => {
				alert("Player X wins!");
				reset();
			}, 300);
		} else if (gameBoard.getRow(n).every((f) => f === "o")) {
			setTimeout(() => {
				alert("Player O wins!");
				reset();
			}, 300);
		}
	};

	let findCol = (n) => {
		if (
			gameBoard.getCol(n).every((f) => f === "x") &&
			gameBoard.getCol(n).length === 3
		) {
			setTimeout(() => {
				alert("Player X wins!");
				reset();
			}, 300);
		} else if (
			gameBoard.getCol(n).every((f) => f === "o") &&
			gameBoard.getCol(n).length === 3
		) {
			setTimeout(() => {
				alert("Player O wins!");
				reset();
			}, 300);
		}
	};

	let findDiagonal = () => {
		if (
			gameBoard.getDiagonal1().every((f) => f === "x") ||
			gameBoard.getDiagonal2().every((f) => f === "x")
		) {
			setTimeout(() => {
				alert("Player X wins!");
				reset();
			}, 300);
		} else if (
			gameBoard.getDiagonal1().every((f) => f === "o") ||
			gameBoard.getDiagonal2().every((f) => f === "o")
		) {
			setTimeout(() => {
				alert("Player O wins!");
				reset();
			}, 300);
		}
	};

	let findDraw = () => {
		let everyField = [];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (gameBoard.getField(i, j) !== "")
					everyField.push(gameBoard.getField(i, j));
			}
		}
		if (everyField.length === 9) {
			console.log(everyField);
			setTimeout(() => {
				alert("It's a draw!");
				reset();
			}, 300);
		}
	};

	gameBoard.fields.forEach((field) => {
		field.addEventListener("drop", (e) => {
			for (i = 0; i < 3; i++) {
				findRow(i);
				findCol(i);
			}
			findDiagonal();
			findDraw();
		});
	});
})();

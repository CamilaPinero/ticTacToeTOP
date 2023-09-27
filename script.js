let player = () => {
	let _playerMark = "";
	let marks = document.querySelectorAll(".mark");
	let getplayerMark = () => _playerMark;
	let setPlayerMark = () => {
		marks.forEach((mark) => {
			mark.addEventListener("click", (e) => {
				_playerMark = e.target.id;
				console.log(_playerMark);
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

	let fields = document.querySelectorAll(".field");

	fields.forEach((field) => {
		field.addEventListener("click", (e) => {
			e.target.innerHTML = newPlayer.getplayerMark();
			let ubic = [...e.target.id];
			setField(ubic[0], ubic[1], e.target.innerHTML);
			console.log(_board);
		});
	});

	return {
		fields,
		getField,
		setField,
	};
})();

let gameFlow = (() => {
	let reset = document.querySelector(".reset");
	reset.addEventListener("click", (e) => {
		gameBoard.fields.forEach((field) => (field.innerHTML = ""));
	});
})();

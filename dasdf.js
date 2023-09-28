let _board = [
	["y", "", ""],
	["", "a", ""],
	["", "", "s"],
];

let getDiagonal1 = () => {
	let diagonal1 = [];
	diagonal1.push(_board[0][0], _board[1][1], _board[2][2]);

	return diagonal1;
};

console.log(getDiagonal1());

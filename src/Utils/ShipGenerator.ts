import GridMap from "./GridMap";

// Grid replica to generate ships
const generateGrid = ():number[][] => {
    const grid: number[][] = [];
    for (let i = 0; i < 10; i++) {
        grid[i] = [];
        for (let j = 0; j < 10; j++) {
        grid[i][j] = 0;
        }
    }
    return grid;
}

// Place ships on the grid
const placeShip = (grid: number[][], size: number):string[][] => {
    const ship: number[][] = [];
    let row: number, col: number;

    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * (10 - size + 1));
    for (let i = 0; i < size; i++) {
        ship.push([row, col + i]);
        grid[row][col + i] = 1;
    }

    return formatShipPosition(ship);
}

// Format ship position to A1,A2,A3...
const formatShipPosition = (ship: number[][]): any[] => {
    return ship.reduce((acc: any[], val: any) => {
        let gridCell = GridMap.get(val[1] + 1);
        return acc.concat(`${gridCell}${val[0] + 1}`);
    }, []);
  };

// Main generator function
const shipGenerator = ():string[][][] => {
    const grid = generateGrid();
    const battleship = placeShip(grid, 5);
    const destroyer1 = placeShip(grid, 4);
    const destroyer2 = placeShip(grid, 4);

    console.log(battleship, destroyer1, destroyer2);
    
    return  [battleship, destroyer1, destroyer2];
}

export default shipGenerator;
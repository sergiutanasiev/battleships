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
const placeShip = (grid: number[][], size: number): string[][] => {
    const ship: number[][] = [];
    const direction: string = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    let row: number, col: number;

    // Check colission so ships won't overlap
    const checkCollision = (row: number, col: number, size: number, direction: string): boolean => {
        if (direction === 'horizontal') {
        for (let i = 0; i < size; i++) {
            if (grid[row][col + i] === 1) {
                return true;
            }
        }
        } else {
        for (let i = 0; i < size; i++) {
            if (grid[row + i][col] === 1) {
                return true;
            }
        }
        }
        return false;
    };

    if (direction === 'horizontal') {
        do {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * (10 - size + 1));
        } while (checkCollision(row, col, size, direction));

        for (let i = 0; i < size; i++) {
            ship.push([row, col + i]);
        }
    } else {
        do {
            row = Math.floor(Math.random() * (10 - size + 1));
            col = Math.floor(Math.random() * 10);
        } while (checkCollision(row, col, size, direction));

        for (let i = 0; i < size; i++) {
            ship.push([row + i, col]);
        }
    }

    return formatShipPosition(ship);
};

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
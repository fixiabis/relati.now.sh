#include "./GridBoard.hpp"

#ifndef __GRID__
#define __GRID__

template <class GridPiece>
class GridBoard;

template <class GridPiece>
class Grid
{
public:
    const int i;
    const int x;
    const int y;
    GridPiece piece;
    const GridBoard<GridPiece> *board;

    Grid(int x, int y, GridBoard<GridPiece> *board)
    {
        this->i = y * board->width + x;
        this->x = x;
        this->y = y;
        this->piece = nullptr;
        this->board = board;
    }

    Grid *getGridByRelativeCoordinate(int dx, int dy)
    {
        int x = this->x + dx;
        int y = this->y + dy;
        return this->board->getGridByAbsoluteCoordinate(x, y);
    }
};

#endif

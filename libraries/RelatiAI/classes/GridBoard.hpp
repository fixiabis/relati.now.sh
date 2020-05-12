#ifndef __GRIDBOARD__
#define __GRIDBOARD__

#ifndef __GRID__

#include "./Grid.hpp"

#endif

template <class GridPiece>
class GridBoard
{
public:
    int width;
    int height;
    Grid<GridPiece> **grids;

    GridBoard(int width, int height)
    {
        int gridsLength = width * height;
        this->width = width;
        this->height = height;
        this->grids = (Grid<GridPiece> **)malloc(sizeof(Grid<GridPiece> *) * gridsLength);

        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                Grid<GridPiece> *grid = new Grid<GridPiece>(x, y, this);
                this->grids[grid->i] = grid;
            }
        }
    }

    Grid<GridPiece> *getGridByAbsoluteCoordinate(int x, int y)
    {
        bool isOverBoundary = x < 0 || x >= this->width || y < 0 || y >= this->height;

        if (isOverBoundary)
        {
            return nullptr;
        }

        int i = y * this->width + x;
        return this->grids[i];
    }
};

#endif

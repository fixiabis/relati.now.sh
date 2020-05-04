#include <stdbool.h>
#include "../classes/GridBoard.hpp"
#include "../definitions/piece_status.h"

bool getIsHasSourceByBoardAndCoordinateAndSymbol(GridBoard<int> *board, int x, int y, int symbol)
{
    return (
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 0, y - 1, symbol) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 0, y + 1, symbol) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x - 1, y + 0, symbol) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 1, y + 0, symbol) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x - 1, y - 1, symbol) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x - 1, y + 1, symbol) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 1, y - 1, symbol) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 1, y + 1, symbol) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 0, y - 2, symbol) &&
            getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 0, y + 2, symbol) &&
            getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x - 2, y + 0, symbol) &&
            getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 2, y + 0, symbol) &&
            getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x - 2, y - 2, symbol) &&
            getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y - 1) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x - 2, y + 2, symbol) &&
            getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 1) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 2, y - 2, symbol) &&
            getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y - 1) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 2, y + 2, symbol) &&
            getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 1) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x - 1, y - 2, symbol) &&
            (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 2) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y - 1) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y - 1)) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x - 1, y + 2, symbol) &&
            (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 2) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 1) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 1)) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 1, y - 2, symbol) &&
            (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 2) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y - 1) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y - 1)) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 1, y + 2, symbol) &&
            (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 2) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 1) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 1)) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x - 2, y - 1, symbol) &&
            (getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 2, y + 0) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y - 1) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y - 1)) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 2, y - 1, symbol) &&
            (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 2, y + 0) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y - 1) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y - 1)) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x - 2, y + 1, symbol) &&
            (getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 2, y + 0) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 1) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 1)) ||
        getIsSourceByBoardAndCoordinateAndSymbol(board, x + 2, y + 1, symbol) &&
            (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 2, y + 0) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 1) ||
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
                 getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 1)));
}

bool getIsSourceByBoardAndCoordinateAndSymbol(GridBoard<int> *board, int x, int y, int symbol)
{
    int gridIndex = board->getGridIndexByCoordinate(x, y);
    return gridIndex != -1 && getIsCanBeSourceBySourceSymbolAndSymbol(board->grids[gridIndex], symbol);
}

bool getIsTargetByBoardAndCoordinateAndSymbol(GridBoard<int> *board, int x, int y, int symbol)
{
    int gridIndex = board->getGridIndexByCoordinate(x, y);
    return gridIndex != -1 && getIsCanBeTargetByTargetSymbolAndSymbol(board->grids[gridIndex], symbol);
}

bool getIsEmptyByBoardAndCoordinateAndSymbol(GridBoard<int> *board, int x, int y)
{
    int gridIndex = board->getGridIndexByCoordinate(x, y);
    return gridIndex != -1 && board->grids[gridIndex] == 0;
}

bool getIsCanBeSourceBySourceSymbolAndSymbol(int sourceSymbol, int symbol)
{
    return getIsEqualByTwoSymbol(sourceSymbol, symbol) && getIsActivedBySymbol(sourceSymbol);
}

bool getIsCanBeTargetByTargetSymbolAndSymbol(int targetSymbol, int symbol)
{
    return getIsEqualByTwoSymbol(targetSymbol, symbol) && !getIsActivedBySymbol(targetSymbol);
}

bool getIsEqualByTwoSymbol(int symbolA, int symbolB)
{
    return symbolA & 0b1100 == symbolB & 0b1100;
}

bool getIsActivedBySymbol(int symbol)
{
    return symbol & ACTIVED == ACTIVED;
}

bool getIsPrimaryBySymbol(int symbol)
{
    return symbol & PRIMARY == PRIMARY;
}

void activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(GridBoard<int> *board, int x, int y)
{
    int gridIndex = board->getGridIndexByCoordinate(x, y);
    int symbol = board->grids[gridIndex];

    if (getIsTargetByBoardAndCoordinateAndSymbol(board, x + 0, y - 1, symbol))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 0, y - 1);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 0, y - 1);
    }

    if (getIsTargetByBoardAndCoordinateAndSymbol(board, x + 0, y + 1, symbol))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 0, y + 1);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 0, y + 1);
    }

    if (getIsTargetByBoardAndCoordinateAndSymbol(board, x - 1, y + 0, symbol))
    {
        int gridIndex = board->getGridIndexByCoordinate(x - 1, y + 0);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x - 1, y + 0);
    }

    if (getIsTargetByBoardAndCoordinateAndSymbol(board, x + 1, y + 0, symbol))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 1, y + 0);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 1, y + 0);
    }

    if (getIsTargetByBoardAndCoordinateAndSymbol(board, x - 1, y - 1, symbol))
    {
        int gridIndex = board->getGridIndexByCoordinate(x - 1, y - 1);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x - 1, y - 1);
    }

    if (getIsTargetByBoardAndCoordinateAndSymbol(board, x - 1, y + 1, symbol))
    {
        int gridIndex = board->getGridIndexByCoordinate(x - 1, y + 1);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x - 1, y + 1);
    }

    if (getIsTargetByBoardAndCoordinateAndSymbol(board, x + 1, y - 1, symbol))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 1, y - 1);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 1, y - 1);
    }

    if (getIsTargetByBoardAndCoordinateAndSymbol(board, x + 1, y + 1, symbol))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 1, y + 1);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 1, y + 1);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x + 0, y - 2, symbol) &&
        getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 0, y - 2);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 0, y - 2);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x + 0, y + 2, symbol) &&
        getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 0, y + 2);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 0, y + 2);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x - 2, y + 0, symbol) &&
        getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0))
    {
        int gridIndex = board->getGridIndexByCoordinate(x - 2, y + 0);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x - 2, y + 0);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x + 2, y + 0, symbol) &&
        getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 2, y + 0);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 2, y + 0);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x - 2, y - 2, symbol) &&
        getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y - 1))
    {
        int gridIndex = board->getGridIndexByCoordinate(x - 2, y - 2);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x - 2, y - 2);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x - 2, y + 2, symbol) &&
        getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 1))
    {
        int gridIndex = board->getGridIndexByCoordinate(x - 2, y + 2);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x - 2, y + 2);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x + 2, y - 2, symbol) &&
        getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y - 1))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 2, y - 2);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 2, y - 2);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x + 2, y + 2, symbol) &&
        getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 1))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 2, y + 2);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 2, y + 2);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x - 1, y - 2, symbol) &&
        (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 2) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y - 1) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y - 1)))
    {
        int gridIndex = board->getGridIndexByCoordinate(x - 1, y - 2);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x - 1, y - 2);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x - 1, y + 2, symbol) &&
        (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 2) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 1) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 1)))
    {
        int gridIndex = board->getGridIndexByCoordinate(x - 1, y + 2);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x - 1, y + 2);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x + 1, y - 2, symbol) &&
        (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 2) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y - 1) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y - 1)))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 1, y - 2);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 1, y - 2);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x + 1, y + 2, symbol) &&
        (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 2) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 1) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 1)))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 1, y + 2);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 1, y + 2);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x - 2, y - 1, symbol) &&
        (getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 2, y + 0) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y - 1) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y - 1)))
    {
        int gridIndex = board->getGridIndexByCoordinate(x - 2, y - 1);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x - 2, y - 1);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x + 2, y - 1, symbol) &&
        (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 2, y + 0) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y - 1) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y - 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y - 1)))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 2, y - 1);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 2, y - 1);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x - 2, y + 1, symbol) &&
        (getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 2, y + 0) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 1) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x - 1, y + 1)))
    {
        int gridIndex = board->getGridIndexByCoordinate(x - 2, y + 1);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x - 2, y + 1);
    }

    if (
        getIsTargetByBoardAndCoordinateAndSymbol(board, x + 2, y + 1, symbol) &&
        (getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 2, y + 0) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 0) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 1) ||
         getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 0, y + 1) &&
             getIsEmptyByBoardAndCoordinateAndSymbol(board, x + 1, y + 1)))
    {
        int gridIndex = board->getGridIndexByCoordinate(x + 2, y + 1);
        board->grids[gridIndex] |= ACTIVED;
        activeSymbolsByBoardAndPrimarySymbolCoordinateAndSymbol(board, x + 2, y + 1);
    }
}

void disableAllSymbolsByBoard(GridBoard<int> *board)
{
    for (int gridIndex = 0; gridIndex < board->width * board->height; gridIndex++)
    {
        board->grids[gridIndex] &= ~ACTIVED;
    }
}

#include <stdbool.h>

template <class GridBody>
class GridBoard
{
public:
    int width;
    int height;
    GridBody *grids;

    GridBoard(int width, int height)
    {
        int gridsLength = width * height;
        this->width = width;
        this->height = height;
        this->grids = new GridBody[gridLength]();
    }

    int getGridIndexByCoordinate(int x, int y)
    {
        if (x < 0 || x >= this->width || y < 0 || y >= this->height)
        {
            return -1;
        }

        return y * this->width + x;
    }
};

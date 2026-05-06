import { PrismaService } from '../prisma/prisma.service';
import { CalculateWindowDto } from './dto/calculate-window.dto';
import { UpdatePricesDto } from './dto/update-prices.dto';
export declare class WindowCalcService {
    private prisma;
    constructor(prisma: PrismaService);
    getPrices(): Promise<{
        id: string;
        updatedAt: Date;
        glassPrice: number;
        lPrice: number;
        tPrice: number;
        zPrice: number;
        shtapikPrice: number;
    }>;
    updatePrices(dto: UpdatePricesDto): Promise<{
        id: string;
        updatedAt: Date;
        glassPrice: number;
        lPrice: number;
        tPrice: number;
        zPrice: number;
        shtapikPrice: number;
    }>;
    calculate(dto: CalculateWindowDto): Promise<{
        area: number;
        L: number;
        T: number;
        Z: number;
        glass: number;
        shtapik: number;
        costs: {
            lCost: number;
            tCost: number;
            zCost: number;
            glassCost: number;
            shtapikCost: number;
        };
        prices: {
            lPrice: number;
            tPrice: number;
            zPrice: number;
            glassPrice: number;
            shtapikPrice: number;
        };
        total: number;
    }>;
}

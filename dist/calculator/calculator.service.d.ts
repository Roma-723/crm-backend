import { CalculateDto } from './dto/calculate.dto';
export declare class CalculatorService {
    calculate(dto: CalculateDto): {
        area: number;
        profileLength: number;
        sticks: number;
        totalProfileMeters: number;
        glassTotal: number;
        profileTotal: number;
        total: number;
    };
}

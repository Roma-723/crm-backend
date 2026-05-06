import { CalculatorService } from './calculator.service';
import { CalculateDto } from './dto/calculate.dto';
export declare class CalculatorController {
    private readonly calculatorService;
    constructor(calculatorService: CalculatorService);
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

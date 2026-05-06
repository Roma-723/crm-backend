"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorService = void 0;
const common_1 = require("@nestjs/common");
const PROFILE_STICK_LENGTH = 6;
let CalculatorService = class CalculatorService {
    calculate(dto) {
        const { width, height, type, glassPrice = 0, profilePrice = 0 } = dto;
        const extra = type === 1 ? 0 : type === 2 ? height : height * 2;
        const perimeter = 2 * (width + height);
        const profileLength = perimeter + extra;
        const area = width * height;
        const sticks = Math.ceil(profileLength / PROFILE_STICK_LENGTH);
        const totalProfileMeters = sticks * PROFILE_STICK_LENGTH;
        const glassTotal = area * glassPrice;
        const profileTotal = totalProfileMeters * profilePrice;
        const total = glassTotal + profileTotal;
        return {
            area,
            profileLength,
            sticks,
            totalProfileMeters,
            glassTotal,
            profileTotal,
            total,
        };
    }
};
exports.CalculatorService = CalculatorService;
exports.CalculatorService = CalculatorService = __decorate([
    (0, common_1.Injectable)()
], CalculatorService);
//# sourceMappingURL=calculator.service.js.map
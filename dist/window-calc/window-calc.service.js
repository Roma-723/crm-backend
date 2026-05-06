"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowCalcService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const PRICE_ID = 'singleton';
let WindowCalcService = class WindowCalcService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPrices() {
        let prices = await this.prisma.windowPrice.findUnique({ where: { id: PRICE_ID } });
        if (!prices) {
            prices = await this.prisma.windowPrice.create({
                data: { id: PRICE_ID, lPrice: 0, tPrice: 0, zPrice: 0, glassPrice: 0, shtapikPrice: 0 },
            });
        }
        return prices;
    }
    async updatePrices(dto) {
        return this.prisma.windowPrice.upsert({
            where: { id: PRICE_ID },
            update: dto,
            create: { id: PRICE_ID, ...dto },
        });
    }
    async calculate(dto) {
        const { width, height, sashCount } = dto;
        const prices = await this.getPrices();
        const area = (width * height) / 1_000_000;
        const L = (2 * (width + height)) / 1000;
        const T = sashCount > 1 ? ((sashCount - 1) * height) / 1000 : 0;
        const sashWidth = width / sashCount;
        const sashHeight = height;
        const Z = sashCount * (2 * (sashWidth + sashHeight)) / 1000;
        const glass = area * 2;
        const shtapik = sashCount * (2 * (sashWidth + sashHeight)) / 1000;
        const lCost = L * prices.lPrice;
        const tCost = T * prices.tPrice;
        const zCost = Z * prices.zPrice;
        const glassCost = glass * prices.glassPrice;
        const shtapikCost = shtapik * prices.shtapikPrice;
        const total = lCost + tCost + zCost + glassCost + shtapikCost;
        return {
            area,
            L,
            T,
            Z,
            glass,
            shtapik,
            costs: { lCost, tCost, zCost, glassCost, shtapikCost },
            prices: { lPrice: prices.lPrice, tPrice: prices.tPrice, zPrice: prices.zPrice, glassPrice: prices.glassPrice, shtapikPrice: prices.shtapikPrice },
            total,
        };
    }
};
exports.WindowCalcService = WindowCalcService;
exports.WindowCalcService = WindowCalcService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WindowCalcService);
//# sourceMappingURL=window-calc.service.js.map
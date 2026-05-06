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
exports.BonusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BonusService = class BonusService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.bonus.findMany({
            include: { user: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    findByUser(userId) {
        return this.prisma.bonus.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });
    }
    create(dto) {
        return this.prisma.bonus.create({ data: dto });
    }
    async update(id, dto) {
        const item = await this.prisma.bonus.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Bonus not found');
        return this.prisma.bonus.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const item = await this.prisma.bonus.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Bonus not found');
        await this.prisma.bonus.delete({ where: { id } });
        return { message: 'Bonus deleted' };
    }
};
exports.BonusService = BonusService;
exports.BonusService = BonusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BonusService);
//# sourceMappingURL=bonus.service.js.map
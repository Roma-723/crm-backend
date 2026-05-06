import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CalculateWindowDto } from './dto/calculate-window.dto';
import { UpdatePricesDto } from './dto/update-prices.dto';

const PRICE_ID = 'singleton';

@Injectable()
export class WindowCalcService {
  constructor(private prisma: PrismaService) {}

  async getPrices() {
    let prices = await this.prisma.windowPrice.findUnique({ where: { id: PRICE_ID } });
    if (!prices) {
      prices = await this.prisma.windowPrice.create({
        data: { id: PRICE_ID, lPrice: 0, tPrice: 0, zPrice: 0, glassPrice: 0, shtapikPrice: 0 },
      });
    }
    return prices;
  }

  async updatePrices(dto: UpdatePricesDto) {
    return this.prisma.windowPrice.upsert({
      where: { id: PRICE_ID },
      update: dto,
      create: { id: PRICE_ID, ...dto },
    });
  }

  async calculate(dto: CalculateWindowDto) {
    const { width, height, sashCount } = dto;
    const prices = await this.getPrices();

    // 1. Area (m²)
    const area = (width * height) / 1_000_000;

    // 2. L profile — always (outer frame perimeter)
    const L = (2 * (width + height)) / 1000;

    // 3. T profile — imposts between sashes
    const T = sashCount > 1 ? ((sashCount - 1) * height) / 1000 : 0;

    // 4. Sash dimensions
    const sashWidth  = width / sashCount;
    const sashHeight = height;

    // 5. Z profile — each sash perimeter
    const Z = sashCount * (2 * (sashWidth + sashHeight)) / 1000;

    // 6. Glass — double pane
    const glass = area * 2;

    // 7. Shtapik — same as Z (each sash inner perimeter)
    const shtapik = sashCount * (2 * (sashWidth + sashHeight)) / 1000;

    // Costs
    const lCost       = L       * prices.lPrice;
    const tCost       = T       * prices.tPrice;
    const zCost       = Z       * prices.zPrice;
    const glassCost   = glass   * prices.glassPrice;
    const shtapikCost = shtapik * prices.shtapikPrice;
    const total       = lCost + tCost + zCost + glassCost + shtapikCost;

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
}

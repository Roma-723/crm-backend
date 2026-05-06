import { Injectable } from '@nestjs/common';
import { CalculateDto } from './dto/calculate.dto';

const PROFILE_STICK_LENGTH = 6;

@Injectable()
export class CalculatorService {
  calculate(dto: CalculateDto) {
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
}

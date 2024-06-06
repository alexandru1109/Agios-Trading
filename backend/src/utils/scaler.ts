export class MinMaxScaler {
  private min: number;
  private max: number;

  constructor() {
    this.min = Infinity;
    this.max = -Infinity;
  }

  fit(data: number[]): void {
    this.min = Math.min(...data);
    this.max = Math.max(...data);
  }

  transform(data: number[]): number[] {
    return data.map((value) => (value - this.min) / (this.max - this.min));
  }

  fitTransform(data: number[]): number[] {
    this.fit(data);
    return this.transform(data);
  }

  inverseTransform(data: number[]): number[] {
    return data.map((value) => value * (this.max - this.min) + this.min);
  }
}

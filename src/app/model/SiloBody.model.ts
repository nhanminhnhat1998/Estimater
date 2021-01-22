import { Cone } from "./Cone.model";
import { Khoang } from "./Khoang.model";

export class SiloBody {
  constructor(
    public diameter: number,
    public weight: number,
    public type: string,
    public cone: Cone,
    public khoang?: Khoang[],
    public totalMass?: number
  ) {}
}

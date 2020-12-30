import { Component, OnInit } from "@angular/core";
import { Cone } from "../../../model/Cone.model";
import { Khoang } from "../../../model/Khoang.model";
import { SiloBody } from "../../../model/SiloBody.model";
@Component({
  selector: "app-than-silo",
  templateUrl: "./than-silo.component.html",
  styleUrls: ["./than-silo.component.css"],
})
export class ThanSiloComponent implements OnInit {
  next: boolean = false;
  isChecked_tro = false;
  isChecked_xi = true;
  troBay: number = 0.8 * 1000; //Tonne
  xiMang: number = 1.4 * 1000;
  materialDensity = 7850; // kg/m3
  coneThickness = 7; // mm
  khoangVolume: number; //  m^3
  totalKhoangHeight: number; //m
  totalKhoangMass: number; //kg

  totalWeight; // kg
  totalVolume: number; // kg/mm^3

  siloBody: SiloBody = new SiloBody(
    3500,
    100000,
    "xiMang",
    new Cone(310, 1500)
  );
  constructor() {}

  ngOnInit(): void {}

  onNext() {
    if (
      this.siloBody.diameter &&
      this.siloBody.cone.height &&
      this.siloBody.cone.diameterS &&
      this.siloBody.weight
    ) {
      this.siloBody.cone.diameterL = this.siloBody.diameter;
      this.totalVolume = parseFloat(this.getTotalVolume().toFixed(2));
      this.siloBody.cone.volume = parseFloat(
        this.getConeVolume(
          this.siloBody.diameter,
          this.siloBody.cone.diameterS,
          this.siloBody.cone.height
        ).toFixed(2)
      );
      this.siloBody.cone.mass = this.getConeMass();
      this.khoangVolume = this.totalVolume - this.siloBody.cone.volume;
      this.khoangVolume = parseFloat(this.khoangVolume.toFixed(2));
      this.siloBody.khoang = this.getKhoang();

      this.totalKhoangHeight = parseFloat(this.totalKhoangHeight.toFixed(2));
      let totalMass = this.totalKhoangMass + this.siloBody.cone.mass;
      this.siloBody.totalMass = parseFloat(totalMass.toFixed(2));

      this.next = true;
    } else {
      alert("empty input(s)");
    }
  }

  onChangeThicness(k: Khoang) {
    let previousMass = this.siloBody.khoang[k.idx - 1].mass;

    k.mass = this.getMass(k.height, k.thickness);
    console.log(`k.mass ${k.mass} - ${previousMass}: `);

    let diffMass: number = k.mass - previousMass;
    this.siloBody.khoang[k.idx - 1] = k;
    console.log("diffMass: " + diffMass);

    this.totalKhoangMass += diffMass;
    this.siloBody.totalMass += diffMass;
    this.siloBody.totalMass = parseFloat(this.siloBody.totalMass.toFixed(2));
    this.totalKhoangMass = parseFloat(this.totalKhoangMass.toFixed(2));
  }

  checkValue(event: any) {
    this.siloBody.type = event.currentTarget.name;
    let checked = event.currentTarget.checked;

    if (this.siloBody.type === "troBay") {
      if (checked) {
        this.isChecked_tro = true;
        this.isChecked_xi = false;
      } else {
        this.isChecked_xi = true;
        this.isChecked_tro = false;
        this.siloBody.type = "xiMang";
      }
    } else if (this.siloBody.type === "xiMang") {
      if (checked) {
        this.isChecked_xi = true;
        this.isChecked_tro = false;
      } else {
        this.isChecked_xi = false;
        this.isChecked_tro = true;
        this.siloBody.type = "troBay";
      }
    }

    if (this.next) this.onNext();
  }

  getTotalVolume(): number {
    console.log("# get total volume");

    let density = this.siloBody.type === "troBay" ? this.troBay : this.xiMang;
    console.log("density: " + density);
    console.log(`total volume: ${this.siloBody.weight} / ${density}  `);
    return this.siloBody.weight / density;
  }
  mm2m(x: number) {
    return x / 1000;
  }

  getMass(h: number, t: number): number {
    let r = this.siloBody.diameter / 2;
    let pow2R = Math.pow(this.mm2m(r + t), 2);
    let pow2r = Math.pow(this.mm2m(r), 2);
    let V = Math.PI * this.mm2m(h) * (pow2R - pow2r);
    let m = this.materialDensity * V;
    console.log(`R: ${r + t} r: ${r} h: ${this.mm2m(h)} V: ${V} mass: ${m}`);
    return parseFloat(m.toFixed(2));
  }

  getConeVolume(dL: number, dS: number, height: number): number {
    console.log("# get Cone volume using (m)");

    let pi = Math.PI;
    let rL = this.mm2m(dL) / 2; //m
    let h = this.mm2m(height); //m
    let rS = this.mm2m(dS) / 2; //m

    let pow2rL = Math.pow(rL, 2); //m2
    let pow2rS = Math.pow(rS, 2); //m2
    console.log(`rL: ${rL} rS: ${rS} h: ${h} pi: ${pi}`);

    console.log(`pow2rL: ${pow2rL} pow2rS: ${pow2rS} `);
    console.log(
      `Cone volume: (pi * (${pow2rL} + ${pow2rS} + ${rL} * ${rS}) * ${h}) / 3`
    );
    let V = (pi * (pow2rL + pow2rS + rL * rS) * h) / 3; // kg/m3

    return V;
  }

  getConeMass() {
    let dL = this.siloBody.diameter + this.coneThickness;
    let dS = this.siloBody.cone.diameterS + this.coneThickness;
    let h = this.siloBody.cone.height;
    let vL = this.getConeVolume(dL, dS, h);
    let V = vL - this.siloBody.cone.volume;
    let m = this.materialDensity * V;
    return parseFloat(m.toFixed(2));
  }

  getKhoang() {
    console.log("# get Khoang height");
    let maxHeight = 1500; //m
    let r = this.mm2m(this.siloBody.diameter) / 2;
    let area = Math.PI * Math.pow(r, 2);
    this.totalKhoangHeight = this.khoangVolume / area;
    console.log(
      `height: ${this.khoangVolume} / area: ${area} = ${this.totalKhoangHeight}`
    );

    let remainHeight = this.totalKhoangHeight * 1000; //mm
    let i = 1;
    let tmpKhoangs: Khoang[] = [];
    let tmpWeight: number = 0;
    let totalMass: number = 0;
    for (i; remainHeight > maxHeight; i++) {
      tmpWeight = this.getMass(maxHeight, 4);
      tmpKhoangs.push(new Khoang(4, maxHeight, i, tmpWeight));
      totalMass += tmpWeight;
      remainHeight -= maxHeight;
    }
    if (remainHeight > 0) {
      tmpWeight = this.getMass(remainHeight, 4);
      totalMass += tmpWeight;
      tmpKhoangs.push(new Khoang(4, Math.round(remainHeight), i, tmpWeight));
    }
    console.log("khong no.: " + i);
    this.totalKhoangMass = parseFloat(totalMass.toFixed(2));
    console.log("total mass no.: " + this.totalKhoangMass);

    return tmpKhoangs;
  }
}

import { Component, OnInit } from "@angular/core";
import { Cone } from "../../../model/Cone.model";
import { Khoang } from "../../../model/Khoang.model";
@Component({
  selector: "app-than-silo",
  templateUrl: "./than-silo.component.html",
  styleUrls: ["./than-silo.component.css"],
})
export class ThanSiloComponent implements OnInit {
  diameter: number = 200;
  weight: number = 100000;
  type: string = "xiMang";
  isChecked_tro = false;
  isChecked_xi = true;
  cone: Cone = new Cone(310, 150);

  khoang: Khoang[] = [];
  khoangVolume: number; //  kg/mm^3
  totalKhoangHeight: number;

  totalVolume: number; // kg/mm^3
  constructor() {}

  ngOnInit(): void {}

  onNext() {
    if (
      this.diameter &&
      this.cone.height &&
      this.cone.diameterS &&
      this.weight
    ) {
      this.cone.diameterL = this.diameter;
      this.totalVolume = parseFloat(this.getTotalVolume().toFixed(2));
      this.cone.volume = parseFloat(this.getConeVolume().toFixed(2));
      this.khoangVolume = this.totalVolume - this.cone.volume;
      this.khoangVolume = parseFloat(this.khoangVolume.toFixed(2));

      this.khoang = this.getKhoang();
    } else {
      alert("empty input(s)");
    }
  }
  checkValue(event: any) {
    this.type = event.currentTarget.name;
    let checked = event.currentTarget.checked;

    if (this.type === "troBay") {
      if (checked) {
        this.isChecked_tro = true;
        this.isChecked_xi = false;
      } else {
        this.isChecked_xi = true;
        this.isChecked_tro = false;
        this.type = "xiMang";
      }
    } else if (this.type === "xiMang") {
      if (checked) {
        this.isChecked_xi = true;
        this.isChecked_tro = false;
      } else {
        this.isChecked_xi = false;
        this.isChecked_tro = true;
        this.type = "troBay";
      }
    }
  }

  getTotalVolume(): number {
    let density = this.type === "troBay" ? 1.4 : 3.1;
    return this.weight / Math.pow(density, -9);
  }
  getConeVolume(): number {
    let pi = Math.PI;
    let rL = this.cone.diameterL / 2;
    let h = this.cone.height;
    let rS = this.cone.diameterS / 2;
    console.log(`rL: ${rL} rS: ${rS} h: ${h}`);

    let pow2rL = Math.pow(rL, 2);
    let pow2rS = Math.pow(rS, 2);
    let piOver3 = pi / 3;
    console.log(`pow2rL: ${pow2rL} pow2rS: ${pow2rS} piOver3: ${piOver3}`);

    return piOver3 * (pow2rL + pow2rS + rL * rS) * h;
  }
  getKhoang() {
    let r = this.diameter / 2;
    let area = Math.PI * Math.pow(r, 2);
    this.totalKhoangHeight = this.khoangVolume / area;
    let remainHeight = this.totalKhoangHeight;
    let i = 1;
    let tmpKhoangs: Khoang[] = [];
    for (i; remainHeight > 150; i++) {
      tmpKhoangs.push(new Khoang(4, 150, i, null));
      remainHeight -= 150;
    }
    if (remainHeight > 0) {
      tmpKhoangs.push(new Khoang(4, remainHeight, i, null));
    }
    console.log("idx: " + i);

    return tmpKhoangs;
  }
}

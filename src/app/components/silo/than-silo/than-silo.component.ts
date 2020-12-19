import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-than-silo",
  templateUrl: "./than-silo.component.html",
  styleUrls: ["./than-silo.component.css"],
})
export class ThanSiloComponent implements OnInit {
  diameter: number;
  weight: number;
  type: string;
  isChecked_tro = false;
  isChecked_xi = false;

  constructor() {}

  ngOnInit(): void {}

  onNext() {}
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
}

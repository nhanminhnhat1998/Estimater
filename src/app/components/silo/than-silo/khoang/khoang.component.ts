import { Component, OnInit, Input } from "@angular/core";
import { Khoang } from "../../../../model/Khoang.model";

@Component({
  selector: "app-khoang",
  templateUrl: "./khoang.component.html",
  styleUrls: ["./khoang.component.css"],
})
export class KhoangComponent implements OnInit {
  @Input() khoang: Khoang;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.sass"],
})
export class BreadcrumbComponent implements OnInit {

  @Input() breadcrumbTitle: string | undefined;
  @Input() breadcrumbSubTitle1: string | undefined;
  @Input() breadcrumbSubTitle2: string | undefined;
  @Input() breadcrumbImage: string | undefined;


  constructor() {}

  ngOnInit(): void {}
}

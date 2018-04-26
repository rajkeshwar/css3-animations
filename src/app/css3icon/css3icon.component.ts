import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CSS3ICONS_SNIPPETS } from '../css3icons-snippets';
import { HttpClient } from '@angular/common/http';
import { Broadcaster } from '../common/broadcaster';

@Component({
  selector: 'css3-css3icon',
  templateUrl: './css3icon.component.html',
  styleUrls: ['./css3icon.component.scss']
})
export class Css3iconComponent implements OnInit {

  public treeJson: Array<any>;
  public snippets: any;
  public currentSnippet: string;
  public htmlExample: string;
  public iconList: string[]; 
  public css3Icons: any; 

  constructor(private http: HttpClient, private broadcaster: Broadcaster) { }

  ngOnInit() {

    const SKIP_ICONS = /functions|generals|arrow|paperclip|/;
    // this.iconList = Object.keys(CSS3ICONS_SNIPPETS).filter(icon => !SKIP_ICONS.test(icon));
    this.iconList = Object.keys(CSS3ICONS_SNIPPETS);
    this.http.get('assets/data/css3icons-tree.json')
      .subscribe(treeJson => this.treeJson = [treeJson]);

    this.http.get('assets/data/css3icons-map.json')
      .subscribe(css3icons => this.css3Icons = css3icons);
  }

  public viewSource() {
    this.snippets = this.currentSnippet;
  }

  getHtmlUsageExample( cssContent ) {
    const match = cssContent.match(/Usage:([\s\S]+\*[.\s\S]+\>)/);
    return match && match.length > 1 ? match[1].replace(/ \*/g, '') : '';
  }

  htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  toIconLabel(icon) {
    return icon.split(/\//).pop().replace(/\.scss/, '');
  }

  firstClass( multiClassString ) {
    return multiClassString.split(/\./).filter(cl => cl).shift();
  }

  exceptFirstClass( multiClassString ) {
    let ret: any = multiClassString.replace(/(:before|:after|\.|,)/g, '');
    return [...Array.from(new Set(ret.split(/ /)))].slice(1).join(' ');
  }
}

import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SPINNERS_SNIPPETS } from '../spinners-snippets';
import { HttpClient } from '@angular/common/http';
import { Broadcaster } from '../common/broadcaster';

@Component({
  selector: 'css3-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  public treeJson: Array<any>;
  public snippets: string;
  public currentSnippet: string;
  public htmlExample: string;
  public showModal: boolean;

  constructor(private http: HttpClient, private broadcaster: Broadcaster) { }

  ngOnInit() {

    this.http.get('assets/data/spinners-tree.json')
      .subscribe(treeJson => this.treeJson = [treeJson]);

    this.broadcaster.on('select')
      .subscribe((item: any) => {
        if (item.type === 'file') {
          this.currentSnippet = SPINNERS_SNIPPETS[item.path];
          if( this.currentSnippet ) {
            this.htmlExample = this.currentSnippet.match(/\*([^*]|[\r\n]|(\*([^/]|[\r\n])))*\*/)[0];
            this.htmlExample = this.htmlDecode(this.getHtmlUsageExample(this.htmlExample));  
          }   
        }
      })
  }

  public viewSource() {
    this.snippets = '';
    this.snippets += SPINNERS_SNIPPETS['./spinners/_variables.scss'];
    this.snippets += '\n' + this.currentSnippet;
    this.showModal = true;
  }

  getHtmlUsageExample( cssContent ) {
    const match = cssContent.match(/Usage:([\s\S]+\*[.\s\S]+\>)/);
    return match && match.length > 1 ? match[1].replace(/ \*/g, '') : '';
  }

  htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

}

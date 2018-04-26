import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CODE_SNIPPETS } from '../code-snippets';
import { HttpClient } from '@angular/common/http';
import { Broadcaster } from '../common/broadcaster';

declare var require: any;

@Component({
  selector: 'css3-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {

  public treeJson: Array<any>;
  public snippets: any;
  public animationSandbox: HTMLElement;
  public currentSnippet: string;
  public showModal = false;

  @ViewChild('animationEle') animationEle: ElementRef;

  constructor(private http: HttpClient, private broadcaster: Broadcaster) { }

  ngOnInit() {
    this.animationSandbox = this.animationEle.nativeElement;
    this.http.get('assets/data/tree-view.json')
      .subscribe(treeJson => this.treeJson = [treeJson]);

    this.broadcaster.on('select')
      .subscribe((item: any) => {
        if (item.type === 'file') {
          this.currentSnippet = CODE_SNIPPETS[item.path];
          let animationClassName = item.path.split(/\//).pop().replace(/\.css/, '');

          this.animationSandbox.classList.add(animationClassName);
          this.animationSandbox.classList.add('animated');

          setTimeout(_ => this.animationSandbox.className = '', 1000);
        }
      })
  }

  public viewSource() {
    this.snippets = this.currentSnippet;
    this.showModal = true;
  }

}

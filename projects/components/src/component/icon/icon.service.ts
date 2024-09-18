import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private static _loaded: string[] = [];
  private static _pending: string[] = [];
  private _renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) protected _document: any,
    private _rendererFactory: RendererFactory2,
    private _httpBackend: HttpBackend,
    private _http: HttpClient
  ) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  addSprite(url: string, bypassInterceptors: boolean = true) {
    if (IconService._loaded.indexOf(url) < 0 && IconService._pending.indexOf(url) < 0) {
      IconService._pending.push(url);
      this.getSVG(url, bypassInterceptors).subscribe((svg) => {
        IconService._pending = IconService._pending.filter((_) => _ !== url);
        IconService._loaded.push(url);
        this._renderer.insertBefore(this._document.body, svg, this._document.body.firstChild);
      });
    }
  }

  private getSVG(url: string, bypassInterceptors: boolean = true): Observable<SVGElement> {
    const http = bypassInterceptors ? new HttpClient(this._httpBackend) : this._http;
    return http.get(url, { responseType: 'text' }).pipe(
      map((svgText: string) => {
        const svgEl = this.svgElementFromString(svgText);
        return this.cloneSVG(svgEl);
      })
    );
  }

  private svgElementFromString(str: string): SVGElement | never {
    const div = this._renderer.createElement('DIV');
    div.innerHTML = str;
    const svg = div.querySelector('svg') as SVGElement;
    if (!svg) {
      throw new Error('No SVG found in loaded contents');
    }
    return svg;
  }

  private cloneSVG(svg: SVGElement): SVGElement {
    return svg.cloneNode(true) as SVGElement;
  }
}

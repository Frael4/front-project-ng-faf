import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-project-ng-faf';
  isChecked: boolean = false
  @HostBinding('class') componentClassScss: any;

  constructor(public ovl: OverlayContainer){}

  public handleChangeTheme( theme: string){
    console.log('cambiando tem')
    this.ovl.getContainerElement().classList.add(theme)
    this.componentClassScss = theme
    this.isChecked = !this.isChecked
  }
}

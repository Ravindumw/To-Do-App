import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-header',
  template: `
    <header class="flex justify-between border-b border-gray-700 p-2">
      <h1 class="flex items-center text-2xl
      font-bold bg-gradient-to-r from-lime-600
      to-sky-500 bg-clip-text text-transparent">
        <span class="material-symbols-outlined text-3xl pr-2 font-bold">
            task_alt
        </span>
        To-do app</h1>
      <div #avatar (click)="onAvatarClick($event, avatar)"
           class="bg-contain relative w-9 border bg-sky-500 border-gray-700 cursor-pointer rounded-full flex justify-center items-center text-white font-bold"
      [style.background-image]="userImage">
        <div #userMenu
             class="hidden cursor-auto flex-col gap-2 font-normal text-center bg-[#1E1F22] absolute border top-full mt-2 rounded-md right-0 p-2 shadow-lg shadow-gray-700">
          <div class="px-2 font-bold">{{authService.getPrinciple()?.email}}</div>
          <div class="whitespace-nowrap px-2 " >Hi,{{ authService.getPrinciple()?.displayName}}</div>
          <div (click)="authService.signOut()" class="cursor-pointer group flex flex-row rounded justify-center items-center
                bg-slate-600 p-2 hover:bg-slate-700">
            <span class="material-symbols-outlined group-hover:text-lime-500 pr-1">
                logout
            </span>
                Sign Out
          </div>
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('userMenu')
  userMenuElm!: ElementRef<HTMLDivElement>
  userImage:string;


  constructor(public authService: AuthService) {
    this.userImage = `url(${authService.getPrinciple()!?.photoURL!})`;
  }

  @HostListener('document:click')
  onDocumentClick(){
      const userMenu = this.userMenuElm.nativeElement;
      if (userMenu.classList.contains("flex")){
        userMenu.classList.toggle('flex');
        userMenu.classList.toggle('hidden');
      }
  }

  onAvatarClick($event: MouseEvent, avatar: HTMLDivElement){
    $event.stopPropagation();
    if ($event.target != avatar) return;
    this.userMenuElm.nativeElement.classList.toggle('flex');
    this.userMenuElm.nativeElement.classList.toggle('hidden');
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-from',
  template: `
    <form action="" class="flex p-2 gap-1 border-b border-gray-700">
      <input type="text" placeholder="Eg. Finish To-do App Design"
      class="border flex-grow p-1 px-2 outline-0
        bg-transparent border-gray-600 caret-sky-500 text-white
        rounded focus:ring-1 hover:border-sky-300 focus:ring-sky-400"/>
      <button class="border px-2 border-gray-700 font-bold
      hover:shadow-lg hover:shadow-cyan-900 outline-0 focus:ring-1 ring-emerald-600
      bg-gradient-to-r from-indigo-400 to-sky-500 text-slate-100 rounded">
        ADD
      </button>
    </form>
  `,
  styleUrl: './from.component.scss'
})
export class FromComponent {

}

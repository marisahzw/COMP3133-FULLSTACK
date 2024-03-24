import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { NgIf, NgFor } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { RemoveSpacesPipe } from '../remove-spaces.pipe';
import { InputFormatDirective } from '../input-format.directive';


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, UpperCasePipe, RemoveSpacesPipe, InputFormatDirective], // imports here are going to be used in the current component
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  heroes: Hero[] = HEROES;

  selectedHero?: Hero; // ? means that the variable is optional

  selectHero(hero: Hero): void {
    this.selectedHero = hero;
  }
}

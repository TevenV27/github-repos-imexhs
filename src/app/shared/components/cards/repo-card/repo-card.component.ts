import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoModel } from '../../../models/repo.model';
@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repo-card.component.html',
})
export class RepoCardComponent {
  @Input() repo!: RepoModel;
  @Input() languageColors: { [key: string]: string } = {};
}

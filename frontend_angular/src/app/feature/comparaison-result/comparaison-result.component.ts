import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-comparaison-result',
  templateUrl: './comparaison-result.component.html',
  styleUrls: ['./comparaison-result.component.css']
})
export class ComparaisonResultComponent implements OnInit {
  missing: string[] = [];
  extra: string[] = [];
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private comparaisonService: RouterService
  ) {}

  ngOnInit(): void {
    const routerId = this.route.snapshot.paramMap.get('id');

    this.comparaisonService.getComparaisonResult(routerId).subscribe(response => {
      if (response.differences.missing.length === 0 && response.differences.extra.length === 0) {
        this.message = 'Aucune différence détectée.';
      } else {
        this.missing = response.differences.missing;
        this.extra = response.differences.extra;
        this.message = response.message;
      }
    }, error => {
      console.error('Erreur lors de la récupération des données :', error);
    });
  }
}

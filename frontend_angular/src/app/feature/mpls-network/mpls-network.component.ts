import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-mpls-network',
  templateUrl: './mpls-network.component.html',
  styleUrl: './mpls-network.component.css'
})
export class MPLSNetworkComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.createBubbles();
  }

  createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    for (let i = 0; i < 10; i++) { // Créez 10 bulles
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      // Positionner les bulles aléatoirement
      bubble.style.width = Math.random() * 50 + 10 + 'px'; // Largeur aléatoire
      bubble.style.height = bubble.style.width; // Garder la forme ronde
      bubble.style.left = Math.random() * 100 + '%'; // Position horizontale aléatoire
      bubble.style.animationDuration = Math.random() * 4 + 3 + 's'; // Durée d'animation aléatoire
      bubblesContainer.appendChild(bubble);
    }
  }
}

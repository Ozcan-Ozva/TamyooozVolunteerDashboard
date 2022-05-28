import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-image',
  templateUrl: './carousel-image.component.html',
  styleUrls: ['./carousel-image.component.scss']
})
export class CarouselImageComponent implements OnInit {

  @Input() images: CarouselImage[] = [];
  @Input() indicators : boolean = true;
  @Input() controls : boolean = true;
  @Input() autoSlides : boolean = true;
  @Input() slidesInterval : number = 3000;
  public selectedIndex = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.autoSlides) {
      this.autoSlidesImage();
    }
  }

  autoSlidesImage() {
    setInterval(() => {
      this.onNextClick();
    }, this.slidesInterval)
  }

  selectImage(imageIndex: number) : void {
    this.selectedIndex = imageIndex;
  }

  onPreviousClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    }
    else { 
      this.selectedIndex--;
    }
  }

  onNextClick() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    }
    else { 
      this.selectedIndex++;
    }
  }
}

export interface CarouselImage {
  imageSrc: string;
  imageAlt: string;
}

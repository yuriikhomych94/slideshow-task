import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PresentationItem} from 'src/app/interface/presentation.interface';
import {SlideService} from 'src/app/service/slide.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  @ViewChild('videoContainer') videoContainer: ElementRef;
  @ViewChild('imageContainer') imageContainer: ElementRef;

  urlImage = 'https://test.onsignage.com/PlayerBackend/creative/get/';
  playlist: Array<PresentationItem> = [];
  currentIndex = 0;
  status = true;


  constructor(private slideSerive: SlideService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.slideSerive.getData().subscribe((response) => {
      for (const res of response.playlists) {
        for (const r of res.playlistItems) {
          const fileName = this.urlImage + r.creativeKey;
          const durations = r.duration;
          this.playlist.push({
            url: fileName,
            duration: durations
          });
        }
      }
      this.startPlay(0);
    });
  }

  startPlay(index: number): void {
    const item = this.playlist[index];
    this.playItem(item);
    setTimeout(() => {
      if (this.playlist.length === this.currentIndex) {
        this.currentIndex = 0;
      }
      this.startPlay(this.currentIndex);
    }, item.duration * 1000);
  }

  playItem(item: PresentationItem): void {
    this.currentIndex++;
    const extenstion = item.url.slice(-3);
    this.status = extenstion === 'jpg';
    setTimeout(() => {
      if (this.status) {
        this.imageContainer.nativeElement.src = item.url;
      } else {
        this.videoContainer.nativeElement.src = item.url;
        this.videoContainer.nativeElement.muted = false;
        this.videoContainer.nativeElement.play();
      }
    }, 300);
  }
}
